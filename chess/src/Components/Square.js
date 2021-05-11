import React,{useState,useEffect} from 'react'

export const Square = (props) => {
    const [color, setColor] = useState()

    useEffect ( ()=>{
        calculateColor()
    },[])

    const calculateColor =()=> {
        var color = "#FFDEAD";
        if ((props.row + props.col) % 2 === 0) {
            color = "#DEB887";
        }
       setColor(color);
    }

   const onDragOver=(e) =>{
        e.preventDefault();
    }

    const onDragStart=(id) =>{

        sessionStorage.setItem("id", id)
        sessionStorage.setItem("row", props.row)
        sessionStorage.setItem("col", props.col)
    }
    return (
        <div>
            <button
            className = "square"
            style = {{backgroundColor: color}}
            onClick = {() => props.onClick()}
            onDragOver = {(e) =>onDragOver(e)}
            onDrop = {(ev) => props.onDrop(ev)}
        >
        <img
            draggable = "true"
            onDragStart = {(e) => onDragStart(props.value)}
            src = {props.value}
            alt = "Chess piece"
        >
        </img>
        </button>
        </div>
    )
}

export default Square

