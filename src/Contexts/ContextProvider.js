import { React, useState} from "react";
import allContext from './Context'

const ContextProvider = (props)=> {
  let array = []
  const [show, setShow] = useState(false)
  async function findNotes(){
    array=[]
      let response = await fetch("http://localhost:5000/api/notes/fetchallnotes",{
          method: "GET",
          statusCode: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "auth-token":localStorage.getItem('token'),
          }
        }
      ).then(async (e) => {
          const json = await e.json();
          for (let index = 0; index < Object.values(json).length; index++) {
            array.push(json[index])
          }
          setShow(true)
        })
        .catch((e) => {
          console.log("Internal error occured!!");
          console.log(e);
        });
  }

  findNotes()
  const [notes, setNotes] = useState(array)
  async function deleteNote(id){
    array = []
    let response = await fetch('http://localhost:5000/api/notes/deletenote/'+id,{
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "auth-token":localStorage.getItem('token')
        }
    }).then(async (e)=>{
      findNotes()
    }).catch((e)=>{
      console.log("error occured!!!")
    })
    return array
  }
  return (
  <allContext.Provider value={{notes, setNotes, array, deleteNote, findNotes, show}}>
    {props.children}
  </allContext.Provider>
  );
}
export default ContextProvider;