import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Fade,
  Table,
  Tbody,
  Tr,
  Td,
  VStack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  IconButton,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import LeafletMap from "../../LeafletMap";
import AuthService from "../../../services/auth.service";

import ChatArea from "../../ChatBot/ChatArea";
const UserTracking = () => {
  const currentUser = AuthService.getCurrentUser();
  const [orderId, setOrderId] = useState("");
  const [orderStatus, setOrderStatus] = useState(null);
  const [error, setError] = useState("");
  const [customerAddress, setCustomerAddress] = useState(null);
  const [deliveryOrders, setDeliveryOrders] = useState([]);
  const [isModalClosed, setIsModalClosed] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isChatOpen, setIsChatOpen] = useState(false); // State to control the chat area drawer

  useEffect(() => {
    // Fetch customer address
    fetch("http://localhost:8080/api/customer/get-address/" + currentUser.id)
      .then((response) => response.json())
      .then((data) => setCustomerAddress(data))
      .catch((error) =>
        console.error("Error fetching customer address:", error)
      );

    // Fetch delivery orders
    fetch("http://localhost:8080/api/delivery-orders")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched delivery orders:", data);

        // Parse the JSON string into a JavaScript object
        setDeliveryOrders(data); // Store the delivery orders data
      })
      .catch((error) => {
        console.error("Error fetching delivery orders:", error);
      });
  }, [currentUser.id]);

  const handleSearch = () => {
    // Convert orderId to a number
    const orderIdNumber = parseInt(orderId, 10);

    // Search in the existing delivery orders data
    let foundOrder = null;

    for (let i = 0; i < deliveryOrders.length; i++) {
      if (deliveryOrders[i].orderId === orderIdNumber) {
        foundOrder = JSON.stringify(deliveryOrders[i]);
        console.log(foundOrder);
        break;
      }
    }

    if (foundOrder) {
      setOrderStatus(foundOrder);
      setError("");
      onOpen();
      // Open the chat area drawer when an order is found
      // setIsChatOpen(true);
    } else {
      setOrderStatus(null);
      setError(
        "Cannot find your package, please re-check the entered package ID"
      );
    }
  };

  return (
    <>
      <Box p={4}>
        <Heading as="h2" size="xl" mb={4}>
          Track Your Package
        </Heading>
        <FormControl mb={4}>
          <FormLabel>Enter Order ID</FormLabel>
          <Input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Order ID"
            focusBorderColor="teal"
            borderWidth="3px"
          />
        </FormControl>
        <Button colorScheme="teal" onClick={handleSearch}>
          View details
        </Button>

        {error && <Text color="red">{error}</Text>}
        {orderStatus && (
          <Modal
            isOpen={isOpen}
            onClose={() => {
              onClose();
              setIsModalClosed(true);
            }}
            motionPreset="slideInBottom"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Your Package Information</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {orderStatus && (
                  <Fade in>
                    <Box>
                      <Text as="h3" mb={2}>
                        Status:
                      </Text>
                      <Text
                        color={
                          orderStatus.status === "In Transit"
                            ? "orange"
                            : orderStatus.status === "Delayed"
                            ? "red"
                            : orderStatus.status === "Delivered"
                            ? "green"
                            : "black"
                        }
                      >
                        {orderStatus.status}
                      </Text>

                      <Heading as="h3" size="md" mt={4} mb={2}>
                        Detailed Information
                      </Heading>

                      <Table variant="simple">
                        <Tbody>
                          <Tr>
                            <Td>Order ID</Td>
                            <Td>{JSON.parse(orderStatus).orderId}</Td>
                          </Tr>
                          <Tr>
                            <Td>Sender Transaction Point</Td>
                            <Td>
                              {
                                JSON.parse(orderStatus).senderTransactionPoint
                                  .name
                              }
                            </Td>
                          </Tr>
                          <Tr>
                            <Td>Recipient Transaction Point</Td>
                            <Td>
                              {
                                JSON.parse(orderStatus)
                                  .recipientTransactionPoint.name
                              }
                            </Td>
                          </Tr>

                          <Tr>
                            <Td>Order Status</Td>
                            <Td>{JSON.parse(orderStatus).status}</Td>
                          </Tr>
                          {/* Add more fields as needed */}
                        </Tbody>
                      </Table>
                      <Button
                        colorScheme="teal"
                        onClick={() => {
                          onClose();
                          setIsModalClosed(true);
                        }}
                        position="relative"
                        bottom="-1"
                        left="50%"
                        transform="translateX(-50%)"
                      >
                        Track in map
                      </Button>
                    </Box>
                  </Fade>
                )}
              </ModalBody>
            </ModalContent>
          </Modal>
        )}

        {isModalClosed && orderStatus && (
          <VStack
            position="fixed"
            bottom="14"
            right="4"
            p="10"
            bg="white"
            boxShadow="md"
            borderRadius="md"
            border="4px solid teal"
          >
            {orderStatus && (
              <Fade in>
                <Box>
                  <Text as="h3" mb={2}>
                    Status:
                  </Text>
                  <Text
                    color={
                      orderStatus.status === "In Transit"
                        ? "orange"
                        : orderStatus.status === "Delayed"
                        ? "red"
                        : orderStatus.status === "Delivered"
                        ? "green"
                        : "black" // Default color if the status doesn't match any condition
                    }
                  >
                    {orderStatus.status}
                  </Text>

                  <Heading as="h3" size="md" mt={4} mb={2}>
                    Detailed Information
                  </Heading>

                  <Table variant="simple">
                    <Tbody>
                      <Tr>
                        <Td>Order ID</Td>
                        <Td>{JSON.parse(orderStatus).orderId}</Td>
                      </Tr>
                      <Tr>
                        <Td>Sender Transaction Point</Td>
                        <Td>
                          {JSON.parse(orderStatus).senderTransactionPoint.name}
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>Recipient Transaction Point</Td>
                        <Td>
                          {
                            JSON.parse(orderStatus).recipientTransactionPoint
                              .name
                          }
                        </Td>
                      </Tr>

                      <Tr>
                        <Td>Order Status</Td>
                        <Td>{JSON.parse(orderStatus).status}</Td>
                      </Tr>
                      {/* Add more fields as needed */}
                    </Tbody>
                  </Table>
                  <IconButton
                    icon={<ChevronRightIcon />}
                    aria-label={isChatOpen ? "Close Chat" : "Open Chat"}
                    onClick={() => setIsChatOpen(!isChatOpen)}
                  />
                </Box>
              </Fade>
            )}
          </VStack>
        )}
      </Box>

      {/* Chat Area Drawer */}
      <Drawer
        isOpen={isChatOpen}
        placement="right"
        onClose={() => setIsChatOpen(false)}
        size="lg" // Set the initial size of the drawer
      >
        <DrawerOverlay />
        <DrawerContent
          width={isChatOpen ? "500px" : "auto"}
          transition="width 0.3s"
        >
          <DrawerCloseButton />
          <DrawerHeader>
            MagicPost Chatbot
            <IconButton
              icon={<ChevronRightIcon />}
              aria-label="Close chat area"
              onClick={() => setIsChatOpen(false)}
              ml={2}
            />
          </DrawerHeader>
          <DrawerBody>
            <ChatArea />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <LeafletMap
        customerAddress={customerAddress}
        orderStatus={JSON.parse(orderStatus)}
      />
    </>
  );
};

export default UserTracking;
