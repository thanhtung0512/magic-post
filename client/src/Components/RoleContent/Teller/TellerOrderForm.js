import React, { useState, useRef } from "react";
import style from './Teller.module.css'
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Table,
  Tr,
  Th,
  Td,
  Textarea,
  Checkbox,
  VStack,
  HStack,
} from "@chakra-ui/react";
import QRCode from "qrcode.react";
import ReactToPdf from "react-to-pdf";
import AuthService from "../../../services/auth.service";
const TellerOrderForm = () => {
  const ref = useRef();
  const modalRef = useRef();
  const currentUser = AuthService.getCurrentUser();
  const [formData, setFormData] = useState({
    sendername: "",
    senderaddress: "",
    senderphonenumber: "",
    senderpostalcode: "",
    recipientname: "",
    recipientaddress: "",
    recipientphonenumber: "",
    recipientpostalcode: "",
    ordertype: "",
    mainfare: "",
    extrafare: "",
    sumfare: "",
    netweight: "",
    conversionweight: "",
  });

  const handlePrintPDF = () => {
    const printWindow = window.open("", "_blank");
    const modalContent = modalRef.current.innerHTML;

    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Print</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              margin: 20px;
            }
            b {
              font-weight: bold;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 1rem;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            .form-control {
              margin-bottom: 1rem;
            }
            .teal-button {
              background-color: #008080;
              color: #fff;
              padding: 10px 20px;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            }
            .qr-code {
              margin: 20px auto;
            }
          </style>
        </head>
        <body>${modalContent}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRecordClick = async () => {
    try {
      // Make a POST request to the API
      const response = await fetch(
        "http://localhost:8080/api/delivery-orders/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            senderName: formData.sendername,
            senderAddress: formData.senderaddress,
            senderPhoneNumber: formData.senderphonenumber,
            senderPostalCode: formData.senderpostalcode,
            recipientName: formData.recipientname,
            recipientAddress: formData.recipientaddress,
            recipientPhoneNumber: formData.recipientphonenumber,
            recipientPostalCode: formData.recipientpostalcode,
            orderType: formData.ordertype,
            mainFare: parseFloat(formData.mainfare) || 0,
            extraFare: parseFloat(formData.extrafare) || 0,
            netWeight: parseFloat(formData.netweight) || 0,
            conversionWeight: parseFloat(formData.conversionweight) || 0,
            userId: currentUser.id, // Replace with the actual userId
          }),
        }
      );

      if (response.ok) {
        console.log("Order recorded successfully");
        // Optionally, you can perform additional actions after a successful recording
      } else {
        console.error("Failed to record order");
        // Optionally, you can handle the error or show a notification to the user
      }
    } catch (error) {
      console.error("Error recording order", error);
      // Optionally, you can handle the error or show a notification to the user
    }

    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const generateFormControls = (labels, placeholder, type, onChange) => {
    return labels.map((label, index) => (
      <FormControl key={index}>
        <FormLabel fontWeight="bold">{label}</FormLabel>
        <Input
          type={type}
          placeholder={`${label} ${placeholder}`}
          mb={index < labels.length - 1 ? 2 : 4}
          onChange={(e) => onChange(label, e.target.value)}
        />
      </FormControl>
    ));
  };

  const getOrderValue = () => {
    const mainFare = parseFloat(formData.mainfare) || 0;
    const extraFare = parseFloat(formData.extrafare) || 0;
    const sumFare = mainFare + extraFare;

    return {
      content: "Tổng",
      amount: 0,
      value: sumFare,
      attachedDocs: "",
    };
  };

  const orderValue = getOrderValue();

  return (
    <Box p={4} rounded="md" position="relative">
      {generateFormControls(
        [
          "Sender Name",
          "Sender Address",
          "Sender phonenumber",
          "Sender portal code",
          "Recipient Name",
          "Recipient Address",
          "Recipient phonenumber",
          "Recipient portal code",
        ],
        "",
        "text",
        (label, value) =>
          setFormData({
            ...formData,
            [label.toLowerCase().replace(" ", "")]: value,
          })
      )}
      <FormControl>
        <FormLabel fontWeight="bold">Type Orders</FormLabel>
        <Select
          placeholder="Select type orders"
          mb={4}
          onChange={(e) =>
            setFormData({ ...formData, orderType: e.target.value })
          }
        >
          <option value="document">Document</option>
          <option value="goods">Goods</option>
        </Select>
      </FormControl>

      {generateFormControls(
        ["Main Fare", "Extra Fare", "Sum Fare","Net Weight", "Conversion Weight"],
        "",
        "text",
        (label, value) =>
          setFormData({
            ...formData,
            [label.toLowerCase().replace(" ", "")]: value,
          })
      )}
      <Button colorScheme="teal" onClick={handleRecordClick}>
        Ghi nhận
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        size="2xl"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* ... (Remaining modal content) */}
        <ModalOverlay />
        <ModalContent ref={modalRef}>
          <ModalBody>
            <Box mb={4} textAlign="center" className="qr-code">
              <b>MagicPost</b>
              <img src="https://i.ibb.co/Qngb3d2/qr-code.png" alt="QR Code" />
            </Box>
            {/* Part 1 */}
            <Box mb={4}>
              <b>Họ tên và địa chỉ người gửi</b>{" "}
              {`${formData.sendername}, ${formData.senderaddress}`}
            </Box>

            {/* Part 2 */}
            <Box mb={4}>
              <b>Họ tên và địa chỉ người nhận</b>{" "}
              {`${formData.recipientname}, ${formData.recipientaddress}`}
            </Box>

            {/* Part 3 */}
            <Box mb={4}>
              <b>Loại mặt hàng</b>{" "}
              {formData.ordertype === "document" ? "Document" : "Goods"}
            </Box>

            {/* Part 4 */}
            <Table mb={4} variant="simple">
              <Tr>
                <Th>Nội dung</Th>
                <Th>Số lượng</Th>
                <Th>Giá trị</Th>
                <Th>Tệp đính kèm</Th>
              </Tr>
              <Tr>
                <Td>{orderValue.content}</Td>
                <Td>{orderValue.amount}</Td>
                <Td>{orderValue.value}</Td>
                <Td>{orderValue.attachedDocs}</Td>
              </Tr>
            </Table>

            {/* Part 5 */}
            <FormControl mb={4}>
              <FormLabel fontWeight="bold">
                Dịch phụ đặc biệt/ Cộng thêm
              </FormLabel>
              {/* <Textarea placeholder="Extra service" /> */}
            </FormControl>

            {/* Part 6 */}
            <FormControl mb={4}>
              <FormLabel fontWeight="bold">
                Chỉ dẫn của người gửi nếu giao không thành công:
              </FormLabel>
              {/* <Textarea placeholder="Sender guide when not delivered successfully" /> */}
            </FormControl>

            {/* Part 7 */}
            <Box mb={4}>
              <b>Cam kết:</b> Tôi chấp nhận các điều khoản tại mặt sau phiếu gửi
              và cam đoan bưu gửi này không chứa những mặt hàng cấm gửi...
            </Box>

            {/* Part 8 */}
            <Box mb={4}>
              <b>Ngày gửi và chữ kí người gửi:</b> {new Date().toLocaleString()}{" "}
              {/* <Input placeholder="Sender Signature" /> */}
            </Box>

            {/* Part 9 */}
            <Box mb={4}>
              <b>Cước:</b> Cước chính: {formData.mainfare}, Cước phụ:{" "}
              {formData.extrafare}
            </Box>

            {/* Part 10 */}
            <Box mb={4}>
              <b>Khối lượng:</b> Khối lượng thực: {formData.netweight}, Khối
              lượng quy đổi: {formData.conversionweight}
            </Box>

            {/* Part 11 */}
            <Box mb={4}>
              <b>Thu thêm từ người nhận:</b> COD: 0, Thu thêm: 0, Tổng: 0
            </Box>

            {/* Part 12 */}
            <FormControl mb={4}>
              <FormLabel fontWeight="bold">Ghi chú nghiệp vụ:</FormLabel>
              {/* <Textarea placeholder="Business Note" /> */}
            </FormControl>

            {/* Part 13 */}
            <Box mb={4}>
              <b>Chữ kí của giao dịch viên:</b> {" "}
              <Input placeholder="" />
            </Box>

            {/* Part 14 */}
            <Box mb={4}>
              <b>Ngày giờ nhận:</b> ...8:00AM.../...28.../...12.../...2023...{" "}
            </Box>
            {/* button to render this modal to PDF */}
            <div className={style.printBtn}>
              <Button colorScheme="teal" onClick={handlePrintPDF}>
                In ra PDF
              </Button>
              <Button colorScheme="teal" onClick={handleModalClose}>
                Đóng
              </Button>
            </div>
          </ModalBody>
        </ModalContent>

        {/* ... (Remaining modal content) */}
      </Modal>
    </Box>
  );
};

export default TellerOrderForm;
