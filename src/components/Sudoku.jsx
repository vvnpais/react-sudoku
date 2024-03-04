import Board from "./Board";
import { useState, useEffect } from "react";
import GameState from "./GameState";
import Keypad from "./Keypad";
import CheckButton from "./CheckButton";
import SolveButton from "./SolveButton";
import PlayAgain from "./PlayAgain";
import GameMode from './GameMode';
import End from "./End";
import Reset from "./Reset";
import actionF from './functions';
import Note from "./Note";

function Sudoku() {

    const [tiles, setTiles] = useState(Array(81).fill(null));
    const [gameMode, setGameMode] = useState(GameMode.play);
    const [gameState, setGameState] = useState(GameState.inProgress);
    const [focus, setFocus] = useState();
    const [value, setValue] = useState(null);
    const [playAgainContent, setPlayAgainContent] = useState("Check");
    const [updatedBoxes, setUpdatedBoxes] = useState(Array(81).fill(0));
    const [unSafe, setUnsafe] = useState(Array(81).fill(0));
    const [unDeleteable ,setUnDeletable] = useState(Array(81).fill(0));
    const [easy, setEasy] = useState(60);
    const [easyBeingSet, setEasyBeingSet] = useState(0);

    useEffect(()=>{
        let action=actionF();
        action( easy, "Reset" ,tiles, setTiles, gameState, setGameMode, gameMode,setUnDeletable  );
    },[]);

    useEffect(()=>{
        if(gameMode !== GameMode.play){return ;}
        let safeCheck=[...tiles];
        for(let i=0;i<81;i++){if(safeCheck[i]==null){safeCheck[i]=0;}}
        const newUnsafe=[...unSafe];
        for(let i=0;i<81;i++){
            if(!safe(safeCheck,i)){
                newUnsafe[i]=1;
            }else{
                newUnsafe[i]=0;
            }
        setUnsafe(newUnsafe);
        }
    },[tiles]);

    useEffect(()=>{
        if(gameMode === GameMode.wrong){
            setPlayAgainContent("Not correct");
            setTimeout(()=>{setPlayAgainContent("Check");},1000);
            setGameMode(GameMode.play);
        }
    },[gameMode]);

    useEffect(()=>{
        if(gameState !== GameState.inProgress){return ;}
        if(value === null ){return ;}
        if(unDeleteable[focus]===1){return;}
        let key=parseInt(value);
        // console.log(key, typeof(key), index);
        const newTiles=[...tiles];
        if(value===""){
            newTiles[focus]=null;
            const newUpdatedBoxes=[...updatedBoxes];
            newUpdatedBoxes[focus]=0;
            setUpdatedBoxes(newUpdatedBoxes);
        }else if(key>0 && key<10){
            newTiles[focus]=key;
            const newUpdatedBoxes=[...updatedBoxes];
            newUpdatedBoxes[focus]=1;
            setUpdatedBoxes(newUpdatedBoxes);
        }
        setTiles(newTiles); 
        // setFocus(null);
        // console.log(newTiles);
    },[value]);

    return ( 
        <div className="sudoku">
            <Note setEasy={setEasy} easyBeingSet={easyBeingSet} setEasyBeingSet={setEasyBeingSet}/>
            <div className="button-pad">
                <CheckButton easy={easy} setUnDeletable={setUnDeletable} setFocus={setFocus} setUpdatedBoxes={setUpdatedBoxes} setPlayAgainContent={setPlayAgainContent} setGameMode={setGameMode} gameMode={gameMode} gameState={gameState} tiles={tiles} setTiles={setTiles}/>
                <SolveButton setFocus={setFocus} setUpdatedBoxes={setUpdatedBoxes} setPlayAgainContent={setPlayAgainContent} setGameMode={setGameMode} gameMode={gameMode} gameState={gameState} tiles={tiles} setTiles={setTiles}/>
            </div>
            <Board unSafe={unSafe} updatedBoxes={updatedBoxes} gameState={gameState} focus={focus} setFocus={setFocus} className="board" tiles={tiles} setValue={setValue}/>
            <Keypad setValue={setValue}/>
            <div className="button-pad">
                <PlayAgain easy={easy} setUnDeletable={setUnDeletable} setUpdatedBoxes={setUpdatedBoxes} gameMode={gameMode} content={playAgainContent} tiles={tiles} setTiles={setTiles} gameState={gameState} setGameMode={setGameMode}/>
                <Reset easy={easy} setUnDeletable={setUnDeletable} gameMode={gameMode} gameState={gameState} setGameMode={setGameMode} tiles={tiles}  setUnsafe={setUnsafe} setTiles={setTiles} setUpdatedBoxes={setUpdatedBoxes} setFocus={setFocus}/>
            </div>
            <End gameMode={gameMode}/>
        </div>
    );  
}

export default Sudoku;

function safe(game, index){
    for(let i=Math.floor(index/9)*9;i<Math.floor(index/9)*9+9;i++){
        if(game[i]===game[index] && (game[index]!==0) && i!==index){return false;}
    }
    for(let i=index%9;i<(index%9)+81;i=i+9){
        if(game[i]===game[index] && (game[index]!==0) && i!==index){return false;}
    }
    let x=Math.floor((index%9)/3)*3+1;
    let y=Math.floor(Math.floor(index/9)/3)*3+1;
    for( let i=x-1 ; i<x+2 ; i++ ){
        for( let j=y-1 ; j<y+2 ; j++ ){
            if(j*9+i===index){continue;}
            else{if(game[j*9+i]===game[index] && game[index]!==0){return false;}}
        }
    }
    return true;
}