import React, { useContext, useEffect, useState } from "react";

import { addDoc, collection, serverTimestamp , query,
    orderBy,
    onSnapshot,
    limit, } from "firebase/firestore";
 
import { ourcontext } from "./App";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Select,
  MenuItem,InputLabel
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Loginpage from "./Login";
import { db } from "./Firebase";

const now = new Date();
let currentHour = now.getHours();

function loadrazorpay(src) {
  return new Promise((resolve) => {
    let script = document.createElement("script");
    script.src = src;
    document.body.appendChild(script);

    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
  });
}

function Token() {
  let navigate = useNavigate();
  let { user } = useContext(ourcontext);
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [email, setEmail] = useState(user.email);
  const [semister, setsemister] = useState("")
  const [department, setdepartment] = useState("")
  const [division, setdivision] = useState("")
  const [status, setStatus] = useState(checkTimePeriod(currentHour));
  const [successid, setsuccessid] = useState("")
  const [error, seterror] = useState(false)
const [name, setname] = useState(user.displayName ?? "")

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
  const locationOptions = [
    "Angamaly",
    "Trippunitara",
    "Aluva",
    "Panamkuzhy",
    "Pattimattom",
    "Adimaly",
    "Thodupuzha",
  ];


  useEffect(() => {
  
if (successid) {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // Months are zero-based (0 = January)
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    

    let valuespass={
        name,
        fromLocation,
        toLocation,
        status,
        successid,
        semister,
        department,
        division,
        email,

      time:` ${year}-${month}-${day} ${hours}:${minutes}:${seconds}

      `
    }

    adddatabase(valuespass)
navigate("/tokenshow",{state:valuespass})
}
  }, [successid])
  
async function adddatabase(value) {
  
    await addDoc(collection(db, "tokens"), {
      ...value,
       
        createdAt: serverTimestamp(),
    
      });

}


  function checkTimePeriod(hour) {
    return hour >= 0 && hour < 12 ? "Morning" : "Evening";
  }

  useEffect(() => {
    if (checkTimePeriod(currentHour) === "Morning") {
     
      setToLocation("MBITS COLLEGE");
    } else {
      setFromLocation("MBITS COLLEGE");
    }
  }, []);


  useEffect(() => {
  

    if (status=="Morning") {
      setToLocation("MBITS COLLEGE");
      
    }else{
      setFromLocation("MBITS COLLEGE");

    }
  
   
  }, [status])
  

 
  
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

  async function Displayrazorpay() {



    seterror(false)
 
  if (fromLocation.trim()==""||  toLocation.trim()=="" || name.trim()==""  ||  semister.trim()=="" || division.trim()=="" || department.trim()==""   ) {
   seterror(true)
   return 
  }


  let exist=false

  if (fetcheddta) {
    let sta=fetcheddta.some(el=>el.email===user.email)
  exist=sta;

  }


    let res = await loadrazorpay("https://checkout.razorpay.com/v1/checkout.js");
  
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    
  
    let data = await fetch("https://busmang.onrender.com/razorpay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 60 }),
    }).then((t) => t.json());
  
    // const options = {
    //   key: "rzp_test_aGs9hkOcUXTL4t",
    //   amount: data.amount.toString(),
    //   currency: data.currency,
    //   name: "Acme Corp",
    //   description: "Test Transaction",
    //   order_id: data.id,
    //   handler: function (response) {
    //     console.log("Payment successful:", response);
    //     setsuccessid(response.razorpay_payment_id); // Set payment success ID
    //   },
    //   prefill: {
    //     name: name,
    //     email: email,
    //   },
    //   theme: {
    //     color: "#039dfc",
    //   },
    // };
    const options = {
      key: "rzp_test_aGs9hkOcUXTL4t",
      amount: data.amount.toString(),
      currency: data.currency,
      name: name,
      description: "Test Transaction",
      order_id: data.id,
      handler: function (response) {
        console.log("Payment successful:", response);
        setsuccessid(response.razorpay_payment_id);
      },
      prefill: {
        name: name,
        email: email,
      },
      theme: {
        color: "#039dfc",
      },
      modal: {
        
        ondismiss: function () {
          alert("Payment window closed.");
        },
        backdropclose: false, // Prevent accidental close
      },
      // Force opening in new tab if in mobile browser
      timeout: 2000, // 5 seconds timeout
    };
    
    
  
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  
  return (

    <>
  {   user ? <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f5f5f5">
      <Card sx={{ width: 400, p: 2, textAlign: "center", boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold">
            Token Page
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Good {status}, {user.email}
          </Typography>



  {error && <p  style={{color:"red"}}>Invalid    data inputed    </p> }

  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={status}
    label="status"
    onChange={(e)=>setStatus(e.target.value)}
  >
    <MenuItem value={"Morning"}>Morning</MenuItem>
    <MenuItem value={"Evening"}>Evening</MenuItem>
\
  </Select>


          {status === "Morning" ? (
            <Select fullWidth margin="normal" value={fromLocation} onChange={(e) => setFromLocation(e.target.value)}>
              {locationOptions.map((location, index) => (
                <MenuItem key={index} value={location}>
                  {location}
                </MenuItem>
              ))}
            </Select>
          ) : (
            <TextField fullWidth margin="normal" label="From Location" variant="outlined" value={fromLocation} disabled />
          )}

          {status === "Evening" ? (
            <Select fullWidth margin="normal" value={toLocation} onChange={(e) => setToLocation(e.target.value)}>
              {locationOptions.map((location, index) => (
                <MenuItem key={index} value={location}>
                  {location}
                </MenuItem>
              ))}
            </Select>
          ) : (
            <TextField fullWidth margin="normal" label="To Location" variant="outlined" value={toLocation} disabled />
          )}

          <TextField fullWidth margin="normal" label="Email" variant="outlined" value={email} disabled />
          <TextField fullWidth margin="normal" label="Name" variant="outlined" onChange={(e)=> setname(e.target.value)}  value={name}  />
         
          <TextField fullWidth margin="normal" label="Semister" variant="outlined" onChange={(e)=> setsemister(e.target.value)}  value={semister}  />
         
          <TextField fullWidth margin="normal" label="Division" variant="outlined" onChange={(e)=> setdivision(e.target.value)}  value={division}  />
         
          <InputLabel>Department</InputLabel>
         
                <Select
                   fullWidth
                 defaultValue="MECH"
             name="department"
             value={department}
             onChange={(e)=> setdepartment(e.target.value)}
           >
             <MenuItem value="CSE">CSE</MenuItem>
             <MenuItem value="ECE">ECE</MenuItem>
             <MenuItem value="EEE">EEE</MenuItem>
             <MenuItem value="CE">CE</MenuItem>
             <MenuItem value="MECH">MECH</MenuItem>
           </Select>
          <Typography variant="h5" fontWeight="bold">Payment: ₹60</Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={Displayrazorpay}>
            Generate Token
          </Button>
        </CardContent>
      </Card>
    </Box> :<Loginpage/>}
    </>

  );
}

export default Token;