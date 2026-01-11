package com.example.server.services;

import com.example.server.domain.DeliveryOrder;
import com.example.server.domain.GatheringPoint;
import com.example.server.domain.OrderMovement;
import com.example.server.domain.PointLeaderAtGatheringPoint;
import com.example.server.domain.PointLeaderAtTransactionPoint;
import com.example.server.domain.StaffAtGatheringPoint;
import com.example.server.domain.Teller;
import com.example.server.domain.TransactionPoint;
import com.example.server.domain.TransactionPointGatheringPoint;
import com.example.server.domain.User;
import com.example.server.repositories.OrderMovementRepository;
import com.example.server.repositories.PointLeaderAtGatheringPointRepository;
import com.example.server.repositories.PointLeaderAtTransactionPointRepository;
import com.example.server.repositories.StaffRepository;
import com.example.server.repositories.TellerRepository;
import com.example.server.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class OrderMovementService {

    @Autowired
    private OrderMovementRepository orderMovementRepository;

    @Autowired
    private TellerRepository tellerRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private StaffRepository staffRepository;

    public List<OrderMovement> getAllOrderMovements() {
        return orderMovementRepository.findAll();
    }

    public List<OrderMovement> ordersGoInSpecificTransactionPoint(Long userId) {
        List<OrderMovement> ordersGoInSpecificTransactionPoint = new ArrayList<>();
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            Optional<Teller> tellerOptional = tellerRepository.findByUser(user);
            Optional<StaffAtGatheringPoint> staffOptional = staffRepository.findByUser(user);
            Optional<PointLeaderAtTransactionPoint> pointLeaderAtTransactionPointOptional = pointLeaderAtTransactionPointRepository
                    .findByUser(user);
            if (tellerOptional.isPresent()) {
                // Transaction point
                TransactionPoint transactionPoint = tellerOptional.get().getTransactionPoint();
                Long currentTransactionPointId = transactionPoint.getTransactionPointId();
                List<OrderMovement> allOrderMovements = orderMovementRepository.findAll();

                System.out.println("currentTransactionPointId: " + currentTransactionPointId);
                for (OrderMovement orderMovement : allOrderMovements) {
                    System.out.println(orderMovement.toString());
                    if (orderMovement.getTransactionPoint() != null
                            && orderMovement.getTransactionPoint().getTransactionPointId() == currentTransactionPointId
                            && orderMovement.getGatheringPoint() != null
                            && orderMovement.getDestGatheringPoint() == null
                            && orderMovement.getMovementType().equals("OUT")) {
                        // System.out.println(orderMovement.getGatheringPoint().toString());
                        ordersGoInSpecificTransactionPoint.add(orderMovement);
                    }
                }

                // for (OrderMovement orderMovement : allOrderMovements) {
                // System.out.println(orderMovement.toString());
                // System.out.println("TransactionPointID in orderMovement: "
                // + orderMovement.getTransactionPoint().getTransactionPointId());

                // }

            } else if (pointLeaderAtTransactionPointOptional.isPresent()) {
                TransactionPoint transactionPoint = pointLeaderAtTransactionPointOptional.get().getTransactionPoint();
                Long currentTransactionPointId = transactionPoint.getTransactionPointId();
                List<OrderMovement> allOrderMovements = orderMovementRepository.findAll();

                System.out.println("currentTransactionPointId: " + currentTransactionPointId);
                for (OrderMovement orderMovement : allOrderMovements) {
                    System.out.println(orderMovement.toString());
                    if (orderMovement.getTransactionPoint() != null
                            && orderMovement.getTransactionPoint().getTransactionPointId() == currentTransactionPointId
                            && orderMovement.getGatheringPoint() != null
                            && orderMovement.getDestGatheringPoint() == null
                            && orderMovement.getMovementType().equals("OUT")) {
                        // System.out.println(orderMovement.getGatheringPoint().toString());
                        ordersGoInSpecificTransactionPoint.add(orderMovement);
                    }
                }
            }
        }
        return ordersGoInSpecificTransactionPoint;
    }

    public List<OrderMovement> ordersGoInSpecificTransactionPoint_TransactionPointID(Long transactionPointID) {
        List<OrderMovement> ordersGoInSpecificTransactionPoint = new ArrayList<>();

        // Transaction point

        Long currentTransactionPointId = transactionPointID;
        List<OrderMovement> allOrderMovements = orderMovementRepository.findAll();

        System.out.println("currentTransactionPointId: " + currentTransactionPointId);
        for (OrderMovement orderMovement : allOrderMovements) {
            if (orderMovement.getTransactionPoint() != null
                    && orderMovement.getTransactionPoint().getTransactionPointId() == currentTransactionPointId
                    && orderMovement.getGatheringPoint() != null
                    && orderMovement.getDestGatheringPoint() == null
                    && orderMovement.getMovementType().equals("OUT")) {
                // System.out.println(orderMovement.getGatheringPoint().toString());
                ordersGoInSpecificTransactionPoint.add(orderMovement);
            }
        }

        // for (OrderMovement orderMovement : allOrderMovements) {
        // System.out.println(orderMovement.toString());
        // System.out.println("TransactionPointID in orderMovement: "
        // + orderMovement.getTransactionPoint().getTransactionPointId());

        // }

        return ordersGoInSpecificTransactionPoint;
    }

    public List<OrderMovement> ordersGoOutTransactionPoint(Long userId) {
        List<OrderMovement> ordersGoOutSpecificTransactionPoint = new ArrayList<>();
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            Optional<Teller> tellerOptional = tellerRepository.findByUser(user);
            Optional<StaffAtGatheringPoint> staffOptional = staffRepository.findByUser(user);
            Optional<PointLeaderAtTransactionPoint> pointLeaderAtTransactionPointOptional = pointLeaderAtTransactionPointRepository
                    .findByUser(user);
            if (tellerOptional.isPresent()) {
                // Transaction point
                TransactionPoint transactionPoint = tellerOptional.get().getTransactionPoint();
                Long currentTransactionPointId = transactionPoint.getTransactionPointId();
                List<OrderMovement> allOrderMovements = getAllOrderMovements();

                for (OrderMovement orderMovement : allOrderMovements) {
                    if (orderMovement.getTransactionPoint() != null &&
                            orderMovement.getTransactionPoint().getTransactionPointId() == currentTransactionPointId
                            && orderMovement.getGatheringPoint() != null
                            && orderMovement.getMovementType().equals("IN")
                            && orderMovement.getDestGatheringPoint() == null) {
                        ordersGoOutSpecificTransactionPoint.add(orderMovement);
                    }
                }

            } else if (pointLeaderAtTransactionPointOptional.isPresent()) {
                TransactionPoint transactionPoint = pointLeaderAtTransactionPointOptional.get().getTransactionPoint();
                Long currentTransactionPointId = transactionPoint.getTransactionPointId();
                List<OrderMovement> allOrderMovements = getAllOrderMovements();

                for (OrderMovement orderMovement : allOrderMovements) {
                    if (orderMovement.getTransactionPoint() != null &&
                            orderMovement.getTransactionPoint().getTransactionPointId() == currentTransactionPointId
                            && orderMovement.getGatheringPoint() != null
                            && orderMovement.getMovementType().equals("IN")
                            && orderMovement.getDestGatheringPoint() == null) {
                        ordersGoOutSpecificTransactionPoint.add(orderMovement);
                    }
                }
            }
        }

        // Splitting

        return ordersGoOutSpecificTransactionPoint;
    }

    public List<OrderMovement> ordersGoOutTransactionPoint_TransactionPointID(Long transactionPointID) {
        List<OrderMovement> ordersGoOutSpecificTransactionPoint = new ArrayList<>();

        // Transaction point

        Long currentTransactionPointId = transactionPointID;
        List<OrderMovement> allOrderMovements = getAllOrderMovements();

        for (OrderMovement orderMovement : allOrderMovements) {
            if (orderMovement.getTransactionPoint() != null
                    && orderMovement.getTransactionPoint().getTransactionPointId() == currentTransactionPointId
                    && orderMovement.getGatheringPoint() != null
                    && orderMovement.getMovementType().equals("IN")
                    && orderMovement.getDestGatheringPoint() == null) {
                ordersGoOutSpecificTransactionPoint.add(orderMovement);
            }
        }

        // Splitting

        return ordersGoOutSpecificTransactionPoint;
    }

    @Autowired
    private PointLeaderAtGatheringPointRepository pointLeaderAtGatheringPointRepository;

    @Autowired
    private PointLeaderAtTransactionPointRepository pointLeaderAtTransactionPointRepository;

    public List<OrderMovement> ordersGoInGatheringPoint(Long userId) {
        List<OrderMovement> ordersGoInGatheringPoint = new ArrayList<>();
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            Optional<Teller> tellerOptional = tellerRepository.findByUser(user);
            Optional<PointLeaderAtGatheringPoint> pointLeaderAtGatheringPointOptional = pointLeaderAtGatheringPointRepository
                    .findByUser(user);
            Optional<StaffAtGatheringPoint> staffOptional = staffRepository.findByUser(user);

            if (tellerOptional.isPresent()) {

            } else if (staffOptional.isPresent()) {
                // find gathering point correspond to the transaction point in the order data
                GatheringPoint currentGatheringPoint = staffOptional.get().getGatheringPoint();
                Long currentGatheringPointId = currentGatheringPoint.getGatheringPointId();
                List<OrderMovement> orderMovements = getAllOrderMovements();

                for (OrderMovement orderMovement : orderMovements) {
                    if (orderMovement.getGatheringPoint() != null
                            && orderMovement.getGatheringPoint().getGatheringPointId() == currentGatheringPointId
                            && orderMovement.getTransactionPoint() != null
                            && orderMovement.getDestGatheringPoint() == null
                            && orderMovement.getMovementType().equals("IN")) {
                        ordersGoInGatheringPoint.add(orderMovement);
                    } else if (orderMovement.getGatheringPoint() != null
                            && orderMovement.getDestGatheringPoint() != null
                            && orderMovement.getDestGatheringPoint().getGatheringPointId() == currentGatheringPointId
                            && orderMovement.getMovementType().equals("IN")) {
                        ordersGoInGatheringPoint.add(orderMovement);
                    }
                }

            } else if (pointLeaderAtGatheringPointOptional.isPresent()) {
                GatheringPoint currentGatheringPoint = pointLeaderAtGatheringPointOptional.get().getGatheringPoint();
                Long currentGatheringPointId = currentGatheringPoint.getGatheringPointId();
                List<OrderMovement> orderMovements = getAllOrderMovements();
                for (OrderMovement orderMovement : orderMovements) {
                    if (orderMovement.getGatheringPoint() != null
                            && orderMovement.getGatheringPoint().getGatheringPointId() == currentGatheringPointId
                            && orderMovement.getTransactionPoint() != null
                            && orderMovement.getDestGatheringPoint() == null
                            && orderMovement.getMovementType().equals("IN")) {
                        ordersGoInGatheringPoint.add(orderMovement);
                    } else if (orderMovement.getGatheringPoint() != null
                            && orderMovement.getDestGatheringPoint() != null
                            && orderMovement.getDestGatheringPoint().getGatheringPointId() == currentGatheringPointId
                            && orderMovement.getMovementType().equals("IN")) {
                        ordersGoInGatheringPoint.add(orderMovement);
                    }
                }
            }
        }

        return ordersGoInGatheringPoint;
    }

    public List<OrderMovement> ordersGoInGatheringPoint_GatheringPointID(Long gatheringPointID) {
        List<OrderMovement> ordersGoInGatheringPoint = new ArrayList<>();

        // find gathering point correspond to the transaction point in the order data

        Long currentGatheringPointId = gatheringPointID;
        List<OrderMovement> orderMovements = getAllOrderMovements();

        for (OrderMovement orderMovement : orderMovements) {
            if (orderMovement.getGatheringPoint() != null
                    && orderMovement.getGatheringPoint().getGatheringPointId() == currentGatheringPointId
                    && orderMovement.getTransactionPoint() != null
                    && orderMovement.getDestGatheringPoint() == null
                    && orderMovement.getMovementType().equals("IN")) {
                ordersGoInGatheringPoint.add(orderMovement);
            } else if (orderMovement.getGatheringPoint() != null
                    && orderMovement.getDestGatheringPoint() != null
                    && orderMovement.getDestGatheringPoint().getGatheringPointId() == currentGatheringPointId
                    && orderMovement.getMovementType().equals("IN")) {
                ordersGoInGatheringPoint.add(orderMovement);
            }
        }

        return ordersGoInGatheringPoint;
    }

    public List<OrderMovement> ordersGoOutGatheringPoint(Long userId) {

        List<OrderMovement> ordersGoOutGatheringPoint = new ArrayList<>();
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            Optional<Teller> tellerOptional = tellerRepository.findByUser(user);
            Optional<StaffAtGatheringPoint> staffOptional = staffRepository.findByUser(user);
            Optional<PointLeaderAtGatheringPoint> pointLeaderAtGatheringPointOptional = pointLeaderAtGatheringPointRepository
                    .findByUser(user);
            if (tellerOptional.isPresent()) {

            } else if (staffOptional.isPresent()) {
                // find gathering point correspond to the transaction point in the order data
                GatheringPoint currentGatheringPoint = staffOptional.get().getGatheringPoint();
                Long currentGatheringPointId = currentGatheringPoint.getGatheringPointId();
                List<OrderMovement> orderMovements = getAllOrderMovements();

                for (OrderMovement orderMovement : orderMovements) {
                    if (orderMovement.getGatheringPoint() != null
                            && orderMovement.getGatheringPoint().getGatheringPointId() == currentGatheringPointId
                            && orderMovement.getTransactionPoint() != null
                            && orderMovement.getDestGatheringPoint() == null
                            && orderMovement.getMovementType().equals("OUT")) {
                        ordersGoOutGatheringPoint.add(orderMovement);
                    } else if (orderMovement.getGatheringPoint() != null
                            && orderMovement.getDestGatheringPoint() != null
                            && orderMovement.getGatheringPoint().getGatheringPointId() == currentGatheringPointId
                            && orderMovement.getMovementType().equals("IN")) {
                        ordersGoOutGatheringPoint.add(orderMovement);
                    }
                }

            } else if (pointLeaderAtGatheringPointOptional.isPresent()) {
                GatheringPoint currentGatheringPoint = pointLeaderAtGatheringPointOptional.get().getGatheringPoint();
                Long currentGatheringPointId = currentGatheringPoint.getGatheringPointId();
                List<OrderMovement> orderMovements = getAllOrderMovements();

                for (OrderMovement orderMovement : orderMovements) {
                    if (orderMovement.getGatheringPoint() != null
                            && orderMovement.getGatheringPoint().getGatheringPointId() == currentGatheringPointId
                            && orderMovement.getTransactionPoint() != null
                            && orderMovement.getDestGatheringPoint() == null
                            && orderMovement.getMovementType().equals("OUT")) {
                        ordersGoOutGatheringPoint.add(orderMovement);
                    } else if (orderMovement.getGatheringPoint() != null
                            && orderMovement.getDestGatheringPoint() != null
                            && orderMovement.getGatheringPoint().getGatheringPointId() == currentGatheringPointId
                            && orderMovement.getMovementType().equals("IN")) {
                        ordersGoOutGatheringPoint.add(orderMovement);
                    }
                }
            }
        }

        return ordersGoOutGatheringPoint;

        // Splitting

    }

    public List<OrderMovement> ordersGoOutGatheringPoint_GatheringPointID(Long gatheringPointID) {

        List<OrderMovement> ordersGoOutGatheringPoint = new ArrayList<>();

        // find gathering point correspond to the transaction point in the order data

        Long currentGatheringPointId = gatheringPointID;
        List<OrderMovement> orderMovements = getAllOrderMovements();

        for (OrderMovement orderMovement : orderMovements) {
            if (orderMovement.getGatheringPoint() != null
                    && orderMovement.getGatheringPoint().getGatheringPointId() == currentGatheringPointId
                    && orderMovement.getTransactionPoint() != null
                    && orderMovement.getDestGatheringPoint() == null
                    && orderMovement.getMovementType().equals("OUT")) {
                ordersGoOutGatheringPoint.add(orderMovement);
            } else if (orderMovement.getGatheringPoint() != null
                    && orderMovement.getDestGatheringPoint() != null
                    && orderMovement.getGatheringPoint().getGatheringPointId() == currentGatheringPointId
                    && orderMovement.getMovementType().equals("IN")) {
                ordersGoOutGatheringPoint.add(orderMovement);
            }
        }

        return ordersGoOutGatheringPoint;

        // Splitting

    }
    // Additional service methods if needed
}