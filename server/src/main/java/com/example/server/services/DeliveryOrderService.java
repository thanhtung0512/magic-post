package com.example.server.services;

import org.apache.http.client.utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.server.domain.DeliveryOrder;
import com.example.server.domain.GatheringPoint;
import com.example.server.domain.StaffAtGatheringPoint;
import com.example.server.domain.Teller;
import com.example.server.domain.TransactionPoint;
import com.example.server.domain.TransactionPointGatheringPoint;
import com.example.server.domain.User;
import com.example.server.dto.request.TellerCreateOrder;
import com.example.server.exceptions.OrderNotFoundException;
import com.example.server.repositories.DeliveryOrderRepository;
import com.example.server.repositories.StaffRepository;
import com.example.server.repositories.TellerRepository;
import com.example.server.repositories.UserRepository;
import com.example.server.utilities.CacheUtility;
import com.fasterxml.jackson.core.JsonProcessingException;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.sql.Date;
import java.sql.Time;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DeliveryOrderService {

    public static final Long NULL_GOOD = new Long(6);

    @Autowired
    private TransactionPointGatheringPointService transactionPointGatheringPointService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TellerRepository tellerRepository;

    private final EntityManager entityManager;

    // Inject the EntityManager through constructor
    public DeliveryOrderService(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Autowired
    private DeliveryOrderRepository deliveryOrderRepository;

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private CacheUtility cacheUtility;

    public List<DeliveryOrder> getAllDeliveryOrders() throws JsonProcessingException {
        // return cacheUtility.getAllDeliveryOrders();
        return deliveryOrderRepository.findAll();
    }

    public long countAllDeliveryOrders() {
        return deliveryOrderRepository.count();
    }

    public int getSumOfPrices() {
        return deliveryOrderRepository.getSumOfPrices();
    }

    // Optionally, count by status
    public long countDeliveryOrdersByStatus(String status) {
        return deliveryOrderRepository.countByStatus(status);
    }

    public List<DeliveryOrder> findByStatus(String status, Long userId) {
        List<DeliveryOrder> resultList = new ArrayList<>();
        List<DeliveryOrder> deliveryOrdersWithoutCheckingPointId = deliveryOrderRepository.findByStatus(status);
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            Optional<Teller> tellerOptional = tellerRepository.findByUser(user);
            Optional<StaffAtGatheringPoint> staffOptional = staffRepository.findByUser(user);

            if (tellerOptional.isPresent()) {
                // Transaction point
                TransactionPoint transactionPoint = tellerOptional.get().getTransactionPoint();
                Long currentTransactionPointId = transactionPoint.getTransactionPointId();
                for (DeliveryOrder deliveryOrder : deliveryOrdersWithoutCheckingPointId) {
                    Long senderTransactionPointId = deliveryOrder.getSenderTransactionPoint().getTransactionPointId();
                    Long recipientTransactionPointId = deliveryOrder.getRecipientTransactionPoint()
                            .getTransactionPointId();
                    if (senderTransactionPointId == currentTransactionPointId
                            || recipientTransactionPointId == currentTransactionPointId) {
                        resultList.add(deliveryOrder);
                    }
                }
            } else {
                // find gathering point correspond to the transaction point in the order data
                GatheringPoint currentGatheringPoint = staffOptional.get().getGatheringPoint();
                Long currentGatheringPointId = currentGatheringPoint.getGatheringPointId();
                for (DeliveryOrder deliveryOrder : deliveryOrdersWithoutCheckingPointId) {
                    TransactionPoint senderTransactionPoint = deliveryOrder.getSenderTransactionPoint();
                    TransactionPoint recipientTransactionPoint = deliveryOrder.getRecipientTransactionPoint();

                    // find these two corresponding gathering point
                    Long senderGatheringPointId = new Long(-1);
                    Long recipientGatheringPointId = new Long(-2);
                    Optional<TransactionPointGatheringPoint> senderTrans_Gathering = transactionPointGatheringPointService
                            .findByTransactionPoint(senderTransactionPoint);
                    Optional<TransactionPointGatheringPoint> recieptTrans_Gathering = transactionPointGatheringPointService
                            .findByTransactionPoint(recipientTransactionPoint);
                    if (senderTrans_Gathering.isPresent()) {
                        senderGatheringPointId = senderTrans_Gathering.get().getGatheringPoint().getGatheringPointId();
                    }
                    if (recieptTrans_Gathering.isPresent()) {
                        recipientGatheringPointId = recieptTrans_Gathering.get().getGatheringPoint()
                                .getGatheringPointId();
                    }

                    if (currentGatheringPointId == senderGatheringPointId
                            || currentGatheringPointId == recipientGatheringPointId) {
                        resultList.add(deliveryOrder);
                    }
                }
            }
        }
        return resultList;
    }

    public Optional<DeliveryOrder> getDeliveryOrderById(Long orderID) {
        try {
            return deliveryOrderRepository.findById(orderID);
        } catch (Exception e) {
            System.out.println("Order not found with ID: " + orderID);
        }
        return null;

    }

    public void saveDeliveryOrder(DeliveryOrder deliveryOrder) {
        deliveryOrderRepository.save(deliveryOrder);
    }

    public List<Map<String, Object>> countDeliveryByMonths() {
        String sql = "SELECT MONTH(delivery_order.date) as month, COUNT(delivery_order.orderId) as orders FROM DeliveryOrder delivery_order GROUP BY MONTH(delivery_order.date)";
        Query query = entityManager.createNativeQuery(sql);

        @SuppressWarnings("unchecked")
        List<Object[]> result = query.getResultList();

        return result.stream()
                .map(objArray -> Map.of("month", objArray[0], "orders", objArray[1]))
                .collect(Collectors.toList());

    }

    public List<Map<String, Object>> countOrdersByStatusOnEachMonth() {
        String sql = "SELECT MONTH(delivery_order.date) as month, " +
                "SUM(CASE WHEN delivery_order.status = 'Delivered Successfully' THEN 1 ELSE 0 END) as completed, " +
                "SUM(CASE WHEN delivery_order.status = 'Failed, return to transaction point' THEN 1 ELSE 0 END) as failed "
                +
                "FROM DeliveryOrder delivery_order GROUP BY MONTH(delivery_order.date)";

        Query query = entityManager.createNativeQuery(sql);

        @SuppressWarnings("unchecked")
        List<Object[]> result = query.getResultList();

        return result.stream()
                .map(objArray -> Map.of(
                        "month", objArray[0],
                        "completed", objArray[1],
                        "failed", objArray[2]))
                .collect(Collectors.toList());
    }

    public List<Map<String, Object>> sumPricesByStatusOnEachMonth() {
        List<Object[]> result = deliveryOrderRepository.sumPricesByStatusOnEachMonth();
        return result.stream()
                .map(objArray -> Map.of(
                        "month", objArray[0],
                        "completedPrice", objArray[1],
                        "failedPrice", objArray[2]))
                .collect(Collectors.toList());
    }

    public void createOrder(TellerCreateOrder tellerCreateOrder) {

        String orderStatus = "Need_forward";

        String senderName = tellerCreateOrder.getSenderName();
        String senderAddress = tellerCreateOrder.getSenderAddress();
        String senderPhoneNumber = tellerCreateOrder.getSenderPhoneNumber();
        String senderPostalCode = tellerCreateOrder.getSenderPostalCode();

        String recipientName = tellerCreateOrder.getRecipientName();
        String recipientAddress = tellerCreateOrder.getRecipientAddress();
        String recipientPhoneNumber = tellerCreateOrder.getRecipientPhoneNumber();
        String recipientPostalCode = tellerCreateOrder.getRecipientPostalCode();

        String orderType = tellerCreateOrder.getOrderType();
        double mainFare = tellerCreateOrder.getMainFare();
        double extraFare = tellerCreateOrder.getExtraFare();
        double netWeight = tellerCreateOrder.getNetWeight();
        double conversionWeight = tellerCreateOrder.getConversionWeight();
        System.out.println("senderName: " + senderName + "\n" +
                "senderAddress: " + senderAddress + "\n" +
                "senderPhoneNumber: " + senderPhoneNumber + "\n" +
                "senderPostalCode: " + senderPostalCode + "\n" +
                "recipientName: " + recipientName + "\n" +
                "recipientAddress: " + recipientAddress + "\n" +
                "recipientPhoneNumber: " + recipientPhoneNumber + "\n" +
                "recipientPostalCode: " + recipientPostalCode + "\n" +
                "orderType: " + orderType + "\n" +
                "mainFare: " + mainFare + "\n" +
                "extraFare: " + extraFare + "\n" +
                "netWeight: " + netWeight + "\n" +
                "conversionWeight: " + conversionWeight);
        // step 1. get corresponding transaction point with current teller
        // how: get userid -> find teller base on user id -> getTransactionPoint
        Long userId = tellerCreateOrder.getUserId();
        Optional<User> currentUserOptional = userRepository.findById(userId);
        if (currentUserOptional.isPresent()) {
            User currentUser = currentUserOptional.get();

            System.out.println(currentUser.toString());

            Optional<Teller> currentTellerOptional = tellerRepository.findByUser(currentUser);
            if (currentTellerOptional.isPresent()) {
                Teller currentTeller = currentTellerOptional.get();
                // got teller -> get transaction point this teller belong to
                TransactionPoint tellerTransactionPoint = currentTeller.getTransactionPoint();
                System.out.println("Transaction point: " + tellerTransactionPoint.toString());
                // now, find the correspond gathering point to the found transaction point
                Optional<TransactionPointGatheringPoint> transactionPointGatheringPointOptional = transactionPointGatheringPointService
                        .findByTransactionPoint(tellerTransactionPoint);
                if (transactionPointGatheringPointOptional.isPresent()) {
                    // has the corresponding gathering point to the teller transaction point
                    TransactionPointGatheringPoint transactionPointGatheringPoint = transactionPointGatheringPointOptional
                            .get();
                    GatheringPoint tellerGatheringPoint = transactionPointGatheringPoint.getGatheringPoint();
                    System.out.println("Gathering point corresponding: " + tellerGatheringPoint.toString());

                    DeliveryOrder deliveryOrder = new DeliveryOrder();
                    java.util.Date currentDate = new java.util.Date();

                    // Convert to java.sql.Date
                    Date sqlDate = new Date(currentDate.getTime());

                    deliveryOrder.setDate(sqlDate);
                    deliveryOrder.setSenderTransactionPoint(tellerTransactionPoint);
                    deliveryOrder.setSenderGatheringPoint(tellerGatheringPoint);
                    deliveryOrder.setStatus(orderStatus);
                    deliveryOrder.setSenderAddress(senderAddress);
                    deliveryOrder.setRecipientAddress(recipientAddress);
                    // deliveryOrder.setPrice(price);
                    // deliveryOrder.setFare(0);
                    deliveryOrder.setSenderName(senderName);
                    deliveryOrder.setRecipientName(recipientName);
                    deliveryOrder.setFare((int) mainFare);
                    deliveryOrder.setPlusFare((int) extraFare);
                    deliveryOrder.setWeight((int) netWeight);
                    deliveryOrderRepository.save(deliveryOrder);
                }
            }

        }
    }
}
