type Props = {
    border: string,
    placeholer: string,
    table: string,
    type: string,
    onClick: (e: any) => void,
    value: any,
    name: string

}

const InputSignUp = ({
    border,
    table,
    placeholer,
    type,
    onClick,
    value,
    name
} : Props) => {
    return (
        <div>
            <table>{table}</table>
            <input 
                className={`outline-none mt-2 rounded-[5px] border-2 ${border} w-full p-2`} 
                placeholder={placeholer} 
                type={type}
                name={name}
                value={value}
                onChange={onClick}
            >
            </input>
        </div>
    )
};

export default InputSignUp