import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Assuming you've set up Firebase
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const AddPartsPage = () => {
  const [partId, setPartId] = useState("");
  const [partName, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [Stock, setStock] = useState(0);
  const [Price, setPrice] = useState(0);

  const handleAddPart = async () => {
    try {
      const partsCollection = collection(db, "parts");
      await addDoc(partsCollection, {
        partId,
        partName,
        Description,
        Stock,
        Price,
      });
      alert("Part added successfully!");
      // Clear input fields after adding part
      setPartId("");
      setName("");
      setDescription("");
      setStock(0);
      setPrice(0);
    } catch (error) {
      console.error("Error adding part:", error);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" mt={4} mb={2}>
        Add Parts
      </Typography>
      <TextField
        label="Part ID"
        variant="outlined"
        fullWidth
        margin="normal"
        value={partId}
        onChange={(e) => setPartId(e.target.value)}
      />
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={partName}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        margin="normal"
        value={Description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        label="Stock"
        type="number"
        variant="outlined"
        fullWidth
        margin="normal"
        value={Stock}
        onChange={(e) => setStock(parseInt(e.target.value))}
      />
      <TextField
        label="Price"
        type="number"
        variant="outlined"
        fullWidth
        margin="normal"
        value={Price}
        onChange={(e) => setPrice(parseFloat(e.target.value))}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddPart}
        fullWidth
        mt={2}
      >
        Add
      </Button>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/owner"
        fullWidth
        mt={2}
      >
        Back
      </Button>
    </Container>
  );
};

export default AddPartsPage;
