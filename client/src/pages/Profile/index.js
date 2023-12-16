import {useContext, useEffect, useState} from "react";
import {Context} from "../../contexts/AuthContext";
import {
    PostsIcon,
    ProfileSettingsIcon,
    SavedPostsIcon_,
    SettingsIcon,
    TaggedsIcon,
    VerifiedAccount
} from "../../assets/img/svg";
import {useParams, Link, useNavigate} from "react-router-dom";
import UserPosts from "./components/UserPosts";
import SharePostDialog from "./components/SharePostDialog";
import ProfilePicture from "./components/ProfilePicture";
import NotFound from "../NotFound";
import * as Components from './styled-components';
import axios from "axios";
import {authApi, postApi} from "../../url";
import {SendMessage} from "./styled-components";

export default function Profile() {
    const navigate = useNavigate();
    const {currentUser} = useContext(Context);
    const {username, value} = useParams();
    const [active, setActive] = useState(0);
    const [showSharePostDialog, setShowSharePostDialog] = useState(false);
    const [postPreviews, setPostPreviews] = useState([]);
    const [user, setUser] = useState(null);

    /*
    const GetUserPosts = async () => {
        const {data} = await axios
            .post("http://localhost/instagram-clone/manager/PostManager.php", {
                actionType: "GetUserPosts",
                uid: user && user.uid
            });
        setPosts(data);
    }
    */

    useEffect(() => {
        if (user) {
            const pathname = window.location.pathname;
            switch (pathname) {
                case "/" + user.username:
                    setActive(0);
                    break;
                case "/" + user.username + "/saved":
                    setActive(1);
                    break;
                case "/" + user.username + "/tagged":
                    setActive(2);
                    break;
            }
        }
    }, [window.location.pathname])

    const closeSharePostDialog = () => {
        setShowSharePostDialog(false);
    }

    useEffect(() => {
        const pathname = window.location.pathname;
        if((currentUser && username !== currentUser.username && pathname !== "/" + username) || (!currentUser && pathname !== "/" + username)){
            navigate(`/${username}`);
        }
    }, []);

    useEffect(() => {
        CheckIsUser();
    }, [username])

    const GetUser = async () => {
        const {data} = await axios.post(authApi, {
            actionType: "GetUserWithUsername",
            username: username
        })
        setUser(data);
    }

    const CheckIsUser = async () => {
        const {data} = await axios.post(authApi, {
            actionType: "CheckIsUser",
            username: username
        });
        if (data) {
            await GetUser(username, setUser);
            await GetUserPostsPreview(username, setPostPreviews);
        } else {
            setUser(undefined);
        }
    }

    const followUser = async () => {
        const {data} = await axios.post(authApi, {
            actionType: "FollowUser",
            data: {
                followed_by: currentUser.uid,
                followed: username
            }
        });
        if (data) {
            GetUserPostsPreview();
            GetUser();
        }
    }

    const unfollowUser = async () => {
        const {data} = await axios.post(authApi, {
            actionType: "UnfollowUser",
            data: {
                followed_by: currentUser.uid,
                followed: username
            }
        });
        if (data) {
            GetUserPostsPreview();
            GetUser();
        }
    }

    const GetUserPostsPreview = async () => {
        const {data} = await axios.post(postApi, {
            actionType: "GetUserPostsPreview",
            username: username
        })
        setPostPreviews(data);
    }

    if (user === null) {
        return (
            <>

            </>
        )
    } else if (user === undefined) {
        return (
            <>
                <NotFound/>
            </>
        )
    } else {
        return (
            <>
                <Components.Container>
                    <Components.User>
                        <Components.UserImageContainer>
                            <ProfilePicture picture={user.picture} username={username}/>
                        </Components.UserImageContainer>
                        <Components.UserInfosContainer>
                            <Components.UsernameContainer>
                                <Components.UsernameText>
                                    {user && user.username}
                                    {user.verified === 1 && <VerifiedAccount/>}
                                </Components.UsernameText>
                                <>
                                    {
                                        currentUser && currentUser.username === username ? (
                                            <>
                                                <Components.UserActionButtons>
                                                    <Components.UserActionButton to="/accounts/edit">Profili
                                                        düzenle</Components.UserActionButton>
                                                    <Components.UserActionButton
                                                        to="/">Arşivi Gör</Components.UserActionButton>
                                                </Components.UserActionButtons>
                                                <Components.SettingsButton>
                                                    <SettingsIcon/>
                                                </Components.SettingsButton>
                                            </>
                                        ) : (
                                            <Components.UserActionButtons>
                                                {
                                                    currentUser && (
                                                        <>
                                                            <Components.FollowUserButton
                                                                style={{
                                                                    backgroundColor: user.followers.find(u => u.followed === user.uid) ? "rgb(239, 239, 239)" : "rgb(0, 149, 246)",
                                                                    color: user.followers.find(u => u.followed === user.uid) ? "black" : "white",
                                                                }}
                                                                onClick={user.followers.find(u => u.followed === user.uid) ? unfollowUser : followUser}
                                                            >
                                                                {user.followers.find(u => u.followed === user.uid) ? "Takip Bırak" : "Takip Et"}
                                                            </Components.FollowUserButton>
                                                            <Components.SendMessage
                                                                to={`/direct/inbox/${username}`}
                                                            >
                                                                Mesaj Gönder
                                                            </Components.SendMessage>
                                                        </>
                                                    )
                                                }
                                            </Components.UserActionButtons>
                                        )
                                    }
                                </>
                            </Components.UsernameContainer>
                            <Components.UserDataCounts>
                                <Components.UserDataCount>0 <span>gönderi</span></Components.UserDataCount>
                                <Components.UserDataCount>
                                    <button disabled={!currentUser}>12,6 Mn <span>takipçi</span></button>
                                </Components.UserDataCount>
                                <Components.UserDataCount>
                                    <button disabled={!currentUser}>10 <span>takip</span></button>
                                </Components.UserDataCount>
                            </Components.UserDataCounts>
                            <Components.Name>{user && user.name}</Components.Name>
                            <Components.Biography>
                                {user && user.biography}
                            </Components.Biography>
                        </Components.UserInfosContainer>
                    </Components.User>
                    <Components.Content>
                        {
                            currentUser && currentUser.username === username && (
                                <Components.MenuItems>
                                    {
                                        currentUser && !user.private || (user.private && user.followers.find(u => u.followed === user.uid)) && username === currentUser.username ? (
                                            <Components.MenuItem
                                                to={`/${user.username}`}
                                                style={{
                                                    borderTop: active === 0 ? "1px solid black" : "none",
                                                    color: active === 0 ? "black" : "rgb(115, 115, 115)"
                                                }}
                                            >
                                                <PostsIcon/>
                                                GÖNDERİLER
                                            </Components.MenuItem>
                                        ) : ""
                                    }
                                    {
                                        currentUser && currentUser.username === username ? (
                                            <Components.MenuItem
                                                to={`/${user.username}/saved`}
                                                style={{
                                                    borderTop: active === 1 ? "1px solid black" : "none",
                                                    color: active === 1 ? "black" : "rgb(115, 115, 115)"
                                                }}
                                            >
                                                <SavedPostsIcon_/>
                                                KAYDEDİLENLER
                                            </Components.MenuItem>
                                        ) : ""
                                    }
                                </Components.MenuItems>
                            )
                        }
                        <Components.PostsContainer>
                            {
                                value === undefined ? (
                                    currentUser && currentUser.username === username ? (
                                        postPreviews.length !== 0 ? (
                                            <UserPosts postPreviews={postPreviews}
                                                       GetUserPostsPreview={GetUserPostsPreview}/>
                                        ) : (
                                            <Components.SharePostContainer>
                                                <Components.SharePost>
                                                    <input type="file"/>
                                                    <div></div>
                                                </Components.SharePost>
                                                <span>Fotoğraflar Paylaş</span>
                                                <div>Paylaştığın fotoğraflar profilinde gözükür.</div>
                                                <button onClick={() => setShowSharePostDialog(true)}>İlk
                                                    fotoğrafını
                                                    paylaş
                                                </button>
                                            </Components.SharePostContainer>
                                        )
                                    ) : (!user.private && postPreviews.length === 0) || (user.private && currentUser && user.followers.find(u => u.followed_by === currentUser.uid) && postPreviews.length === 0) ? (
                                        <Components.NoPostContainer>
                                            <div>
                                                <span></span>
                                            </div>
                                            <h1>Henüz Hiç Gönderi Yok</h1>
                                        </Components.NoPostContainer>
                                    ) : (!user.private && postPreviews.length !== 0) || (user.private && currentUser && user.followers.find(u => u.followed_by === currentUser.uid) && postPreviews.length !== 0) ? (
                                        <UserPosts postPreviews={postPreviews}
                                                   GetUserPostsPreview={GetUserPostsPreview}/>
                                    ) : (
                                        <>
                                            <Components.PrivateAccountContainer>
                                                <span>Bu Hesap Gizli</span>
                                                <div>
                                                    {
                                                        currentUser ? (
                                                            <>
                                                                Fotoğraflarını ve videolarını görmek için kendisini
                                                                takip et.
                                                            </>
                                                        ) : (
                                                            <>
                                                                {username}'i zaten takip ediyor musun? Fotoğraflarını ve
                                                                videolarını
                                                                görmek
                                                                için <Link
                                                                to="/login">giriş yap</Link>.
                                                            </>
                                                        )
                                                    }
                                                </div>
                                            </Components.PrivateAccountContainer>
                                        </>
                                    )
                                ) : value === "saved" && (
                                    <>
                                        Kaydedilenler
                                    </>
                                )
                            }
                            {
                                /*
                                user.private ? (
                                    <Components.PrivateAccountContainer>
                                        <span>Bu Hesap Gizli</span>
                                        <div>
                                            {
                                                currentUser ? (
                                                    <>
                                                        Fotoğraflarını ve videolarını görmek için kendisini takip et.
                                                    </>
                                                ) : (
                                                    <>
                                                        {username}'i zaten takip ediyor musun? Fotoğraflarını ve videolarını
                                                        görmek
                                                        için <Link
                                                        to="/login">giriş yap</Link>.
                                                    </>
                                                )
                                            }
                                        </div>
                                    </Components.PrivateAccountContainer>
                                ) : (
                                    value === undefined ? (
                                        <>
                                            {
                                                currentUser && currentUser.username === username && postPreviews.length === 0 && (
                                                    <Components.SharePostContainer>
                                                        <Components.SharePost>
                                                            <input type="file"/>
                                                            <div></div>
                                                        </Components.SharePost>
                                                        <span>Fotoğraflar Paylaş</span>
                                                        <div>Paylaştığın fotoğraflar profilinde gözükür.</div>
                                                        <button onClick={() => setShowSharePostDialog(true)}>İlk
                                                            fotoğrafını
                                                            paylaş
                                                        </button>
                                                    </Components.SharePostContainer>
                                                )
                                            }
                                            {
                                                currentUser && currentUser.username !== username && postPreviews.length === 0 && (
                                                    <Components.NoPostContainer>
                                                        <div>
                                                            <span></span>
                                                        </div>
                                                        <h1>Henüz Hiç Gönderi Yok</h1>
                                                    </Components.NoPostContainer>
                                                )
                                            }

                                            <UserPosts postPreviews={postPreviews}
                                                       GetUserPostsPreview={GetUserPostsPreview}/>
                                        </>
                                    ) : value === "saved" ? (
                                        <>
                                            saved posts
                                        </>
                                    ) : (
                                        <>
                                            taggeds
                                        </>
                                    )
                                )

                                 */
                            }
                            {
                                /*
                                (currentUser && currentUser.username === username) ? (
                                    value === undefined ? (
                                        <>
                                            {
                                                postPreviews.length === 0 && (
                                                    <Components.SharePostContainer>
                                                        <Components.SharePost>
                                                            <input type="file"/>
                                                            <div></div>
                                                        </Components.SharePost>
                                                        <span>Fotoğraflar Paylaş</span>
                                                        <div>Paylaştığın fotoğraflar profilinde gözükür.</div>
                                                        <button onClick={() => setShowSharePostDialog(true)}>İlk
                                                            fotoğrafını
                                                            paylaş
                                                        </button>
                                                    </Components.SharePostContainer>
                                                )
                                            }
                                            <UserPosts postPreviews={postPreviews}
                                                       GetUserPostsPreview={GetUserPostsPreview}/>
                                        </>
                                    ) : value === "saved" ? (
                                        <>
                                            saved posts
                                        </>
                                    ) : (
                                        <>
                                            taggeds
                                        </>
                                    )
                                ) : (
                                    <>
                                        {
                                            user.private ? (
                                                <Components.PrivateAccountContainer>
                                                    <span>Bu Hesap Gizli</span>
                                                    <div>
                                                        {
                                                            currentUser ? (
                                                                <>
                                                                    Fotoğraflarını ve videolarını görmek için kendisini takip et.
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {username}'i zaten takip ediyor musun? Fotoğraflarını ve videolarını
                                                                    görmek
                                                                    için <Link
                                                                    to="/login">giriş yap</Link>.
                                                                </>
                                                            )
                                                        }
                                                    </div>
                                                </Components.PrivateAccountContainer>
                                            ) : (
                                                <UserPosts postPreviews={postPreviews}
                                                           GetUserPostsPreview={GetUserPostsPreview}/>
                                            )
                                        }
                                    </>
                                )

                                 */
                            }
                        </Components.PostsContainer>
                    </Components.Content>

                    {showSharePostDialog &&
                        <SharePostDialog open={showSharePostDialog} handleClose={closeSharePostDialog}/>}
                </Components.Container>
            </>
        )
    }
}