import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import AuthService from "../../../services/auth.service";
const GrantTellerAccount = () => {
  const currentUser = AuthService.getCurrentUser();
  const currentUserId = currentUser.id;
  const [newTeller, setNewTeller] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    transactionPointId: null,
  });
  const [editTeller, setEditTeller] = useState(null);
  const [tellers, setTellers] = useState([]);
  const [transactionPoints, setTransactionPoints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const fetchTransactionPointsWithoutTeller = () => {
    fetch("http://localhost:8080/api/transaction-points")
      .then((response) => response.json())
      .then((data) => setTransactionPoints(data));
  };

  const fetchAll = () => {
    fetchTellers();
    fetchTransactionPointsWithoutTeller();
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchTellers = () => {
    const apiUrl = currentUserId === 1
      ? "http://localhost:8080/api/staff"
      : "http://localhost:8080/api/teller";
  
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setTellers(data))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTeller((prevTeller) => ({
      ...prevTeller,
      [name]: value,
    }));
  };

  const handleSelectTransactionPoint = (e) => {
    const selectedValue = e.target.value;
    setNewTeller((prevTeller) => ({
      ...prevTeller,
      transactionPointId: selectedValue !== "" ? parseInt(selectedValue) : null,
    }));
  };

  const handleGrantAccount = () => {
    if (
      !newTeller.name ||
      !newTeller.username ||
      !newTeller.email ||
      !newTeller.password ||
      !newTeller.phoneNumber ||
      !newTeller.transactionPointId
    ) {
      return;
    }

    setLoading(true);

    if (editTeller) {
      fetch("http://localhost:8080/api/teller/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newName: newTeller.name,
          tellerID: editTeller.tellerId,
          currentUsername: editTeller.user.username,
          username: newTeller.username,
          password: newTeller.password,
          email: newTeller.email,
          phoneNumber: newTeller.phoneNumber,
          transactionPointID: newTeller.transactionPointId,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to update teller");
          }
          setSuccessMessage("Updated successfully");
          setNewTeller({
            name: "",
            username: "",
            password: "",
            phoneNumber: "",
            email: "",
            transactionPointId: null,
          });
          setEditTeller(null);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 1000);
        })
        .catch((error) => {
          console.error("Error updating teller:", error);
        })
        .finally(() => setLoading(false));
    } else {
      fetch("http://localhost:8080/api/teller/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newTeller.name,
          username: newTeller.username,
          password: newTeller.password,
          email: newTeller.email,
          phoneNumber: newTeller.phoneNumber,
          transactionPointID: newTeller.transactionPointId,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to create teller");
          }
          fetchAll();
          setSuccessMessage("Created teller account successfully");
          setNewTeller({
            name: "",
            username: "",
            password: "",
            phoneNumber: "",
            email: "",
            transactionPointId: null,
          });
          setEditTeller(null);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 1000);
        })
        .catch((error) => {
          console.error("Error creating teller:", error);
        })
        .finally(() => setLoading(false));

      setTellers((prevTellers) => [
        ...prevTellers,
        {
          ...newTeller,
          id: prevTellers.length + 1,
        },
      ]);

      setNewTeller({
        name: "",
        username: "",
        password: "",
        phoneNumber: "",
        email: "",
        transactionPointId: null,
      });
      setLoading(false);
      setSuccessMessage("Account granted successfully");

      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  const handleEditAccount = (teller) => {
    setEditTeller(teller);
    setNewTeller({
      name: teller.name,
      username: teller.user.username,
      password: teller.user.password,
      phoneNumber: teller.phoneNumber,
      email: teller.user.email,
      transactionPointId: teller.transactionPoint
        ? teller.transactionPoint.transactionPointId
        : null,
    });
  };

  return (
    <Box p={4} overflowY="scroll" maxH="80vh">
      <Heading as="h2" size="xl" mb={4}>
      {currentUserId === 1
        ? `Manage Staff Account`
        : `Manage Teller Account`}
    </Heading>

      <FormControl mb={4}>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          name="name"
          value={newTeller.name}
          onChange={handleInputChange}
          placeholder="Enter Teller's Name"
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Username</FormLabel>
        <Input
          type="text"
          name="username"
          value={newTeller.username}
          onChange={handleInputChange}
          placeholder="Enter Username"
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          name="email"
          value={newTeller.email}
          onChange={handleInputChange}
          placeholder="Enter Email"
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          name="password"
          value={newTeller.password}
          onChange={handleInputChange}
          placeholder="Enter Password"
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Phone Number</FormLabel>
        <Input
          type="tel"
          name="phoneNumber"
          value={newTeller.phoneNumber}
          onChange={handleInputChange}
          placeholder="Enter Phone Number"
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Transaction Point</FormLabel>
        <Select
          value={
            newTeller.transactionPointId !== null
              ? newTeller.transactionPointId.toString()
              : ""
          }
          onChange={handleSelectTransactionPoint}
        >
          <option value="" disabled>
            Select a transaction point
          </option>
          {transactionPoints.map((point) => (
            <option
              key={`transaction_${point.transactionPointId}`}
              value={point.transactionPointId}
            >
              {point.name}
            </option>
          ))}
        </Select>
      </FormControl>

      <Button colorScheme="teal" onClick={handleGrantAccount}>
        {editTeller ? "Update Account" : "Grant Account"}
      </Button>
      {loading && <Spinner ml="10px" size="md" color="teal" />}

      {/* Display success message if exists */}
      {successMessage && (
        <Alert status="success" mb={4}>
          <AlertIcon />
          {successMessage}
        </Alert>
      )}
      <Box mt={8}>
        <Heading as="h3" size="lg" mb={4}>
        {currentUserId === 1
        ? `Staff Accounts`
        : `Teller Accounts`}
       
        </Heading>
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Username</Th>
              <Th>Phone Number</Th>
              <Th>Transaction Point</Th>
              <Th>Email</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tellers.map((teller) => (
              <Tr key={teller.tellerId}>
                <Td>{teller.tellerId ? teller.tellerId : teller.staffId }</Td>
                <Td>{teller.name}</Td>
                <Td>{teller.user ? teller.user.username : ""}</Td>
                <Td>{teller.phoneNumber}</Td>
                <Td>
                  {teller.transactionPoint ? teller.transactionPoint.name : teller.gatheringPoint.name}
                </Td>
                <Td>{teller.user ? teller.user.email : ""}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default GrantTellerAccount;
