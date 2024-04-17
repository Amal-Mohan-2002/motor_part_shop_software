import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
import CustomerPage from "./pages/Customer";
import OrderPage from "./pages/Order";
import HistoryPage from "./pages/History";
import OwnerPage from "./pages/Owner";
import ViewPartsPage from "./pages/ViewParts";
import AddPartsPage from "./pages/AddParts";
import Stats from "./pages/Stats";
import Salesperson from "./pages/Salesperson";
import SendRestockRequest from "./pages/RestockRequest";
import Requests from "./pages/Requests";
import Allorders from "./pages/Allorders";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/customer" element={<CustomerPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/his" element={<HistoryPage />} />
          <Route path="/owner" element={<OwnerPage />} />
          <Route path="/view" element={<ViewPartsPage />} />
          <Route path="/add" element={<AddPartsPage />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/SP" element={<Salesperson />} />
          <Route path="/req" element={<SendRestockRequest />} />
          <Route path="/reqsar" element={<Requests />} />
          <Route path="/allorders" element={<Allorders />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
