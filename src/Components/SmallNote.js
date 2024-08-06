import {React,useState, useContext} from 'react'
import '../App.css'

function SmallNote(props) {
    const [title, setTitle] = useState(props.title);
    const [description, setDesc] = useState(props.desc)
    const {id} = props
    
  function autoSave(id, instance, text){
    let contents = {
        method: "POST",
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "auth-token":localStorage.getItem('token'),
        }
    }

    if(instance==='title'){
      contents.body=JSON.stringify({title:text, description:description, tag:'General'})
    }else if(instance === 'desc'){
      contents.body = JSON.stringify({title:title, description:text, tag:'General'})
    }
    let response = fetch('https://noteapp-gcol.onrender.app/api/notes/updatenote/'+id, contents).then((e)=>{
      console.log(e)
    }).catch((e)=>{
      console.log(e)
    })
  }

  return (
      <div className="note">
                <input type="text" value={title} className='title' onChange={(e)=>{
                  setTitle(e.target.value)
                  // setTimeout(()=>{
                  // }, 500)
                  autoSave(id, 'title', e.target.value)
                  }} placeholder = "Note title"
                   />
                <textarea onChange={(e)=>{
                  setDesc(e.target.value)
                  // setTimeout(()=>{
                  // }, 500)
                  autoSave(id, 'desc', e.target.value)
                  }
                } value={description} />
                <div className="menus">
                  <div className="delete" onClick={()=>{
                    props.deleteNote(id);
                    let New = []
                    props.notes.filter((e)=>{
                      if(e._id!==props.id){
                        New.push(e)
                      }
                    })
                    props.setNotes(New)
                  }}></div>
                  <div className="info"></div>
                </div>
              </div>
  )
}

export default SmallNote