import React, { useContext, useEffect, useState } from "react";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import { db } from "./Firebase";
import { ourcontext } from "./App";
import Loginpage from "./Login";

function Showconcessiongranted() {
      const { user, setuser, admin } = useContext(ourcontext);
    
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "studentpass"),
      orderBy("createdAt", "desc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedMessages = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setFetchedData(fetchedMessages);
    });

    return () => unsubscribe();
  }, []);



  useEffect(() => {
   
console.log(fetchedData,"fff")

  }, [fetchedData])
  

    if (!user) {
      return <Loginpage />;
    }
  
  return (
    <TableContainer component={Paper} sx={{ maxWidth: 800, mx: "auto", mt: 5 }}>
      <Typography variant="h5" align="center" sx={{ my: 2 }}>
        Student Concession List
      </Typography>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: "lightgray" }}>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Age</strong></TableCell>
            <TableCell><strong>Date of Birth</strong></TableCell>
            <TableCell><strong>Department</strong></TableCell>
            <TableCell><strong>Admission Date</strong></TableCell>
            <TableCell><strong> Email</strong></TableCell>
            <TableCell><strong>Course</strong></TableCell>
            <TableCell><strong>generated at </strong></TableCell>

            
          </TableRow>
        </TableHead>
        <TableBody>
          {fetchedData.length > 0 ? (
            fetchedData.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.age}</TableCell>
                <TableCell>{student.dob}</TableCell>
                <TableCell>{student.department}</TableCell>
                <TableCell>{student.admissiondate}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.course}</TableCell>
                <TableCell>{student.dategenerated}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Showconcessiongranted;
