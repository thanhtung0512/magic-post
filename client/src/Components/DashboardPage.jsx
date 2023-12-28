import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatArrow,
  StatHelpText,
} from "@chakra-ui/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import StatusCircleChart from "./StatusCircleChart";
import TransactionPlaceTable from "./TransactionPlaceTable";
import ComplexChart from "./ComplexChart";
import CustomStat from "./CustomStat";

const mockMonthlyOrdersData = [
  { month: "Jan", orders: 120 },
  { month: "Feb", orders: 150 },
  { month: "Mar", orders: 80 },
  { month: "Apr", orders: 200 },
  { month: "May", orders: 180 },
  { month: "Jun", orders: 250 },
  { month: "Jul", orders: 300 },
  { month: "Aug", orders: 280 },
  { month: "Sep", orders: 220 },
  { month: "Oct", orders: 190 },
  { month: "Nov", orders: 210 },
  { month: "Dec", orders: 180 },
];
const deliveryOrderDataWithPendingCancelled = [
  { month: "Jan", completed: 10, pending: 5, cancelled: 2 },
  { month: "Feb", completed: 15, pending: 3, cancelled: 1 },
  { month: "Mar", completed: 8, pending: 2, cancelled: 0 },
  { month: "Apr", completed: 22, pending: 1, cancelled: 0 },
  { month: "May", completed: 30, pending: 19, cancelled: 7 },
  { month: "Jun", completed: 7, pending: 1, cancelled: 0 },
  { month: "Jul", completed: 21, pending: 2, cancelled: 1 },
  { month: "Aug", completed: 12, pending: 7, cancelled: 1 },
  { month: "Sep", completed: 9, pending: 3, cancelled: 3 },
  { month: "Oct", completed: 4, pending: 2, cancelled: 6 },
  { month: "Nov", completed: 18, pending: 0, cancelled: 10 },
  { month: "Dec", completed: 20, pending: 1, cancelled: 12 },
  // ... more data
];
const generateRandomPercentageChange = () => {
  const randomValue = (Math.random() - 0.5) * 10; // Generate a random value between -5 and 5
  return randomValue;
};

const DashboardPage = () => {

  const [data, setData] = useState([]);
  

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/delivery-orders",
          {
            method: "GET",
            credentials: "include",
            headers: { "Access-Control-Allow-Origin": "*" },
            // other options...
          }
        );
        const jsonData = await response.json();
        setData(jsonData);
        console.log("Data from API:", jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

 

  return (
    <Box width='100%' paddingTop={2} >
      <Flex justify="space-between" mb={9}>
        
        <CustomStat
          label="Total Orders"
          value="128"
          imageLink="/assests/images/totalOrder.png"
        />

        <CustomStat
          label="Total Delivered"
          value="112"
          imageLink="/assests/images/totalDelivered.png"
        />
        <CustomStat
          label="Total Orders"
          value="128"
          imageLink="/assests/images/totalOrder.png"
        />
        <CustomStat
          label="Total Delivered"
          value="112"
          imageLink="/assests/images/totalDelivered.png"
        />

        <CustomStat
         
          label="Total Cancelled"
         
          value="10"
         
          imageLink="/assests/images/totalCancel.png"
       
        />

        <CustomStat
         
          label="Total Revenue"
         
          value="$4,233"
         
          imageLink="/assests/images/totalRevenue.png"
        
        />
      </Flex>

      <Heading as="h2" size="lg" mb={4} color="black">
        Monthly Orders
      </Heading>

      <Flex justify="space-between" mb={9}>
        <ResponsiveContainer
          width="70%"
          height={350}
          style={{
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderWidth: "2px",
            borderColor: "#E2E8F0",
            borderStyle: "solid",
            borderRadius: "8px",
            marginRight: "0px",
            // Optional: Add border radius for rounded corners
          }}
        >
          {/* <BarChart data={mockMonthlyOrdersData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="orders" fill="#3182CE" />
          </BarChart> */}

          <ComplexChart data={deliveryOrderDataWithPendingCancelled} />
        </ResponsiveContainer>

        <ResponsiveContainer
          width="30%"
          height={350}
          style={{
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderWidth: "2px",
            borderColor: "#E2E8F0",
            borderStyle: "solid",
            borderRadius: "8px",
            marginRight: "0px",
            // Optional: Add border radius for rounded corners
          }}
        >
          <StatusCircleChart />
        </ResponsiveContainer>
      </Flex>

      <ResponsiveContainer
        width="100%"
        height={400}
        style={{
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderWidth: "2px",
          borderColor: "#E2E8F0",
          borderStyle: "solid",
          borderRadius: "8px",
          marginRight: "0px",
          marginLeft: "0px",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "center", // Center horizontally
          alignItems: "center", // Center vertically
          // Optional: Add border radius for rounded corners
        }}
      >
        <BarChart
          data={mockMonthlyOrdersData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          {/* Adjust the margin values based on your design */}
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="orders" fill="teal" barSize={60} />
        </BarChart>
      </ResponsiveContainer>

      <TransactionPlaceTable />
      {/* Add components for Card 6 (Circle Chart) and Card 7 (Table) */}
    </Box>
  );
};

export default DashboardPage;
