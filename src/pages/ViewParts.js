import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const ViewPartsPage = () => {
  const [parts, setParts] = useState([]);

  // Fetch available parts from Firestore
  useEffect(() => {
    const fetchParts = async () => {
      try {
        const partsCollection = collection(db, "parts");
        const snapshot = await getDocs(partsCollection);
        const partsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setParts(partsData);
      } catch (error) {
        console.error("Error fetching parts:", error);
      }
    };

    fetchParts();
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" mt={4} mb={2}>
        View Parts
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Part ID</TableCell>
              <TableCell>Part Name</TableCell>
              <TableCell>Part Description</TableCell>
              <TableCell>Price (INR)</TableCell>
              <TableCell>Stock</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {parts.map((part) => (
              <TableRow key={part.id}>
                <TableCell>{part.partId}</TableCell>
                <TableCell>{part.partName}</TableCell>
                <TableCell>{part.Description}</TableCell>
                <TableCell>{part.Price}</TableCell>
                <TableCell>{part.Stock}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/owner"
        sx={{ mt: 2 }}
      >
        Back
      </Button>
    </Container>
  );
};

export default ViewPartsPage;
