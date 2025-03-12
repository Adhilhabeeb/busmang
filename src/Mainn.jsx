import React, { useContext, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { motion } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Header } from "./Header";
import { Home } from "./Home";
import { Footer } from "./Footer";
import { ourcontext } from "./App";
import Loginpage from "./Login";
import { useNavigate } from "react-router-dom";





export const Mainu = () => {
  let {user}=useContext(ourcontext)
let navigate=useNavigate()
  useEffect(() => {
    if ( !JSON.parse(localStorage.getItem("auth"))) {
// alert("nofound")
    }else{

      console.log(JSON.parse(localStorage.getItem("auth")),"yyyyy")
    }
  })
  
  return (
    <>

   {  user ?<Home/>:<Loginpage/>}
  

     
    </>
  );
};

export default Mainu;
