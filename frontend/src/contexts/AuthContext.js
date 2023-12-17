import {createContext, useState, useEffect} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import axios from "axios";
import {authApi} from "../url";

export const Context = createContext();

const AuthContext = ({children}) => {
    const auth = getAuth();
    const [user, setUser] = useState({});
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const GetUser = async uid => {
        const {data} = await axios.post(authApi, {
            actionType: "GetUser",
            uid: uid
        });

        return data;
    }

    useEffect(() => {
        let unsubscribe;
        unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setCurrentUser(await GetUser(currentUser.uid));
                setUser(currentUser);
            } else {
                setCurrentUser(null);
                setUser(null);
            }
            setLoading(false);
        });
        return () => {
            if (unsubscribe) unsubscribe()
        }
    }, [auth]);

    const values = {user, setUser, currentUser, setCurrentUser, loading}

    return <Context.Provider value={values}>
        {children}
    </Context.Provider>
}

export default AuthContext;