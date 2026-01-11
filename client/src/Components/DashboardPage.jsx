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
  { month: "Jan", completed: 10, failed: 2 },
  { month: "Feb", completed: 15, failed: 1 },
  { month: "Mar", completed: 8, failed: 0 },
  { month: "Apr", completed: 22, failed: 0 },
  { month: "May", completed: 30, failed: 7 },
  { month: "Jun", completed: 7, failed: 0 },
  { month: "Jul", completed: 21, failed: 1 },
  { month: "Aug", completed: 12, failed: 1 },
  { month: "Sep", completed: 9, failed: 3 },
  { month: "Oct", completed: 4, failed: 6 },
  { month: "Nov", completed: 18, failed: 10 },
  { month: "Dec", completed: 20, failed: 12 },
];
const generateRandomPercentageChange = () => {
  const randomValue = (Math.random() - 0.5) * 10; // Generate a random value between -5 and 5
  return randomValue;
};
const DashboardPage = () => {
  const [data, setData] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [deliveredOrders, setDeliveredOrders] = useState(0);
  const [failedOrders, setFailedOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState("$0"); // Initialize with "$0"
  const [monthlyOrdersData, setMonthlyOrdersData] = useState([]);
  const [ordersByStatusData, setOrdersByStatusData] = useState([]);
  const [allDeliveryOrdersData, setAllDeliveryOrdersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total number of all delivery orders
        const response1 = await fetch(
          "http://localhost:8080/api/delivery-orders/countAll"
        );
        const totalOrdersData = await response1.json();
        setTotalOrders(totalOrdersData);

        // Fetch number of delivered orders
        const response2 = await fetch(
          "http://localhost:8080/api/delivery-orders/count-by-status/Delivered Successfully"
        );
        const deliveredOrdersData = await response2.json();
        console.log(deliveredOrdersData);
        setDeliveredOrders(deliveredOrdersData);

        // Fetch number of failed orders
        const response3 = await fetch(
          "http://localhost:8080/api/delivery-orders/count-by-status/Failed, return to transaction point"
        );
        const failedOrdersData = await response3.json();
        setFailedOrders(failedOrdersData);

        // Fetch total revenue
        const response4 = await fetch(
          "http://localhost:8080/api/delivery-orders/sum-prices"
        );
        const totalRevenueData = await response4.json();
        setTotalRevenue(formatCurrency(totalRevenueData));

        // Fetch monthly orders data
        const response5 = await fetch(
          "http://localhost:8080/api/delivery-orders/count-by-months"
        );
        const monthlyOrdersData = await response5.json();
        setMonthlyOrdersData(monthlyOrdersData);

        // Fetch orders by status data
        const response6 = await fetch(
          "http://localhost:8080/api/delivery-orders/count-by-status-on-each-month"
        );
        const ordersByStatusData = await response6.json();
        setOrdersByStatusData(ordersByStatusData);

        // setData(allDeliveryOrdersData);
        // console.log("Data from API:", allDeliveryOrdersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const formatCurrency = (value) => {
    const formattedCurrency = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
    return formattedCurrency;
  };
  return (
    <Box width="100%" paddingTop={2}>
      <Flex justify="space-between" mb={9}>
        <CustomStat
          label="Total Orders"
          value={totalOrders}
          imageLink="/assests/images/totalOrder.png"
        />
        <CustomStat
          label="Total Delivered"
          value={deliveredOrders}
          imageLink="/assests/images/totalDelivered.png"
        />
        <CustomStat
          label="Total Failed"
          value={failedOrders}
          imageLink="/assests/images/totalCancel.png"
        />
        <CustomStat
          label="Total Revenue"
          value={totalRevenue}
          imageLink="/assests/images/totalRevenue.png"
        />
      </Flex>
      <Heading as="h2" size="lg" mb={4} color="black">
        Monthly Orders Test
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

          <ComplexChart data={ordersByStatusData} />
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
          data={monthlyOrdersData}
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

      {/* <TransactionPlaceTable /> */}
      {/* Add components for Card 6 (Circle Chart) and Card 7 (Table) */}
    </Box>
  );
};

export default DashboardPage;
