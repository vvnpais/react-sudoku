import Square from "./Square";

function Board({ tiles, gameState, setFocus, focus, setValue, updatedBoxes, unSafe} ) {

    return ( 
        <div className="board">
            <Square unSafe={unSafe} updatedBoxes={updatedBoxes} focus={focus} gameState={gameState} setValue={setValue} setFocus={setFocus} index={0} value={[...tiles.slice(0,3),...tiles.slice(9,12),...tiles.slice(18,21)]}/>
            <Square unSafe={unSafe} updatedBoxes={updatedBoxes} focus={focus} gameState={gameState} setValue={setValue} setFocus={setFocus} index={1} value={[...tiles.slice(3,6),...tiles.slice(12,15),...tiles.slice(21,24)]}/>
            <Square unSafe={unSafe} updatedBoxes={updatedBoxes} focus={focus} gameState={gameState} setValue={setValue} setFocus={setFocus} index={2} value={[...tiles.slice(6,9),...tiles.slice(15,18),...tiles.slice(24,27)]}/>
            <Square unSafe={unSafe} updatedBoxes={updatedBoxes} focus={focus} gameState={gameState} setValue={setValue} setFocus={setFocus} index={3} value={[...tiles.slice(27,30),...tiles.slice(36,39),...tiles.slice(45,48)]}/>
            <Square unSafe={unSafe} updatedBoxes={updatedBoxes} focus={focus} gameState={gameState} setValue={setValue} setFocus={setFocus} index={4} value={[...tiles.slice(30,33),...tiles.slice(39,42),...tiles.slice(48,51)]}/>
            <Square unSafe={unSafe} updatedBoxes={updatedBoxes} focus={focus} gameState={gameState} setValue={setValue} setFocus={setFocus} index={5} value={[...tiles.slice(33,36),...tiles.slice(42,45),...tiles.slice(51,54)]}/>
            <Square unSafe={unSafe} updatedBoxes={updatedBoxes} focus={focus} gameState={gameState} setValue={setValue} setFocus={setFocus} index={6} value={[...tiles.slice(54,57),...tiles.slice(63,66),...tiles.slice(72,75)]}/>
            <Square unSafe={unSafe} updatedBoxes={updatedBoxes} focus={focus} gameState={gameState} setValue={setValue} setFocus={setFocus} index={7} value={[...tiles.slice(57,60),...tiles.slice(66,69),...tiles.slice(75,78)]}/>
            <Square unSafe={unSafe} updatedBoxes={updatedBoxes} focus={focus} gameState={gameState} setValue={setValue} setFocus={setFocus} index={8} value={[...tiles.slice(60,63),...tiles.slice(69,72),...tiles.slice(78,81)]}/>
        </div>
    );
}

export default Board;