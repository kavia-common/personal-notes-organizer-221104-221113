import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import NotesList from "./components/NotesList";
import NoteEditorModal from "./components/NoteEditorModal";
import FloatingActionButton from "./components/FloatingActionButton";
import { NotesAPI } from "./api";

// PUBLIC_INTERFACE
function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [editorOpen, setEditorOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const sortedNotes = useMemo(
    () =>
      [...notes].sort(
        (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      ),
    [notes]
  );

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await NotesAPI.list();
        if (mounted) {
          setNotes(data);
        }
      } catch (e) {
        setErrorMsg(`Failed to fetch notes: ${e.message}`);
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const openCreate = () => {
    setEditing(null);
    setEditorOpen(true);
  };

  const openEdit = (note) => {
    setEditing(note);
    setEditorOpen(true);
  };

  const closeEditor = () => {
    setEditorOpen(false);
  };

  const handleSave = async (payload) => {
    try {
      setErrorMsg("");
      if (editing?.id) {
        const id = editing.id;
        // optimistic update
        setNotes((prev) =>
          prev.map((n) => (n.id === id ? { ...n, ...payload } : n))
        );
        const updated = await NotesAPI.update(id, {
          title: payload.title || "Untitled",
          content: payload.content || "",
        });
        setNotes((prev) => prev.map((n) => (n.id === id ? updated : n)));
      } else {
        // optimistic prepend
        const temp = {
          id: `temp-${Date.now()}`,
          title: payload.title || "Untitled",
          content: payload.content || "",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        setNotes((prev) => [temp, ...prev]);
        const created = await NotesAPI.create({
          title: payload.title || "Untitled",
          content: payload.content || "",
        });
        setNotes((prev) => [created, ...prev.filter((n) => n.id !== temp.id)]);
      }
      setEditorOpen(false);
    } catch (e) {
      setErrorMsg(e.message || "Failed to save note");
    }
  };

  const handleDelete = async (note) => {
    try {
      setErrorMsg("");
      const prev = notes;
      setNotes((curr) => curr.filter((n) => n.id !== note.id));
      try {
        await NotesAPI.remove(note.id);
      } catch (e) {
        // revert on failure
        setNotes(prev);
        throw e;
      }
    } catch (e) {
      setErrorMsg(e.message || "Failed to delete note");
    }
  };

  return (
    <div className="app">
      <div className="gradient-bg" />
      <Header />
      <main className="container">
        {errorMsg && <div className="alert alert--error">{errorMsg}</div>}
        {loading ? (
          <div className="loading">Loading notes...</div>
        ) : (
          <NotesList notes={sortedNotes} onEdit={openEdit} onDelete={handleDelete} />
        )}
      </main>

      <FloatingActionButton onClick={openCreate} />
      <NoteEditorModal
        open={editorOpen}
        initial={editing}
        onClose={closeEditor}
        onSave={handleSave}
      />
    </div>
  );
}

export default App;
