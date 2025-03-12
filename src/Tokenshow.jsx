import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Button,
} from "@mui/material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { QRCodeCanvas } from "qrcode.react"; // Correct import

function Tokenshow() {
  const location = useLocation();
  const data = location.state;
  const cardRef = useRef(); // Reference for the token card
console.log(data,"ddddddljhkjlhkjbefkjbhgt")
  if (!data) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" color="error">
          No Token Data Received!
        </Typography>
      </Box>
    );
  }

  // Convert data to a string for the QR code
  const qrData = JSON.stringify({
    name: data.name,
    from: data.fromLocation,
    to: data.toLocation,
    status: data.status,
    successid: data.successid,
    time: data.time,
  });

  // 📌 Function to Download Token as PDF
  const downloadToken = () => {
    const card = cardRef.current;
    html2canvas(card, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save("Token.pdf");
    });
  };

  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f5f5f5">
        <Card ref={cardRef} sx={{ width: 350, p: 2, textAlign: "center", boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" fontWeight="bold" color="primary">
              Token Details
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1">
              <strong>Name:</strong> {data.name}
            </Typography>
            <Typography variant="subtitle1">
              <strong>From: {data.fromLocation}  </strong>
            </Typography>
           
            <Typography variant="subtitle1">
              <strong>To: {data.toLocation}  </strong>
            </Typography>
           
            <Typography variant="subtitle1">
              <strong>Payment ID:</strong> {data.successid}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Time:</strong> {data.time}
            </Typography>

            {/* QR Code */}
            <Box display="flex" justifyContent="center" mt={2}>
  <QRCodeCanvas value={qrData} size={100} />
</Box>
          </CardContent>
        </Card>
      </Box>

      {/* Download Button */}
      <Box display={"flex"} justifyContent={"center"} width={"100%"}>
        <Button variant="contained" color="secondary" onClick={downloadToken}>
          Download Token
        </Button>
      </Box>
    </>
  );
}

export default Tokenshow;
