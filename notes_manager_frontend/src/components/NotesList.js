import React from "react";
import NoteCard from "./NoteCard";

/** Grid list of notes */
// PUBLIC_INTERFACE
export default function NotesList({ notes, onEdit, onDelete }) {
  if (!notes?.length) {
    return <p className="empty">No notes yet. Click + to add one.</p>;
  }
  return (
    <section className="notes-grid">
      {notes.map((n) => (
        <NoteCard key={n.id} note={n} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </section>
  );
}
