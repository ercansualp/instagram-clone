// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from './pages/Profile';
import Container from './components/Container';
import Edit from './pages/Edit';
import Post from './pages/Post';
import Message from './pages/Message';

// packages
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import {useContext} from "react";
import {Context} from "./contexts/AuthContext";
import Loading from "./pages/Loading";

const Protect = ({children, access, width}) => {
    const {user, currentUser} = useContext(Context);

    if (access === "private") return user && currentUser ? <Container width={width}>{children}</Container> : <Navigate to="/login" replace/>
    else return user && currentUser ? <Navigate to="/" replace/> : children
}

export default function App() {
    const {loading} = useContext(Context);

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
        },
        {
            path: "direct/inbox/:username?",
            element: <Protect access="private" width="full"><Message/></Protect>
        }
    ])

    return loading ? <Loading /> : <RouterProvider router={router}/>
}