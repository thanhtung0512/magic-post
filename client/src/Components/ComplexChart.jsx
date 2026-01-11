import React from "react";
import { Box, Text } from "@chakra-ui/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ComplexChart = ({ data }) => {
  return (
    <Box>
      <Text fontSize="xl" mb={4}>
        Package Status
      </Text>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} >
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="completed"
            stroke="#3182CE"
            name="Completed"
            strokeWidth={4}
            
          />
          
          <Line
            type="monotone"
            dataKey="failed"
            stroke="green"
            name="Failed"
            strokeWidth={4}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ComplexChart;
