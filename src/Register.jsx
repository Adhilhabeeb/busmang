import React, { useContext, useState } from "react";
import { TextField, Button, Container, Typography, Box, Alert } from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { auth, provider ,signInWithPopup
} from "./Firebase";
import { ourcontext } from "./App";
import { Link, useNavigate } from "react-router-dom";


const Register = () => {
    let navigate=useNavigate()
    const {user,setuser} = useContext(ourcontext);
    const [succesfull, setsuccesfull] = useState(false)
    
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
const [name, setname] = useState("")
function handleregister(e) {
    e.preventDefault()


    if (!email || !password) {
        alert("Please enter an email and password.");
        return;
      }

      if(!email.includes('@mbits.ac.in')){

        alert("plz enter your email with collage emzil format")
         return 
       }
        createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setError(false)

        // Signed up 
        const user = userCredential.user;
        console.log(user,"uuuu")



        setsuccesfull(true)

        setTimeout(() => {
     navigate("/Signin")
          
        }, 2000);
   
      })
      .catch((error) => {

        alert(":eeror")
      
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log("erorcode",errorCode,"errpmsg",errorMessage)
        // ..
      });
    }


  const googleSignIn = async() => {
    try {
    
        const result = await signInWithPopup (auth, provider);
        console.log("User Info:", result.user);
       
        setsuccesfull(true)


        setTimeout(() => {
          setuser( result.user)
          navigate("/Signin")
        
             }, 2000);

      } catch (error) {
        console.error("Error signing in:", error);
      }
  };

  return (
    
    
    <>

    {    succesfull&& <   Box   display={"flex"} justifyContent={"center"} alignItems={"center"} minHeight={"100vh"} position={"absolute"}  zIndex={999} width={"100%"} top={0}bgcolor={"#f5f5f5"}>
      
      { 
        
        <Alert severity="success" sx={{ minWidth: 350, p: 3, borderRadius: 2, boxShadow: 3 }}>Registered Succesfully</Alert>}
    </Box>}
    
      <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 4,
          boxShadow: 3,
          borderRadius: 3,
          backgroundColor: "#fff",
          marginTop: 5,
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Register Here
        </Typography>

        <form onSubmit={handleregister} style={{ width: "100%" }}>
        
        
      <TextField
            fullWidth
            variant="outlined"
            label="Email or Phone"
            type="email"
            error={error && !email}
            helperText={error && !email ? "Email is required" : ""}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginBottom: 2 }}
          />

          <TextField
            fullWidth
            variant="outlined"
            label="Password"
            type="password"
            error={error && !password}
            helperText={error && !password ? "Password is required" : ""}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: 3 }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ padding: 1 }}
          >
            Register
          </Button>
        </form>

        {/* <Typography variant="body2" sx={{ marginY: 2 }}>
          OR
        </Typography> */}

        {/* <Button
          variant="outlined"
          fullWidth
          onClick={googleSignIn}
          startIcon={<GoogleIcon />}
          sx={{
            color: "#4285F4",
            borderColor: "#4285F4",
            "&:hover": { backgroundColor: "#E3F2FD" },
          }}
        >
          Sign in with Google
        </Button> */}
         <Typography textAlign="center" sx={{ mt: 2 }}>
            Already have an account? <Link to="/signin" style={{ textDecoration: "none", color: "blue" }}>Sign In</Link>
          </Typography>
      </Box>
    </Container>
    </>
    
  
  );
};

export default Register;
