import React from "react";

/** Header component with Ocean Professional styling */
// PUBLIC_INTERFACE
export default function Header() {
  return (
    <header className="header">
      <div className="header__brand">
        <div className="header__logo">🗒️</div>
        <div>
          <h1 className="header__title">Notes Manager</h1>
          <p className="header__subtitle">Capture thoughts with clarity</p>
        </div>
      </div>
      <div className="header__right">
        <span className="tag">Ocean Professional</span>
      </div>
    </header>
  );
}
