function Key({ value, setValue }) {
    let val=value;
    if(value==="Del"){val="";}
    return (  
        <div onClick={()=>(setValue(val))} className="key">{value}</div>
    );
}

export default Key;