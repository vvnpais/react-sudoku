import GameMode from './GameMode';
function CheckButton({ setPlayAgainContent, setGameMode, gameMode, gameState, tiles, setTiles, setUpdatedBoxes, setFocus }) {
    let set=null;
    if(gameMode === GameMode.play){set="mode";}
    return (  
        <div className={`button ${set}`} onClick={()=>{
            setGameMode(GameMode.play); 
            setPlayAgainContent("Check"); 
            // setTiles(Array(81).fill(null)); 
            // setUpdatedBoxes(Array(81).fill(0));
            // setFocus(null);
        }}>Play Sudoku</div>
    );
}

export default CheckButton;