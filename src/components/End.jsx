import GameMode from './GameMode';
function End({ gameMode }) {
    if ( gameMode === GameMode.play || gameMode === GameMode.solve || 
        gameMode===GameMode.wrong || gameMode===GameMode.unsafe){return;}
    let content=null;
    switch(gameMode){
        case GameMode.win:
            content="You won!!!";
            break;
        case GameMode.lose:
            content="Wrongly filled, try again.";
            break;
        case GameMode.solved:
            content="Solved";
            break;
        case GameMode.unsolvable:
            content="Unsolvable";
            break;
        default:
            break;
    }
    return (  
        <div className="button wide-button">{content}</div>
    );
}

export default End;