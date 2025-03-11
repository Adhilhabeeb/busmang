import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { motion } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Header } from "./Header";
import { Home } from "./Home";
import { Footer } from "./Footer";
import { ourcontext } from "./App";
import Loginpage from "./Login";





export const Mainu = () => {
  let {user}=useContext(ourcontext)
  return (
    <>

   {user?<Home/>:<Loginpage/>}
  

     
    </>
  );
};

export default Mainu;
