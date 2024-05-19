import React, { useState } from "react";
import "../stylesheet.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Login() {
  // declaring needed states
  const navigate = useNavigate();
  const [username, changeUsername] = useState("");
  const [password, changePassword] = useState("");

  // handling username and password
  const handleChangeUsername = (e) => {
    changeUsername(e.target.value);
  };
  const handleChangePassword = (e) => {
    changePassword(e.target.value);
  };

  // handling submit request
  const handleSubmit = async (e) => {
    e.preventDefault();
    let usernameError = "",
      passwordError = "";
    if (username.length <= 4)
      usernameError = "Username should have minimum 5 charecters";
    if (password.length <= 4)
      passwordError = "Password should have minimum 5 charecters";
    if (usernameError || passwordError) {
      alert(usernameError + "\n" + passwordError);
      return;
    }

    // post request to the server
    const data = { username, password };
    // alert(data);
    await axios
      .post("http://localhost:4004/api/login", data)
      .then((res) => {
        console.log(res);
        if (res.data.success) navigate(`/chat/${username}`);
        else {
          alert("Wrong Login Credentials");
          return;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="backgroundLogin">
      <form onSubmit={handleSubmit} className="loginCard" action="">
        <input
          onChange={(e) => handleChangeUsername(e)}
          className="username"
          type="text"
          placeholder="enter your username"
        />
        <input
          onChange={(e) => handleChangePassword(e)}
          className="username"
          type="password"
          placeholder="enter your password"
        />
        <button className="btn" type="submit">
          Submit
        </button>
        <a
          href="/signup"
          style={{
            fontWeight: "bold",
            color: "purple",
            marginTop: "1vh",
            zIndex: "2",
          }}
        >
          Sign Up
        </a>
      </form>
    </div>
  );
}
