import { useState, useEffect } from 'react';
import './App.css';
import PhotoContainer from './PhotoContainer.js';
import settings from './settings.json';

const App = () => {
  const [list, setList] = useState([]);
  const [delList, setDelList] = useState([]);

  useEffect(() => {
    document.title = 'Uploaded images';
  }, []);

  const getData = async () => {
    try {
      let result = await fetch(`http://${settings.address}:${settings.port}/getData`, { method: "GET" });
      let data = await result.json();
      setList(data);
    } catch (ex) {
      console.log(ex);
    }
  };

  const renameFile = async (element) => {

    const newName = window.prompt("Change name","new name");

   if(newName){
    const body = JSON.stringify({
      "name": element,
      "newName": newName
    })

    try {

      const headers = { 'Content-Type': 'application/json' }
      let result = await fetch(`http://${settings.address}:${settings.port}/renameFile`, { method: "PATCH", headers: headers, body: body })
      getData()

    } catch (ex) {
      console.log(ex);
    }
   }
}

const deleteFile = async (element) => {
  const body = JSON.stringify({
    "name": element
  })

  try {
    const headers = { 'Content-Type': 'application/json' }
    let result = await fetch(`http://${settings.address}:${settings.port}/deleteFile`, { method: "PATCH", headers: headers, body: body })
    getData()

  } catch (ex) {
    console.log(ex);
  }
}

const deleteMulti = async () => {
  const body = JSON.stringify({
    "list": delList
  })

  try {
    const headers = { 'Content-Type': 'application/json' }
    let result = await fetch(`http://${settings.address}:${settings.port}/deleteMulti`, { method: "PATCH", headers: headers, body: body })
    document.querySelectorAll("input[type='checkbox']").forEach(e => {
      e.checked = false
    })
    getData()

  } catch (ex) {
    console.log(ex);
  }
}

const checkInp = (element) => {
  if(delList.includes(element)){
    setDelList([...delList.filter((item, i) => item !== element)])
  }
  else{
    setDelList([...delList, element])
  }
}

const selectAll = () => {
  if(list.length != delList.length){
    document.querySelectorAll("input[type='checkbox']").forEach(e => {
      e.checked = true
    })

    setDelList(list)
    document.getElementById("selectBtn").innerText = "unselect all"
  }
  else{
    document.querySelectorAll("input[type='checkbox']").forEach(e => {
      e.checked = false
    })
    setDelList([])

    document.getElementById("selectBtn").innerText = "select all"
  }
  
}

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {    
    if(list == delList){
      document.getElementById("selectBtn").innerText = "unselect all"
    }
    else{
      document.getElementById("selectBtn").innerText = "select all"
    }
}, [delList]);

  return (
    <>
      <h1>Uploaded images:</h1>
      <div className="buttons">
        <button onClick={getData}>reload</button>
        <button id="selectBtn" onClick={selectAll}>select all</button>
        <button onClick={deleteMulti}>delete selected</button>
      </div>
      <div className="content">
        {list.map((element, index) => {
          return <PhotoContainer key={index} name={element} renameFunc={()=>{renameFile(element)}} deleteFunc={()=>{deleteFile(element)}} inputChecked={()=>{checkInp(element)}}/>;
        })}
      </div>
    </>
  );
};

export default App;
