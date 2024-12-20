import React, { useState } from "react";
import axios from "../axios/axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if(!username || !email || !password || !confirmPass ){
      setError("All fields are required!");
      setTimeout(() => {
        setError(null);
      }, 2000);
      return;
    }
    else if (
      password.length === 0 ||
      confirmPass.length === 0 ||
      password !== confirmPass
    ) {
      setError("Passwords don't match!");
      setTimeout(() => {
        setError(null);
      }, 2000);
      return;
    }
    try {
      setIsPending(true);
      const body = {
        username: username,
        email: email,
        password: password,
      };
      const response = await axios.post("/register", body);
      if (response.status !== 200) {
        setError(response.data.message || "Something went wrong!");
        setIsPending(false);
        return;
      }
      setError(null);
      setUsername("");
      setPassword("");
      setConfirmPass("");
      setEmail("");
      setIsPending(false);
      navigate("/auth/login");
    } catch (error) {
      console.error(error);
      setError(
        error.message ||
          error.response?.data?.message ||
          "Something went wrong!"
      );
      setIsPending(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h1 className="register-title">Register</h1>
        <div className="form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value.trim())}
              placeholder="John Doe"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
              placeholder="johndoe123@gmail.com"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value.trim())}
              placeholder="Password"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmpass">Confirm Password</label>
            <input
              type="password"
              id="confirmpass"
              name="confirmpass"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value.trim())}
              placeholder="Confirm Password"
              required
            />
          </div>
          <div className="submit-btn">
            {isPending ? (
              <button
                onClick={handleRegister}
                disabled={isPending}
                className="btn disabled"
              >
                Creating...
              </button>
            ) : (
              <button
                onClick={handleRegister}
                disabled={isPending}
                className="btn"
              >
                Register
              </button>
            )}
          </div>
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default Register;
