package com.example.server.utilities;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.server.domain.DeliveryOrder;
import com.example.server.domain.GatheringPoint;
import com.example.server.domain.StaffAtGatheringPoint;
import com.example.server.domain.Teller;
import com.example.server.domain.TransactionPoint;
import com.example.server.domain.User;
import com.example.server.repositories.StaffRepository;
import com.example.server.repositories.TellerRepository;
import com.example.server.repositories.UserRepository;

@Service
public class PointLeaderUtil {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TellerRepository tellerRepository;

    @Autowired
    private StaffRepository staffRepository;

    public TransactionPoint getTransactionPointFromTellerId(Long tellerId) {
        TransactionPoint transactionPoint = new TransactionPoint();
        Optional<User> userOptional = userRepository.findById(tellerId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            Optional<Teller> tellerOptional = tellerRepository.findByUser(user);

            if (tellerOptional.isPresent()) {
                // Transaction point
                transactionPoint = tellerOptional.get().getTransactionPoint();
            }
        }
        return transactionPoint;
    }

    public GatheringPoint getGatheringPointByStaffId(Long staffId) {
        GatheringPoint currentGatheringPoint = new GatheringPoint();
        Optional<User> userOptional = userRepository.findById(staffId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();

            Optional<StaffAtGatheringPoint> staffOptional = staffRepository.findByUser(user);
            if (staffOptional.isPresent()) {
                currentGatheringPoint = staffOptional.get().getGatheringPoint();
            }
        }
        return currentGatheringPoint;
    }

}
