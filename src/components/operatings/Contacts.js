import React, {useState,useEffect} from "react";
import "./style.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function Contacts() {
  // declaring all states and navigations
  const [search,changeSearch] = useState("");
  const [contacts,setContacts] = useState([]);
  const navigate = useNavigate();
  const {user1,user2} = useParams();


  // adding all the previous contacts
  useEffect(()=>{
    axios.get(`http://localhost:4004/api/chat/${user1}`).then((res)=>{
      setContacts(res.data.contacts);})
  },[user1]);

  // handling changes
  const handleChange = (e)=>{changeSearch(e.target.value);}
  const handleSubmit = (e)=>{
    e.preventDefault();
    if(search.length>=5){
      axios.post("http://localhost:4004/api/chat/adduser",{username: search})
        .then((res)=>{
          if(res.data.success) navigate(`/chat/${user1}/${search}`)
          else alert("No such user present");
        })
    }
  }
  const handleClick = (contact)=>{navigate(`/chat/${user1}/${contact}`);}


  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "30vw",
        height: "85vh",
      }}
    >
      <form onSubmit={(e)=>{handleSubmit(e)}} style={{ display: "flex" }}>
        <input
          onChange={(e)=>handleChange(e)}
          type="text"
          style={{
            height: "4vh",
            backgroundColor: "transparent",
            borderRadius: "2.5vh",
            marginTop: "1vh",
            marginLeft: "2.7vh",
            width: "25.5vw",
            fontSize: "20px",
            opacity: "80%",
            border: "2px solid black",
          }}
        />
        <button
          type="submit"
          style={{
            marginLeft: "0.9vh",
            marginTop: "1vh",
            borderRadius: "100%",
            width: "5vh",
            height: "5vh",
            opacity: "80%",
            backgroundColor: "#15197133",
            border: "1px solid black",
          }}
        ></button>
      </form>
      <div className="contacts">
      {contacts.map((contact, index) => (
        <div
          key={index}
          onClick={()=>handleClick(contact)}
          className="contactCard"
          style={{
            backgroundColor: "#085747",
            width: "95%",
            height: "10%",
            marginTop: "1vh",
            borderRadius: "2vh",
            marginLeft: "0.9vw",
            opacity: "80%",
            display:'flex',
            justifyContent:"center",
            alignItems:"center",
            fontWeight:"bold",
            fontSize:"20px"
          }}
        >
          {contact}
        </div>
      ))}
      </div>
    </div>
  );
}
