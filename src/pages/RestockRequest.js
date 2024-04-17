import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const SendRestockRequest = () => {
  const [parts, setParts] = useState([]);
  const [selectedParts, setSelectedParts] = useState([]);

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

  const handleTogglePart = (partId) => {
    setSelectedParts((prevSelected) =>
      prevSelected.includes(partId)
        ? prevSelected.filter((id) => id !== partId)
        : [...prevSelected, partId]
    );
  };

  const handleSendRequest = async () => {
    try {
      const requestsCollection = collection(db, "requests");
      const currentDate = new Date().toISOString();

      const batch = selectedParts.map((partId) => {
        const part = parts.find((p) => p.id === partId);
        const Quantity = 70 - part.Stock;
        const Price = Quantity * part.Price;

        return {
          partId,
          partName: part.partName,
          Quantity,
          Price,
          date: currentDate,
        };
      });

      await Promise.all(
        batch.map((request) => addDoc(requestsCollection, request))
      );

      setSelectedParts([]);
      alert("Restock request sent successfully!");
    } catch (error) {
      console.error("Error sending restock request:", error);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" mt={4} mb={2}>
        Send Restock Request
      </Typography>
      <div>
        {parts.map((part) => (
          <div key={part.id}>
            <input
              type="checkbox"
              checked={selectedParts.includes(part.id)}
              onChange={() => handleTogglePart(part.id)}
            />
            <Typography variant="body1" component="span">
              {part.partName} (Stock: {part.Stock})
            </Typography>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "20px" }}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/SP"
          sx={{ mr: 2 }}
        >
          Back to Salesperson
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendRequest}
          disabled={selectedParts.length === 0}
        >
          Send Request
        </Button>
      </div>
    </Container>
  );
};

export default SendRestockRequest;
