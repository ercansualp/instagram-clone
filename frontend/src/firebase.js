import {initializeApp} from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import axios from 'axios';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

initializeApp(firebaseConfig);

const auth = getAuth();

export const Login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
        return true;
    } catch (error) {
        return false;
    }
}

export const Register = async (formData) => {
    try {
        await createUserWithEmailAndPassword(auth, formData.email, formData.password)
            .then(async () => {
                try {
                    await axios.post("http://localhost/instagram-clone/manager/AuthenticationManager.php", {
                        actionType: "AddUser",
                        user: {
                            uid: auth.currentUser.uid,
                            username: formData.username,
                            name: formData.name,
                            password: formData.password,
                            email: formData.email
                        },
                    })
                } catch (e) {

                }
            });
        return true;
    } catch (error) {
        return false;
    }
}

export const Logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {

    }
}