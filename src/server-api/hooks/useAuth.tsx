import { useContext, useEffect, useState } from "react";
import authStorage from "../../storage";
import { useRouter } from "next/navigation";

interface UserDetails {
    id: string;
    userID: string;
    userType: string;
    email: string;
    token?: string; // Make JWT_Token optional
}

interface AuthMethods {
    setLogIn: (userDetails: UserDetails, JWT_Token: string) => void;
    setLogOut: () => void;
}

const useAuth = (): { user: UserDetails | null } & AuthMethods & { setUser: React.Dispatch<React.SetStateAction<UserDetails | null>> } => {
    const router = useRouter();

    const [user, setUser] = useState<any>({});

    useEffect(() => {
        loadUserSession()
    }, [])

    const setLogIn = (userDetails: UserDetails, token: string): void => {
        setUser(userDetails);

        authStorage.storeUser(userDetails);
    };

    const setLogOut = (): void => {
        setUser(null);
        authStorage.deleteUser();
    };

    const loadUserSession = async () => {
        const user_ = await authStorage.getUser();

        setUser(user_);
    };
    return { user, setLogIn, setLogOut, setUser };
};

export default useAuth;
