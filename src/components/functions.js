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

let action = (easy, content ,tiles, setTiles, gameState, setGameMode, gameMode, setUnDeletable)=>{
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
        let timelimit=40;
        let count=0;
        let unsolvable=0;
        let order=createOrder(newTiles, 0.15);
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
                order=createOrder(newTiles, 0.15);
                ci=0;
                newTiles[order[ci]]=1;
                t=Date.now()
                count+=1;
                if(timelimit<150){
                    if(count>maxCount){
                        timelimit+=1;
                        if(timelimit===60 || timelimit ===80){maxCount-=1;}  
                        count=0;
                    }
                }
                else if(timelimit===150){unsolvable=1; break;}
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
    }else if(content === "Reset"){
        if(gameMode===GameMode.solved || gameMode===GameMode.solve){
            let newTiles=Array(81).fill(null);
            setTiles(newTiles);
            setGameMode(GameMode.solve);
            return;
        }else{
            let newTiles=Array(81).fill(0);
            let order=createOrder(newTiles, 0.2);
            let ci=0;
            newTiles[order[ci]]=1;
            let t=Date.now();
            while(newTiles.includes(0) || !safe(newTiles,order[order.length-1])){
                let nowt=Date.now();
                if(nowt-t>70){
                    // console.log(newTiles.includes(0) , !safe(newTiles,order[order.length-1]));
                    // console.log(maxCount);
                    // console.log(newTiles);
                    // console.log(order);
                    newTiles=Array(81).fill(0);
                    order=createOrder(newTiles, 0.2);
                    ci=0;
                    newTiles[order[ci]]=1;
                    t=Date.now()
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
            let removedIndices=Array(81).fill(0);
            let newUnDeletable=Array(81).fill(1);
            for(let i=0;i<81;i++){removedIndices[i]=i;}
            let perSquare=Math.trunc(easy/9);
            let removedCount=perSquare*9;
            let squares={
                1: [ 0 , 1 , 2 , 9 , 10 , 11 , 18 , 19 , 20 ],
                2: [ 3 , 4 , 5 , 12 , 13 , 14 , 21 , 22 , 23 ],
                3: [ 6 , 7 , 8 , 15 , 16 , 17 , 24 , 25 , 26 ],
                4: [ 27 , 28 , 29 , 36 , 37 , 38 , 45 , 46 , 47 ],
                5: [ 30 , 31 , 32 , 39 , 40 , 41 , 48 , 49 , 50 ],
                6: [ 33 , 34 , 35 , 42 , 43 , 44 , 51 , 52 , 53 ],
                7: [ 54 , 55 , 56 , 63 , 64 , 65 , 72 , 73 , 74 ],
                8: [ 57 , 58 , 59 , 66 , 67 , 68 , 75 , 76 , 77 ],
                9: [ 60 , 61 , 62 , 69 , 70 , 71 , 78 , 79 , 80 ]
            }
            for(let i=1;i<=9;i++){
                squares[i]=squares[i].sort(()=>(Math.random()-0.5));
                squares[i]=squares[i].sort(()=>(Math.random()-0.5));
                squares[i]=squares[i].sort(()=>(Math.random()-0.5));
            }
            for(let i=0;i<perSquare;i++){
                for(let j=1;j<10;j++){
                    newTiles[squares[j][i]]=null;
                    newUnDeletable[squares[j][i]]=0;
                }
            }
            while(removedCount<easy){
                let randomIndex=Math.trunc(Math.random()*81);
                if(newTiles[randomIndex]===null){continue;}
                else{
                    newTiles[randomIndex]=null;
                    newUnDeletable[randomIndex]=0;
                    removedCount+=1;
                }
            }
            setUnDeletable(newUnDeletable);
            setTiles(newTiles);
            setGameMode(GameMode.play);
            return;
        }
    }
}

let actionF=()=>{
    return action;
}

export default actionF;