// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from './pages/Profile';
import Container from './components/Container';
import Edit from './pages/Edit';
import Post from './pages/Post';

// packages
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import {useContext} from "react";
import {Context} from "./contexts/AuthContext";

const Protect = ({children, access}) => {
    const {user, currentUser} = useContext(Context);

    if (access === "private") return user ? <Container>{children}</Container> : <Navigate to="/login" replace/>
    else return user ? <Navigate to="/" replace/> : children
}

export default function App() {
    const router = createBrowserRouter([
        {
            path: "login",
            element: <Protect access="public"><Login/></Protect>
        },
        {
            path: "register",
            element: <Protect access="public"><Register/></Protect>
        },
        {
            index: true,
            element: <Protect access="private"><Home/></Protect>
        },
        {
            path: ":username/:value?",
            element: <Container><Profile/></Container>
        },
        {
            path: "accounts/edit",
            element: <Protect access="private"><Edit/></Protect>
        },
        {
            path: "p/:post_key",
            element: <Protect access="private"><Post/></Protect>
        }
    ])

    return <RouterProvider router={router}/>
}