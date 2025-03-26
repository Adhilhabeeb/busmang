import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, TextField, Button, Typography, CircularProgress, Alert, Box } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { ourcontext } from "./App";
import { auth, provider } from "./Firebase";

function Loginpage() {
  const { user, setuser } = useContext(ourcontext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
const [succesfull, setsuccesfull] = useState(false)
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter an email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setsuccesfull(true)
      setTimeout(() => {
      setuser(userCredential.user);

        navigate("/");
      }, 1500);
     
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const googleSignIn = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        // setuser(result.user);
        // navigate("/");
      }
    } catch (error) {
      setError("Google sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
<>

{    succesfull&& <   Box   display={"flex"} justifyContent={"center"} alignItems={"center"} minHeight={"100vh"} position={"absolute"}  zIndex={999} width={"100%"} top={0}bgcolor={"#f5f5f5"}>
  
  { <Alert severity="success" sx={{ minWidth: 350, p: 3, borderRadius: 2, boxShadow: 3 }}>Login Succesfull</Alert>}
</Box>}

<Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5">

   
<Card sx={{ maxWidth: 400, p: 3, borderRadius: 2, boxShadow: 3 }}>
  <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
    Login
  </Typography>

  {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

  <form onSubmit={handleLogin}>
    <TextField
      fullWidth
      label="Email"
      variant="outlined"
      margin="normal"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
    <TextField
      fullWidth
      label="Password"
      variant="outlined"
      margin="normal"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />

    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      sx={{ mt: 2 }}
      disabled={loading}
    >
      {loading ? <CircularProgress size={24} /> : "Login"}
    </Button>

    <Button
      fullWidth
      variant="contained"
      startIcon={<GoogleIcon />}
      sx={{ mt: 2, bgcolor: "red", ":hover": { bgcolor: "darkred" } }}
      onClick={googleSignIn}
      disabled={loading}
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : "Sign in with Google"}
    </Button>

    <Typography textAlign="center" sx={{ mt: 2 }}>
      Don't have an account? <Link to="/signup" style={{ textDecoration: "none", color: "blue" }}>Sign Up</Link>
    </Typography>
  </form>
</Card>
</Box>
</>


  );
}

export default Loginpage;
