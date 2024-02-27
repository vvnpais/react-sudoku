import GameMode from './GameMode';
function SolveButton({ setPlayAgainContent, setGameMode, gameMode, gameState ,tiles, setTiles, setUpdatedBoxes, setFocus }) {
    let set=null;
    if(gameMode === GameMode.solve){set="mode";}
    return (  
        <div className={`button ${set}`} onClick={()=>{
            setGameMode(GameMode.solve); 
            setPlayAgainContent("Solve"); 
            // setTiles(Array(81).fill(null)); 
            // setUpdatedBoxes(Array(81).fill(0));
            // setFocus(null);
        } }>Sudoku Solver</div>
    );
}

export default SolveButton;