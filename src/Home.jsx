import React from "react";
import { Container, Typography, Button, Grid, Box, Paper } from "@mui/material";
import { motion } from "framer-motion";
import busImage from "../src/assets/bgbus2.png";
import aboutUsImage from "../src/assets/ee.png"; // Add an image for About Us
import { useNavigate } from "react-router-dom";
import { Swipperpage } from "./swipper";

export const Home = () => {
  let navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Grid container spacing={4} alignItems="center">
          {/* Left Section: Text */}
          <Grid item xs={12} md={6}>
            <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
              <Typography variant="h3" fontWeight="bold" color="primary" gutterBottom>
                Book Your Bus Tickets Easily!
              </Typography>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.5 }}>
              <Typography variant="body1" color="textSecondary" sx={{ fontSize: "1.2rem", mb: 3 }}>
                Your one-stop solution for booking bus tickets. Find buses, check schedules, and secure your seat with ease!
              </Typography>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1 }}>
              <Button variant="contained" color="primary" onClick={() => navigate("BookTicket")} sx={{ mr: 2 }}>
                Book Now
              </Button>
              <Button variant="outlined" color="secondary">
                Learn More
              </Button>
            </motion.div>
          </Grid>

          {/* Right Section: Image */}
          <Grid item xs={12} md={6}>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.7 }}>
              <Box component="img" src={busImage} alt="Bus Travel" sx={{ width: "100%", height: "auto", borderRadius: 3 }} />
            </motion.div>
          </Grid>
        </Grid>
      </Container>

<Swipperpage/>
      {/* About Us Section */}
      <Box sx={{ mt: 10, py: 6, backgroundColor: "#f5f5f5" }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            {/* Left Section: Image */}
            <Grid item xs={12} md={6}>
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
                <Box component="img" src={aboutUsImage} alt="About Us" sx={{ width: "100%", height: "auto", borderRadius: 3 }} />
              </motion.div>
            </Grid>

            {/* Right Section: Text */}
            <Grid item xs={12} md={6}>
              <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
                <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
                  About Us
                </Typography>
                <Typography variant="body1" color="textSecondary" sx={{ fontSize: "1.1rem", mb: 3 }}>
                  Welcome to our Bus Ticket Management System! We are dedicated to providing a seamless and hassle-free experience for booking your bus tickets online.
                </Typography>
                <Typography variant="body1" color="textSecondary" sx={{ fontSize: "1.1rem" }}>
                  Our mission is to make bus travel easier, more reliable, and accessible for everyone. With our platform, you can find buses, check schedules, and book tickets with ease.
                </Typography>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
