import React, { useEffect, useRef, useState } from "react";

/** Modal dialog for creating or editing a note */
// PUBLIC_INTERFACE
export default function NoteEditorModal({ open, initial, onClose, onSave }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [content, setContent] = useState(initial?.content || "");
  const dialogRef = useRef(null);

  useEffect(() => {
    setTitle(initial?.title || "");
    setContent(initial?.content || "");
  }, [initial]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title: title.trim(), content: content.trim() });
  };

  return (
    <dialog ref={dialogRef} className="modal">
      <form method="dialog" className="modal__content" onSubmit={handleSubmit}>
        <h2 className="modal__title">{initial?.id ? "Edit Note" : "New Note"}</h2>

        <label className="field">
          <span className="field__label">Title</span>
          <input
            className="field__input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={255}
            placeholder="Enter a title"
            autoFocus
          />
        </label>

        <label className="field">
          <span className="field__label">Content</span>
          <textarea
            className="field__textarea"
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note..."
          />
        </label>

        <div className="modal__actions">
          <button type="button" className="btn btn--text" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn--primary">
            {initial?.id ? "Save Changes" : "Create Note"}
          </button>
        </div>
      </form>
    </dialog>
  );
}
