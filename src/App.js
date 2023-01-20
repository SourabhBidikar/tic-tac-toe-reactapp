import './App.css';
import { useEffect, useState } from 'react';
import { Square } from './components/square';
import { Patterns } from './components/patterns';

function App() {

  const [board,setBoard]=useState(["","","","","","","","",""]);
  const [player,setPlayer]=useState("O")  //useeffect changes it to X on first render
  const [result,setResult]=useState({winner:"none",state:"none"})

  useEffect(()=>{
    checkWin();
    checkIfTie();
    if(player==="X"){
      setPlayer("O")
    }
    else{
      setPlayer("X");
    }
  },[board])


  useEffect(()=>{
    if(result.winner!="none"){
      if(result.winner!="no one"){
        alert(`Game finished winning player:${result.winner}`)
      
        restart();
      }
      else{
        alert(`Game tied`); 
      }
    }
    
  },[result])


  const checkWin=()=>{
    Patterns.forEach((currPattern)=>{
      const firstPlayer = board[currPattern[0]];
      if(firstPlayer=="") return;
      let foundWinpattern=true;
      currPattern.forEach((i)=>{
        if(board[i]!=firstPlayer){
          foundWinpattern=false;
        }
      });

      if(foundWinpattern){
        setResult({winner: player,state:"won"})
      }

    })
  }

  const chooseSquare=(square)=>{
      setBoard(
        board.map((value,index)=>{
          if(index===square && value==="")
          {
              return player;
          }
          return value;
        })
      );
      
  };

  const checkIfTie=()=>{
      let filled =true;
      board.forEach((square)=>{
        if(square==""){
          filled=false;
        }
      })

      if(filled){
        setResult({winner:"no one",state:"Tie"   })
      }
  }

  const restart=()=>{
    setBoard(["","","","","","","","",""])
    setPlayer("O")
  }
  return (
    <><h4>start with 1st Player using X </h4>
    <div className="App">
      
      <div className="board">
        <div className="row">
          <Square value={board[0]} chooseSquare={()=>chooseSquare(0)}/>
          <Square value={board[1]} chooseSquare={()=>chooseSquare(1)}/>
          <Square value={board[2]} chooseSquare={()=>chooseSquare(2)}/>
        </div>
        <div className="row">
          <Square value={board[3]} chooseSquare={()=>chooseSquare(3)}/>
          <Square value={board[4]} chooseSquare={()=>chooseSquare(4)}/>
          <Square value={board[5]} chooseSquare={()=>chooseSquare(5)}/>
        </div>
        <div className="row">
          <Square value={board[6]} chooseSquare={()=>chooseSquare(6)}/>
          <Square value={board[7]} chooseSquare={()=>chooseSquare(7)}/>
          <Square value={board[8]} chooseSquare={()=>chooseSquare(8)}/>
        </div>
      </div>
    </div></>
  );
}

export default App;
