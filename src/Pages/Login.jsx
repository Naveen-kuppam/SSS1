import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Style/Login.css";

function AuthForm() {
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      if (mode === "register") {
        const res = await axios.post("/register/", {
          username,
          email,
          password1: password,
          password2: password,
        });

        setMessage(res.data.message);
        setMode("login");
      } else if (mode === "login") {
        const res = await axios.post("/login/", {
          username,
          password,
        });

        setMessage(res.data.message || "Login successful");

        if (res.data.access) {
          localStorage.setItem("token", res.data.access);
        }

        localStorage.setItem(
          "user",
          JSON.stringify({
            id: res.data.user?.id,
            username: res.data.user?.username || username,
          })
        );

        navigate("/home");
      } else if (mode === "forgot") {
        setMessage("Forgot password API not connected yet");
      }
    } catch (err) {
      setMessage(
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Invalid username or password"
      );
    }
  };

  // ================== ADD TO CART FUNCTION ==================
  const addToCart = async (watchId, quantity = 1) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to add items to cart");
        return;
      }

      const res = await fetch("/api/cart/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
        },
        body: JSON.stringify({ watch_id: watchId, quantity }),
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message || "Item added to cart");
      } else {
        alert(data.error || "Failed to add item");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while adding to cart");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>
          {mode === "login"
            ? "Login"
            : mode === "register"
            ? "Register"
            : "Forgot Password"}
        </h2>

        <form onSubmit={handleSubmit}>
          {mode === "register" && (
            <>
              <input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </>
          )}

          {mode === "login" && (
            <input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}

          {mode !== "forgot" && (
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          )}

          {mode === "forgot" && (
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          )}

          <button type="submit">
            {mode === "login"
              ? "Login"
              : mode === "register"
              ? "Register"
              : "Send Reset Link"}
          </button>
        </form>

        <div className="auth-switch">
          {mode !== "login" && (
            <span onClick={() => setMode("login")}>Login</span>
          )}
          {mode !== "register" && (
            <span onClick={() => setMode("register")}>Register</span>
          )}
          {mode !== "forgot" && (
            <span onClick={() => setMode("forgot")}>Forgot Password</span>
          )}
        </div>

        {message && <p className="auth-message">{message}</p>}
      </div>
    </div>
  );
}

export default AuthForm;
