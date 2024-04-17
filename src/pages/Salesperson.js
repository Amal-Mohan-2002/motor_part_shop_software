import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const Salesperson = () => {
  return (
    <div style={{ textAlign: "center", paddingTop: "50px" }}>
      <h2>Salesperson Dashboard</h2>
      <div>
        <div style={{ margin: "10px" }}>
          <Link to="/allorders" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary">
              View Orders
            </Button>
          </Link>
        </div>
        <div style={{ margin: "10px" }}>
          <Link to="/view" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary">
              View Parts
            </Button>
          </Link>
        </div>
        <div style={{ margin: "10px" }}>
          <Link to="/stats" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary">
              Check Statistics
            </Button>
          </Link>
        </div>
        <div style={{ margin: "10px" }}>
          <Link to="/req" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary">
              Send Restock Request
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Salesperson;
