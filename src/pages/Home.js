import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import BuildIcon from "@mui/icons-material/Build";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";

const HomePage = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Motor Parts App
          </Typography>
          {/* Use Link component to navigate to SignInPage */}
          <Button color="inherit" component={Link} to="/signin">
            Sign In
          </Button>
          {/* Use Link component to navigate to SignUpPage */}
          <Button color="inherit" component={Link} to="/signup">
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Typography variant="h3" component="h1" align="center" mt={4}>
          Welcome to Motor Parts App
        </Typography>
        <Typography variant="body1" component="p" align="center" mt={2}>
          Explore our wide range of motor parts and accessories.
        </Typography>

        <Grid container spacing={3} mt={4}>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <SearchIcon sx={{ fontSize: 50 }} />
                <Typography variant="h6" component="h2" mt={2}>
                  Find Parts Easily
                </Typography>
                <Typography variant="body2" component="p">
                  Search our catalog to find the exact parts you need for your
                  motor vehicle.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <BuildIcon sx={{ fontSize: 50 }} />
                <Typography variant="h6" component="h2" mt={2}>
                  Quality Parts
                </Typography>
                <Typography variant="body2" component="p">
                  We offer high-quality motor parts and accessories from trusted
                  manufacturers.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <ShoppingCartIcon sx={{ fontSize: 50 }} />
                <Typography variant="h6" component="h2" mt={2}>
                  Easy Ordering
                </Typography>
                <Typography variant="body2" component="p">
                  Place orders quickly and securely through our user-friendly
                  interface.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default HomePage;
