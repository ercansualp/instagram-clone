import DefaultProfilePicture from "../../../assets/img/default_profile_picture.jpg";
import styled2 from "styled-components";
import {styled} from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import {useContext, useState} from "react";
import {Context} from "../../../contexts/AuthContext";
import axios from "axios";
import {authApi} from "../../../url";
import EditUserProfilePicture from "./EditUserProfilePicture";
import {DeleteUser} from "../../../firebase";

const Content = styled2.div`
  display: flex;
  flex-direction: column;
  margin: 32px 0 30px 45px;

  > .edit-profile-text {
    font-size: 24px;
    font-weight: 400;
    margin-bottom: 24px;
  }

  > .edit-profile-photo {
    display: flex;
    align-items: center;

    > button {
      > img {
        margin-right: 32px;
        border-radius: 50%;
        width: 38px;
        height: 38px;
        object-fit: contain;
      }
    }

    > div {
      display: flex;
      flex-direction: column;

      > .username {
        font-size: 16px;
        font-weight: 400;
      }

      > button {
        font-size: 14px;
        font-weight: 600;
        color: rgb(0, 149, 246);

        &:hover {
          color: rgb(0, 55, 107);
        }
      }
    }
  }
`

const EditProfilePictureText = styled2.h2`
  font-size: 20px;
  font-weight: 700;
`

const EditProfilePicture = styled2.div`
  display: flex;
  align-items: center;
  padding: 16px;
  justify-content: space-between;
  border-radius: 20px;
  background-color: rgb(239, 239, 239);
  width: 610px;
  margin-top: 16px;

  > div {
    display: flex;
    align-items: center;

    > label {
      > img {
        border-radius: 50%;
        width: 56px;
        height: 56px;
        margin-right: 16px;
        object-fit: cover;
      }
    }

    > div.user-info {
      display: flex;
      flex-direction: column;

      > div.username {
        font-size: 16px;
        font-weight: 700;
      }

      > div.name-surname {
        color: rgb(115, 115, 115);
        font-size: 14px;
        font-weight: 400;
      }
    }
  }

  > label {
    > div {
      background-color: rgb(249, 249, 249);
      font-size: 14px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 16px;
      height: 32px;
      border-radius: 8px;
    }
  }
`

const EditUserInfos = styled2.div`
  display: flex;
  flex-direction: column;
  width: 610px;
  gap: 16px;
`

const EditBiography = styled2.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  > span {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 16px;
  }

  > div {
    position: relative;

    > textarea {
      padding: 10px 80px 10px 16px;
      border-radius: 12px;
      font-size: 16px;
      font-weight: 400;
      border: 1px solid rgb(219, 223, 228);
      width: 100%;
      height: 118px;
      resize: none;
    }

    > span {
      position: absolute;
      bottom: 15px;
      right: 16px;
      font-size: 12px;
      font-weight: 400;
      color: rgb(115, 115, 115);
    }
  }
`


const EditName = styled2.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  > span {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 16px;
  }

  > div {
    position: relative;

    > input {
      padding: 10px 80px 10px 16px;
      height: 60px;
      border-radius: 12px;
      font-size: 16px;
      font-weight: 400;
      border: 1px solid rgb(219, 223, 228);
      width: 100%;
    }
  }
`

const EditGender = styled2.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  > span {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 16px;
  }

  > select {
    border-radius: 16px;
    padding: 10px 0;
    border: 1px solid #ddd;
    padding-left: 10px;

    > option {
      height: 56px;
    }
  }
`

const EditAccountPrivate = styled2.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  > span {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 16px;
  }
`

const Post = styled2.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 600;
  margin-top: 50px;
  cursor: pointer;

  > button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 253px;
    color: white;
    height: 44px;
    border-radius: 8px;
  }
  
  > button:nth-child(1) {
    background-color: red;
  }
  
  > button:nth-child(2) {
    background-color: rgb(0, 149, 246);

    &:disabled {
      background-color: #B2DFFC;
    }
  }
