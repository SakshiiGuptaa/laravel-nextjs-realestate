"use client"
import Loader from "@/components/Loader";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface AppProviderType{
    isLoading:boolean,
    authToken:string|null,
    login: (email: string, phone_number: string) => Promise<void>,
    register: (name:string, user_type:string, email: string, phone_number:string) => Promise<void>,
    logout: ()=> void
} 

const AppContext = createContext<AppProviderType|undefined>(undefined)

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`

export const AppProvider = ({
  children,
}: {
  children: React.ReactNode;
}) =>{

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [authToken, setAuthToken] = useState<string|null>(null);
    const router = useRouter()

    useEffect(() => {
    const token = Cookies.get("authToken");

    if (token) {
        setAuthToken(token);
    } 
    // else {
    //     router.push("/auth");
    // }

    setIsLoading(false);
    }, []); // <--- Add this empty array

    const login = async (email: string, phone_number:string) =>{
        setIsLoading(true);
        try{
            const response = await axios.post(`${API_URL}/login`, {
                email,
                phone_number
            });

            if(response.data.status){
                Cookies.set("authToken", response.data.token, { expires: 7 });
                toast.success("Login successful");
                setAuthToken(response.data.token)
                router.push("/PropertyPost")
            }else{
                toast.error("Invalid login details")
            }

            console.log(response);

        }catch(error){
            console.log(error);
        }
        finally{
            setIsLoading(false);
        }
    }

    const register = async (name:string, user_type:string, email: string, phone_number:string) =>{
        setIsLoading(true);
        try{
            const response = await axios.post(`${API_URL}/register`, {
                name,
                user_type,
                email,
                phone_number,
                // password,
                // password_confirmation
            });
            if(response.data.status){
                toast.success("Registration done successfully, Login to continue!");
            }else{
                toast.error("Invalid Registration details")
            }
            console.log(response);
            
        }catch(error){
            console.log(error);
        }
        finally{
            setIsLoading(false);
        }
    }

    const logout = () => {
        setAuthToken(null);
        Cookies.remove("authToken");
        setIsLoading(false);
        toast.success("User logged out")
        router.push("/auth")
    }

    return (
        <AppContext.Provider value={{login, register, isLoading, authToken, logout}}>
            {isLoading ? <Loader/> : children}
        </AppContext.Provider>
    )
}

export const myAppHook = () => {

    const context = useContext(AppContext);

    if(!context){
        throw new Error("Context will be wrapped inside AppProvider");
    }

    return context;
}