import React from "react";
import { Link } from "react-router-dom";
import "./Genres.css";
import Navbar from "./Navbar";

export default function Genres() {
  return (
    <div>
      <Navbar />
      <div className="genres-card">
        <div>
          <div className="genre-card-1">
            <Link className="text-style" to="/Genre" state={{ gen: "Fantasy" }}>
              FANTASY
            </Link>
          </div>
          <div className="genre-card-2">
            <Link
              className="text-style"
              to="/Genre"
              state={{ gen: "Romantic" }}
            >
              ROMANCE
            </Link>
          </div>
          <div className="genre-card-3">
            <Link className="text-style" to="/Genre" state={{ gen: "Family" }}>
              FAMILY
            </Link>
          </div>
          <div className="genre-card-4">
            <Link
              className="text-style"
              to="/Genre"
              state={{ gen: "Adventure" }}
            >
              ADVENTURE
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
