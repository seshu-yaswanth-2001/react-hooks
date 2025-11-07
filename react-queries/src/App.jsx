import React from "react";
import PostListing from "./components/PostListing";
import "./app.css";
import PostDetail from "./components/PostDetail";
import Home from "./components/Home";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<PostListing />} />
          <Route path="/posts/:id" element={<PostDetail />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
