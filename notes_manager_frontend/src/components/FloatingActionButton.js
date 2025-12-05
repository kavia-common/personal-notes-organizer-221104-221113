import React from "react";

/** Floating action button for adding a new note */
// PUBLIC_INTERFACE
export default function FloatingActionButton({ onClick }) {
  return (
    <button className="fab" onClick={onClick} aria-label="Add note">
      +
    </button>
  );
}
