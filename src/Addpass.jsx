import React, { useContext, useEffect, useState } from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { TextField, Button, Box, Typography } from "@mui/material";
import { ourcontext } from "./App";
import Loginpage from "./Login";

import { addDoc, collection, serverTimestamp , query,
    orderBy,
    onSnapshot,
    limit, } from "firebase/firestore";
import { db } from "./Firebase";
import { useNavigate } from "react-router-dom";
import { Login } from "@mui/icons-material";
function Addpass() {
  const { user, setuser, admin } = useContext(ourcontext);
  let navigate=useNavigate()
const [fetcheddta, setfetcheddta] = useState([])
  useEffect(() => {
    const q = query(
      collection(db, "studentpass"),
      orderBy("createdAt", "desc"),
      limit(50)
    );
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
  
      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.createdAt - b.createdAt
      );
      console.log(sortedMessages,"soarrtyghg")
  setfetcheddta(sortedMessages)
     
    });
    // return () => unsubscribe;
  }, []);




  useEffect(() => {
    console.log(fetcheddta,"fetttttt")
  }, [fetcheddta])
  
  // State for form data
  let today =new Date()
  const year = today.getFullYear();
  const month = today.getMonth() + 1; 
  const day = today.getDate();

  const [formData, setFormData] = useState({
    name: "",email:"",
    age: "",
    dob: "",
    department: "",
    admissiondate: "",
   dategenerated:`${year}-${month}-${day}`
  });

  
  useEffect(() => {
   console.log(formData,"fordarta")
  }, [formData])
  
  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const    handleSubmit =  async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    const isEmpty = Object.values(formData).some((value) => value.trim() === "");

    if (isEmpty) {
      alert("All fields are required!");
      return;
    }

    if(!formData.email.includes('.cse22@mbits.ac.in')){

      alert("plz enter your email with collage emzil format")
       return 
     }
    
    let useralreadyexust=false
fetcheddta?.forEach(e=>{
    if (e.email==formData.email) {
        useralreadyexust=true
    }
})
   
if (useralreadyexust ) {
    alert("email already exist or incorret email")
return 
}
    await addDoc(collection(db, "studentpass"), {
      ...formData,
       
        createdAt: serverTimestamp(),
    
      });

    
      navigate("/showconsession")

  };

  if (!user) {
    return <Login />;
  }

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>
        Add Student Pass
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Age"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
         <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Date of Birth"
          name="dob"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={formData.dob}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
          <InputLabel>Department</InputLabel>

         <Select
          fullWidth
        defaultValue="MECH"
    name="department"
    value={formData.department}
    onChange={handleChange}
  >
    <MenuItem value="CSE">CSE</MenuItem>
    <MenuItem value="ECE">ECE</MenuItem>
    <MenuItem value="EEE">EEE</MenuItem>
    <MenuItem value="CE">CE</MenuItem>
    <MenuItem value="MECH">MECH</MenuItem>
  </Select>
        <TextField
          label="Admission Date"
          name="admissiondate"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={formData.admissiondate}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
       

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>
    </Box>
  );
}

export default Addpass;
