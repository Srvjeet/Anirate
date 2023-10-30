import React, { useState, useEffect } from "react";
import { Storage } from "../config/firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../config/firebase-config";
import Navbar from "./Navbar";
import { doc, updateDoc } from "firebase/firestore";
import "./Settings.css";

export default function Settings() {
  const [img, setImg] = useState(null);
  const [usid, setUsid] = useState();
  const [profileUrl, setProfileUrl] = useState("");
  useEffect(() => {
    const getInitialData = async () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUsid(user.uid);
        } else {
          console.log("Logged Out");
          return;
        }
      });
      console.log(usid);
    };
    getInitialData();
  }, [profileUrl]);

  const handleClick = () => {
    if (usid === "") {
      alert("You're not logged in!");
    } else {
      const imageRef = ref(Storage, `Pic: ${usid}`);
      uploadBytes(imageRef, img).then(() => {
        getDownloadURL(imageRef).then((url) => {
          updateDoc(doc(db, "users", usid), {
            Profile: url,
          });
          setProfileUrl(url);
        });
      });
    }
  };

  return (
    <div>
      <Navbar />
      <img className="Profile" src={profileUrl} alt="Update Picture" />
      <input type="file" className="file-input" onChange={(e) => setImg(e.target.files[0])} />
      <div>
        <button className="save-button" onClick={handleClick}>
          Save
        </button>
      </div>
    </div>
  );
}
