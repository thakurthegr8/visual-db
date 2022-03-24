import React, { memo } from 'react'
interface Props {
    type: string;
    value: string;
    handler: (text: string) => void;
    placeholder: string;
}
const InputField: React.FC<Props> = ({ type, value, handler, placeholder }) => {
    return (
        <input
            required
            onChange={(e) => handler(e.target.value)}
            value={value}
            className="p-3.5 sm:p-2 font-semibold transition focus:border-green-500 bg-white focus:outline-none bg-opacity-20 rounded  border border-accent-gray-light border-opacity-50"
            type={type}
            placeholder={placeholder}
        />
    )
}

export default memo(InputField);