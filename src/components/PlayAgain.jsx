import GameMode from './GameMode';

function safe(game, index){
    for(let i=Math.floor(index/9)*9;i<Math.floor(index/9)*9+9;i++){
        if(game[i]===game[index] && (game[index]!==0) && i!==index){return false;}
    }
    for(let i=index%9;i<(index%9)+81;i=i+9){
        if(game[i]===game[index] && (game[index]!==0) && i!==index){return false;}
    }
    let x=Math.floor((index%9)/3)*3+1;
    let y=Math.floor(Math.floor(index/9)/3)*3+1;
    for( let i=x-1 ; i<x+2 ; i++ ){
        for( let j=y-1 ; j<y+2 ; j++ ){
            if(j*9+i===index){continue;}
            else{if(game[j*9+i]===game[index] && game[index]!==0){return false;}}
        }
    }
    return true;
}

function createOrder(game, randomisation){
    let order=[];
    for(let i=0;i<81;i++){if(game[i]===0){order.push(i);}}
    order.sort( (a,b) => (updateAvailable(game,a)-updateAvailable(game,b)) );
    order.sort( ()=>{return Math.random() - randomisation ;} )
    // console.log("order",order);
    return order;
}

function updateAvailable(game,index){
    let count=0;
    if(game[index]===0){
        let availableArray=Array(10).fill(1);
        for(let i=Math.floor(index/9)*9;i<Math.floor(index/9)*9+9;i++){
            availableArray[game[i]]=0;
        }
        for(let i=index%9;i<(index%9)+81;i=i+9){
            availableArray[game[i]]=0;
        }
        let x=Math.floor((index%9)/3)*3+1;
        let y=Math.floor(Math.floor(index/9)/3)*3+1;
        for( let i=x-1 ; i<x+2 ; i++ ){
            for( let j=y-1 ; j<y+2 ; j++ ){
                availableArray[game[j*9+i]]=0;
            }
        }
        for(let i=1;i<10;i++){
            if(availableArray[i]===1){count+=1;}
        }
    }
    return count;
}

let action = (content ,tiles, setTiles, gameState, setGameMode)=>{
    if(content === "Check"){
        let correct=1;
        for(let i=0; i<9; i++){
            if(tiles[i] === null || !safe(tiles, i)){correct = 0;}
        }
        if(correct === 1){setGameMode(GameMode.win);}
        else{
            setGameMode(GameMode.wrong);
        }
    }else if(content === "Solve"){
        let newTiles=[...tiles];
        for(let i=0;i<81;i++){
            if(newTiles[i]===null){newTiles[i]=0;}
        }
        let timelimit=30;
        let count=1;
        let unsolvable=0;
        let order=createOrder(newTiles, 0.1);
        let ci=0, maxCount=2;
        newTiles[order[ci]]=1;
        let t=Date.now();
        while(newTiles.includes(0) || !safe(newTiles,order[order.length-1])){
            let nowt=Date.now();
            if(nowt-t>timelimit){
                console.log(maxCount);
                newTiles=[...tiles];
                for(let i=0;i<81;i++){
                    if(newTiles[i]===null){newTiles[i]=0;}
                }
                order=createOrder(newTiles, 0.1);
                ci=0;
                newTiles[order[ci]]=1;
                t=Date.now()
                count+=1;
                if(timelimit<100){
                    if(count>maxCount){
                        timelimit+=1;
                        if(timelimit===50){maxCount-=1;}  
                        count=1;
                    }
                }
                else if(timelimit===100){unsolvable=1; break;}
                // if(randomisation<0.49){randomisation+=0.01;}
            }
            if(!safe(newTiles, order[ci])){
                while(newTiles[order[ci]]===9){
                    newTiles[order[ci]]=0;
                    ci-=1;
                }
                newTiles[order[ci]]+=1;
            }
            else{ci+=1; newTiles[order[ci]]=1;}
        }
        if(unsolvable===1){setGameMode(GameMode.unsolvable); return;}
        else{setGameMode(GameMode.solved); setTiles(newTiles);}
    }
    }

function PlayAgain({ content ,tiles, setTiles, gameState, setGameMode }) {
    return (  
        <div className="button" onClick={()=>{action(content ,tiles, setTiles, gameState, setGameMode);}}>{content}</div>   
    );
}

export default PlayAgain;