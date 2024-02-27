import Tile from "./Tile";
function Square({ value, index, setFocus, focus, setValue , gameState, updatedBoxes, unSafe}) {
    let newIndex=Math.trunc(index/3);
    return (  
        <div className="square">
            <Tile unSafe={unSafe} updatedBoxes={updatedBoxes} focus={focus} gameState={gameState} setValue={setValue} setFocus={setFocus} index={newIndex*27+(index%3)*3+0}  value={value[0]}/>
            <Tile unSafe={unSafe} updatedBoxes={updatedBoxes} focus={focus} gameState={gameState} setValue={setValue} setFocus={setFocus} index={newIndex*27+(index%3)*3+1}  value={value[1]}/>
            <Tile unSafe={unSafe} updatedBoxes={updatedBoxes} focus={focus} gameState={gameState} setValue={setValue} setFocus={setFocus} index={newIndex*27+(index%3)*3+2}  value={value[2]}/>
            <Tile unSafe={unSafe} updatedBoxes={updatedBoxes} focus={focus} gameState={gameState} setValue={setValue} setFocus={setFocus} index={newIndex*27+(index%3)*3+9}  value={value[3]}/>
            <Tile unSafe={unSafe} updatedBoxes={updatedBoxes} focus={focus} gameState={gameState} setValue={setValue} setFocus={setFocus} index={newIndex*27+(index%3)*3+10} value={value[4]}/>
            <Tile unSafe={unSafe} updatedBoxes={updatedBoxes} focus={focus} gameState={gameState} setValue={setValue} setFocus={setFocus} index={newIndex*27+(index%3)*3+11} value={value[5]}/>
            <Tile unSafe={unSafe} updatedBoxes={updatedBoxes} focus={focus} gameState={gameState} setValue={setValue} setFocus={setFocus} index={newIndex*27+(index%3)*3+18} value={value[6]}/>
            <Tile unSafe={unSafe} updatedBoxes={updatedBoxes} focus={focus} gameState={gameState} setValue={setValue} setFocus={setFocus} index={newIndex*27+(index%3)*3+19} value={value[7]}/>
            <Tile unSafe={unSafe} updatedBoxes={updatedBoxes} focus={focus} gameState={gameState} setValue={setValue} setFocus={setFocus} index={newIndex*27+(index%3)*3+20} value={value[8]}/>
        </div>
    );
}

export default Square;