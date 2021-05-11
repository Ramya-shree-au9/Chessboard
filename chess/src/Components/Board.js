import React,{useState,useEffect} from 'react'
import Row from './Row'
import './board.css'
import BlackKing from './images/BlackKing.png';
import BlackBishop from './images/BlackBishop.png';
import WhiteKing from './images/WhiteKing.png';
import WhiteBishop from './images/WhiteBishop.png';
import BlackPawn from './images/BlackPawn.png';
import BlackQueen from './images/BlackQueen.png';
import BlackKnight from './images/BlackKnight.png';
import WhitePawn from './images/WhitePawn.png';
import WhiteQueen from './images/WhiteQueen.png';
import WhiteKnight from './images/WhiteKnight.png';
import BlackRook from './images/BlackRook.png';
import WhiteRook from './images/WhiteRook.png';
import Empty from './images/Empty.png';


export const Board = () => {
    const [board,setBoard]=useState([[BlackRook, BlackKnight, BlackBishop, BlackQueen,
            BlackKing, BlackBishop, BlackKnight, BlackRook],
                [BlackPawn, BlackPawn, BlackPawn, BlackPawn,
                    BlackPawn, BlackPawn, BlackPawn, BlackPawn],
                [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
                [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
                [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
                [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty],
                [WhitePawn, WhitePawn, WhitePawn, WhitePawn,
                    WhitePawn, WhitePawn, WhitePawn, WhitePawn],
                [WhiteRook, WhiteKnight, WhiteBishop, WhiteQueen,
                    WhiteKing, WhiteBishop, WhiteKnight, WhiteRook]])
    const [clicked,setClicked] = useState(0)
    const [clickedLocation,setClickedLocation] = useState([0,0])
    const [turn,setTurn] = useState("White")
    const [hasKingMoved,setHasKingMoved] = useState([false, false])
    const [haveRooksMoved,setHaveRooksMoved] = useState([false, false, false, false])
        
    const renderRow=(i)=> {
        return (
            <Row
                num = {i}
                value = {board[i]}
                onClick = {(k, j) => handleClick(k, j)}
                onDrop = {(k, j, e) => handleDrop(k, j, e)}
            />
        )
    }

    const handleClick=(k, j)=> {
        if (clicked % 2 === 0) {
            setClickedLocation([k,j])
            setClicked(clicked + 1)

        } else {
            var row = clickedLocation[0];
            var col = clickedLocation[1];
            var piece = board[row][col];
            if(board[k][j] === piece) {
                setClicked(clicked + 1)
            } else if (isLegal(row, col, k, j, piece, board)) {
                movePiece(k, j, row, col, piece);
                setClicked(clicked + 1)
               
            }
        }

    }

    const isLegal=(initRow, initCol, endRow, endCol, piece, board) =>{
        if(isBlackPiece(piece) !== (turn === "Black")) {
            return false;
        }
        if (piece === WhitePawn) {
            return checkWhitePawn(initRow, initCol, endRow, endCol, board);
        } else if (piece === BlackPawn) {
            return checkBlackPawn(initRow, initCol, endRow, endCol, board);
        } 
        else if (piece === BlackBishop || piece === WhiteBishop) {
            return checkBishop(initRow, initCol, endRow, endCol, board, isBlackPiece(piece));
        } else if (piece === BlackKnight || piece === WhiteKnight) {
            return checkKnight(initRow, initCol, endRow, endCol, board, isBlackPiece(piece));
        } else if (piece === BlackQueen || piece === WhiteQueen) {
            return checkQueen(initRow, initCol, endRow, endCol, board, isBlackPiece(piece));
        } else if (piece === BlackRook || piece === WhiteRook) {
            return checkRook(initRow, initCol, endRow, endCol, board, isBlackPiece(piece));
        } else if (piece === BlackKing || piece === WhiteKing) {
            return checkKing(initRow, initCol, endRow, endCol, board, isBlackPiece(piece));
        }
    }
  
    const  checkWhitePawn=(initRow, initCol, endRow, endCol, board)=> {
        console.log(initRow, initCol, endRow, endCol, board)
        if(initCol === endCol) {
            if(board[endRow][endCol] === Empty) {
                if (initRow === 6) {
                    if (endRow === 5 || endRow === 4) {
                        return true;
                    }
                } else {
                    if (endRow === initRow - 1) {
                        return true;
                    }
                }
            }
        } else if (endCol === initCol - 1 || endCol === initCol + 1) {
            if(endRow === initRow -1 && isBlackPiece(board[endRow][endCol])) {
                return true;
            }
        }
        return false;
    }

    const checkBlackPawn=(initRow, initCol, endRow, endCol, board)=> {
        if(initCol === endCol) {
            if(isEmpty(board[endRow][endCol])) {
                if (initRow === 1) {
                    if (endRow === 2 || endRow === 3) {
                        return true;
                    }
                } else {
                    if (endRow === initRow + 1) {
                        return true;
                    }
                }
            }
        } else if (endCol === initCol - 1 || endCol === initCol + 1) {
            if(endRow === initRow + 1 && !(isBlackPiece(board[endRow][endCol]))
                && !isEmpty(board[endRow][endCol])) {
                return true;
            }
        }
        return false;
    }

    const  isEmpty=(piece)=> {
        return piece === Empty;
    }

    const isSameColor=(endPos, color)=> {
        if(!(isEmpty(endPos))) {
            if(color !== isBlackPiece(endPos)) {
                return true;
            }
            return false;
        }
        return true;
    }

   const checkBishop=(initRow, initCol, endRow, endCol, board, color)=> {
        if(endRow > initRow) {
            if(endCol > initCol) {
                for(var i = 1; i <= 7 - Math.max(initRow, initCol); i++) {
                    if(initRow + i === endRow && initCol + i === endCol) {
                        var endPos = board[endRow][endCol];
                        return isSameColor(endPos, color);
                    } else if (!(isEmpty(board[initRow + i][initCol + i]))) {
                        return false;
                    }
                }
            } else {
                for(var i = 1; i <= Math.min(7 - initRow, initCol); i++) {
                    if(initRow + i === endRow && initCol - i === endCol) {
                        var endPos = board[endRow][endCol];
                        return isSameColor(endPos, color);
                    } else if (!(isEmpty(board[initRow + i][initCol - i]))) {
                        return false;
                    }
                }
            }
        } else {
            if(endCol > initCol) {
                for(var i = 1; i <= Math.min(initRow, 7 - initCol); i++) {
                    if(initRow - i === endRow && initCol + i === endCol) {
                        var endPos = board[endRow][endCol];
                        return isSameColor(endPos, color);
                    } else if (!(isEmpty(board[initRow - i][initCol + i]))) {
                        return false;
                    }
                }
            } else {
                for(var i = 1; i <= Math.min(initRow, initCol); i++) {
                    if(initRow - i === endRow && initCol - i === endCol) {
                        var endPos = board[endRow][endCol];
                        return isSameColor(endPos, color);
                    } else if (!(isEmpty(board[initRow - i][initCol - i]))) {
                        return false;
                    }
                }
                return false;
            }
        }
    }

    const checkKnight=(initRow, initCol, endRow, endCol, board, color)=> {
        if((endRow === initRow + 2 && endCol === initCol + 1)
            || (endRow === initRow + 2 && endCol === initCol - 1)
            || (endRow === initRow - 2 && endCol === initCol + 1)
            || (endRow === initRow - 2 && endCol === initCol - 1)
            || (endRow === initRow + 1 && endCol === initCol + 2)
            || (endRow === initRow + 1 && endCol === initCol - 2)
            || (endRow === initRow - 1 && endCol === initCol + 2)
            || (endRow === initRow - 1 && endCol === initCol - 2)) {
                var endPos = board[endRow][endCol];
                if(!(isEmpty(endPos))) {
                    if(color !== isBlackPiece(endPos)) {
                        return true;
                    }
                    return false;
                }
                return true;
            }
        return false;
    }

   const checkRook=(initRow, initCol, endRow, endCol, board, color)=> {

        if(endCol === initCol) {
            if(endRow > initRow) {
                for(var i = 1; i <= endRow - initRow; i++) {
                    if (initRow + i === endRow) {
                        var endPos = board[endRow][endCol];
                        return isSameColor(endPos, color);
                    } else if (!(isEmpty(board[initRow + i][initCol]))) {
                        return false;
                    }
                }
            } else {
                for(var i = 1; i <= initRow-endRow; i++) {
                    if (initRow - i === endRow) {
                        var endPos = board[endRow][endCol];
                        return isSameColor(endPos, color);
                    } else if (!(isEmpty(board[initRow - i][initCol]))) {
                        return false;
                    }
                }
            }
        } else if (endRow === initRow) {
            if(endCol > initCol) {
                for(var i = 1; i <= endCol - initCol; i++) {
                    if (initCol + i === endCol) {
                        var endPos = board[endRow][endCol];
                        return isSameColor(endPos, color);
                    } else if (!(isEmpty(board[initRow][initCol + i]))) {
                        return false;
                    }
                }
            } else {
                for(var i = 1; i <= initCol - endCol; i++) {
                    if (initCol - i === endCol) {
                        var endPos = board[endRow][endCol];
                        return isSameColor(endPos, color);
                    } else if (!(isEmpty(board[initRow][initCol - i]))) {
                        return false;
                    }
                }
            }
        }
        return false;
    }

    const checkQueen=(initRow, initCol, endRow, endCol, board, color) =>{
        if(checkRook(initRow, initCol, endRow, endCol, board, color)
            || checkBishop(initRow, initCol, endRow, endCol, board, color)) {
            return true;
        }
        return false;
    }

   const checkKing=(initRow, initCol, endRow, endCol, board, color)=> {
        if((endRow === initRow + 1 && endCol === initCol + 1)
            || (endRow === initRow + 1 && endCol === initCol)
            || (endRow === initRow + 1 && endCol === initCol - 1)
            || (endRow === initRow && endCol === initCol + 1)
            || (endRow === initRow && endCol === initCol - 1)
            || (endRow === initRow - 1 && endCol === initCol + 1)
            || (endRow === initRow - 1 && endCol === initCol)
            || (endRow === initRow - 1 && endCol === initCol - 1)) {
                var endPos = board[endRow][endCol];
                if(!(isEmpty(endPos))) {
                    if(color !== isBlackPiece(endPos)) {
                        setHasKingMoved( !color ? [true, hasKingMoved[1]] : [hasKingMoved[0], true]);
                        return true;
                    }
                    return false;
                }
                setHasKingMoved( !color ? [true, hasKingMoved[1]] : [hasKingMoved[0], true]);
                return true;
            } else if (endRow === initRow && endCol === initCol + 2
                && !(color ? hasKingMoved[1] : hasKingMoved[0])
                && isEmpty(board[initRow][initCol + 1]) && isEmpty(board[initRow][initCol + 2])
                && !(color ? haveRooksMoved[3]: haveRooksMoved[1])) {
                    setHasKingMoved( !color ? [true, hasKingMoved[1]] : [hasKingMoved[0], true]);
                    movePiece(endRow, endCol - 1, initRow, endCol + 1, color ? BlackRook : WhiteRook);
                    return true;
            } else if (endRow === initRow && endCol === initCol - 2
                && !(color ? hasKingMoved[1] : hasKingMoved[0])
                && isEmpty(board[initRow][initCol - 1]) && isEmpty(board[initRow][initCol - 2]) && isEmpty(board[initRow][initCol - 3])
                && !(color ? haveRooksMoved[2]: haveRooksMoved[0])) {
                    setHasKingMoved( !color ? [true, hasKingMoved[1]] : [hasKingMoved[0], true]);
                    movePiece(endRow, endCol + 1, initRow, endCol - 2, color ? BlackRook : WhiteRook);
                    return true;
                }
        return false;
    }

    const isBlackPiece=(piece)=> {
        if(piece === BlackKing
            || piece === BlackQueen
            || piece === BlackKnight
            || piece === BlackPawn
            || piece === BlackRook
            || piece === BlackBishop) {
                return true;
            }
        return false;
    }


    const movePiece=(k, j, row, col, piece) =>{
        if(isBlackPiece(piece)){
            setTurn("White")
        }else{
            setTurn("Black")
        }

        const newboard = board.slice();
        board[k][j] = piece;
        board[row][col] = Empty;
        setBoard(newboard)
    }

    const handleDrop=(k, j)=> {
        var row = Number(sessionStorage.getItem("row"));
        var col = Number(sessionStorage.getItem("col"));
        var piece = sessionStorage.getItem("id");
        if (isLegal(row, col, k, j, piece, board)) {
            movePiece(k, j, row, col, piece);
        }
    }

    return (
        <div>
           <div className = "fullBoard">
                <div className = "center">
                    {renderRow(0)}
                    {renderRow(1)}
                    {renderRow(2)}
                    {renderRow(3)}
                    {renderRow(4)}
                    {renderRow(5)}
                    {renderRow(6)}
                    {renderRow(7)}
                    <p className = "turn">
                        <br></br>
                        {turn + "'s Turn"}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Board

