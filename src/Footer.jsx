import React, { useContext } from "react";
import { Box, Typography, Container, Grid, IconButton, Divider } from "@mui/material";
import { motion } from "framer-motion";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { ourcontext } from "./App";
import { Link } from "react-router-dom";

export const Footer = () => {
  let {user}=useContext(ourcontext)
  return (
    <Box
      sx={{
        background: "#1e88e5",
        color: "white",
        mt: 5,
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* About Section */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <Typography variant="h6" fontWeight="bold">
                About Us
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                We provide the best online bus ticket booking services, ensuring safe and comfortable travel experiences.
              </Typography>
            </motion.div>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <Typography variant="h6" fontWeight="bold">
                Quick Links
              </Typography>

              {["Home", "About", "Contact", "BookTicket","Signin"].map(text=>(
<>
{text=="Home"?
       <Link to={"/"}>
      
      <Typography variant="body2" sx={{ mt: 1 ,color:"white"}}>
               Home 
               
              </Typography> 
       </Link>:
       
       
      text=="Signin" ? 
     !user ? <Link to={text}>
       
       <Typography variant="body2" sx={{ mt: 1 ,color:"white"}}>
               {text}
               
              </Typography> 
     </Link>:"" 
      
      
      // <Link to={text}>
       
      //  <Button color="inherit"   sx={{color:"white"}}>{text}</Button>
      // </Link> 
      


      
      :
             
          user &&  <Link to={text}>
             
             <Typography variant="body2" sx={{ mt: 1 ,color:"white"}}>
               {text}
               
              </Typography> 
          </Link>
       
       }</>


              ))}
              {/* <Typography variant="body2" sx={{ mt: 1 }}>
                - Home <br />
                - Book Tickets <br />
                - Contact Us <br />
                - Terms & Conditions
              </Typography> */}
            </motion.div>
          </Grid>

          {/* Contact Section */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <Typography variant="h6" fontWeight="bold">
                Contact Us
              </Typography>
              <Box display="flex" alignItems="center" mt={1}>
                <EmailIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body2">basilke00@gmail.com</Typography>
              </Box>
              <Box display="flex" alignItems="center" mt={1}>
                <PhoneIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body2">+91 88484 30110</Typography>
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider sx={{ my: 3, borderColor: "rgba(255, 255, 255, 0.5)" }} />

        {/* Social Media & Copyright */}
        <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
          <Typography variant="body2">© 2025 Bus Ticket Management System. All rights reserved.</Typography>
          <Box>
            <IconButton color="inherit">
              <FacebookIcon />
            </IconButton>
            <IconButton color="inherit">
              <TwitterIcon />
            </IconButton>
            <IconButton color="inherit">
              <InstagramIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
