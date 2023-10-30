import React from "react";
import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth, googleProvider} from "../config/firebase-config"
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Link } from "react-router-dom";
import { doc, setDoc, getDoc } from "firebase/firestore";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

      try{
          signInWithEmailAndPassword(auth,email,password).then(async(res)=>{
            let user= res.user
            if(user.emailVerified){
              navigate("/Home");
            }
            else{
              alert("Email not verified yet!!!")
            }
          })
      }catch(err){
          console.error("Create user error")
      }

    // Reset form inputs
    setEmail("");
    setPassword("");
  };

  const signInWithGoogle= async () =>{
    try{
        await signInWithPopup(auth, googleProvider).then(async (res)=>{
          const user=res.user;
          const id = user.uid;
          console.log(user)
          console.log(id)
          try{
            const user1 = await getDoc(doc(db,"users",id));
            if(user1){
              console.log("existed")
            }else{
              await setDoc(doc(db, "users",id), {
                usid: id
              });
            }
          }catch(e){
            console.log("user document add error")
          }
         try{
          await navigate("/Home");
         }catch(err){
          console.error("Something went wrong")
         }})
    }catch(err){
        console.error("Google user error")
        }
    };

  return (
    <div className="login-card">
      <h1 className="login-logo">Login</h1>
      <form onSubmit={handleSubmit} className="form-style">
        <label>
          <h3 className="labels">Email</h3>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field-style"
          />
        </label>
        <br />
        <label>
          <h3 className="labels">Password</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field-style"
          />
        </label>
        <br />
        <button type="Submit" className="login-button-style">Login</button><br/>
        <div className="signup-suggestion"><Link to="/Register">Not a user? Sign Up.</Link></div>
      </form>
      <button onClick={signInWithGoogle} className="google-button-style">Google Sign In</button>
    </div>
  );
}

export default Login;
