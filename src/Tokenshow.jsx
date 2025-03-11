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

function Tokenshow() {
  const location = useLocation();
  const data = location.state;
  const cardRef = useRef(); // Reference for the token card

  if (!data) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" color="error">
          No Token Data Received!
        </Typography>
      </Box>
    );
  }

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
            <strong>From:</strong> {data.fromLocation}
          </Typography>
          <Typography variant="subtitle1">
            <strong>To:</strong> {data.toLocation}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Status:</strong> {data.status}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Success ID:</strong> {data.successid}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Time:</strong> {data.time}
          </Typography>
        </CardContent>
      </Card>

      {/* Download Button */}
     
    </Box>

    <Box    display={"flex"}  justifyContent={"center"}   width={"100%"} >
<Button variant="contained" color="secondary" onClick={downloadToken}>
  Download Token
</Button>
</Box>
</>

  );
}

export default Tokenshow;