`

const ChangeAccountPrivate = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({theme}) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

export default function EditUser() {
    const {currentUser, setCurrentUser} = useContext(Context);
    const [showEditUserProfilePictureDialog, setShowEditUserProfilePictureDialog] = useState(false);
    const [data, setData] = useState({...currentUser});

    const UpdateProfile = async () => {
        const response = await axios.post(authApi, {
            actionType: "UpdateProfile",
            data: data
        });
        if (response.data) {
            const result = await axios.post(authApi, {
                actionType: "GetUser",
                uid: currentUser.uid
            });
            setCurrentUser({...currentUser, ...result.data});
            setData(result.data);
        }
    }

    const UpdateProfilePicture = async e => {
        const imagefile = e.target.files[0];
        if (imagefile) {
            const formData = new FormData();
            formData.append("image", imagefile);
            const {data} = await axios.post('http://localhost/instagram-clone-revised/change_user_profile.php', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (data) {
                try {
                    const response = await axios.post(authApi, {
                        actionType: "UpdateProfilePicture",
                        data: {
                            oldProfilePicturePath: currentUser.picture,
                            newProfilePicturePath: data,
                            uid: currentUser.uid
                        }
                    })
                    if (response.data) {
                        setCurrentUser({...currentUser, picture: response.data});
                    }
                } catch (error) {

                }
            }
        }
    }

    const removeAccount = async () => {
        await DeleteUser({
            uid: currentUser.uid,
            oldProfilePicturePath: currentUser.picture
        });
    }

    return (
        <>
            <Content>
                <EditProfilePictureText>Profili düzenle</EditProfilePictureText>
                <EditProfilePicture>
                    <div>
                        <label>
                            {!currentUser.picture &&
                                <input type="file" style={{display: "none"}} onChange={UpdateProfilePicture}/>}
                            <img
                                src={currentUser.picture || DefaultProfilePicture}
                                alt=""
                                onClick={() => currentUser.picture && setShowEditUserProfilePictureDialog(true)}
                                style={{cursor: "pointer"}}
                            />
                        </label>
                        <div className="user-info">
                            <div className="username">{currentUser && currentUser.username}</div>
                            <div className="name-surname">{currentUser && currentUser.name}</div>
                        </div>
                    </div>
                    <label style={{cursor: "pointer"}}>
                        {!currentUser.picture &&
                            <input type="file" style={{display: "none"}} onChange={UpdateProfilePicture}/>}
                        <div onClick={() => currentUser.picture && setShowEditUserProfilePictureDialog(true)}>Fotoğrafı
                            değiştir
                        </div>
                    </label>
                </EditProfilePicture>

                <EditUserInfos>
                    <EditName>
                        <span>Kullanıcı Adı</span>
                        <div>
                            <input
                                type="text" placeholder="Kullanıcı adı" value={data.username}
                                onChange={e => setData({...data, username: e.target.value})}
                            />
                        </div>
                    </EditName>

                    <EditName>
                        <span>İsim</span>
                        <div>
                            <input
                                type="text" placeholder="İsim" value={data.name}
                                onChange={e => setData({...data, name: e.target.value})}
                            />
                        </div>
                    </EditName>

                    <EditBiography>
                        <span>Biyografi</span>
                        <div>
                            <textarea
                                placeholder="Biyografi"
                                maxLength="150"
                                onChange={e => setData({...data, biography: e.target.value})}
                            >
                                {data.biography}
                            </textarea>
                            <span>{data.biography && data.biography.length} / 150</span>
                        </div>
                    </EditBiography>

                    <EditGender>
                        <span>Cinsiyet</span>
                        <select
                            name="gender" value={data.gender}
                            onChange={e => setData({...data, gender: parseInt(e.target.value)})}
                        >
                            <option value="0">Kadın</option>
                            <option value="1">Erkek</option>
                        </select>
                    </EditGender>

                    <EditAccountPrivate>
                        <span>Hesap gizliliği</span>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <div>Gizli hesap</div>
                            <ChangeAccountPrivate checked={data.private} onChange={(e) => setData({
                                ...data,
                                private: Number(e.target.checked)
                            })}/>
                        </div>
                    </EditAccountPrivate>
                </EditUserInfos>
                <Post>
                    <button onClick={removeAccount}>Hesabımı Sil</button>

                    <button
                        disabled={
                            data.username === currentUser.username &&
                            data.biography === currentUser.biography &&
                            data.gender === currentUser.gender &&
                            data.name === currentUser.name &&
                            data.private === currentUser.private
                        }
                        onClick={UpdateProfile}
                    >
                        Gönder
                    </button>
                </Post>
            </Content>

            {
                showEditUserProfilePictureDialog && (
                    <EditUserProfilePicture
                        open={showEditUserProfilePictureDialog}
                        setOpen={setShowEditUserProfilePictureDialog}
                    />
                )
            }
        </>
    )
}