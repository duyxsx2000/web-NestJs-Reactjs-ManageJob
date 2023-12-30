import React from 'react'

type Props = {
    placeholder: string,
    borderColor: string,
    label: string
    type: 'number' | 'string',
    onChange: (e: any) => void,
    name: string,
    value: string | number
}
export default function InputTextDefault({
    placeholder,
    borderColor,
    label,
    name,
    type,
    onChange,
    value
    
    
}: Props) {
  return (
    <div className='flex flex-col items-center w-full'>
        <div className='w-3/4 flex justify-start font-semibold mb-1'>
        <label>{label}</label>
        </div>
        <input
            name={name}
            onChange={onChange}
            value={value}
            type={type}
            className={`w-3/4 outline-none border-2 ${borderColor} p-2`}
            placeholder={placeholder}
        />
    </div>
  )
}
