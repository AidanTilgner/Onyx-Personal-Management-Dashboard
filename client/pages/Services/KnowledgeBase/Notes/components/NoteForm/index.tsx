import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { Note } from "../../../../../../declarations/services/knowledge_base";
import { useCreateNote } from "../../../../../../Hooks/fetching/services/knowledge_base/notes";
import { showNotification } from "@mantine/notifications";
import { Plus } from "@phosphor-icons/react";

interface NoteFormProps {
  afterCreate?: () => void;
}

function NoteForm({ afterCreate }: NoteFormProps) {
  const [formState, setFormState] = useState<Partial<Note>>({
    title: "",
    content: "",
  });

  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  const titleFilled = formState.title && formState.title?.length > 0;
  const contentFilled = formState.content && formState.content?.length > 0;

  const focusedOrFilled = focused || titleFilled || contentFilled;

  useEffect(() => {
    if (formState.title === "" && formState.content !== "") {
      setFormState({ ...formState, content: "" });
    }
  }, [formState]);

  const { load: createNote } = useCreateNote(
    {
      title: formState.title || "",
      content: formState.content || "",
    },
    {
      dependencies: [formState],
    }
  );

  const handleCreateNote = async () => {
    try {
      setLoading(true);
      const response = await createNote();
      setLoading(false);

      if (response) {
        showNotification({
          title: "Success",
          message: "Note created successfully.",
        });

        setFormState({ title: "", content: "" });

        if (afterCreate) {
          afterCreate();
        }
        return;
      }

      showNotification({
        title: "Error",
        message: "An error occurred while creating the note.",
        color: "red",
      });

      console.log("Response: ", response);

      return response;
    } catch (error) {
      setLoading(false);
      console.error(error);
      showNotification({
        title: "Error",
        message: "An error occurred while creating the note.",
        color: "red",
      });
    }
  };

  return (
    <div
      className={`${styles.noteForm} ${focusedOrFilled ? styles.focused : ""}`}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={() => setFocused(false)}
    >
      <div className={styles.noteTitleContainer}>
        <input
          type="text"
          placeholder="New note..."
          className={`${styles.noteTitle} ${
            focusedOrFilled ? styles.noteTitleFocused : ""
          } ${titleFilled ? styles.noteTitleFilled : ""}`}
          value={formState.title}
          onChange={(e) =>
            setFormState({ ...formState, title: e.target.value })
          }
        />
      </div>
      {titleFilled && (
        <div className={styles.noteContentContainer}>
          <textarea
            placeholder="Note content..."
            className={`${styles.noteContent} ${
              focusedOrFilled ? styles.noteContentFocused : ""
            } ${contentFilled ? styles.noteContentFilled : ""}`}
            value={formState.content}
            onChange={(e) =>
              setFormState({ ...formState, content: e.target.value })
            }
          />
        </div>
      )}
      {titleFilled && contentFilled && focusedOrFilled && (
        <div className={styles.noteActionsContainer}>
          <div className={styles.noteActions}>
            <button
              className={styles.noteAction}
              onClick={handleCreateNote}
              title="Create note"
            >
              <Plus weight="bold" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NoteForm;
