import React, { FormEvent, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const { isAuthenticated, name } = user;

  const handleLogout = (e: FormEvent) => {
    e.preventDefault();
    setUser({ isAuthenticated: false });
    navigate("/login");
  };

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img src="logo.jpeg" width="28" height="28" alt="hexal logo" />
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <a href="/" className="navbar-item">
            Home
          </a>
          <a href="/products" className="navbar-item">
            Products
          </a>
          <a href="/admin" className="navbar-item">
            Admin
          </a>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {!isAuthenticated ? (
                <>
                  <a href="/register" className="button is-primary">
                    <strong>Register</strong>
                  </a>
                  <a href="/login" className="button is-light">
                    Log in
                  </a>
                </>
              ) : (
                <>
                  <span>Welcome {name}! </span>
                  <a
                    href="/"
                    className="button is-light"
                    onClick={handleLogout}
                  >
                    Log out
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
