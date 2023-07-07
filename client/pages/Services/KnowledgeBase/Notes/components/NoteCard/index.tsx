import React from "react";
import styles from "./index.module.scss";

interface NoteCardProps {
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

function index({ title, content, createdAt, updatedAt }: NoteCardProps) {
  return (
    <div className={styles.noteCard}>
      <div className={styles.noteCardHeader}>
        <h3 className={styles.noteCardTitle}>{title}</h3>
        <p className={styles.noteCardDate}>{updatedAt}</p>
      </div>
      <p className={styles.noteCardContent}>{content}</p>
    </div>
  );
}

export default index;
