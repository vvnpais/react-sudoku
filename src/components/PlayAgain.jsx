import GameMode from './GameMode';
import actionF from './functions'

function PlayAgain({ content ,tiles, setTiles, gameState, setGameMode, gameMode, setUpdatedBoxes, setUnDeletable }) {
    let action=actionF();
    return (  
        <div className="button" onClick={()=>{
            // setUnDeletable(Array(81).fill(0));
            if(gameMode===GameMode.solve){
                let newUpdatedBoxes=Array(81).fill(0);
                for(let i=0;i<81;i++){
                    if(tiles[i]!==null){
                        newUpdatedBoxes[i]=1;
                    }
                }
                setUpdatedBoxes(newUpdatedBoxes);
            }
            action( 0 , content ,tiles, setTiles, gameState, setGameMode, gameMode, setUnDeletable);
        }}>{content}</div>   
    );
}

export default PlayAgain;