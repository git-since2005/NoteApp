import './App.css';
import {useState} from 'react'

function Noteboard() {
  let aboutList = ["Home", "About", "Blog"]
  const [notes, setNotes] = useState([1]);

  
  function addNote(){
    setNotes([...notes, notes.at(-1)+1])
  }

  const updateText  = (e) => {
    setNotes(e.target.value)
  }

  return (
    <>
    <div className = "header">
      <h1>NoteApp</h1>
      <div className="options">
        {
          aboutList.map((e)=>{
            return <button key = {e} className="option">{e}</button>
          })
        }
      </div>
    </div>
    <div className="section">
      <div className="notes">
      {notes.map((e)=>{
        return <div key={e} className="note">
          <input type="text" value = {"Note"+e.toString()} />
          <textarea onChange = {updateText} />
        </div>
      })}
      <div className="plus" onClick = {addNote}></div>
      </div>
      <div className="gap"></div>
    </div>
    </>
  );
}

export default Noteboard;