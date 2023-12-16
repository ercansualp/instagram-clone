import {initializeApp} from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updatePassword,
    sendSignInLinkToEmail,
    deleteUser
} from "firebase/auth";
import axios from 'axios';
import {authApi} from "./url";

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

export const UpdatePassword = async (newPassword) => {
    try {
        await updatePassword(auth.currentUser, newPassword);
        return true;
    } catch (error) {
        return false;
    }
}

export const Login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        return true;
    } catch (error) {
        return false;
    }
}

export const Register = async (formData) => {
    const actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be in the authorized domains list in the Firebase Console.
        url: 'http://localhost:3000/finishSignUp?cartId=1234',
        // This must be true.
        handleCodeInApp: true,
        iOS: {
            bundleId: 'com.example.ios'
        },
        android: {
            packageName: 'com.example.android',
            installApp: true,
            minimumVersion: '12'
        },
        dynamicLinkDomain: 'example.page.link'
    };

    try {
        await sendSignInLinkToEmail(auth, formData.email, actionCodeSettings)
            .then(() => {
                // The link was successfully sent. Inform the user.
                // Save the email locally so you don't need to ask the user for it again
                // if they open the link on the same device.
                window.localStorage.setItem('emailForSignIn', formData.email);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ...
            });

        await createUserWithEmailAndPassword(auth, formData.email, formData.password)
            .then(async currentUser => {
                try {
                    await axios.post(authApi, {
                        actionType: "AddUser",
                        user: {
                            uid: auth.currentUser.uid,
                            username: formData.username,
                            name: formData.name,
                            password: formData.password,
                            email: formData.email
                        }
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

export const DeleteUser = async (data) => {
    try {
        await deleteUser(auth.currentUser);
        await axios.post(authApi, {
            actionType: "DeleteUser",
            data: data
        })
        return true;
    } catch (error) {
        return false;
    }
}
