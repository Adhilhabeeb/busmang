import React, { useContext, useEffect, useState } from "react";
import { Container, TextField, Button, Typography, Box, Card, CardContent, Grid } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { ourcontext } from "./App";
import { useNavigate } from "react-router-dom";
import Loginpage from "./Login";

const Contact = () => {

   let navigate = useNavigate();
  let {user}=useContext(ourcontext)
       useEffect(() => {
         if ( !JSON.parse(localStorage.getItem("auth"))) {
        navigate("/")
         }else{
     
           console.log(JSON.parse(localStorage.getItem("auth")),"yyyyy")
         }
       })
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);
  };


 
  
  return (
    <>
    {user?
      <Container maxWidth="lg" sx={{ mt: 5, p: 3 }}>
      <Typography variant="h4" gutterBottom textAlign="center" fontWeight="bold">
        Contact Us
      </Typography>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={5}>
          <Card sx={{ boxShadow: 3, p: 3, borderRadius: 2, backgroundColor: "#f5f5f5" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Contact Information
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <EmailIcon color="primary" />
                <Typography>adhil@gmail.com</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1} mt={2}>
                <PhoneIcon color="primary" />
                <Typography>082798679</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1} mt={2}>
                <LocationOnIcon color="primary" />
                <Typography>Kochi, Kerala, India</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={7}>
          <Card sx={{ boxShadow: 3, p: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Send Us a Message
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  label="Message"
                  variant="outlined"
                  fullWidth
                  required
                  multiline
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary" sx={{ borderRadius: 1.5, py: 1.2 }}>
                  Send Message
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>:
    <Loginpage/>}
    
    </>
  
  );
};

export default Contact;
