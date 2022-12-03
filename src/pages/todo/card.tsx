import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { addDoc, updateDoc, getDoc, getDocOnSnapshot, delDoc } from '../../hooks/updateFirestore'
import { serverTimestamp } from "firebase/firestore";

import 'font-awesome/css/font-awesome.min.css';


const Card = ({editID, setEditID, editContent, setEditContent, elementID, elementContent}) => {

    const delTask = (id) => {
      delDoc( `/todo`, id)
    };

    const updateTask = (taskID, input) => {
      input['createAt'] = serverTimestamp()
      updateDoc( `/todo/${taskID}`, input)
    };

    return (
      <>
        <div style={{textAlign:"right", color:"lightgrey"}}>
          <div className="btn-group">
            { (elementID===editID) &&
              <button type="button" onClick={() => {setEditID(""); updateTask(editID, {content:editContent, createAt:serverTimestamp()})}} style={{border:"none", background:"transparent", color:"black"}}>
                <i className="fa fa-check-circle" style={{color:"lightgrey"}} />
              </button>
            }
            <button
              type="button" className="btn btn-secondary" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
              style={{border:"none", background:"transparent", color:"black"}}>
              ・・・
            </button>
            <ul className="dropdown-menu dropdown-menu-end" style={{minWidth:"4rem", padding:0, textAlign:"center"}}>
              <li style={{margin:0, cursor:"pointer"}}><a className="dropdown-item" onClick={() => {setEditID(elementID); setEditContent(elementContent);}}>編集</a></li>
              <li style={{margin:0, cursor:"pointer"}}><a className="dropdown-item" onClick={() => delTask(elementID)}>削除</a></li>
            </ul>
          </div>
        </div>
        { (elementID!==editID) &&
            <div style={{whiteSpace: "pre-wrap", padding:"0 20px"}}>
              {elementContent}
            </div>
          }
          { (elementID===editID) &&
            <>
              <textarea value={editContent} onChange={event => {setEditContent(event.target.value)}} style={{width:"90%", height:"80px", backgroundColor:"transparent", border:'solid'}} ></textarea>
            </>
        }
      </>
    )}

export default Card
