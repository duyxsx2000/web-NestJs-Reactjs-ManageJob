import React from 'react'
import { PlusOutlined} from '@ant-design/icons';
type Props = {
    onClick: () => void,
    color: string,
    width: string
}
const ButtonAddJob = ({
    onClick, 
    color, 
    width
}: Props) => {

  return (
    <div className={`${width} h-[280px] flex justify-center items-center `}>
        <div className={`bg-gradient-to-t from-${color}-500 to-transparent group w-[90%] bg-${color}-300 cursor-pointer hover:bg-${color}-500  h-[90%]  shadow-md hover:shadow-xl rounded-lg flex justify-center items-center pb-2`}>
            <span className='text-white'>
            <PlusOutlined 
                style={{fontSize:'50px'}} 
                className='group-hover:scale-[1.5] group-hover:'
                onClick={onClick} />
            </span>
        </div>
    </div>
  )
};
export default ButtonAddJob
