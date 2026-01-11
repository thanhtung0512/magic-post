import React, { useState, useEffect } from "react";
import { Box, Flex, Text, useBreakpointValue } from "@chakra-ui/react";
import ComplexChart from "./ComplexChart";
import BeautifulChart from "./BeautifulChart";
import CompanyLeaderDashboard from "./RoleContent/CompanyLeader/CompanyLeaderDashboard";
import CompanyLeaderManagePoints from "./RoleContent/CompanyLeader/CompanyLeaderManagePoints";
import ManagePointsPage from "./ManagePointsPage";
import MapWithMarkers from "./MapWithMarkers";
import GrantTellerAccount from "./RoleContent/PointLeaderTransaction/GrantTellerAccount";
import TransactionStatistic from "./RoleContent/PointLeaderTransaction/TransactionStatistic";
import UserTracking from "./RoleContent/User/UserTracking";
// import Profile from "./Profile";
import { Profile } from "../Components";
import LeafletMap from "./LeafletMap";
import DashboardPage from "./DashboardPage";
import AuthService from "../services/auth.service";
import DeliveryOrderTable from "./DeliveryOrderTable";
import GrantPointLeaderAccount from "./RoleContent/CompanyLeader/GrantPointLeaderAccount";
import TellerOrderForm from "./RoleContent/Teller/TellerOrderForm";
import ForwardOrderTable from "./RoleContent/Teller/ForwardOrderTable";
import ConfirmOngoingOrderTable from "./RoleContent/Staff/ConfirmOngoingOrderTable";
import RequestSenderGatheringToRecipientGathering from "./RoleContent/Staff/RequestSenderGatheringToRecipientGathering";
import HandleFailOrder from "./RoleContent/Teller/HandleFailOrder";
import MakeShipping from "./RoleContent/Teller/MakeShipping";
import SuccessOrders from "./RoleContent/Teller/SuccessOrders";
import InOutOrderTransaction from "./RoleContent/PointLeaderTransaction/InOutOrderTransaction";

const ContentPage = ({ title, isSideBarOpening }) => {
  const [ordersByStatusData, setOrdersByStatusData] = useState([]);
  const fontSize = useBreakpointValue({ base: "md", md: "xl" });
  const deliveryOrderDataWithPendingCancelled = [
    { month: "Jan", completed: 10, pending: 5, cancelled: 2 },
    { month: "Feb", completed: 15, pending: 3, cancelled: 1 },
    { month: "Mar", completed: 8, pending: 2, cancelled: 0 },
    { month: "Apr", completed: 22, pending: 1, cancelled: 0 },
    { month: "May", completed: 30, pending: 19, cancelled: 7 },
    { month: "Jun", completed: 27, pending: 5, cancelled: 12 },
    // ... more data
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
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
  const customColors = ["#3182CE", "#E53E3E", "#48BB78"];
  const renderContent = () => {
    const currentUser = AuthService.getCurrentUser();
    const currentRole = currentUser.roles[0];

    switch (title) {
      case "/dashboard":
        return <DashboardPage />;
      case "/manage-points":
        return <ManagePointsPage />;
      case "/manage-account-managers":
        return (
          <>
            {" "}
            <GrantPointLeaderAccount />{" "}
          </>
        );
      case "/view-statistics":
        return (
          <Box>
            <Text fontSize={fontSize}>Chart</Text>

            {/* <ComplexChart data={deliveryOrderDataWithPendingCancelled} />
            <BeautifulChart
              data={deliveryOrderDataWithPendingCancelled}
              colors={customColors}
            /> */}
            <DeliveryOrderTable />
          </Box>
        );
      case "/grant-teller-accounts":
        return (
          <>
            <GrantTellerAccount />
          </>
        );
      case "/transaction-point-statistics":
        return (
          <>
            <ComplexChart data={ordersByStatusData} />
            <BeautifulChart data={ordersByStatusData} colors={customColors} />
          </>
        );
      case "/in-out-orders":
        return (
          <>
            <InOutOrderTransaction />
          </>
        );
        return <></>;
      case "/lookup-status":
        return (
          <>
            <UserTracking />
            {/* <LeafletMap /> */}
          </>
        );

      case "/profile":
        return (
          <>
            <Profile />
          </>
        );
      case "/record-goods":
        return (
          <>
            <TellerOrderForm />
          </>
        );
      case "/create-delivery-orders":
        return (
          <>
            <ForwardOrderTable />
          </>
        );
      case "/confirmation-from-transaction-point":
        return (
          <>
            <ConfirmOngoingOrderTable />
          </>
        );
      case "/create-delivery-orders-destination":
        return (
          <>
            <RequestSenderGatheringToRecipientGathering />
          </>
        );
      case "/failed-delivery-handling":
        return (
          <>
            <HandleFailOrder />
          </>
        );

      case "/make-shipping":
        return (
          <>
            <MakeShipping />
          </>
        );
      case "/success-handling":
        return (
          <>
            <SuccessOrders />
          </>
        );
      // Add more cases as needed
      default:
        return (
          <>
            {/* <Text>MagicPost</Text> */}
            {currentRole === "ROLE_BOSS" ? (
              <DashboardPage />
            ) : currentRole == "ROLE_CUSTOMER" ? (
              <>
                <UserTracking />
                {/* <LeafletMap /> */}
              </>
            ) : (
              <></>
            )}
          </>
        );
    }
  };

  return (
    <Flex className="container">
      <Box
        flex="1"
        p={4}
        borderLeft={{ base: "none", md: "1px solid #E2E8F0" }}
        position="relative"
        left={isSideBarOpening ? 270 : 0}
        maxWidth={isSideBarOpening ? "85%" : "100%"}
        transition="left 0.3s ease-in-out"
      >
        {/* <Text fontSize={fontSize} fontWeight="bold" mb={4}>
          {title} - SideBar Open: {isSideBarOpening === true ? "Yes" : "No"}
        </Text> */}

        {renderContent()}
      </Box>
      {/* <Flex width='100%' className="ContentPagetest">{renderContent()}</Flex> */}
    </Flex>
  );
};

export default ContentPage;
