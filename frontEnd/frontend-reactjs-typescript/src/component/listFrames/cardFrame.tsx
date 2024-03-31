import React from "react";
type Props = {
    name: string,
    action?: string 
}
const CardFrame = ({name, action}: Props) => {
    return (
        <div className="p-2 rounded-[5px] bg-white  mt-2 border-[2px] hover:border-green-500 ">
            {name}
        </div>
    )
};
export default CardFrame;
