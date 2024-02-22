import React from "react"

type Props = {
    name: string,
    count: number
};
const CountButton = ({
    name,
    count
}: Props) => {
    return (
        <div className="w-1/3 text-center p-1 ">
            <div className="bg-white h-[100px] rounded-lg">
                <p>{name}</p>
                <p className="mt-2 text-[30px]">{count}</p>
            </div>
        </div>
    )
};

export default CountButton