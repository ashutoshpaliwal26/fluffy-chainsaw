import React, { createContext, useContext, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'

interface ToastPropsType {
    children: ReactNode
}

interface ToastProviderType {
    showToast: (message: string, duration: number, type?: "error") => void
}

const ToastProvider = createContext<ToastProviderType | null>(null);

const ToastContext: React.FC<ToastPropsType> = ({ children }) => {
    const [type, setType] = useState<"success" | "error">("success");
    const [isToast, setIsToast] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const showToast = (
        message: string,
        duration: number,
        type: "success" | "error" = "success"
    ) => {
        setIsToast(true);
        setType(type);
        setMessage(message);
        setTimeout(() => {
            setIsToast(false);
            setMessage("");
        }, duration * 1000);
    }

    return (
        <ToastProvider.Provider value={{ showToast }}>
            <div className='w-full h-full'>
                {isToast && <motion.div
                    initial={{
                        bottom: 40,
                        left: 10,
                        opacity: 0
                    }}
                    animate={{
                        y: 20,
                        opacity: 1
                    }}
                    transition={{
                        duration: 1
                    }}

                    className={`bottom-10 left-10 z-10 fixed w-fit rounded-sm outline-2 ${type==="success" ? "outline-green-500" : "outline-red-500"} h-10 ${type === "success" ? "bg-green-200" : "bg-red-200"} flex items-center justify-center p-4`}>
                    <p>{message}</p>
                </motion.div>}
                {children}
            </div>
        </ToastProvider.Provider>
    )
}

export const useToast = () => {
    const context = useContext(ToastProvider);
    if(!context){
        return null
    }
    return context.showToast;
}

export default ToastContext