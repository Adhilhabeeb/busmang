import React, { useContext, useEffect } from "react";
import { Container, Typography, Box, Grid, Button, Paper } from "@mui/material";


import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ourcontext } from "./App";
import Loginpage from "./Login";
import busImage from "../src/assets/bussnt4.jpg";

export const About = () => {
  let navigate = useNavigate();
let {user}=useContext(ourcontext)
     useEffect(() => {
       if ( !JSON.parse(localStorage.getItem("auth"))) {
      navigate("/")
       }else{
   
         console.log(JSON.parse(localStorage.getItem("auth")),"yyyyy")
       }
     })
  return (

    <>

{
     user ?
     <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #1e88e5, #1565c0)",
          color: "white",
          py: 8,
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <Typography variant="h3" fontWeight="bold">
              About Us
            </Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>
            Welcome to the Online College Bus Pass System, where convenience meets innovation. Our mission is to revolutionize the way students access and manage their college bus passes by providing a fully digital platform that’s efficient, secure, and user-friendly.

            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Company Info */}
      <Container sx={{ py: 6 }}>
        <Grid container spacing={4} alignItems="center">
          {/* Left: Text Section */}
          <Grid item xs={12} md={6}>
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
              <Typography variant="h4" fontWeight="bold" color="primary">
                Who We Are
              </Typography>
              <Typography variant="body1" sx={{ mt: 2, color: "text.secondary" }}>
              We are a dedicated team committed to simplifying transportation solutions for students. By harnessing technology, we aim to make the process of obtaining  bus passes seamless and accessible, anytime, anywhere.

              </Typography>
            </motion.div>
          </Grid>

          {/* Right: Image or Placeholder */}
          <Grid item xs={12} md={6}>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
              <Paper elevation={3} sx={{ height: {xs:300,md:400,lg:500}, display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "#f5f5f5" }}>
           <Box     width={"100%"}    height={"100%"}  sx={{objectFit:"cover"}}  src={busImage} component={"img"} />
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Our Services */}
      <Box sx={{ py: 6, background: "#f9f9f9" }}>
  <Container>
    <Typography variant="h4" fontWeight="bold" textAlign="center" color="primary">
      What We Offer
    </Typography>
    <Grid container spacing={4} sx={{ mt: 3 }}>
      {[
        { 
          title: "Easy online registration and login for students", 
          desc: "Effortlessly create and manage your student account with our seamless registration process." 
        },
        { 
          title: "Hassle-free bus route selection and pass renewal", 
          desc: "Find the best routes and renew your bus pass with just a few clicks, saving you time and effort." 
        },
        { 
          title: "Secure payment integration for a worry-free experience", 
          desc: "Make transactions with confidence using our advanced security and reliable payment gateways." 
        },
        { 
          title: "Instant generation of digital bus passes that are eco-friendly and convenient", 
          desc: "Say goodbye to paper passes—access your digital pass instantly, reducing waste and making travel easier." 
        },
      ].map((item, index) => (
        <Grid item xs={12} md={3} key={index}>
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: index * 0.2 }}>
            <Paper sx={{ p: 3, textAlign: "center", boxShadow: 2 }}>
              <Typography variant="h6" fontWeight="bold" color="primary">
                {item.title}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
                {item.desc}
              </Typography>
            </Paper>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  </Container>
</Box>


      {/* Call to Action */}
      <Box sx={{ textAlign: "center", py: 6 }}>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
          <Typography variant="h5" fontWeight="bold">
            Ready to Book Your Ticket?
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, color: "text.secondary" }}>
            Start your journey with us today!
          </Typography>
          <Button variant="contained" color="primary" onClick={() => navigate("/BookTicket")} sx={{ mt: 3 }}>
            Book Now
          </Button>
        </motion.div>
      </Box>
    </Box>
     
     :<Loginpage/>}

    </>
   
  );
};
