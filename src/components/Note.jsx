function Note({ setEasy, easyBeingSet, setEasyBeingSet }) {
    if(easyBeingSet === 1){
        let newEasy=60;
        return (
            <div className="easy">
                <input className="easy-input" type="text" name="easy-value" onChange={(e)=>{
                    if(e.target.value===null || e.target.value===""){return;}
                    if(parseInt(e.target.value).toString()!==e.target.value.toString()){return;}
                    if(parseInt(e.target.value)<0){newEasy=0; return;}
                    if(parseInt(e.target.value)>81){newEasy=81; return;}
                    newEasy=parseInt(e.target.value);}
                    }
                placeholder="Easter Egg Input"
                />
                <button className="easy-button" onClick={
                    ()=>{
                        setEasy(newEasy);
                        setEasyBeingSet(0);
                    }
                }>Easter Egg Button</button>
            </div>
        );
    }else{
        return (  
            <div className="note-div"><h3><span onClick={()=>{setEasyBeingSet(1);}}>Note:</span> Tap cell and then tap keypad to fill boxes !!!</h3>
            <h3>Orange cell indicates selected cell and red cells indicate unsafe cells.</h3></div>
        );
    }
}

export default Note;