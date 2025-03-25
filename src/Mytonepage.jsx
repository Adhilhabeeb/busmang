import React, { useContext, useEffect, useState } from 'react'
import { addDoc, collection, serverTimestamp , query,
  orderBy,
  onSnapshot,getDocs,
  limit, } from "firebase/firestore";
import { ourcontext } from './App';
import { db } from './Firebase';
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
} from "@mui/material";
import dayjs from "dayjs";
import Loginpage from './Login';
function Mytonepage() {

  const { user, setuser, admin } = useContext(ourcontext);
    const [tokens, setTokens] = useState([]);
    const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tokenslist"));
        const tokenList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log(tokenList,"too",user)

        let filt=tokenList.filter((item)=>item.email===user.email)
        console.log(filt,"filt")
        setTokens(filt);
      } catch (error) {
        console.error("Error fetching tokens:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);
 
  if (!user){
    return <Loginpage/>
  }
  return (
    <div style={{ padding: 20,minHeight:"70vh" }}>
      <Typography variant="h5" gutterBottom>
        Token List
      </Typography>
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
                <TableCell><b>Booking for date </b></TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {tokens.map((token) => (
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
                  <TableCell>


                   
            Selected Date: {dayjs(token.Bookingdate).format("YYYY-MM-DD")}
        
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default Mytonepage