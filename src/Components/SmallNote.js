import {React,useState, useContext} from 'react'
import allContext from '../Contexts/Context';
import '../App.css'

function SmallNote(rops) {
    const [title, setTitle] = useState('');
    const [description, setDesc] = useState('')
    const {deleteNote, setNotes, notes} = useContext(allContext)
    
  function autoSave(id, instance, text){
    let contents = {
        method: "POST",
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4N2E5YWNmZmY3YzYwM2M5MWI5YmNkIn0sImlhdCI6MTcyMDE2NjgyOH0.-PhLV2wbi7pnT_wuDAA64C-ImBkaMCCMPet8BJsghzk",
        }
    }

    if(instance==='title'){
      contents.body=JSON.stringify({title:text, description:description, tag:'General'})
    }else if(instance === 'desc'){
      contents.body = JSON.stringify({title:title, description:text, tag:'General'})
    }

    let response = fetch('http://localhost:5000/api/notes/updatenote/'+id, contents).then((e)=>{
      console.log(e)
    }).catch((e)=>{
      console.log(e)
    })
  }

  return (
      <div className="note">
                <input
                  type="text"
                  value={title}
                  className='title'
                  onChange={(e, i) => {
                    setTitle(e.target.value)
                    // autoSave(rops.id, 'title', title)
                  }}
                />
                <textarea onChange={(e)=>{
                    setDesc(e.target.value)
                    console.log(description)
                }} />
                <div className="menus">
                  <div className="save"></div>
                  <div className="delete" onClick={()=>{
                    deleteNote(rops.id);
                    let New = []
                    notes.filter((e)=>{
                      if(e._id!==rops.id){
                        New.push(e)
                      }
                    })
                    console.log(New)
                    setNotes(New)
                  }}></div>
                  <div className="info"></div>
                </div>
              </div>
  )
}

export default SmallNote
