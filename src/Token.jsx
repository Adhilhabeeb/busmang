import React, { useContext, useEffect, useState } from "react";
import { ourcontext } from "./App";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

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
  const [status, setStatus] = useState(checkTimePeriod(currentHour));
  const [successid, setsuccessid] = useState("")
const [name, setname] = useState(user.displayName ?? "")
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
      time:` ${year}-${month}-${day} ${hours}:${minutes}:${seconds}

      `
    }
navigate("/tokenshow",{state:valuespass})
}
  }, [successid])
  
  function checkTimePeriod(hour) {
    return hour >= 0 && hour < 12 ? "Morning" : "Evening";
  }

  useEffect(() => {
    if (checkTimePeriod(currentHour) === "Morning") {
      setToLocation("collagename");
    } else {
      setFromLocation("collagename");
    }
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

  async function Displayrazorpay() {
    let res = await loadrazorpay("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    let data = await fetch("http://localhost:1337/razorpay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 600 }),
    }).then((t) => t.json());

    const options = {
      key: "rzp_test_aGs9hkOcUXTL4t",
      amount: data.amount.toString(),
      currency: data.currency,
      name: "Acme Corp",
      description: "Test Transaction",
      order_id: data.id,
      handler: function (response) {
       
        setsuccessid(response.razorpay_payment_id)
      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f5f5f5">
      <Card sx={{ width: 400, p: 2, textAlign: "center", boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold">
            Token Page
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Good {status}, {user.email}
          </Typography>

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
          <TextField fullWidth margin="normal" label="Name" variant="outlined" onChange={(e)=> setname(e.target.value)}  value={name} disabled={user.displayName && true } />
          <Typography variant="h5" fontWeight="bold">Payment: ₹60</Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={Displayrazorpay}>
            Generate Token
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Token;