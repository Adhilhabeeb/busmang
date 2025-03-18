import React, { useContext, useEffect, useState } from "react";

import { collection, getDocs } from "firebase/firestore";
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
import { db } from "./Firebase";
import { ourcontext } from "./App";
import { i } from "framer-motion/client";
import { Login } from "@mui/icons-material";
import Loginpage from "./Login";

function TokenListShow() {
      let {user}=useContext(ourcontext)
 
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tokens"));
        const tokenList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTokens(tokenList);
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
    <div style={{ padding: 20 }}>
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
              {tokens.map((token) => (
                <TableRow key={token.id}>
                  <TableCell>{token.name}</TableCell>
                  <TableCell>{token.fromLocation}</TableCell>
                  <TableCell>{token.toLocation}</TableCell>
                  <TableCell>{token.status}</TableCell>
                  <TableCell>{token.successid}</TableCell>
                  <TableCell>{token.semister}</TableCell>
                  <TableCell>{token.department}</TableCell>
                  <TableCell>{token.division}</TableCell>
                  <TableCell>{token.email}</TableCell>
                  <TableCell>{token.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default TokenListShow;
