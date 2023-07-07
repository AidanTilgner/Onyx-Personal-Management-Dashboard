import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./index.module.scss";
import Navbar from "../../components/Navigation/Navbar";

function index() {
  return (
    <div className={styles.main}>
      <Navbar />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}

export default index;
