import {useState, useEffect, useContext, useRef} from "react";
import {
    AddAnotherImageIcon, AddImageIcon,
    CancelIcon,
    HeartIcon,
    NewMessageIcon,
    NoSelectedContactMessageIcon,
    SelectEmojiIcon,
    VerifiedAccount
} from "../../assets/img/svg";
import DefaultProfilePicture from "../../assets/img/default_profile_picture.jpg"
import {NavLink, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {authApi} from "../../url";
import {Context} from "../../contexts/AuthContext";
import * as Component from "./styled-components";
import io from "socket.io-client";
import EmojiPicker from "emoji-picker-react";
import PlayVıdeoIcon from "../../assets/img/play_24dp.png";
import PlayButton from "../../assets/img/playButton.png";

const socket = io.connect("http://localhost:5000");

export default function Message() {
    const navigate = useNavigate();
    const {currentUser} = useContext(Context);
    const {username} = useParams();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [user, setUser] = useState(undefined);
    const [userMessages, setUserMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const messageContainerRef = useRef(null);
    const [showEmojies, setShowEmojies] = useState(false);
    const [files, setFiles] = useState([]);
    const [filesForPost, setFilesForPost] = useState([]);

    const GetUserMessages = async () => {
        const {data} = await axios.post(authApi, {
            actionType: "GetUserMessages",
            username: currentUser.username
        });
        let newMessages = data.filter(i => i.username !== currentUser.username);
        const filteredMessages = [];
        for (let i = 0; i < newMessages.length; i++) {
            if (!filteredMessages.find(j => j.username === newMessages[i].username)) {
                filteredMessages.push(newMessages[i]);
            }
        }
        setUserMessages(filteredMessages);
    }

    useEffect(() => {
        GetUserMessages();
    }, [])

    const startChat = (event, _username) => {
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
            /*
            setUserMessages(async (prevUserMessages) => {
                console.log("1");
                if(prevUserMessages.length) {
                    console.log("2");
                    console.log("prevUserMessages",prevUserMessages);
                    console.log("message", message);
                    prevUserMessages.find(i => i.username === message.message_sender).message_content = message.message_content;
                    return prevUserMessages;
                } else {
                    console.log("3");
                    const {data} = await axios.post(authApi, {
                        actionType: "GetUser",
                        uid: message.message_sender
                    });
                    prevUserMessages.push({...data, ...message});
                    console.log("prevUserMessages", prevUserMessages);
                    console.log("aaa", [{...data, ...message}]);
                    return prevUserMessages;
                }
            })
            */
            console.log("userMessages", userMessages);
            if (userMessages.length) {
                console.log("userMessages - 1", userMessages);
                setUserMessages(prevUserMessages => {
                    prevUserMessages.find(i => i.username === message.message_sender).message_content = message.message_content;
                    return prevUserMessages;
                });
            } else {
                console.log("userMessages - 2", userMessages);
                const {data} = await axios.post(authApi, {
                    actionType: "GetUser",
                    uid: message.message_sender
                });
                console.log("data", data)
                console.log("2", [{...message, ...data}]);
                console.log("mesaj", message);
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
                message_recipient: username,
                message_type: "text"
            }
        }).then(async () => {
            if(message !== "") {
                setMessages(prevMessages => [...prevMessages, {
                    message_sender: currentUser.username,
                    message_content: message,
                    message_type: "text"
                }]);
            }
            socket.emit("send_message", {
                message_sender: currentUser.username,
                message_replicent: username,
                message_content: message
            });
            for(let i = 0; i < filesForPost.length; i++) {
                let formData = new FormData();
                formData.append("image", filesForPost[i]);
                const {data} = await axios.post('http://localhost/instagram-clone-revised/upload-message-file.php', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                await axios.post(authApi, {
                    actionType: "SendMessage",
                    data: {
                        message_sender: currentUser.username,
                        message_content: data,
                        message_recipient: username,
                        message_type: filesForPost[i].type
                    }
                })
            }
            for(let i = 0; i < files.length; i++) {
                console.log("files[i]", files[i]);
                socket.emit("send_message", {
                    message_sender: currentUser.username,
                    message_replicent: username,
                    message_content: files[i].file,
                    message_type: files[i].type
                });
                setMessages(prevMessages => [...prevMessages, {
                    message_sender: currentUser.username,
                    message_content: files[i].file,
                    message_type: files[i].type
                }]);
            }
            setMessage("");
            setFiles([]);
            setFilesForPost([]);
            if (userMessages.length) {
                const newUserMessages = [...userMessages];
                newUserMessages.find(i => i.username === username).message_content = message;
                newUserMessages.find(i => i.username === username).message_sender = currentUser.username;
                setUserMessages(newUserMessages);
            }
            socket.emit("typing_message", {
                message_sender: currentUser.username,
                message_replicent: username,
                typing: false
            });

            setTimeout(() => {
                messageContainerRef.current?.scrollBy(0, messageContainerRef.current?.scrollHeight);
            }, 0);
        });
    }

    const handleChange = (event) => {
        setMessage(event.target.value);
        if (event.target.value) {
            socket.emit("typing_message", {
                message_sender: currentUser.username,
                message_replicent: username,
                typing: true
            });
        } else {
            socket.emit("typing_message", {
                message_sender: currentUser.username,
                message_replicent: username,
                typing: false
            });
        }
    }

    const handleShowEmojies = (event) => {
        event.preventDefault();
        setShowEmojies(!showEmojies);
    }

    const handleEmojiChange = (_emoji) => {
        const {emoji} = _emoji;
        console.log(_emoji);
        setMessage(previousMessage => previousMessage + emoji);
        socket.emit("typing_message", {
            message_sender: currentUser.username,
            message_replicent: username,
            typing: true
        });
    }

    const sendHeart = async () => {
        try {
            await axios.post(authApi, {
                actionType: "SendMessage",
                data: {
                    message_sender: currentUser.username,
                    message_content: "❤️",
                    message_recipient: username
                }
            })
            setMessages(prevMessages => [...prevMessages, {
                message_sender: currentUser.username,
                message_content: "❤️"
            }]);
            socket.emit("send_message", {
                message_sender: currentUser.username,
                message_replicent: username,
                message_content: "❤️"
            });
            setMessage("");
            if (userMessages.length) {
                const newUserMessages = [...userMessages];
                newUserMessages.find(i => i.username === username).message_content = "❤️";
                newUserMessages.find(i => i.username === username).message_sender = currentUser.username;
                setUserMessages(newUserMessages);
            }
            socket.emit("typing_message", {
                message_sender: currentUser.username,
                message_replicent: username,
                typing: false
            });

            setTimeout(() => {
                messageContainerRef.current?.scrollBy(0, messageContainerRef.current?.scrollHeight);
            }, 0);
        } catch (error) {

        }
    }

    const addImages = async (event) => {
        const { files } = event.target;
        const _files = [];

        // FileReader işlemlerini promisify eden bir yardımcı fonksiyon
        const readFile = (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve({ type: file.type, file: reader.result });
                reader.onerror = (error) => reject(error);
            });
        };

        // FileReader işlemlerini asenkron olarak gerçekleştir
        for (let i = 0; i < files.length; i++) {
            try {
                const result = await readFile(files[i]);
                _files.push(result);
            } catch (error) {
                console.error("Error reading file:", error);
                // Hata durumunda isteğe bağlı olarak bir şeyler yapabilirsiniz.
            }
        }

        // FileReader işlemleri tamamlandıktan sonra state'i güncelle
        setFilesForPost(files);
        setFiles(prevFiles => [...prevFiles, ..._files])
    };

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
                            <NavLink
                                to={`/direct/inbox/${message.username}`}
                                onClick={(e) => startChat(e, message.username)}
                                className="contact"
                                key={index}
                                style={({isActive}) => {
                                    return {
                                        backgroundColor: isActive ? "rgb(239, 239, 239)" : "white",
                                    };
                                }}
                            >
                                <img src={message.picture || DefaultProfilePicture} alt=""
                                     style={{width: 56, height: 56, borderRadius: "50%", objectFit: "cover"}}/>
                                <div className="contact-info">
                                    <span>{message.name}</span>
                                    <p>{message.message_sender === currentUser.username && "Sen: "}{message.message_content.length > 30 ? message.message_content.slice(0, 94) + "..." : message.message_content}</p>
                                </div>
                            </NavLink>
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
                                                if (message.message_content === "❤️") {
                                                    return (
                                                        <Component.HeartMessageFromMe key={index}>
                                                            <div>
                                                                {message.message_content}
                                                            </div>
                                                        </Component.HeartMessageFromMe>
                                                    )
                                                } else if (message.message_type === "video/mp4") {
                                                    return (
                                                        <Component.VideoMessageFromMe key={index}>
                                                            <video preload="metadata" autoPlay={false}>
                                                                <source
                                                                    src={message.message_content}
                                                                    type="video/mp4"/>
                                                            </video>
                                                            <span id="play-video-img">
                                                                            <img src={PlayButton} alt=""/>
                                                                        </span>
                                                        </Component.VideoMessageFromMe>
                                                    )
                                                } else if (
                                                    message.message_type === "image/jpg" ||
                                                    message.message_type === "image/png" ||
                                                    message.message_type === "image/jpeg"
                                                ) {
                                                    return (
                                                        <Component.PhotoMessageFromMe key={index}>
                                                            <img src={message.message_content} alt=""/>
                                                        </Component.PhotoMessageFromMe>
                                                    )
                                                } else {
                                                    return (
                                                        <div className="message-from-me" key={index}>
                                                            {message.message_content}
                                                        </div>
                                                    )
                                                }
                                            } else {
                                                if (nextItem && nextItem.message_sender === message.message_sender) {
                                                    if (message.message_content === "❤️") {
                                                        return (
                                                            <Component.HeartMessageFromYou key={index}>
                                                                <div>{message.message_content}</div>
                                                            </Component.HeartMessageFromYou>
                                                        )
                                                    } else if (message.message_type === "video/mp4") {

                                                    } else if (
                                                        message.message_type === "image/jpg" ||
                                                        message.message_type === "image/png" ||
                                                        message.message_type === "image/jpeg"
                                                    ) {
                                                        return (
                                                            <Component.PhotoMessageFromYou key={index}>
                                                                <img className="message-img" src={message.message_content} alt="" style={{marginLeft: 37}}/>
                                                            </Component.PhotoMessageFromYou>
                                                        )
                                                    } else {
                                                        return (
                                                            <div className="message-from-you" key={index}>
                                                            <span
                                                                style={{marginLeft: 37}}>{message.message_content}</span>
                                                            </div>
                                                        )
                                                    }
                                                } else {
                                                    if (message.message_content === "❤️") {
                                                        return (
                                                            <Component.HeartMessageFromYou key={index}>
                                                                <NavLink to={`/${username}`}>
                                                                    <img
                                                                        src={user && user.picture || DefaultProfilePicture}
                                                                        alt="" style={{
                                                                        objectFit: "cover",
                                                                        borderRadius: "50%"
                                                                    }}/>
                                                                </NavLink>
                                                                <span>{message.message_content}</span>
                                                            </Component.HeartMessageFromYou>
                                                        )
                                                    } else if (message.message_type === "video/mp4") {

                                                    } else if (
                                                        message.message_type === "image/jpg" ||
                                                        message.message_type === "image/png" ||
                                                        message.message_type === "image/jpeg"
                                                    ) {
                                                        return (
                                                            <Component.PhotoMessageFromYou key={index}>
                                                                <NavLink to={`/${username}`}>
                                                                    <img
                                                                        src={user && user.picture || DefaultProfilePicture}
                                                                        alt="" style={{
                                                                        objectFit: "cover",
                                                                        borderRadius: "50%"
                                                                    }}/>
                                                                </NavLink>
                                                                <img className="message-img" src={message.message_content} alt=""/>
                                                            </Component.PhotoMessageFromYou>
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
                                <div id="emoji-picker">
                                    {showEmojies &&
                                        <EmojiPicker onEmojiClick={handleEmojiChange} emojiStyle="twitter"/>}
                                </div>
                            </Component.ContactMessageContainer>
                            <Component.SendMessageContainer style={{height: files.length === 0 ? 78 : 200}}>
                                <div style={{height: files.length === 0 ? 58 : 137}}>
                                    <button id="select-emoji-btn" onClick={handleShowEmojies}>
                                        <SelectEmojiIcon/>
                                    </button>
                                    {
                                        files.length !== 0 && (
                                            <Component.ImagesWrapper>
                                                <div>
                                                    {
                                                        files.map((file, index) => (
                                                            <div className="image-wrapper" key={index}>
                                                                {
                                                                    file.type === "video/mp4" ? (
                                                                        <>
                                                                            <video preload="metadata" autoPlay={false}>
                                                                                <source
                                                                                    src={file.file}
                                                                                    type="video/mp4"/>
                                                                            </video>
                                                                            <span id="play-video-img">
                                                                                <img src={PlayVıdeoIcon} alt=""/>
                                                                            </span>
                                                                        </>
                                                                    ) : <img src={file.file} alt=""/>
                                                                }
                                                                <div>
                                                                    <button onClick={() => setFiles(files.filter((f, i) => i !== index))}><CancelIcon/></button>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                    <div id="add-more-image">
                                                        <label>
                                                            <input type="file" multiple onChange={addImages} accept="image/png, video/mp4, image/jpeg" />
                                                            <AddAnotherImageIcon/>
                                                        </label>
                                                    </div>
                                                </div>
                                            </Component.ImagesWrapper>
                                        )
                                    }
                                    <input type="text" placeholder="Mesaj..." value={message}
                                           onChange={handleChange} style={{
                                        borderRadius: files.length === 0 ? 22 : "0 0 22px 22px",
                                        borderTopWidth: files.length === 0 ? 1 : 0
                                    }}/>
                                    {!message && files.length === 0 && (
                                        <>
                                            <label id="add-image">
                                                <input type="file" style={{display: "none"}} multiple accept="image/png, video/mp4, image/jpeg"
                                                       onChange={addImages}/>
                                                <AddImageIcon/>
                                            </label>
                                            <button id="send-heart" onClick={sendHeart}>
                                                <HeartIcon/>
                                            </button>
                                        </>
                                    )}
                                    {message !== "" || files.length !== 0 ? <button onClick={sendMessage} id="send-message">Gönder</button> : ""}
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