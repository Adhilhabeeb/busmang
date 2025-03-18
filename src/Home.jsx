import React from "react";
import { Container, Typography, Button, Grid, Box, Paper, styled, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import busImage from "../src/assets/bgbus2.png";
import aboutUsImage from "../src/assets/busnt1.jpg"; // Add an image for About Us
import { useNavigate } from "react-router-dom";
import { Swipperpage } from "./swipper";
    import bgimage from "./assets/mbits-banner.png"
export const Home = () => {
  
let theme=useTheme()

  let navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <Box
  sx={{
   
    backgroundImage: `url(${bgimage})`, // Ensure bgimage is a valid image URL
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "90vh", // Adjust as needed,
   boxSizing:"border-box",
  textAlign:"center",
  paddingTop:14
  }}
>

      
  <Box >
<motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
              <Typography variant="h3"  sx={{color: "#fff" }} fontWeight="bold" color="primary" gutterBottom>
                Book Your Bus Tickets Easily!
              </Typography>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.5 }}>
              <Typography variant="body1"  component={"p"} sx={{ fontSize: "1.2rem", mb: 3,color:"rgb(255, 255, 255)" }}>
              Say goodbye to the hassle of long queues and complicated paperwork. Experience the convenience of a fully online, student-friendly system.
              </Typography>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 50 }}  animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1 }}>
              <Button variant="contained" color="primary" onClick={() => navigate("BookTicket")} sx={{ mr: 2,mt:6 }}>
                Book Now
              </Button>
            
            </motion.div>
    

          {/* Right Section: Image */}
          </Box>
      </Box>

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
