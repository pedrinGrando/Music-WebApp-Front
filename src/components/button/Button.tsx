import React from "react";

interface ButtonProps {
    style?: string;
    onClick?: (event: any) => void;
    label?: string;
    type: "submit" | "button" | "reset" | undefined
}

export const Button: React.FC<ButtonProps> = ({
    onClick, style, label, type
} ) => {
    return (
        <>
        <button className={`${style} text-white px-4 py-2 rounded-lg hover:bg-${style}-300`} 
             type={type}
             onClick={onClick}>
             { label }
            
            </button>
        </>
    )
}