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
  Spinner, // Import Spinner for loading
  Alert, // Import Alert for success message
  AlertIcon,
} from "@chakra-ui/react";

const GrantPointLeaderAccount = () => {
  const [newPointLeader, setNewPointLeader] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    point: null,
  });
  const [editPointLeader, setEditPointLeader] = useState(null);
  const [pointLeaders, setPointLeaders] = useState([]);
  const [transactionPoints, setTransactionPoints] = useState([]);
  const [gatheringPoints, setGatheringPoints] = useState([]);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const [successMessage, setSuccessMessage] = useState(null); // Success message state

  const fetchTransactionPointsWithoutLeader = () => {
    fetch("http://localhost:8080/api/transaction-points/without-leader")
      .then((response) => response.json())
      .then((data) => setTransactionPoints(data));
  };

  const fetchGatheringPointsWithoutLeader = () => {
    fetch("http://localhost:8080/api/gathering-points/without-leader")
      .then((response) => response.json())
      .then((data) => setGatheringPoints(data));
  };

  const fetchAll = () => {
    fetchPointLeaders();
    fetchTransactionPointsWithoutLeader();
    fetchGatheringPointsWithoutLeader();
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchPointLeaders = () => {
    fetch("http://localhost:8080/api/point-leaders")
      .then((response) => response.json())
      .then((data) => setPointLeaders(data))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPointLeader((prevPointLeader) => ({
      ...prevPointLeader,
      [name]: value,
    }));
  };

  const handleSelectPoint = (e) => {
    const selectedValue = e.target.value;
    setSelectedPoint(selectedValue !== "" ? parseInt(selectedValue) : null);
  };

  const handleGrantAccount = () => {
    if (
      !newPointLeader.name ||
      !newPointLeader.username ||
      !newPointLeader.email ||
      !newPointLeader.password ||
      !newPointLeader.phoneNumber ||
      !selectedPoint
    ) {
      return;
    }

    setLoading(true);

    if (editPointLeader) {
      fetch("http://localhost:8080/api/users/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newName: newPointLeader.name,
          leaderID: editPointLeader.pointLeaderId,
          currentUsername: editPointLeader.user.username,
          newUsername: newPointLeader.username,
          newPassword: newPointLeader.password,
          newEmail: newPointLeader.email,
          phoneNumber: newPointLeader.phoneNumber,
          pointID: selectedPoint,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to update user");
          }
          setSuccessMessage("Updated successfully");
          setNewPointLeader({
            name: "",
            username: "",
            password: "",
            phoneNumber: "",
            email: "",
            point: null,
          });
          setEditPointLeader(null);
          setSelectedPoint(null);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 1000);
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        })
        .finally(() => setLoading(false));
    } else {
      fetch("http://localhost:8080/api/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newName: newPointLeader.name,
          newUsername: newPointLeader.username,
          newPassword: newPointLeader.password,
          newEmail: newPointLeader.email,
          phoneNumber: newPointLeader.phoneNumber,
          pointID: selectedPoint,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to create Point leader");
          }
          setSuccessMessage("Created account point leader successfully");
          setNewPointLeader({
            name: "",
            username: "",
            password: "",
            phoneNumber: "",
            email: "",
            point: null,
          });
          setEditPointLeader(null);
          setSelectedPoint(null);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 1000);
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        })
        .finally(() => setLoading(false));
      setPointLeaders((prevPointLeaders) => [
        ...prevPointLeaders,
        {
          ...newPointLeader,
          id: prevPointLeaders.length + 1,
          point: selectedPoint,
        },
      ]);

      setNewPointLeader({
        name: "",
        username: "",
        password: "",
        phoneNumber: "",
        email: "",
        point: null,
      });
      setSelectedPoint(null);

      setLoading(false);
      setSuccessMessage("Account granted successfully");

      setTimeout(() => setSuccessMessage(null), 3000); // Reset success message after 3 seconds
    }
    fetchAll();
  };

  const handleEditAccount = (pointLeader) => {
    setEditPointLeader(pointLeader);
    setNewPointLeader({
      name: pointLeader.name,
      username: pointLeader.user.username,
      password: pointLeader.user.password,
      phoneNumber: pointLeader.phoneNumber,
      email: pointLeader.user.email,
    });
    setSelectedPoint(
      pointLeader.transactionPoint
        ? pointLeader.transactionPoint.transactionPointId
        : pointLeader.gatheringPoint.gatheringPointId + transactionPoints.length
    );
  };

  return (
    <Box p={4} overflowY="scroll" maxH="80vh">
      <Heading as="h2" size="xl" mb={4}>
        Manage Point Leader Account: {selectedPoint}
      </Heading>

      <FormControl mb={4}>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          name="name"
          value={newPointLeader.name}
          onChange={handleInputChange}
          placeholder="Enter Point Leader's Name"
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Username</FormLabel>
        <Input
          type="text"
          name="username"
          value={newPointLeader.username}
          onChange={handleInputChange}
          placeholder="Enter Username"
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          name="email"
          value={newPointLeader.email}
          onChange={handleInputChange}
          placeholder="Enter Email"
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          name="password"
          value={newPointLeader.password}
          onChange={handleInputChange}
          placeholder="Enter Password"
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Phone Number</FormLabel>
        <Input
          type="tel"
          name="phoneNumber"
          value={newPointLeader.phoneNumber}
          onChange={handleInputChange}
          placeholder="Enter Phone Number"
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Point Manage</FormLabel>
        <Select
          value={selectedPoint !== null ? selectedPoint.toString() : ""}
          onChange={handleSelectPoint}
        >
          <option value="" disabled>
            Select a point
          </option>
          {transactionPoints.map((point) => (
            <option
              key={`transaction_${point.transactionPointId}`}
              value={point.transactionPointId}
            >
              {point.name}
            </option>
          ))}
          {gatheringPoints.map((point) => (
            <option
              key={`gathering_${point.gatheringPointId}`}
              value={point.gatheringPointId + transactionPoints.length}
            >
              {point.name}
            </option>
          ))}
        </Select>
      </FormControl>

      <Button colorScheme="teal" onClick={handleGrantAccount}>
        {editPointLeader ? "Update Account" : "Grant Account"}
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
          Point Leader Accounts
        </Heading>
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Username</Th>
              <Th>Phone Number</Th>
              <Th>Point</Th>
              <Th>Email</Th>
              <Th>Edit</Th>
            </Tr>
          </Thead>
          <Tbody>
            {pointLeaders.map((pointLeader) => (
              <Tr key={pointLeader.pointLeaderId}>
                <Td>{pointLeader.pointLeaderId}</Td>
                <Td>{pointLeader.name}</Td>
                <Td>{pointLeader.user ? pointLeader.user.username : ""}</Td>
                <Td>{pointLeader.phoneNumber}</Td>
                <Td>
                  {pointLeader.transactionPoint
                    ? pointLeader.transactionPoint.name
                    : pointLeader.gatheringPoint
                    ? pointLeader.gatheringPoint.name
                    : ""}
                </Td>
                <Td>{pointLeader.user ? pointLeader.user.email : ""}</Td>
                <Td>
                  <Button
                    colorScheme="teal"
                    size="sm"
                    onClick={() => handleEditAccount(pointLeader)}
                  >
                    Edit
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default GrantPointLeaderAccount;
