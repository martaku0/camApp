import { useState, useEffect } from 'react'
import './Item.css'
import settings from './settings.json'

function PhotoContainer(props){

    return (  
        <div className="container">
            <p>{props.name}</p>
            <img className="img" src={`http://${settings.address}:${settings.port}/filename/:${props.name}`} alt="pic"/>
            <div className="buttonContainer">
            <button onClick={props.deleteFunc}>delete</button>
            <button onClick={props.renameFunc}>rename</button>
            <input type="checkbox" name="del" onChange={props.inputChecked}/></div>
        </div>
    )
}

export default PhotoContainer