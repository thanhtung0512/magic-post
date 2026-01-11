import React, { useState, useEffect } from "react";
import { useTable, useSortBy } from "react-table";
import { Box, Select, Tooltip, Button } from "@chakra-ui/react";
import AuthService from "../../../services/auth.service";
const ConfirmOngoingOrderTable = () => {
  const [data, setData] = useState([]);
  const [editableStatusRow, setEditableStatusRow] = useState(null);
  const status = "Need_forward";
  const currentUser = AuthService.getCurrentUser();
  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/delivery-orders/get-by-status/Waiting Sender Gathering Point Accept/" +
            currentUser.id,
          {
            method: "GET",
            credentials: "include",
            headers: { "Access-Control-Allow-Origin": "*" },
            // other options...
          }
        );
        const jsonData = await response.json();

        const response2 = await fetch(
          "http://localhost:3000/api/delivery-orders/get-by-status/Waiting Recipient Gathering Point Accept/" +
            currentUser.id,
          {
            method: "GET",
            credentials: "include",
            headers: { "Access-Control-Allow-Origin": "*" },
            // other options...
          }
        );
        const jsonData2 = await response2.json();
        const concatenatedData = jsonData.concat(jsonData2);
        setData(concatenatedData);
        console.log("Data from API:", jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const columns = React.useMemo(
    () => [
      { Header: "Order ID", accessor: "orderId" },
      {
        Header: "Sender Transaction Point",
        accessor: "senderTransactionPoint.name",
      },
      {
        Header: "Sender Gathering Point",
        accessor: "senderGatheringPoint.name",
      },
      //   {
      //     Header: "Recipient Transaction Point",
      //     accessor: "recipientTransactionPoint.name",
      //   },
      //   { Header: "Goods Description", accessor: "goods.description" },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row, value }) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            {editableStatusRow === row.id ? (
              <>
                <Select
                  size="sm"
                  value={value}
                  onChange={(e) => handleStatusChange(row, e.target.value)}
                  variant="outline"
                >
                  {/* <option value="Delivered">Delivered</option>
                  <option value="Processing">Processing</option>
                  <option value="Pending">Pending</option>
                  <option value="Cancelled">Cancelled</option> */}
                  {/* <option value="Need_forward">Need Forward</option> */}
                  {/* <option value="Forwarded Gathering Point">
                    Forwarded Gathering Point
                  </option> */}

                  <option value="Sender Gathering Accepted">
                    Sender Gathering Accepted
                  </option>

                  <option value="Sender Gathering Declined">
                    {" "}
                    Sender Gathering Declined
                  </option>

                  <option value="Recipient Gathering Accepted">
                    {" "}
                    Recipient Gathering Accepted
                  </option>

                  <option value="Recipient Gathering Declined">
                    {" "}
                    Recipient Gathering Declined
                  </option>
                </Select>
                <Button
                  size="sm"
                  colorScheme="teal"
                  ml={2}
                  onClick={() => handleApply(row)}
                >
                  Apply
                </Button>
              </>
            ) : (
              <Tooltip label="Click to edit" hasArrow>
                <Box
                  as="span"
                  color={getStatusColor(value)}
                  onClick={() => setEditableStatusRow(row.id)}
                >
                  {value}
                </Box>
              </Tooltip>
            )}
          </div>
        ),
      },
      { Header: "Sender Address", accessor: "senderAddress" },
      { Header: "Recipient Address", accessor: "recipientAddress" },
      { Header: "Date", accessor: "date" },
      //   { Header: "Vendor", accessor: "vendor" },
      {
        Header: "Price",
        accessor: "price",
        Cell: ({ value }) => formatPrice(value),
      },
    ],
    [editableStatusRow]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  const handleStatusChange = (row, newStatus) => {
    const newData = data.map((d) =>
      d.orderId === row.original.orderId ? { ...d, status: newStatus } : d
    );
    setData(newData);
  };

  const handleApply = async (row) => {
    try {
      // Send a request to update the status in the database
      const response = await fetch(
        `http://localhost:3000/api/delivery-orders/${row.original.orderId}/status`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({ status: row.values.status }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      // Reset the editable status row
      setEditableStatusRow(null);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "green";
      case "Processing":
        return "blue";
      case "Pending":
        return "orange";
      case "Cancelled":
        return "red";
      case "Need_forward":
        return "gray";
      default:
        return "black";
    }
  };

  return (
    <Box
      borderRadius="lg"
      boxShadow="2xl"
      overflow="hidden"
      borderColor="teal"
      borderWidth="1px"
      p={4}
    >
      <table
        {...getTableProps()}
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{
                    borderBottom: "2px solid #ddd",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  {column.render("Header")}
                  <span style={{ marginLeft: "5px" }}>
                    {column.isSorted ? (column.isSortedDesc ? " " : " ") : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    style={{ border: "1px solid #ddd", padding: "8px" }}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Box>
  );
};

export default ConfirmOngoingOrderTable;
