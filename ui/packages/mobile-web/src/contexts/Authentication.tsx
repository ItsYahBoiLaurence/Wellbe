import { createContext, useState, useContext, PropsWithChildren, useEffect } from "react";
import { auth } from "../api/firebaseServices/firebaseConfig";
import { User, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Stack } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthenticationContext = createContext<AuthContextType | undefined>(undefined)

const EXCLUDED_PATHS = [
    '/sign-in',
    '/sign-up',
    '/forgot-password',
    '/reset-password',
    '/otp',
    'forget-password',
];

export const Authentication = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState<User | null>(null);
    const location = useLocation();
    const navigate = useNavigate();

    const login = async (email: string, password: string) => {
        try {
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredentials.user)
        } catch (error) {
            throw error
        }
    }

    const logout = async () => {
        await signOut(auth)
        setUser(null)
    }


    useEffect(() => {
        if (!user && !EXCLUDED_PATHS.includes(location.pathname)) {
            navigate('/sign-in')
        }
    }, [user, location.pathname])

    useEffect(() => {
        if (user && EXCLUDED_PATHS.includes(location.pathname)) {
            navigate('/')
        }
    }, [user, location.pathname])

    return (
        <AuthenticationContext.Provider value={{ user, login, logout }}>
            <Stack
                style={{
                    width: '100vw',
                    height: '100vh',
                }}
            >
                {children}
            </Stack>
        </AuthenticationContext.Provider>
    )
}
