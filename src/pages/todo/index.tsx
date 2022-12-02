import React from 'react';
import GridLayout from 'react-grid-layout';
import { useState, useEffect, useRef } from 'react';
import { serverTimestamp } from "firebase/firestore";
import { addDoc, updateDoc, getDoc, getDocOnSnapshot, delDoc } from '../../hooks/updateFirestore'
import Seo from "../../components/seo"
import Card from "./card"



const TodoIndex = ({ data, location }) => {

  const siteTitle = "ToDo";

  const [editID, setEditID] = useState("");
  const [editContent, setEditContent] = useState("");

  const [layouts, setLayouts] = useState([{}]);
  const editRef = useRef(null);
  
  const elements = getDocOnSnapshot( `/todo` )

  const staticLayouts = [
    {i:'bord1', x:0, y:0, w:1, h:1, static:true},
    {i:'bord2', x:1, y:0, w:1, h:1, static:true},
    {i:'bord3', x:2, y:0, w:1, h:1, static:true},
  ]

  useEffect(() => {
    const dynamicLayout = elements.map( (element) => {
      return {i:element["id"], x:element["x"], y:element["y"], w:element["w"], h:element["h"], static:false}
    })
    
    setLayouts([...staticLayouts, ...dynamicLayout]);
  }, [elements]);


  const addTask = (x, y) => {
    addDoc( `/todo`, {content:'', x:x ,y:y, w:1, h:1, createAt:serverTimestamp()})
  };

  // const getTask = () => {
  //   getDoc( `/todo` ).then( response => {
  //     console.log(response)
  //   })
  // };

  const updateTask = (taskID, input) => {
    input['createAt'] = serverTimestamp()
    updateDoc( `/todo/${taskID}`, input)
  };

  const onDragStop = (layouts): void => {

    layouts.map( (layout) => {
      
      // データ更新
      // if (layout.i!='welcome' && layout.i!='sign' && layout.i!='add' && layout.i!='garbage') {
      if (!staticLayouts.map((staticLayout)=>{return staticLayout.i}).includes(layout.i)) {
        const element = elements.filter( (element) => {
          return element["id"] == layout.i;
        })[0]

        updateTask(element["id"], {content:element["content"], x:layout["x"], y:layout["y"], createAt:serverTimestamp()})
      }
    }

    )
  };

  

  return (
    <>
      <Seo title={siteTitle} />
      <GridLayout ref={editRef} className="layout" layout={layouts} cols={3} rowHeight={120} width={1200} onDragStop={onDragStop} style={{minHeight: "50rem"}}>
        <div key="bord1">
          <div style={{backgroundColor:"#ccffcc", height:"10px", marginBottom:"20px", borderRadius:"5px"}}></div>
          <strong>To Doリスト</strong><br />
          <button type="button" className="btn btn-light" onClick={() => addTask(0,0)} style={{textAlign:"center", width:"100%"}}>+ タスクを追加</button>
        </div>
        <div key="bord2">
          <div style={{backgroundColor:"#ff9999", opacity:"0.4", height:"10px", marginBottom:"20px", borderRadius:"5px"}}></div>
          <strong>進行中</strong><br />
          <button type="button" className="btn btn-light" onClick={() => addTask(1,0)} style={{textAlign:"center", width:"100%"}}>+ タスクを追加</button>
        </div>    
        <div key="bord3">
          <div style={{backgroundColor:"#33ccff", opacity:"0.4", height:"10px", marginBottom:"20px", borderRadius:"5px"}}></div>
          <strong>完了</strong><br />
          <button type="button" className="btn btn-light" onClick={() => addTask(2,0)} style={{textAlign:"center", width:"100%"}}>+ タスクを追加</button>
        </div>
        { elements.map( (element) =>
          <div key={element["id"]} style={{backgroundColor:"seashell", textAlign:"center", borderRadius:"8px"}}>
            <Card editID={editID} setEditID={setEditID} editContent={editContent} setEditContent={setEditContent} elementID={element["id"]} elementContent={element["content"]} />
          </div>
        )}
      </GridLayout>

    </>
  );
}

export default TodoIndex



