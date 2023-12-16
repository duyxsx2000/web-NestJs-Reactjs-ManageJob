import React, { ReactNode } from 'react'
import './component.css'

type Props = {
    styles?:{
        background: string,
        color: string
    } | undefined,
    loading?: boolean
    children?: ReactNode,
    validation?:boolean,
    onClick?: () => void

}
const ButtonSample = ({
    children,
    onClick,
    loading,
    styles,
    validation
}: Props) => {

    return (
        <div className='buttonSample' style={styles && {color: styles.color, background: styles.background}} onClick={onClick && onClick}>
            {!loading
                ? children
                : (
                    <div 
                        className='buttonSample-content' 
                        style={{display: 'flex', alignItems:'center', justifyContent:'center', color:'white'}}
                    >
                        <p>loading...</p>
                        {children}
                    </div>
                )
            }
        </div>
    )

}


export default ButtonSample
