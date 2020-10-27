import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";

const Home = () => {
  return (
    <Base title="home page" description="EXAMINATION APP">
      <h1>questions</h1>
    </Base>
  );
};

export default Home;
