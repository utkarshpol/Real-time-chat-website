import React, { useState } from "react";
import "../stylesheet.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    // declaring needed states
    const navigate = useNavigate();
    const [username, changeUsername] = useState("");
    const [password, changePassword] = useState("");
    const [confirmPass, changeConfirmPass] = useState("");

    // handling username and password
    const handleChangeUsername = (e) => {
        changeUsername(e.target.value);
    };
    const handleChangePassword = (e) => {
        changePassword(e.target.value);
    };
    const handleChangeConfirmation = (e)=>{
        changeConfirmPass(e.target.value);
    }

    // handling submit request
    const handleSubmit = async (e) => {
        e.preventDefault();
        let usernameError = "",
            passwordError = "",
            confirmationError = "";
        if (username.length <= 4)
            usernameError = "Username should have minimum 5 charecters";
        if (password.length <= 4)
            passwordError = "Password should have minimum 5 charecters";
        if(confirmPass !== password)
            confirmationError = "Password and confirm Password must be same";
        if (usernameError || passwordError || confirmationError) {
            alert(usernameError + "\n" + passwordError+"\n"+confirmationError);
            return;
        }

        // post request to the server
        const data = { username, password };
        await axios.post("http://localhost:4004/api/signup", data).then((res) => {
            if (res.data.success) 
                navigate(`/chat/${username}`);
            else {
                alert(res.data.alert);
                return;
            }
        });
    };
    return (
        <div className="backgroundLogin">
            <form onSubmit={(e) => handleSubmit(e)} className="signinCard" action="">
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
                <input
                    onChange={(e) => handleChangeConfirmation(e)}
                    className="username"
                    type="password"
                    placeholder="confirm your password"
                />
                <button className="btn" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}
