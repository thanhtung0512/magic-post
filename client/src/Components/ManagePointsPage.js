import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Flex,
  Text,
} from "@chakra-ui/react";
const ManagePointsPage = () => {
  const [transactionPoints, setTransactionPoints] = useState([]);
  const [gatheringPoints, setGatheringPoints] = useState([]);
  const [selectedOrderMovements, setSelectedOrderMovements] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ordersInCount, setOrdersInCount] = useState(0);
  const [ordersOutCount, setOrdersOutCount] = useState(0);

  useEffect(() => {
    // Fetch transaction points data
    fetch("http://localhost:8080/api/transaction-points")
      .then((response) => response.json())
      .then((data) => setTransactionPoints(data))
      .catch((error) =>
        console.error("Error fetching transaction points:", error)
      );

    // Fetch gathering points data
    fetch("http://localhost:8080/api/gathering-points")
      .then((response) => response.json())
      .then((data) => setGatheringPoints(data))
      .catch((error) =>
        console.error("Error fetching gathering points:", error)
      );
  }, []);

  const handleManageTransactionPlaces = () => {
    // Logic for managing transaction places
    console.log("Managing transaction places");
  };

  const handleManageGatheringPlaces = () => {
    // Logic for managing gathering places
    console.log("Managing gathering places");
  };

  const handleViewDetails = (point, isTransaction) => {
    const endpointIN = isTransaction
      ? "transaction/in/transactionPointID/" + point.transactionPointId
      : "gathering/in/gatheringPointID/" + point.gatheringPointId;

    const endpointOUT = isTransaction
      ? "transaction/out/transactionPointID/" + point.transactionPointId
      : "gathering/out/gatheringPointID/" + point.gatheringPointId;

    // Fetch order movements for orders go in
    console.log(
      "URL :",
      `http://localhost:8080/api/order-movements/${endpointIN}`
    );
    const fetchOrdersIn = fetch(
      `http://localhost:8080/api/order-movements/${endpointIN}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          // Handle the case where data[0] is not iterable (not an array)
          throw new Error("Invalid data format for orders in");
        }
        setOrdersOutCount(data.length);
        return data;
      });

    // Fetch order movements for orders go out
    const fetchOrdersOut = fetch(
      `http://localhost:8080/api/order-movements/${endpointOUT}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          // Handle the case where data[1] is not iterable (not an array)
          throw new Error("Invalid data format for orders out");
        }
        setOrdersInCount(data.length);
        return data;
      });

    // Combine both promises and handle when both are resolved
    Promise.all([fetchOrdersIn, fetchOrdersOut])
      .then((data) => {
        // Combine the data from both requests
        const combinedData = [...(data[0] || []), ...(data[1] || [])];
        setSelectedOrderMovements(combinedData);
        setIsModalOpen(true);
      })
      .catch((error) =>
        console.error("Error fetching order movements (go in/out):", error)
      );
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setOrdersInCount(0);
    setOrdersOutCount(0);
  };

  return (
    <Box p={4}>
      <Heading as="h2" size="xl" mb={4}>
        All Transaction Points and Gathering Points
      </Heading>

      <Box>
        <Heading size="md" mt={6} mb={2}>
          Transaction Places
        </Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Address</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactionPoints.map((place) => (
              <Tr key={place.transactionPointId}>
                <Td>{place.name}</Td>
                <Td>{place.address}</Td>
                <Td>
                  <Button
                    colorScheme="teal"
                    onClick={() => handleViewDetails(place, true)}
                  >
                    View Details
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Box mt={6}>
        <Heading size="md" mb={2}>
          Gathering Places
        </Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Address</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {gatheringPoints.map((place) => (
              <Tr key={place.gatheringPointId}>
                <Td>{place.name}</Td>
                <Td>{place.address}</Td>
                <Td>
                  <Button
                    colorScheme="teal"
                    onClick={() => handleViewDetails(place, false)}
                  >
                    View Details
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Modal for Order Movements */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent size="xl" maxW="80%" maxH="80%">
          <ModalHeader textAlign="center">Order Movements Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex justifyContent="space-between">
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
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ManagePointsPage;
