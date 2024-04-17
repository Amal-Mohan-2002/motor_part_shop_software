import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const OwnerPage = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" mt={4} mb={2}>
        Owner Page
      </Typography>
      <div>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/view"
          sx={{ marginRight: 2, marginBottom: 2 }}
        >
          View Available Parts
        </Button>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/add"
          sx={{ marginRight: 2, marginBottom: 2 }}
        >
          Add Parts
        </Button>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/reqsar"
          sx={{ marginRight: 2, marginBottom: 2 }}
        >
          Restock Requests
        </Button>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/stats"
          sx={{ marginBottom: 2 }}
        >
          Check Statistics
        </Button>
      </div>
    </Container>
  );
};

export default OwnerPage;
