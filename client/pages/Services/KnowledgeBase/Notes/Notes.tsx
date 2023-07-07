import React from "react";
import styles from "./Notes.module.scss";
import Search from "../../../../components/Search/Search";
import { useSearch } from "../../../../Contexts/Search";
import { useGetNotes } from "../../../../Hooks/fetching/services/knowledge_base/notes";

function Notes() {
  const { query } = useSearch();

  console.log("Search query: ", query);

  const { data: notes } = useGetNotes({
    runOnMount: true,
  });

  console.log("Notes: ", notes);

  return (
    <div className={styles.notes}>
      <div className={styles.searchContainer}>
        <Search placeholder="Search notes..." />
      </div>
      <div className={styles.notesContainer}>
        {notes && notes.length > 0 ? (
          <div className={styles.notesList}>Notes here</div>
        ) : (
          <p className={styles.disclaimer}>No notes yet.</p>
        )}
      </div>
    </div>
  );
}

export default Notes;
