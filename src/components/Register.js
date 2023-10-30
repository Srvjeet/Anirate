import React from "react";
import "./Register.css";
import { useState } from "react";
import { auth, db } from "../config/firebase-config"
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import {Link } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";


function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Conpassword, setConPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password===Conpassword){
      try{
        await createUserWithEmailAndPassword(auth,email,password).then(async(res)=>{
          const user=res.user;
          const id = user.uid;
          console.log(user)
          console.log(id)
          try{
            await setDoc(doc(db, "users",id), {

              usid: id,
              Profile: ''
            });
          }catch(e){
            console.log("user document add error")
          }
          sendEmailVerification(auth.currentUser).then(()=>{
            alert("Email Verification link sent!")
           })
        })
      }catch(err){
          console.error("Create user error")
      }
    }
    else{
      alert("Invalid Input!!!")
    }
      // Reset form inputs
    setEmail("");
    setPassword("");
    setConPassword("");
  };
  return (
    <div>
      <div className="register-card">
      <form onSubmit={handleSubmit} className="reg-form-style">
        <label>
          <h3 className="reg-labels">Enter Email</h3>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field-style"
          />
        </label>
        <br />
        <label>
          <h3 className="reg-labels">Enter Password</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field-style"
          />
        </label>
        <br />
        <label>
          <h3 className="reg-labels">Confirm Password</h3>
          <input
            type="string"
            value={Conpassword}
            onChange={(e) => setConPassword(e.target.value)}
            className="input-field-style"
          />
        </label>
        <br />
          <button className="reg-button-style">Register</button><br />
          <div className="login-suggestion"><Link to="/">Go back to login.</Link></div>
        </form>
      </div>
    </div>
  );
}

export default Register;
