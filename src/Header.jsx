


import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton, Drawer, List, ListItem, ListItemText, styled, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ourcontext } from "./App";

import myImage from "./assets/Logo.png"
 export const Header = () => {
  const theme = useTheme(); // Access theme inside component
  let {user,setuser,admin}=useContext(ourcontext)
let navigate=useNavigate()
    let   Typologo =styled(Typography)(({theme})=>({
    
      fontFamily:theme.palette.othercolor.fontfamiily
      
      
        }))

     
        
    const [mobileOpen, setMobileOpen] = useState(false);
  
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };
  
    const drawer = (
      <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
            {/* <IconButton>
        <img src={myImage} alt="My Icon" />
    </IconButton> */}

<IconButton   >
        <img src={myImage}  style={{width:"auto",height:100}}  alt="My Icon" />
    </IconButton>
        <List>
          {["Home", "About", "Contact", "BookTicket","Signin"].map((text) => (
        <>
       {/* {text=="Home"?
       <Link to={"/"}>
       <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>  
       
       </Link>:
text=="Signin" ?   <Link to={text}>
       
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
       
       } */}
       {text=="Home"?
        <Link to={"/"}>
        <ListItem button key={text}>
               <ListItemText primary={text} />
             </ListItem>  
        
        </Link>:
       
       
      text=="Signin" ? 
     !user ? <Link to={text}>
       
       <ListItem button key={text}>
               <ListItemText primary={text} />
             </ListItem>  
     </Link>
     
     
     
     :  ""
       
  //    <ListItem button key={text} >
  //    <ListItemText primary={text} />
  //  </ListItem>  


     
    
      
      
      // <Link to={text}>
       
      //  <Button color="inherit"   sx={{color:"white"}}>{text}</Button>
      // </Link> 


      
      :
             
          user &&  <Link to={text}>
             
             <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          </Link>
       
       }
        
        </>
          ))}
             {admin  && user &&
        <Link to={"/addpass"}>
             
             <ListItem button key={"Add Student"}>
              <ListItemText primary={"Add Student"} />
            </ListItem>
          </Link>
       }

{admin  &&
        <Link to={"/showconsession"}>
             
             <ListItem button key={"Show Consession Granted"}>
              <ListItemText primary={"Show Consession Granted"} />
            </ListItem>
          </Link>
       }
{admin  &&
        <Link to={"/tokenshowlist"}>
             
             <ListItem button key={"Show Tokens List"}>
              <ListItemText primary={"Show Tokens List"} />
            </ListItem>
          </Link>
       }

       {user&&  <Button color="inherit"   variant="contained"    onClick={()=>{
      localStorage.removeItem("auth")
      setuser(false)
     }}  >Logout</Button>}
        </List>
      </Box>
    );
  
    return (
      <>
        <AppBar position="static"  sx={{ background: "#1e88e5",width:{sm:"100%"},borderRadius:{sm:"0"},boxSizing:"border-box",height:{sm:"13vh",md:"10vh"} }}    >
      
          <Toolbar>
          <IconButton   sx={{display:{xs:"none",sm:"none",md:"block"}}}   >
        <img src={myImage}  style={{width:"auto",height:70}}  alt="My Icon" />
    </IconButton>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              sx={{ display: { sm: "block",md:"none" } }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" component={"p"} sx={{ flexGrow: 1, fontWeight: "bold",mt:{xs:4,sm:4,md:0} }}>
            {/* style={{ fontFamily: theme.palette.othercolor.fontfamiily }} */}
            MBITS  OBPS <br></br>
             {/* <sub    >
        Online Bus Pass System
      </sub> */}
      <Typography >
      Online Bus Pass System

      </Typography>

            </Typography>
          
          
            <Box sx={{ display:{xs:"none",sm:"none",md:"block"} }}>

              {["Home", "About", "Contact", "BookTicket","Signin","MyTickets"].map(text=>(
<>
{text=="Home"?
       <Link to={"/"}>
      
      <Button color="inherit" sx={{color:"white"}}>Home</Button>
       </Link>:
       
       
      text=="Signin" ? 
     !user ? <Link to={text}>
       
     <Button color="inherit"     sx={{color:"white"}}>{text}</Button>
     </Link>:""
      
      
      // <Link to={text}>
       
      //  <Button color="inherit"   sx={{color:"white"}}>{text}</Button>
      // </Link> 


      
      :
             
          user &&   !admin && <Link to={text}>
             
          <Button color="inherit"   sx={{color:"white"}}>{text}</Button>
          </Link>
        
  
       }
       
      
       
       
       </>
   


              ))}
              

             
              {admin &&
        <Link to={"/addpass"}>
             
          <Button color="inherit"   sx={{color:"white"}}>Add student</Button>
          </Link>
       }

             
             {admin &&
        <Link to={"/showconsession"}>
             
          <Button color="inherit"   sx={{color:"white",display:{xs:"none",sm:"none",md:"inline"}}}>


          Show Consession Granted

          </Button>
          </Link>
       }
        {admin &&
        <Link to={"/tokenshowlist"}>
             
          <Button color="inherit"   sx={{color:"white",display:{xs:"none",sm:"none",md:"inline"}}}>


         Show Tokens List 

          </Button>
          </Link>
       }

{user&&
                   <Button color="inherit"     onClick={()=>{
                    localStorage.removeItem("auth")
                    setuser(false)
                   }}  sx={{color:"white"}}>Logout</Button>}
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
          {drawer}
        </Drawer>
      </>
    );
  };