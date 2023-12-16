import React from "react";
import './component.css'

type Props = {
    border: string;
    background: string;
    placeholder: string,
    width: string,
    height: string
}
const InputSample = ({
    border, 
    background, 
    placeholder,
    width,
    height
}: Props ) => (
    
    <div style={{border:`1px solid ${border}`, background: background, width: width, height: height}}>
        <input 
            className="inputSample" 
            placeholder={placeholder}
            style={{  width:'min-80%', height: '100%'}} 
        />

    </div>

    
);

export default InputSample
