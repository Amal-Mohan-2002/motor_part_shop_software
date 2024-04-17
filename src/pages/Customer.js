import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const CustomerPage = () => {
  return (
    <Container maxWidth="md">
      <Box mt={5} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Welcome, Customer!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={Link}
          to="/order"
          sx={{ mr: 2 }}
        >
          Order
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={Link}
          to="/his"
          sx={{ mr: 2 }}
        >
          Order History
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={Link}
          to="/accountinfo"
        >
          Account Information
        </Button>
      </Box>
    </Container>
  );
};

export default CustomerPage;
