import React, { useState } from 'react'
import Square from './Square'

export const Row = (props) => {
    const [rowstate,setRowstate] = useState({
        num: props.num,
        value: props.value,
    })

    // console.log(rowvalue)
    const renderSquare=(i)=> {
        return (
            <Square
                row = {rowstate.num}
                col = {i}
                value = {rowstate.value[i]}
                onClick = {() => props.onClick(rowstate.num, i)}
                onDrop = {(ev) => props.onDrop(rowstate.num, i, ev)}
            />
        )
    }
    return (
        <div>
            <div className = "row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
            {renderSquare(6)}
            {renderSquare(7)}
        </div>
        </div>
    )
}

export default Row
