import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("User signed in:", user);
        // Check if the user ID matches the specified ID
        if (user.uid === "Np3k45RF3FeKqeuyp4EGtLsjTax2") {
          navigate("/customer"); // Redirect to CustomerPage
        } else {
          // Redirect to appropriate page for other user types
          // Add logic here for other user types
        }
      })
      .catch((error) => {
        setError(error.message);
        console.error("Error signing in:", error);
      });
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" component="h1" align="center" mt={4}>
        Sign In
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
      <div>
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSignIn}
          >
            Sign In
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
      </div>
    </Container>
  );
};

export default SignInPage;
