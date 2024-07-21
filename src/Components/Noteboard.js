import "../App.css";
import { useContext, useState, useEffect } from "react";
import SmallNote from "./SmallNote";
import allContext from '../Contexts/Context';

function Noteboard() {
  let aboutList = ["Home", "About", "Blog"];
  const contexts = useContext(allContext)
  const {notes, setNotes, deleteNote, show} = contexts
  async function addNote() {
    let json;
    let response = await fetch("http://localhost:5000/api/notes/addnote", {
        method: "POST",
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "auth-token":localStorage.getItem('token')
        },
        body: JSON.stringify({
          title: "New Note",
          description: "asdf",
          tag: "General",
        }),
        }).then(async (e) => {
            json = await e.json();
            setNotes([...notes, json])
          }).catch((e) => {
            console.log(e);
          });
  }
  console.log(notes)
  return (
    <>
      <div className="header">
        <h1>NoteApp</h1>
        <div className="options">
          {aboutList.map((e) => {
            return (
              <button key={e} className="option">
                {e}
              </button>
            );
          })}
        </div>
      </div>
      <div className="section">
        {<div className="notes">
          {show && notes.map((e) => {
            return <SmallNote key={e._id} id={e._id} />;
          })}
          <div className="plus" onClick={addNote}></div>
        </div>}
        <div className="gap"></div>
      </div>
    </>
  );
}

export default Noteboard;