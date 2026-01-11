package com.example.server.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.server.domain.Address;

@Service
public class AddressService {

    public Address findClosestAddress(Address sourceAddress, List<Address> addressList) {
        double minDistance = Double.MAX_VALUE;
        Address closestAddress = null;

        for (Address targetAddress : addressList) {
            double distance = calculateDistance(sourceAddress, targetAddress);
            if (distance < minDistance) {
                minDistance = distance;
                closestAddress = targetAddress;
            }
        }

        return closestAddress;
    }

    private double calculateDistance(Address address1, Address address2) {
        // Use the Haversine formula to calculate distance
        double earthRadius = 6371; // Radius of the Earth in kilometers
        double lat1 = Math.toRadians(address1.getLatitude());
        double lon1 = Math.toRadians(address1.getLongitude());
        double lat2 = Math.toRadians(address2.getLatitude());
        double lon2 = Math.toRadians(address2.getLongitude());

        double dLat = lat2 - lat1;
        double dLon = lon2 - lon1;

        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                   Math.cos(lat1) * Math.cos(lat2) *
                   Math.sin(dLon / 2) * Math.sin(dLon / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return earthRadius * c;
    }
}
