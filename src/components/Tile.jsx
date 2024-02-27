import GameState from "./GameState";
function Tile({ value, index, setFocus, focus, setValue, gameState, updatedBoxes, unSafe }) {
    let updated=null;
    if(updatedBoxes[index] === 1){updated="updated";}
    let isFocused=null;
    if(focus === index){isFocused="tile-focus";}
    let unsafe=null;
    if(unSafe[index]===1){unsafe="unsafe";}
    return ( 
        <div onClick={()=>{if(gameState!==GameState.inProgress){return;} setFocus(index); setValue(null);}} className={`tile ${isFocused} ${updated} ${unsafe}`}>{value}</div>
    );
}

export default Tile;