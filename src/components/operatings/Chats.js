import React, { useState, useEffect, createElement } from "react";
import "./style.css";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io.connect("http://localhost:5005");

export default function Chats() {
  const { user1, user2 } = useParams();
  const [message, changeMessage] = useState("");
  const [chatHistory, changeDefaultChats] = useState([]);

  // useEffect for initializing things
  useEffect(() => {
    axios
      .get(`http://localhost:4004/api/chat/${user1}/${user2}`)
      .then((res) => {
        changeDefaultChats(res.data.chats);
        for (const it of res.data.chats) {
          const sender = it.sender;
          if (sender === user1) {
            const chat = document.createElement("div");
            const parent = document.getElementById("chats");
            chat.textContent = it.text_message;
            chat.classList.add("send");
            parent.appendChild(chat);
          } else {
            const chat = document.createElement("div");
            const parent = document.getElementById("chats");
            chat.textContent = it.text_message;
            chat.classList.add("received");
            parent.appendChild(chat);
          }
        }
      });
  }, [user1, user2]);

  // useEffect for socket.io
  useEffect(() => {
    socket.on("receive", (data) => {
      // alert(data.message.message);
      const chat = document.createElement("div");
      const parent = document.getElementById("chats");
      chat.textContent = data.message.message;
      chat.classList.add("received");
      parent.appendChild(chat);
    });
  }, [socket]);

  // handling changes and submissions
  const handleChange = (e) => {
    changeMessage(e.target.value);
  };
  const handleSubmit = (e) => {
    const data = message;
    changeMessage("");
    e.preventDefault();
    socket.emit("send", {
      from: user1,
      message: data,
      to: user2,
      timeStamp: Date.now(),
    });
    const chat = document.createElement("div");
    const parent = document.getElementById("chats");
    chat.textContent = data;
    chat.classList.add("send");
    parent.appendChild(chat);
    changeMessage("");
  };
  return (
    <div
      style={{
        width: "70vw",
        height: "85vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          marginTop: "1vh",
          backgroundColor: "#0fc585",
          borderRadius: "2vh",
          height: "8vh",
          opacity: "70%",
          width: "67vw",
          marginLeft: "0.7vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "x-large",
          fontWeight: "bold",
        }}
      >
        {user2}
      </div>
      <div id="chats">
      </div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          opacity: "70%",
        }}
      >
        <input
          onChange={(e) => handleChange(e)}
          type="text"
          style={{
            width: "63vw",
            height: "6vh",
            backgroundColor: "transparent",
            marginTop: "1vh",
            marginLeft: "0vw",
            marginRight: "auto",
            borderRadius: "2vh",
            border: "2px solid black",
            fontSize: "20px",
            color: "white",
          }}
        />
        <button
          style={{
            height: "3vw",
            width: "3vw",
            marginLeft: "1vh",
            borderRadius: "100%",
            backgroundColor: "#15197133",
          }}
        ></button>
      </form>
    </div>
  );
}
