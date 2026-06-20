import React, { useState } from "react";
import "../styles/auth.scss";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { loading, handleLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const data = await handleLogin({ email, password });
      console.log("Login success, response=", data);
      navigate("/");
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || "Login failed";
      setError(msg);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Login</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="identifier" className="auth-label">
              Username or Email
            </label>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              id="identifier"
              name="identifier"
              type="text"
              placeholder="Enter your username or email"
              className="auth-input"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="password" className="auth-label">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              className="auth-input"
              required
            />
          </div>

          <button type="submit" className="auth-button">
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {error && <p className="auth-error">{error}</p>}

        <p className="auth-footer">
          New here?{" "}
          <a href="/register" className="auth-link">
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
