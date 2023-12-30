import React from "react";
import './component.css'

type Props = {
    border: string;
    background: string;
    placeholder: string,
    width: string,
    height: string,
    icon: any | null,
    onChange:  ()=> void
}
const InputSample = ({
    border, 
    background, 
    placeholder,
    width,
    height,
    icon,
    onChange
}: Props ) => (
    
    <div 
        style={{border:`1px solid ${border}`, background: background, width: width, height: height}}
        onChange={onChange}
    >
        <input 
            className="inputSample" 
            placeholder={placeholder}
            style={{  width:'min-80%', height: '100%'}} 
        />
        {icon}

    </div>

    
);

export default InputSample
