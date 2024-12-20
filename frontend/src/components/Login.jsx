import React, { useState } from "react";
import axios from "../axios/axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if(!email || !password){
      setError("All fields are required!");
      setTimeout(() => {
        setError(null);
      }, 2000);
      return;
    }
    try {
      setIsPending(true);
      const body = {
        email: email,
        password: password,
      };
      const response = await axios.post("/login", body);
      if (!response.status === 200) {
        setError(response.data.message || "Something went wrong!");
      }
      localStorage.setItem("token", response.data.authToken);
      localStorage.setItem("user", body.email);
      setError(null);
      setEmail("");
      setPassword("");
      setIsPending(false);
      navigate("/");
    } catch (error) {
      console.error(error);
      setError(
        error.message || error.response?.data?.message || "Something went wrong!"
      );
      setIsPending(false);
    }
  };

  return (
    <div className="container">
      <div className="login-form">
        <h1 className="login-title">Login</h1>
        <div className="form">
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
              placeholder="password"
              required
            />
          </div>
          <div className="submit-btn">
            {isPending ? (
              <button onClick={handleLogin} disabled={isPending} className="btn disabled">
                Logging in...
              </button>
            ) : (
              <button onClick={handleLogin} disabled={isPending} className="btn">
                Login
              </button>
            )}
          </div>
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;
