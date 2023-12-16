import {useState, useEffect, useContext, useRef} from "react";
import {NewMessageIcon, NoSelectedContactMessageIcon, VerifiedAccount} from "../../assets/img/svg";
import DefaultProfilePicture from "../../assets/img/default_profile_picture.jpg"
import {NavLink, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {authApi} from "../../url";
import {Context} from "../../contexts/AuthContext";
import * as Component from "./styled-components";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

export default function Message() {
    const navigate = useNavigate();
    const {currentUser} = useContext(Context);
    const {username} = useParams();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState(null);
    const [user, setUser] = useState(undefined);
    const [userMessages, setUserMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const messageContainerRef = useRef(null);

    const GetUserMessages = async () => {
        const {data} = await axios.post(authApi, {
            actionType: "GetUserMessages",
            username: currentUser.username
        });
        let newMessages = data.filter(i => i.username !== currentUser.username);
        const filteredMessages = [];
        for(let i = 0; i < newMessages.length; i++) {
            if(!filteredMessages.find(j => j.username === newMessages[i].username)) {
                filteredMessages.push(newMessages[i]);
            }
        }
        console.log(filteredMessages);
        setUserMessages(filteredMessages);
    }

    useEffect(() => {
        GetUserMessages();
    }, [])

    const startChat = (_username) => {
        navigate("/direct/inbox/" + _username, {replace: true});
        socket.emit("join_room", {message_sender: currentUser.username, message_replicent: username});
    }

    const GetUser = async () => {
        const {data} = await axios.post(authApi, {
            actionType: "GetUserWithUsername",
            username: username
        })
        if (data) {
            setUser(data);
        } else {
            navigate("/direct/inbox");
        }
    }

    const GetMessages = async () => {
        const {data} = await axios.post(authApi, {
            actionType: "GetMessages",
            data: {
                username: username,
                uid: currentUser.username
            }
        })
        setMessages(data);
    }

    const CheckIsUserHave = async () => {
        const {data} = await axios.post(authApi, {
            actionType: "CheckIsUserHave",
            username: username
        })
        if (!data || data.uid === currentUser.uid) {
            navigate("/direct/inbox");
        } else {
            socket.emit("join_room", {message_sender: currentUser.username, message_replicent: username});
            await GetUser();
            await GetMessages();
        }
    }

    useEffect(() => {
        if (username) {
            CheckIsUserHave();
        }
    }, [username]);

    useEffect(() => {
        socket.on("receive_message", async (message) => {
            if(userMessages.length) {
                setUserMessages(prevUserMessages => {
                    const newUserMessages = [...prevUserMessages];
                    newUserMessages.find(i => i.username === message.message_sender).message_content = message.message_content;
                    return newUserMessages;
                });
            } else {
                console.log("1");
                const {data} = await axios.post(authApi, {
                    actionType: "GetUser",
                    uid: message.message_sender
                });
                console.log("2", [{...message, ...data}]);
                setUserMessages([{...data, ...message}]);
            }
            setMessages(prevMessages => [...prevMessages, message])
        })
        return () => {
            socket.off("receive_message");
        }
    }, [socket]);

    useEffect(() => {
        socket.on("receive_typing_message", (data) => {
            setIsTyping(data)
        })
        return () => {
            socket.off("receive_typing_message");
        }
    }, [socket]);

    const sendMessage = async (event) => {
        event.preventDefault();
        await axios.post(authApi, {
            actionType: "SendMessage",
            data: {
                message_sender: currentUser.username,
                message_content: message,
                message_recipient: username
            }
        }).then(() => {
            setMessages(prevMessages => [...prevMessages, {
                message_sender: currentUser.username,
                message_content: message
            }]);
            socket.emit("send_message", {
                message_sender: currentUser.username,
                message_replicent: username,
                message_content: message
            });
            if (messageContainerRef.current) {
                messageContainerRef.current.scrollIntoView({ behavior: "smooth" });
            }
            setMessage("");
            if(userMessages.length) {
                const newUserMessages = [...userMessages];
                newUserMessages.find(i => i.username === username).message_content = message;
                newUserMessages.find(i => i.username === username).message_sender = currentUser.username;
                setUserMessages(newUserMessages);
            }
            socket.emit("typing_message", {message_sender: currentUser.username, message_replicent: username, typing: false});

            setTimeout(() => {
                messageContainerRef.current?.scrollBy(0, messageContainerRef.current?.scrollHeight);
            }, 0);
        });
    }

    const handleChange = (event) => {
        setMessage(event.target.value);
        if(event.target.value) {
            socket.emit("typing_message", {message_sender: currentUser.username, message_replicent: username, typing: true});
        } else {
            socket.emit("typing_message", {message_sender: currentUser.username, message_replicent: username, typing: false});
        }
    }

    return (
        <Component.Container>
            <Component.Sidebar>
                <div id="new-message">
                    <h1>Mesajlar</h1>
                    <button><NewMessageIcon/></button>
                </div>
                <Component.Contacts>
                    {
                        userMessages.map((message, index) => (
                            <div onClick={() => startChat(message.username)} className="contact" key={index}>
                                <img src={message.picture || DefaultProfilePicture} alt=""
                                     style={{width: 56, height: 56, borderRadius: "50%", objectFit: "cover"}}/>
                                <div className="contact-info">
                                    <span>{message.name}</span>
                                    <p>{message.message_sender === currentUser.username && "Sen: "}{message.message_content.length > 30 ? message.message_content.slice(0, 94) + "..." : message.message_content}</p>
                                </div>
                            </div>
                        ))
                    }
                </Component.Contacts>
            </Component.Sidebar>
            <Component.MessageContainer>
                {
                    username ? (
                        <Component.SelectedContact>
                            <div id="selected-contact-info">
                                <NavLink to="/">
                                    <img src={user && user.picture || DefaultProfilePicture} alt=""
                                         style={{objectFit: "cover"}}/>
                                    <span>{user && user.name}</span>
                                    {user && user.verified ? <VerifiedAccount width={12} height={12}/> : ""}
                                </NavLink>
                            </div>
                            <Component.ContactMessageContainer ref={messageContainerRef}>
                                <div id="header">
                                    <img src={user && user.picture || DefaultProfilePicture} alt=""
                                         style={{objectFit: "cover", borderRadius: "50%"}}/>
                                    <div>
                                        <span>{user && user.name}</span>
                                        {user && user.verfied && <VerifiedAccount/>}
                                    </div>
                                    <span>{user && user.username} · Instagram</span>
                                    <NavLink to={`/${username}`}>Profili gör</NavLink>
                                </div>
                                <div id="content">
                                    {
                                        messages.map((message, index, arr) => {
                                            const nextItem = arr[index + 1];
                                            if (message.message_sender === currentUser.username) {
                                                return (
                                                    <div className="message-from-me" key={index}>
                                                        {message.message_content}
                                                    </div>
                                                )
                                            } else {
                                                if (nextItem && nextItem.message_sender === message.message_sender) {
                                                    return (
                                                        <div className="message-from-you" key={index}>
                                                            <span
                                                                style={{marginLeft: 37}}>{message.message_content}</span>
                                                        </div>
                                                    )
                                                } else {
                                                    return (
                                                        <div className="message-from-you" key={index}>
                                                            <NavLink to={`/${username}`}>
                                                                <img
                                                                    src={user && user.picture || DefaultProfilePicture}
                                                                    alt="" style={{
                                                                    objectFit: "cover",
                                                                    borderRadius: "50%"
                                                                }}/>
                                                            </NavLink>
                                                            <span>{message.message_content}</span>
                                                        </div>
                                                    )
                                                }
                                            }
                                        })
                                    }
                                    {
                                        isTyping && (
                                            <div id="typing-container" className="message-from-you">
                                                <NavLink to={`/${username}`}>
                                                    <img
                                                        src={user && user.picture || DefaultProfilePicture}
                                                        alt="" style={{
                                                        objectFit: "cover",
                                                        borderRadius: "50%"
                                                    }}/>
                                                </NavLink>
                                                <span></span>
                                            </div>
                                        )
                                    }
                                </div>
                            </Component.ContactMessageContainer>
                            <Component.SendMessageContainer>
                                <div>
                                    <input type="text" placeholder="Mesaj..." value={message}
                                           onChange={handleChange}/>
                                    {message && <button onClick={sendMessage}>Gönder</button>}
                                </div>
                            </Component.SendMessageContainer>
                        </Component.SelectedContact>
                    ) : (
                        <Component.NoSelectedContact>
                            <div id="container">
                                <NoSelectedContactMessageIcon/>
                                <span>Mesajların</span>
                                <div>Bir arkadaşına veya gruba gizli fotoğraflar ve mesajlar gönder</div>
                                <button>
                                    Mesaj gönder
                                </button>
                            </div>
                        </Component.NoSelectedContact>
                    )
                }
            </Component.MessageContainer>
        </Component.Container>
    )
}