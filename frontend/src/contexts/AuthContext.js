import {createContext, useState, useEffect} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import axios from "axios";

export const Context = createContext();

const AuthContext = ({children}) => {
    const auth = getAuth();
    const [user, setUser] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [loading, setLoading] = useState(true);

    const GetUser = async uid => {
        const {data} = await axios.post("http://localhost/instagram-clone/manager/AuthenticationManager.php", {
            actionType: "GetUser",
            uid: uid
        });

        return data;
    }

    useEffect(() => {
        let unsubscribe;
        unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setLoading(false);
            if(currentUser) setUser(currentUser);
            if(currentUser) setCurrentUser(await GetUser(currentUser.uid));
            else setUser(null);
        });
        return () => {
            if (unsubscribe) unsubscribe()
        }
    },[auth]);

    const values = {user, setUser, currentUser}

    return <Context.Provider value={values}>
        {!loading && children}
    </Context.Provider>
}

export default AuthContext;