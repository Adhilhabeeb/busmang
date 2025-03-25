import React, { useContext, useEffect, useState } from "react";
import FormControl from '@mui/material/FormControl';
import { 
  collection, limit, onSnapshot, orderBy, query, doc, updateDoc ,where, getDocs, Timestamp
} from "firebase/firestore";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Button,
  Box,
  Stack,
  Select,
  MenuItem,
} from "@mui/material";
import dayjs from "dayjs";
import { db } from "./Firebase";
import { ourcontext } from "./App";
import { i } from "framer-motion/client";
import { Login } from "@mui/icons-material";
import Loginpage from "./Login";
import { TextField } from "@mui/material";

function TokenListShow() {
      let {user}=useContext(ourcontext)
      const [nodata, setnodata] = useState(false)
      const [age, setage] = useState("All")

      useEffect(() => {
        callfetch(age)
     
      }, [age])
      
 const [searcheuser, setsearcheuser] = useState("")



 useEffect(() => {
  if (searcheuser.trim()=="") {

    fetchTokens()
    
  }
 }, [searcheuser])
 
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchTokens = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "tokenslist"));
      const tokenList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log(tokenList,"too")
      setTokens(tokenList);
    } catch (error) {
      console.error("Error fetching tokens:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
   

    fetchTokens();
  }, []);
  async function getmonthsorders(months) {
    const today = new Date();
    const pastDate = new Date();
    pastDate.setMonth(today.getMonth() - months); // Get the date 3 months ago

    const startTimestamp = Timestamp.fromDate(pastDate);  // Convert JS Date to Firestore Timestamp

    const q = query(
        collection(db, "tokenslist"), 
        where("createdAt", ">=", startTimestamp) ,
        orderBy("createdAt", "desc") // Newest first // Get orders from the last 3 months
    );

    const querySnapshot = await getDocs(q);
    let orders = [];
    querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
    });
    if(orders.length==0){
      setnodata(true)
     }else{
      setnodata(false)
     }
    console.log(orders,"months order");
    setTokens(orders)

    return orders;
}
  async function getTodayOrders() {
    const today = new Date();
    
    // Set start of the day (00:00:00)
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const startTimestamp = Timestamp.fromDate(startOfDay);
  
    // Set end of the day (23:59:59)
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));
    const endTimestamp = Timestamp.fromDate(endOfDay);
  
    const q = query(
      collection(db, "tokenslist"),
      where("createdAt", ">=", startTimestamp),
      where("createdAt", "<=", endTimestamp),
      orderBy("createdAt", "desc") // Newest first
    );
  
    const querySnapshot = await getDocs(q);
    let orders = [];
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });
    if(orders.length==0){
      setnodata(true)
     }else{
      setnodata(false)
     }
    console.log(orders, "Today's Orders");
    setTokens(orders); // Ensure this is correctly defined in your component state
  
    return orders;
  }


  async function getRecentWeekOrders() {
      const today = new Date();
      const pastDate = new Date();
      pastDate.setDate(today.getDate() - 7); // Get the date 7 days ago
  
      const startTimestamp = Timestamp.fromDate(pastDate);  // Convert JS Date to Firestore Timestamp
  
      const q = query(
          collection(db, "tokenslist"),
          where("createdAt", ">=", startTimestamp), // Get orders from the last 7 days
          orderBy("createdAt", "desc")  // Sort by newest first
      );
  
      const querySnapshot = await getDocs(q);
      let orders = [];
      querySnapshot.forEach((doc) => {
          orders.push({ id: doc.id, ...doc.data() });
      });
      if(orders.length==0){
        setnodata(true)
       }else{
        setnodata(false)
       }
      console.log(orders ,"weekordrsss");
      setTokens(orders)

      return orders;
  }
  async function getyesterdayorder() {
    const today = new Date();
    const pastDate = new Date();
    pastDate.setDate(today.getDate() - 2); // Get the date 7 days ago

    const startTimestamp = Timestamp.fromDate(pastDate);  // Convert JS Date to Firestore Timestamp

    const q = query(
        collection(db,"tokenslist"),
        where("createdAt", ">=", startTimestamp), // Get orders from the last 7 days
        orderBy("createdAt", "desc")  // Sort by newest first
    );

    const querySnapshot = await getDocs(q);
    let orders = [];
    querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
    });

    console.log(orders ,"yesterday");
    if(orders.length==0){
      setnodata(true)
     }else{
      setnodata(false)
     }
    setTokens(orders)

    return orders;
}
  function callfetch(age) {
    switch (age) {
        case  "All":
          fetchTokens()
          
            break;
      case "Week":
          getRecentWeekOrders()
     
        break ;

        case "Month":
getmonthsorders(1)

        break ;
        case "Year":
            getmonthsorders(12)
            
                    break ;
                    case "Yesterday":
                      getyesterdayorder(1)
                      
                              break ;
                              case "Today":
                                getTodayOrders(1)
                                
                                        break ;
                    

        
        default:fetchTokens()
     
            break;
    }
}
 
 async function searchfilteruserdata(params) {
  

  if (searcheuser.trim()!="" && searcheuser.includes("@mbits.ac.in") || searcheuser.includes("@gmail.com")) {
    setLoading(true);
   try {
    const querySnapshot = await getDocs(collection(db, "tokenslist"));
    const tokenList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log(tokenList,"too")
    let filt=tokenList.filter((item)=>item.email===searcheuser.trim())
    console.log(filt,"filt")
    setTokens(filt);
  } catch (error) {
    console.error("Error fetching tokens:", error);
  } finally {
    setLoading(false);
  }
  }
}
  

  if (!user){
    return <Loginpage/>
  }
  return (
    <div style={{ padding: 20,minHeight:"70vh" }}>
      <Typography variant="h5" gutterBottom>
        Token List
      </Typography>
      <Stack width={"100%"} direction={{sx:"column",md:"row"}} spacing={{md:5,lg:2}} >
      <Box width={{sx:"100%",md:"40%"}} display={"flex"} alignItems={"center"} justifyContent={"space-between"} height={"5vh"}  >

<TextField id="outlined-basic" label="search student  with email" sx={{width:"80%"}} value={searcheuser}  onChange={(e)=>setsearcheuser(e.target.value)} variant="outlined" />
<Button onClick={searchfilteruserdata} variant="contained" sx={{mx:2}}>Search</Button>
  </Box>

  <FormControl  sx={{ m: 5, minWidth: 150,width:"80%" }}>
<Select  
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={e=>setage(e.target.value)}
        >
          <MenuItem value={"All"}>All</MenuItem>
          <MenuItem value={"Today"}>Today</MenuItem>
          <MenuItem value={"Yesterday"}> Yesterday</MenuItem>

          <MenuItem value={"Week"}>Last Week</MenuItem>
          <MenuItem value={"Month"}> Last Month</MenuItem>
          <MenuItem value={"Year"}> LastYear</MenuItem>
        </Select>
</FormControl>
      </Stack>
  
   

     
      {/* <Select  
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={"All"}>All</MenuItem>
          <MenuItem value={"Today"}>Today</MenuItem>
          <MenuItem value={"Yesterday"}> Yesterday</MenuItem>

          <MenuItem value={"Week"}>Last Week</MenuItem>
          <MenuItem value={"Month"}> Last Month</MenuItem>
          <MenuItem value={"Year"}> LastYear</MenuItem>
        </Select> */}
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Name</b></TableCell>
                <TableCell><b>From</b></TableCell>
                <TableCell><b>To</b></TableCell>
                <TableCell><b>Sub Junction</b></TableCell>
                <TableCell><b>Booked for Date</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell><b>Success ID</b></TableCell>
                <TableCell><b>Semester</b></TableCell>
                <TableCell><b>Department</b></TableCell>
                <TableCell><b>Division</b></TableCell>
                <TableCell><b>Email</b></TableCell>
               
                <TableCell><b>Time</b></TableCell>
              

              </TableRow>
            </TableHead>
            <TableBody>
              { tokens.length>0 ? tokens.map((token) => (
                <TableRow key={token.id}>
                  <TableCell>{token.name}</TableCell>
                  <TableCell>{token.fromLocation}</TableCell>
                  
                  <TableCell>{token.toLocation}</TableCell>
                  <TableCell>{token.subjunction}</TableCell>
                  <TableCell>{token.Bookingdate}</TableCell>
                  <TableCell>{token.status}</TableCell>
                  <TableCell>{token.successid}</TableCell>
                  <TableCell>{token.semister}</TableCell>
                  <TableCell>{token.department}</TableCell>
                  <TableCell>{token.division}</TableCell>
                  <TableCell>{token.email}</TableCell>
                  <TableCell>{token.time}</TableCell>
                  
                </TableRow>
              )) :<Box display="flex" justifyContent="center" alignItems="center" height="50vh" width="100%" >
                <Typography variant="h5" color="error" >No Data Available</Typography>  
                </Box>}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default TokenListShow;
