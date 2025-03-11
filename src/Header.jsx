


import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { motion } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ourcontext } from "./App";
 export const Header = () => {
  let {user}=useContext(ourcontext)

  
    const [mobileOpen, setMobileOpen] = useState(false);
  
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };
  
    const drawer = (
      <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
        <List>
          {["Home", "About", "Contact", "BookTicket","Signin"].map((text) => (
        <>
       {text=="Home"?
       <Link to={"/"}>
       <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>  
       
       </Link>:
text=="Signin" && !user?   <Link to={text}>
       
<Button variant="contained"  sx={{background:"white"}}>
<ListItem button key={text}>
       <ListItemText primary={text} />
     </ListItem>
</Button>
</Link>   :
       
       <Link to={text}>
       
       <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
       </Link>
       
       }
        
        </>
          ))}
        </List>
      </Box>
    );
  
    return (
      <>
        <AppBar position="static" sx={{ background: "#1e88e5" }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              sx={{ display: { xs: "block", sm: "none" } }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
              Bus Ticket Management System
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>

              {["Home", "About", "Contact", "BookTicket","Signin"].map(text=>(
<>
{text=="Home"?
       <Link to={"/"}>
      
      <Button color="inherit" sx={{color:"white"}}>Home</Button>
       </Link>:
       
       
      text=="Signin" ? 
     !user ? <Link to={text}>
       
     <Button color="inherit"   sx={{color:"white"}}>{text}</Button>
     </Link>:"" 
      
      
      // <Link to={text}>
       
      //  <Button color="inherit"   sx={{color:"white"}}>{text}</Button>
      // </Link> 


      
      :
             
          user &&  <Link to={text}>
             
          <Button color="inherit"   sx={{color:"white"}}>{text}</Button>
          </Link>
       
       }</>


              ))}
              
              
             
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
          {drawer}
        </Drawer>
      </>
    );
  };