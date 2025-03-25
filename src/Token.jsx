import React, { useContext, useEffect, useState } from "react";

import { addDoc, collection, serverTimestamp , query,
    orderBy,
    onSnapshot,
    limit, } from "firebase/firestore";
 
import { ourcontext } from "./App";
import dayjs from "dayjs";

import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
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
  const [selectredsubj, setselectredsubj] = useState("")
  const [subjunctio, setsubjunctio] = useState(["plz select the  Route first"]);
  const [Busname, setBusname] = useState(null)
  const [fromLocation, setFromLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
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
        subjunction:selectredsubj,  
Bookingdate:selectedDate,Busname,
      time:` ${year}-${month}-${day} ${hours}:${minutes}:${seconds}

      `
    }

    adddatabase(valuespass)
// navigate("/tokenshow",{state:valuespass})
}
  }, [successid])
  
// async function adddatabase(value) {
  

//   try {
//     const docRef = await addDoc(collection(db, "tokenslist"), {
//    name:value.name,
//    fromLocation:value.fromLocation,
//     toLocation:value.toLocation,
//     status:value.status,
//     successid:value.successid,
//     semister:value.semister,
//     department:value.department,
//     division:value.division,
//     email:value.email,
//     subjunction:value.subjunction,
//     Bookingdate:value.Bookingdate,
//     Busname:value.Busname,
//     time:value.time,

//       createdAt: serverTimestamp(),
//     });
//     console.log("Document written with ID: ", docRef.id);
//     navigate("/tokenshow",{state:value})
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }




// }

async function adddatabase(value) {
  try {
    const docRef = await addDoc(collection(db, "tokenslist"), {
      name: value.name,
      fromLocation: value.fromLocation,
      toLocation: value.toLocation,
      status: value.status,
      successid: value.successid,
      semister: value.semister,
      department: value.department,
      division: value.division,
      email: value.email,
      subjunction: value.subjunction,
      Bookingdate: value.Bookingdate ? dayjs(value.Bookingdate).format("YYYY-MM-DD") : null, // Convert to string
      Busname: value.Busname,
      time: value.time,
      createdAt: serverTimestamp(),
    });
    console.log("Document written with ID: ", docRef.id);
    navigate("/tokenshow", { state: value });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
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
 
  if(toLocation.trim()!="MBITS COLLEGE"  ||  fromLocation.trim()!="MBITS COLLEGE"){
if (locationOptions.includes(toLocation) ) {
 Subjunctionsfuncc(toLocation)

  }
  if (locationOptions.includes(fromLocation) ) {
    Subjunctionsfuncc(fromLocation)
   
     }
}

}, [toLocation,fromLocation])

 function Subjunctionsfuncc(mainplace) {
  
switch (mainplace) {
  case "Angamaly":
    setsubjunctio([
      "Angamaly",
      "Kalady",
      "Neeleeswaram Jn.",
      "Kuruchilakode Jn."
    ])
    
    break;
case "Trippunitara":
setsubjunctio([
  "Tripunithura",
  "Thiruvankulam",
  "Puthenkurish",
  "Kolenchery",
  "Valakom",
  "Muvattupuzha",
  "Ambalappady",
  "Kothamangalam"
])
break;
case "Aluva":

setsubjunctio( [
  "Aluva",
  "Rajagiri Hospital",
  "Ponjassery",
  "Vengola",
  "Perumbavoor",
  "Kuruppampady",
  "Irumalappady"
])
  break ;
case "Panamkuzhy":

setsubjunctio([
  "Panamkuzhy",
  "Vengoor",
  "Nedungapra church",
  "Kottappady",
  "Thrikkariyoor"
])
  break;
case "Pattimattom":
  break;
case "Adimaly":


setsubjunctio([
  "1000 acre",
  "Adimaly",
  "Machiplavu",
  "Irumpupalam",
  "6th mile",
  "Neriamangalam",
  "Oonnukal"
])
  break;
case "Thodupuzha":
  setsubjunctio([
    "Thodupuzha",
    "Kodikulam West",
    "Vannappuram",
    "Kadavoor",
    "Paingottoor",
    "Pothanicad",
    "Adivad"
  ])
  break;
  
  default:
    break;
}





 }
  
 useEffect(() => {

 }, [selectredsubj])
 
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

  async function Displayrazorpay() {



    seterror(false)
 
  if (fromLocation.trim()==""||  toLocation.trim()=="" || name.trim()==""  ||  semister.trim()=="" || division.trim()=="" || department.trim()=="" || !selectedDate || Busname.trim()=="" || selectredsubj.trim()=="")  {
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




          {status === "Morning" ? (
             < Box textAlign={"start"}>
              <InputLabel>Route mornibng</InputLabel>
            <Select fullWidth margin="normal" value={fromLocation} onChange={(e) => setFromLocation(e.target.value)}>
              {locationOptions.map((location, index) => (
                <MenuItem key={index} value={location}>
                  {location}
                </MenuItem>
              ))}
            </Select></Box>
          ) : (
            <TextField fullWidth margin="normal" label="From Location" variant="outlined" value={fromLocation} disabled />
          )}

          {status === "Evening" ? (
               <Box textAlign={"start"}>
               <InputLabel>Route</InputLabel>
             <Select fullWidth margin="normal" value={toLocation} onChange={(e) => setToLocation(e.target.value)}>
               {locationOptions.map((location, index) => (
                 <MenuItem key={index} value={location}>
                   {location}
                 </MenuItem>
               ))}
             </Select></Box>
          ) : (
            <TextField fullWidth margin="normal" label="To Location" variant="outlined" value={toLocation} disabled />
          )}

          <TextField fullWidth margin="normal" label="Email" variant="outlined" value={email} disabled />
          <TextField fullWidth margin="normal" label="Name" variant="outlined" onChange={(e)=> setname(e.target.value)}  value={name}  />
         
          <TextField fullWidth margin="normal" label="Semester" variant="outlined" onChange={(e)=> setsemister(e.target.value)}  value={semister}  />
         
          <TextField fullWidth margin="normal" label="Division" variant="outlined" onChange={(e)=> setdivision(e.target.value)}  value={division}  />
          <InputLabel>Sub Junctions</InputLabel>
    
          <Select fullWidth margin="normal" value={selectredsubj} onChange={(e) => setselectredsubj(e.target.value)}>
              {subjunctio.map((location, index) => (
                <MenuItem key={index} value={location}>
                  {location}
                </MenuItem>
              ))}
            </Select>
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
       {/* <input type="date" name="" id="" /> */}
       <InputLabel  mt={1}>Bus Name</InputLabel>

       <TextField sx={{mt:1.5}} fullWidth margin="normal" label="Bus Name" variant="outlined" onChange={(e)=> setBusname(e.target.value)}  value={Busname}  />
         
     <Box my={1}>
     <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker 
        label="Select Date For Booking"
        value={selectedDate}
        onChange={(newDate) => setSelectedDate(newDate)}
        renderInput={(params) => <TextField {...params}     fullWidth />}
      />
    </LocalizationProvider>
   <Box textAlign={"start"}>
   <InputLabel  mt={1}>Time</InputLabel>
    <Select  fullWidth
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={status}
    label="status"
    onChange={(e)=>setStatus(e.target.value)}
  >
    <MenuItem value={"Morning"}>Morning</MenuItem>
    <MenuItem value={"Evening"}>Evening</MenuItem>

  </Select>
   </Box>
     </Box>
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