import React from "react";
import styles from "./index.module.scss";

interface NoteCardProps {
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

function index({ title, content, createdAt, updatedAt }: NoteCardProps) {
  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className={styles.noteCard}>
      <div className={styles.noteCardHeader}>
        <h3 className={styles.noteCardTitle}>{title}</h3>
        <p className={styles.noteCardDate}>{formatDate(updatedAt)}</p>
      </div>
      <div className={styles.noteCardContent}>
        <p className={styles.noteCardText}>{content}</p>
      </div>
    </div>
  );
}

export default index;
