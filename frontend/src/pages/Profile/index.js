import styled from "styled-components";
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
import {useParams, NavLink, Link} from "react-router-dom";
import SharePostSvg from '../../assets/img/icons2.png';
import UserPhotos from "./components/UserPhotos";
import SharePostDialog from "./components/SharePostDialog";
import axios from "axios";
import DefaultProfilePicture from '../../assets/img/default_profile_picture.jpg';
import {Helmet} from 'react-helmet';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const User = styled.div`
  display: flex;
  height: 194px;
  padding-bottom: 44px;
  border-bottom: 1px solid rgb(219, 219, 219);
`

const UserImage = styled.button`
  > label {
    > div {
      width: 150px;
      height: 150px;
      cursor: pointer;

      > img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    > input {
      display: none;
    }
  }
`

const UserImageContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 30px;
`

const UserInfosContainer = styled.div`
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  max-width: 613px;
  justify-content: space-between;
`

const UsernameContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`

const UsernameText = styled.span`
  margin-right: 20px;
  font-size: 20px;
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 8px;
`

const UserActionButtons = styled.div`
  display: flex;
  margin-right: 5px;
  align-items: center;
  gap: 8px;
`

const UserActionButton = styled(NavLink)`
  background-color: rgb(239, 239, 239);
  font-size: 14px;
  border-radius: 8px;
  padding: 0 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  height: 32px;

  &:hover {
    background-color: rgb(219, 219, 219);
  }
`

const FollowUserButton = styled.button`
  background-color: rgb(239, 239, 239);
  font-size: 14px;
  border-radius: 8px;
  padding: 0 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  height: 32px;

  &:hover {
    background-color: rgb(219, 219, 219);
  }
`

const SettingsButton = styled.button`
  width: 40px;
  height: 40px;
  padding: 8px;

  > svg {
    width: 24px;
    height: 24px;
  }
`

const UserDataCounts = styled.ul`
  display: flex;
  gap: 40px;
  align-items: center;
`

const UserDataCount = styled.li`
  font-size: 16px;
  font-weight: 600;

  > button {
    > span {
      font-weight: 400;
    }
  }

  > span {
    font-weight: 400;
  }
`

const Biography = styled.div`
  font-size: 14px;
  font-weight: 400;

`

const Content = styled.div`
  display: flex;
  flex-direction: column;
`

const MenuItems = styled.div`
  width: 935px;
  display: flex;
  justify-content: center;
  gap: 60px;
  font-size: 12px;
  font-weight: 600;
`

const MenuItem = styled(NavLink)`
  height: 52px;
  display: flex;
  gap: 6px;
  align-items: center;
  letter-spacing: 1px;
`

const PostsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const SharePost = styled.label`
  > input {
    display: none;
  }

  > div {
    width: 62px;
    height: 62px;
    background-position: -128px -269px;
    background-repeat: no-repeat;
    background-image: url(${SharePostSvg});
    cursor: pointer;
  }
`

const SharePostContainer = styled.div`
  margin: 60px 44px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;

  > span {
    font-size: 30px;
    font-weight: 800;
  }

  > div {
    font-size: 14px;
    font-weight: 400;
  }

  > button {
    color: rgb(0, 149, 246);
    font-size: 14px;
    font-weight: 600;

    &:hover {
      color: rgb(0, 55, 107);
    }
  }
`

const PrivateAccountContainer = styled.div`
  padding: 40px;
  font-size: 14px;
  font-weight: 400;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-color: rgb(239, 239, 239);
  border-width: 0 1px 1px;
  border-style: solid;
  width: 100%;

  > span {
    margin-bottom: 13px;
  }

  > div {
    max-width: 230px;
    text-align: center;

    > a {
      color: rgb(0, 149, 246);
    }
  }
`

