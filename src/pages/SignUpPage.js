import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("owner");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleSignUp = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up successfully
        const user = userCredential.user;
        console.log("User signed up:", user);
        // Redirect or navigate to the login page
        navigate("/signin"); // Use navigate instead of history.push
      })
      .catch((error) => {
        setError(error.message);
        console.error("Error signing up:", error);
      });
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" component="h1" align="center" mt={4}>
        Sign Up
      </Typography>
      {error && (
        <Typography variant="body1" color="error" align="center" mt={2}>
          {error}
        </Typography>
      )}
      <TextField
        label="Email"
        type="email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="account-type-label">Account Type</InputLabel>
        <Select
          labelId="account-type-label"
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)}
        >
          <MenuItem value="owner">Owner</MenuItem>
          <MenuItem value="customer">Customer</MenuItem>
          <MenuItem value="salesperson">Salesperson</MenuItem>
        </Select>
      </FormControl>
      <div>
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
        </Box>
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            component={Link}
            to="/"
          >
            Back to Home
          </Button>
        </Box>
        {/* Sign up form and other components */}
      </div>
    </Container>
  );
};

export default SignUpPage;
