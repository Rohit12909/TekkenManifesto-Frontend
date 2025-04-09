import { createContext, useContext, useState, useEffect  } from "react";
import axios from 'axios';

const UserContext = createContext();
const baseURL = "http://localhost:5260/api";

export const useUserContext = () => useContext(UserContext);

export default function UserProvider({ children })
{
    const [currentURL, setCurrentURL] = useState(() => {
        return baseURL;
    })
    return (
        <UserContext.Provider value={{ currentURL}}>
            {children}
        </UserContext.Provider>
    )
}