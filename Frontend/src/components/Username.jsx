import React from 'react'

const Username = (props) => {
    return (
        <div className="desc py-2 text-gray-400 border-b border-[#4eff4e10] w-full flex justify-center h-10 items-center pl-6 pr-6 gap-2">
            <span className="w-[95%] truncate flex items-center justify-center">{props.username}</span>
            <span onClick={ ()=>{props.handleCopy(props.username)} } className="cursor-pointer group">
                <svg
                    className="transition-all duration-200 fill-gray-500 group-hover:fill-sky-400 group-hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.5)] group-active:scale-90"
                    xmlns="http://www.w3.org/2000/svg"
                    height="20px"
                    viewBox="0 -960 960 960"
                    width="24px"
                >
                    <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" />
                </svg>
            </span>
        </div>
    )
}

export default Username