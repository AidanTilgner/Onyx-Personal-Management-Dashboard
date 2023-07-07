import React, { useEffect } from "react";
import styles from "./Notes.module.scss";
import Search from "../../../../components/Search/Search";
import { useSearch } from "../../../../Contexts/Search";
import { useGetNotes } from "../../../../Hooks/fetching/services/knowledge_base/notes";
import NoteForm from "./components/NoteForm";
import NoteCard from "./components/NoteCard";

function Notes() {
  const { query } = useSearch();

  const { data: notes, load: reloadNotes } = useGetNotes({
    runOnMount: true,
  });

  const filteredNotes = () => {
    if (!notes) return [];
    const filteredNotes = notes.filter((note) => {
      const asString = JSON.stringify(note);
      return asString.toLowerCase().includes(query.toLowerCase());
    });
    return filteredNotes;
  };

  return (
    <div className={styles.notes}>
      <div className={styles.searchContainer}>
        <Search placeholder="Search notes..." />
      </div>
      <div className={styles.noteFormContainer}>
        <NoteForm
          afterCreate={() => {
            reloadNotes();
          }}
        />
      </div>
      <div className={styles.notesContainer}>
        {filteredNotes() && filteredNotes().length > 0 ? (
          <div className={styles.notesList}>
            {filteredNotes().map((note) => (
              <NoteCard
                title={note.title}
                content={note.content}
                createdAt={note.createdAt}
                updatedAt={note.updatedAt}
              />
            ))}
          </div>
        ) : (
          <p className={styles.disclaimer}>No notes yet.</p>
        )}
      </div>
    </div>
  );
}

export default Notes;
