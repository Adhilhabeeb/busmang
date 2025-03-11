import React from "react";
import { Container, Typography, Grid, Card, CardContent, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "framer-motion";

// Sample Data for Services & Advantages
const services = [
  { title: "Easy Online Booking", description: "Book your tickets in just a few clicks from anywhere." },
  { title: "Real-Time Tracking", description: "Track your bus in real time for better travel planning." },
  { title: "24/7 Customer Support", description: "We are here to assist you anytime, anywhere." },
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
      <Container sx={{ mt: 5, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          Our Services
        </Typography>

        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2500 }}
          loop
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            600: { slidesPerView: 2 },
            900: { slidesPerView: 3 },
          }}
          style={{ padding: "20px" }}
        >
          {services.map((service, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.3 }}
              >
                <Card sx={{ p: 3, textAlign: "center", boxShadow: 3 }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">{service.title}</Typography>
                    <Typography variant="body2" color="textSecondary">{service.description}</Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>

      {/* Advantages Section */}
      <Container sx={{ mt: 8, textAlign: "center" }}>
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
      </Container>
    </>
  );
};
