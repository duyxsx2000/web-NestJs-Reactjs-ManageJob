import React, { ReactNode } from 'react'

type Props = {
    color: string,
    onClick: () => void,
    content: string
}
const ButtonDefault = ({
    color,
    onClick,
    content
}: Props ) => {

    return (
        <div 
            onClick={onClick} 
            className={`flex justify-center items-center text-white font-semibold group  cursor-pointer w-[100px] p-2 border-2 border-double ${color} rounded-[5px]  `}
        >
            <p className='group-hover:scale-[1.2]'>{content}</p>  
        </div>
    )

}

 export default ButtonDefault