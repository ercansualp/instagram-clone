import styled from 'styled-components';
import {NavLink} from 'react-router-dom';
import {useState, useContext, useEffect} from 'react';
import EditUserProfilePicture from "./components/EditUserProfilePicture";
import axios from "axios";
import {Context} from '../../contexts/AuthContext';
import DefaultProfilePicture from '../../assets/img/default_profile_picture.jpg';

const Container = styled.div`
  display: flex;
`

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 332px;
  border-right: 1px solid #ddd;

  > span {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 24px;
    margin-left: 16px;
  }
`

const SettingsItem = styled(NavLink)`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  font-weight: 400;
  margin-right: 48px;
  padding: 16px;
  border-radius: 8px;
  height: 50px;
  width: 231px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 32px 0 0 45px;

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

export default function Edit() {
    const {user} = useContext(Context);
    const [showEditUserProfilePictureDialog, setShowEditUserProfilePictureDialog] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const getCurrentUser = async () => {
        const {data} = await axios.post("http://localhost/instagram-clone/manager/AuthenticationManager.php", {
            actionType: "get_current_user",
            uid: user.uid
        });
        setCurrentUser(data);
    }

    useEffect(() => {
        getCurrentUser();
    }, []);

    return (
        <Container>
            <SettingsContainer>
                <span>Ayarlar</span>
                <SettingsItem
                    to="/accounts/edit"
                    style={({isActive}) => {
                        return {
                            backgroundColor: "#E3E3E3"
                        };
                    }}
                >
                    Profili düzenle
                </SettingsItem>
            </SettingsContainer>
            <Content>
                <span className="edit-profile-text">Profili düzenle</span>
                <div className="edit-profile-photo">
                    <button onClick={() => setShowEditUserProfilePictureDialog(true)}><img
                        src={currentUser !== null ? currentUser.user_picture : DefaultProfilePicture} alt=""/></button>
                    <div>
                        <div className="username">{currentUser !== null ? currentUser.username : ""}</div>
                        <button onClick={() => setShowEditUserProfilePictureDialog(true)}>Profil fotoğrafını değiştir
                        </button>
                    </div>
                </div>
            </Content>

            {
                showEditUserProfilePictureDialog && (
                    <EditUserProfilePicture
                        open={showEditUserProfilePictureDialog}
                        setOpen={setShowEditUserProfilePictureDialog}
                        getCurrentUser={getCurrentUser}
                    />
                )
            }
        </Container>
    )
}