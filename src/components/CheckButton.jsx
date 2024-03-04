import GameMode from './GameMode';
import actionF from './functions';
function CheckButton({ easy, setPlayAgainContent, setGameMode, gameMode, gameState, tiles, setTiles, setUpdatedBoxes, setFocus, setUnDeletable }) {
    let set=null;
    if(gameMode === GameMode.play){set="mode";}
    return (  
        <div className={`button ${set}`} onClick={()=>{
            setGameMode(GameMode.play); 
            let isNull=1;
            for(let i=0;i<81;i++){
                if(tiles[i]!==null){isNull=0;}
            }
            if(isNull===1){
                let action=actionF();
                action( easy, "Reset" ,tiles, setTiles, gameState, setGameMode, GameMode.play ,setUnDeletable );
            }
            setPlayAgainContent("Check"); 
            // setTiles(Array(81).fill(null)); 
            // setUpdatedBoxes(Array(81).fill(0));
            // setFocus(null);
        }}>Play Sudoku</div>
    );
}

export default CheckButton;