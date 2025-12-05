import React from "react";

/** A single note card */
// PUBLIC_INTERFACE
export default function NoteCard({ note, onEdit, onDelete }) {
  return (
    <article className="note-card" role="button" onClick={() => onEdit(note)}>
      <div className="note-card__content">
        <h3 className="note-card__title">{note.title || "Untitled"}</h3>
        {note.content && <p className="note-card__body">{note.content}</p>}
      </div>
      <div className="note-card__meta">
        <time title="Updated">{new Date(note.updated_at).toLocaleString()}</time>
        <button
          className="btn btn--danger"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(note);
          }}
          aria-label={`Delete ${note.title}`}
        >
          Delete
        </button>
      </div>
    </article>
  );
}