const Name = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin: 15px 0;
`

export default function Profile() {
    const {user, currentUser} = useContext(Context);
    const {username, value} = useParams();
    const [active, setActive] = useState(0);
    const [showSharePostDialog, setShowSharePostDialog] = useState(false);
    const [posts, setPosts] = useState([]);

    const getUserPosts = async () => {
        const {data} = await axios
            .post("http://localhost/instagram-clone/manager/PostManager.php", {
                actionType: "GetUserPosts",
                uid: user.uid
            });
        setPosts(data);
    }

    useEffect(() => {
        // getUserPosts();
    }, []);

    useEffect(() => {
        if (user) {
            const pathname = window.location.pathname;
            switch (pathname) {
                case "/" + currentUser.username:
                    setActive(0);
                    break;
                case "/" + currentUser.username + "/saved":
                    setActive(1);
                    break;
                case "/" + currentUser.username + "/tagged":
                    setActive(2);
                    break;
            }
        }
    }, [window.location.pathname])

    const closeSharePostDialog = () => {
        setShowSharePostDialog(false);
    }

    const ChangeUserProfile = async e => {
        const formData = new FormData();
        const imagefile = e.target.files[0];
        formData.append("image", imagefile);
        const {data} = await axios.post('http://localhost/instagram-clone/change_user_profile.php', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        if (data) {
            try {
                const response = await axios
                    .post("http://localhost/instagram-clone/manager/AuthenticationManager.php", {
                        actionType: "update_user_profile_picture",
                        data: {
                            picture: data,
                            uid: user.uid
                        }
                    })
                if (response) {

                }
            } catch (error) {

            }
        }
    }

    return (
        <>
            <Container>
                <User>
                    <UserImageContainer>
                        <UserImage disabled={!user}>
                            <label className="custom-file-upload">
                                <input type="file" onChange={ChangeUserProfile}/>
                                <div>
                                    <img src={currentUser.picture || DefaultProfilePicture}/>
                                </div>
                            </label>
                        </UserImage>
                    </UserImageContainer>
                    <UserInfosContainer>
                        <UsernameContainer>
                            <UsernameText>{currentUser && currentUser.username}{(user && currentUser.username) === "ercansualp" &&
                                <VerifiedAccount/>}</UsernameText>
                            <>
                                {
                                    currentUser && currentUser.username === username ? (
                                        <>
                                            <UserActionButtons>
                                                <UserActionButton to="/accounts/edit">Profili düzenle</UserActionButton>
                                                <UserActionButton
                                                    to={`/${currentUser ? currentUser.username : ""}`}>Arşivi Gör</UserActionButton>
                                            </UserActionButtons>
                                            <SettingsButton>
                                                <SettingsIcon/>
                                            </SettingsButton>
                                        </>
                                    ) : (
                                        <UserActionButtons>
                                            <FollowUserButton
                                                style={{backgroundColor: "rgb(0, 149, 246)", color: "white"}}
                                            >
                                                Takip Et
                                            </FollowUserButton>
                                            <button><ProfileSettingsIcon/></button>
                                        </UserActionButtons>
                                    )
                                }
                            </>
                        </UsernameContainer>
                        <UserDataCounts>
                            <UserDataCount>0 <span>gönderi</span></UserDataCount>
                            <UserDataCount>
                                <button disabled={!user}>12,6 Mn <span>takipçi</span></button>
                            </UserDataCount>
                            <UserDataCount>
                                <button disabled={!user}>10 <span>takip</span></button>
                            </UserDataCount>
                        </UserDataCounts>
                        <Name>{currentUser && currentUser.name}</Name>
                        <Biography>
                            {currentUser && currentUser.biography}
                        </Biography>
                    </UserInfosContainer>
                </User>
                <Content>
                    {
                        (currentUser && username === currentUser.username) && (
                            <MenuItems>
                                <MenuItem
                                    to={`/${currentUser.username}`}
                                    style={{
                                        borderTop: active === 0 ? "1px solid black" : 0,
                                        color: active === 0 ? "black" : "rgb(115, 115, 115)"
                                    }}
                                >
                                    <PostsIcon/>
                                    GÖNDERİLER
                                </MenuItem>
                                <MenuItem
                                    to={`/${currentUser.username}/saved`}
                                    style={{
                                        borderTop: active === 1 ? "1px solid black" : 0,
                                        color: active === 1 ? "black" : "rgb(115, 115, 115)"
                                    }}
                                >
                                    <SavedPostsIcon_/>
                                    KAYDEDİLENLER
                                </MenuItem>
                                <MenuItem
                                    to={`/${currentUser.username}/tagged`}
                                    style={{
                                        borderTop: active === 2 ? "1px solid black" : 0,
                                        color: active === 2 ? "black" : "rgb(115, 115, 115)"
                                    }}
                                >
                                    <TaggedsIcon/>
                                    ETİKETLENENLER
                                </MenuItem>
                            </MenuItems>
                        )
                    }
                    <PostsContainer>
                        {
                            (currentUser && currentUser.username === username) ? (
                                value === undefined ? (
                                    <>
                                        {
                                            posts.length === 0 && (
                                                <SharePostContainer>
                                                    <SharePost>
                                                        <input type="file"/>
                                                        <div></div>
                                                    </SharePost>
                                                    <span>Fotoğraflar Paylaş</span>
                                                    <div>Paylaştığın fotoğraflar profilinde gözükür.</div>
                                                    <button onClick={() => setShowSharePostDialog(true)}>İlk fotoğrafını
                                                        paylaş
                                                    </button>
                                                </SharePostContainer>
                                            )
                                        }
                                        <UserPhotos posts={posts} getUserPosts={getUserPosts} />
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
                                <PrivateAccountContainer>
                                    <span>Bu Hesap Gizli</span>
                                    <div>{value}'i zaten takip ediyor musun? Fotoğraflarını ve videolarını görmek
                                        için <Link
                                            to="/login">giriş yap</Link>.
                                    </div>
                                </PrivateAccountContainer>
                            )
                        }
                    </PostsContainer>
                </Content>

                {showSharePostDialog &&
                    <SharePostDialog open={showSharePostDialog} handleClose={closeSharePostDialog}/>}
            </Container>
        </>
    )
}