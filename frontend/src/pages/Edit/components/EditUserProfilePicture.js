import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import styled from 'styled-components';
import axios from 'axios';
import {useContext, useState} from "react";
import {Context} from "../../../contexts/AuthContext";
import SharePostDialog from "../../Profile/components/SharePostDialog";
import {authApi} from "../../../url";

const Item = styled.button`
  border-top: 1px solid rgb(219, 219, 219);
  padding: 4px 8px;
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 47px;
  width: 400px;
`

const AddNewProfilePhoto = styled.label`
  border-top: 1px solid rgb(219, 219, 219);
  padding: 4px 8px;
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 47px;
  width: 400px;
  color: #0095F6;
  cursor: pointer;
  
  > input {
    display: none;
  }
`

export default function EditUserProfilePicture({open, setOpen}) {
    const {currentUser, setCurrentUser} = useContext(Context);
    const [showSharePostDialog, setShowSharePostDialog] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    const RemoveUserProfilePicture = async () => {
        const {data} = await axios.post(authApi, {
            actionType: "UpdateProfilePicture",
            data: {
                newProfilePicturePath: null,
                uid: currentUser.uid,
                oldProfilePicturePath: currentUser.picture
            }
        });
        if(!data) {
            const user = await axios.post(authApi, {
                actionType: "GetUser",
                uid: currentUser.uid
            });
            setCurrentUser(user.data);
            handleClose()
        }
    }

    const closeSharePostDialog = () => {
        setShowSharePostDialog(false);
    }

    const changeUserProfilePicture = async e => {
        const formData = new FormData();
        const imagefile = e.target.files[0];
        formData.append("image", imagefile);
        const {data} = await axios.post('http://localhost/instagram/manager/AuthenticationManager.php', formData, {
            actionType: "update_profile",
            uid: currentUser.uid,
            picture: formData
        })
        if(data) {

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
                        handleClose();
                    }
                } catch (error) {

                }
            }
        }
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    style: {
                        borderRadius: 12
                    },
                }}
            >
                <DialogContent
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: 0,
                        margin: 0
                    }}
                >
                    <div style={{fontWeight: 400, fontSize: 20, margin: 32, textAlign: "center"}}>Fotoğrafı değiştir</div>
                    <AddNewProfilePhoto className="custom-file-upload">
                        <input type="file" onChange={UpdateProfilePicture} accept="image/png, image/jpeg" />
                        Fotoğraf Yükle
                    </AddNewProfilePhoto>
                    <Item style={{color: "#ED4956"}} onClick={RemoveUserProfilePicture}>Mevcut Fotoğrafı Kaldır</Item>
                    <Item onClick={handleClose}>İptal</Item>
                </DialogContent>

                {showSharePostDialog && <SharePostDialog open={showSharePostDialog} handleClose={closeSharePostDialog} />}
            </Dialog>
        </>
    );
}