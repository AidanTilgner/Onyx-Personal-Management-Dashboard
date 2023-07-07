import React from "react";
import styles from "./index.module.scss";
import Notes from "./Notes/Notes";

function index() {
  return (
    <div className={styles.knowledge_base}>
      <Notes />
    </div>
  );
}

export default index;
