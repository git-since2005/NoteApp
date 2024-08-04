import "../App.css";
import { useState, React, lazy } from "react";
// import SmallNote from ''
import mainLogo from '../Images/leaf.png'
import Logo from '../Images/loading.png'
const SmallNote = lazy(()=>import('./SmallNote'))
function Noteboard() {

  let aboutList = ["Home", "About", "Blog"];
  // const {show} = contexts
  let array = []
  const [show, setShow] = useState(false)

  async function addNote() {
    let json;
    let response = await fetch("http://localhost:5000/api/notes/addnote", {
        method: "POST",
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "auth-token":sessionStorage.getItem('token')
        },
        body: JSON.stringify({
          title: "New Note",
          description: "",
          tag: "General",
        }),
        }).then(async (e) => {
            json = await e.json();
            setNotes([...notes, json])
          }).catch((e) => {
            console.log(e);
          });
  }

  async function findNotes(){
    array=[]
      let response = await fetch("http://localhost:5000/api/notes/fetchallnotes",{
          method: "GET",
          statusCode: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "auth-token":sessionStorage.getItem('token'),
          }
        }
      ).then(async (e) => {
          const json = await e.json();
          for (let index = 0; index < Object.values(json).length; index++) {
            array.push(json[index])
          }
          // setTimeout(() => {
          // }, 509);
          setShow(true)
        })
        .catch((e) => {
          console.log("Internal error occured!!");
          console.log(e);
        });
  }
  if(1){
    findNotes()
  }
  const [notes, setNotes] = useState(array)
  async function deleteNote(id){
    array = []
    let response = await fetch('http://localhost:5000/api/notes/deletenote/'+id,{
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "auth-token":sessionStorage.getItem('token')
        }
    }).then(async (e)=>{
      setShow(false)
      findNotes()
      setShow(true)
    }).catch((e)=>{
      console.log("error occured!!!")
    })
    return array
  }
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
      <div className="section" style={{'height':window.innerHeight-90}}>
        { <div className="notes">
          {show && notes.map((e) => {
            return <SmallNote key={e._id} deleteNote={deleteNote} id={e._id} title={e.title} desc = {e.description} setNotes={setNotes} notes={notes} />;
          })}
          <div className="plus" onClick={addNote}></div>
        </div>}
        <div className="gap"></div>
      </div>
      {/* <Suspense fallback={<p>Fetching all notes</p>}> */}
      <div className="console">
        <img src={show?mainLogo:Logo} loading="lazy" alt="" />
        {show?' All notes loaded':' Loading all notes'}
      </div>
      {/* </Suspense> */}
    </>
  );
}

export default Noteboard;