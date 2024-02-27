import Key from "./Key";

function Keypad({ setValue }) {
    return (  
        <div className="keypad">
            <Key setValue={setValue} value={"Del"}/>
            <Key setValue={setValue} value={1}/>
            <Key setValue={setValue} value={2}/>
            <Key setValue={setValue} value={3}/>
            <Key setValue={setValue} value={4}/>
            <Key setValue={setValue} value={5}/>
            <Key setValue={setValue} value={6}/>
            <Key setValue={setValue} value={7}/>
            <Key setValue={setValue} value={8}/>
            <Key setValue={setValue} value={9}/>
        </div>
    );
}

export default Keypad;