import React from "react";
import { Container, Typography, Box, Grid, Button, Paper } from "@mui/material";
import { motion } from "framer-motion";

export const About = () => {
  return (
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
              Your trusted partner in online bus ticket booking, ensuring smooth and hassle-free travel.
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
                We are a leading bus ticket booking platform, providing travelers with a seamless experience to book
                tickets, check schedules, and find the best routes. Our mission is to make travel convenient, safe, and
                affordable.
              </Typography>
            </motion.div>
          </Grid>

          {/* Right: Image or Placeholder */}
          <Grid item xs={12} md={6}>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
              <Paper elevation={3} sx={{ height: 200, display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "#f5f5f5" }}>
                <Typography variant="h6" color="primary">
                  {/* You can replace this with an actual image */}
                  Image Placeholder
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Our Services */}
      <Box sx={{ py: 6, background: "#f9f9f9" }}>
        <Container>
          <Typography variant="h4" fontWeight="bold" textAlign="center" color="primary">
            Why Choose Us?
          </Typography>
          <Grid container spacing={4} sx={{ mt: 3 }}>
            {[
              { title: "Easy Booking", desc: "Book your tickets effortlessly with our user-friendly platform." },
              { title: "Secure Payments", desc: "Your transactions are safe with advanced security measures." },
              { title: "24/7 Support", desc: "We are always here to assist you with any queries." },
              { title: "Best Prices", desc: "Get the most affordable fares for your journeys." },
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
          <Button variant="contained" color="primary" sx={{ mt: 3 }}>
            Book Now
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
};
