import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import AuthService from "../../../services/auth.service";

const InOutOrderTransaction = ({ userID }) => {
  const currentUser = AuthService.getCurrentUser();
  const [ordersInCount, setOrdersInCount] = useState(0);
  const [ordersOutCount, setOrdersOutCount] = useState(0);
  const [selectedOrderMovements, setSelectedOrderMovements] = useState([]);

  const fetchOrderMovements = async (movementType) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/order-movements/transaction/" +
          movementType +
          "/userID/" +
          currentUser.id
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (movementType === "in") {
        setOrdersOutCount(data.length);
      } else {
        setOrdersInCount(data.length);
      }

      setSelectedOrderMovements(data);
    } catch (error) {
      console.error("Error fetching order movements:", error);
    }
  };

  useEffect(() => {
    fetchOrderMovements("in");
    fetchOrderMovements("out");
  }, []);

  return (
    <Box>
      <Flex justifyContent="space-between" mb={4}>
        <Text color="blue.500" fontWeight="bold">
          Number of Orders In: {ordersInCount}
        </Text>
        <Text color="green.500" fontWeight="bold">
          Number of Orders Out: {ordersOutCount}
        </Text>
      </Flex>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Movement ID</Th>
            <Th>From</Th>
            <Th>To</Th>
            <Th>In/Out</Th>
            <Th>Status</Th>
            <Th>Date</Th>
            <Th>Price</Th>
            {/* Add more headers based on your order movement structure */}
          </Tr>
        </Thead>
        <Tbody>
          {selectedOrderMovements.map((movement) => (
            <Tr key={movement.movementID}>
              <Td>{movement.movementID}</Td>
              <Td>{movement.deliveryOrder.senderAddress}</Td>
              <Td>{movement.deliveryOrder.recipientAddress}</Td>
              <Td>{movement.movementType}</Td>
              <Td>{movement.deliveryOrder.status}</Td>
              <Td>{movement.movementDate}</Td>
              <Td>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(movement.deliveryOrder.price)}
              </Td>
              {/* Add more cells based on your order movement structure */}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default InOutOrderTransaction;
