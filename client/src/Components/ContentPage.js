import React from "react";
import { Box, Text, useBreakpointValue } from "@chakra-ui/react";
import ComplexChart from "./ComplexChart";
import BeautifulChart from "./BeautifulChart";
import CompanyLeaderDashboard from "./RoleContent/CompanyLeader/CompanyLeaderDashboard";
import CompanyLeaderManagePoints from "./RoleContent/CompanyLeader/CompanyLeaderManagePoints";
import ManagePointsPage from "./ManagePointsPage";
import MapWithMarkers from "./MapWithMarkers";
import GrantTellerAccount from "./RoleContent/PointLeaderTransaction/GrantTellerAccount";
import TransactionStatistic from "./RoleContent/PointLeaderTransaction/TransactionStatistic";
import UserTracking from "./RoleContent/User/UserTracking";

const ContentPage = ({ title }) => {
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

  const customColors = ["#3182CE", "#E53E3E", "#48BB78"];
  const renderContent = () => {
    switch (title) {
      case "/dashboard":
        return <CompanyLeaderDashboard />;
      case "/manage-points":
        return <ManagePointsPage />;
      case "/manage-account-managers":
        return <>  </>;
      case "/view-statistics":
        return (
          <Box>
            <Text fontSize={fontSize}>Chart</Text>

            <ComplexChart data={deliveryOrderDataWithPendingCancelled} />
            <BeautifulChart
              data={deliveryOrderDataWithPendingCancelled}
              colors={customColors}
            />
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
            <ComplexChart data={deliveryOrderDataWithPendingCancelled} />
            <BeautifulChart
              data={deliveryOrderDataWithPendingCancelled}
              colors={customColors}
            />
          </>
        );
      case "/lookup-status":
        return (
          <>
            <UserTracking />
          </>
        );

      // Add more cases as needed
      default:
        return <Text>MagicPost</Text>;
    }
  };

  return (
    <Box
      flex="1"
      p={4}
      ml={{ base: 0, md: "270px" }} // Adjust margin-left for the sidebar width
      borderLeft={{ base: "none", md: "1px solid #E2E8F0" }}
    >
      <Text fontSize={fontSize} fontWeight="bold" mb={4}>
        {title}
      </Text>
      {renderContent()}
    </Box>
  );
};

export default ContentPage;
