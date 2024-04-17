import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const requestsCollection = collection(db, "requests");
        const snapshot = await getDocs(requestsCollection);
        const requestsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRequests(requestsData);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const handleApprove = async () => {
    try {
      // Perform approval actions here
      // For example, you can place orders for restocking

      // Clear the requests collection after approval
      const requestsCollection = collection(db, "requests");
      await Promise.all(
        requests.map((request) =>
          deleteDoc(doc(requestsCollection, request.id))
        )
      );

      setSnackbarMessage("Requests approved. Items ordered for restock.");
      setShowSnackbar(true);
    } catch (error) {
      console.error("Error approving requests:", error);
    }
  };

  const handleReject = async () => {
    try {
      // Clear the requests collection after rejection
      const requestsCollection = collection(db, "requests");
      await Promise.all(
        requests.map((request) =>
          deleteDoc(doc(requestsCollection, request.id))
        )
      );

      setSnackbarMessage("Requests rejected.");
      setShowSnackbar(true);
    } catch (error) {
      console.error("Error rejecting requests:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  return (
    <div>
      <h2>Restock Requests</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.partId}</TableCell>
                <TableCell>{request.partName}</TableCell>
                <TableCell>{request.quantity}</TableCell>
                <TableCell>{request.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ marginTop: "20px" }}>
        <Button variant="contained" color="primary" onClick={handleApprove}>
          Approve
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleReject}
          style={{ marginLeft: "10px" }}
        >
          Reject
        </Button>
      </div>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/owner"
        style={{ marginTop: "20px" }}
      >
        Back to Owner
      </Button>
    </div>
  );
};

export default Requests;
