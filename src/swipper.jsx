import React from "react";
import { Container, Typography, Grid, Card, CardContent, Box ,Paper } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "framer-motion";

// Sample Data for Services & Advantages
const services = [
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
];

const advantages = [
  { title: "Affordable Prices", description: "Get the best deals and discounts on bus tickets." },
  { title: "Comfort & Safety", description: "Enjoy a smooth journey with safety as our priority." },
  { title: "Flexible Payment", description: "Multiple payment options for a hassle-free experience." },
];

export const Swipperpage = () => {
  return (
    <>
      {/* Services Section with Swiper */}
      <Box sx={{ py: 6, background: "#f9f9f9" }}>
      <Container>
        <Typography variant="h4" fontWeight="bold" textAlign="center" color="primary">
          What We Offer
        </Typography>
        <Grid container spacing={4} sx={{ mt: 3 }}>
          {services.map((service, index) => (
            <Grid item xs={12} md={3} key={index}>
              <motion.div 
                initial={{ opacity: 0, y: 50 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 1, delay: index * 0.2 }}
              >
                <Paper sx={{ p: 3, textAlign: "center", boxShadow: 2 }}>
                  <Typography variant="h6" fontWeight="bold" color="primary">
                    {service.title}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
                    {service.desc}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
      {/* Advantages Section */}
      {/* <Container sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" color="secondary" gutterBottom>
          Why Choose Us?
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {advantages.map((adv, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.3 }}
              >
                <Card sx={{ p: 3, textAlign: "center", boxShadow: 3 }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">{adv.title}</Typography>
                    <Typography variant="body2" color="textSecondary">{adv.description}</Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container> */}
    </>
  );
};
