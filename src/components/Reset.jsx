function Reset({ setTiles, setUpdatedBoxes, setFocus, setUnsafe }) {
    return (  
        <div className="button" onClick={()=>{
            setTiles(Array(81).fill(null)); 
            setUpdatedBoxes(Array(81).fill(0));
            setUnsafe(Array(81).fill(0));
            setFocus(null);
        }}>Reset</div>
    );
}

export default Reset;