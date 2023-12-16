import {useContext, useState} from "react";
import {Context} from "../../../contexts/AuthContext";
import axios from "axios";
import {authApi} from "../../../url";
import DefaultProfilePicture from "../../../assets/img/default_profile_picture.jpg";
import styled from "styled-components";
import EditProfilePicture from './EditProfilePicture';

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

  > button {
    border-radius: 50%;
    width: 150px;
    height: 150px;

    > img {
      border-radius: 50%;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`

export default function ProfilePicture({picture, username}) {
    const {currentUser, setCurrentUser} = useContext(Context);
    const [showEditProfilePictureDialog, setShowEditProfilePictureDialog] = useState(false);

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
                            oldProfilePicturePath: currentUser && currentUser.picture,
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

    const showEditProfilePictureDialogFunction = () => {
        setShowEditProfilePictureDialog(true);
    }

    return (
        <>
            {
                currentUser && currentUser.username === username ? (
                    <UserImage>
                        <button onClick={showEditProfilePictureDialogFunction}>
                            <img src={currentUser.picture || DefaultProfilePicture} alt=""/>
                        </button>
                    </UserImage>
                ) : (
                    <img
                        src={picture || DefaultProfilePicture}
                        alt=""
                        style={{
                            borderRadius: "50%",
                            width: 150,
                            height: 150,
                            objectFit: "contain"
                        }}
                    />
                )
            }

            {showEditProfilePictureDialog &&
                <EditProfilePicture open={showEditProfilePictureDialog} setOpen={setShowEditProfilePictureDialog}/>}
        </>
    )
}