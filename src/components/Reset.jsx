import GameMode from './GameMode';
import actionF from './functions';

function Reset({ easy, gameMode, setTiles, setUpdatedBoxes, setFocus, setUnsafe, tiles, gameState, setGameMode, setUnDeletable }) {
    let action=actionF();
    // if(gameMode === GameMode.play){action=actionF();}
    return (  
        <div className="button" onClick={()=>{
            setUnDeletable(Array(81).fill(0));
            setTiles(Array(81).fill(null)); 
            setUpdatedBoxes(Array(81).fill(0));
            setUnsafe(Array(81).fill(0));
            setFocus(null);
            action( easy, "Reset" ,tiles, setTiles, gameState, setGameMode, gameMode ,setUnDeletable );
        }}>Reset</div>
    );
}

export default Reset;