import React from "react";
import Card from "./card";

const FormCreatePlaylist = ({ onSubmit }) => {
  return (
    <Card>
      <div className="Card">
        <h2>Create Playlist</h2>
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" required />
          </div>
          <div className="form-group">
            <label htmlFor="desc">Description</label>
            <textarea id="desc" required></textarea>
          </div>
          <div className="form-group">
            <button id="submit">Create</button>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default FormCreatePlaylist;
