import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const StatusCircleChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/delivery-orders/count-by-status-on-each-month"
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const calculateSum = () => {
    const sumCompleted = data.reduce((acc, entry) => acc + entry.completed, 0);
    const sumFailed = data.reduce((acc, entry) => acc + entry.failed, 0);
    return { completed: sumCompleted, failed: sumFailed };
  };

  const { completed, failed } = calculateSum();

  const chartData = [
    { name: "Delivered", value: completed, color: "#36A2EB" },
    { name: "Failed", value: failed, color: "#7FC242" },
  ];

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = 25 + innerRadius + (outerRadius - innerRadius);
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={chartData}
        cx={170}
        cy={170}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
      >
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip />
      <Legend verticalAlign="middle" align="right" layout="vertical" />
    </PieChart>
  );
};

export default StatusCircleChart;
