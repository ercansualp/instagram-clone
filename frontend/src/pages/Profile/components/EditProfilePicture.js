import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import styled from 'styled-components';
import axios from 'axios';
import {authApi} from "../../../url";
import {useContext} from "react";
import {Context} from "../../../contexts/AuthContext";
import DefaultProfilePicture from "../../../assets/img/default_profile_picture.jpg";

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
  cursor: pointer;

  > label {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    
    > input {
      display: none;
    }
  }
`

export default function EditProfilePicture({open, setOpen}) {
    const {currentUser, setCurrentUser} = useContext(Context);
    const handleClose = () => {
        setOpen(false);
    };

    const RemoveProfilePicture = async () => {
        const {data} = await axios.post(authApi, {
            actionType: "UpdateProfilePicture",
            data: {
                uid: currentUser.uid,
                oldProfilePicturePath: currentUser.picture,
                newProfilePicturePath: null
            }
        })
        if(!data) {
            setCurrentUser({...currentUser, picture: null});
            handleClose();
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
                            oldProfilePicturePath: currentUser && currentUser.picture,
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
                <div style={{
                    margin: "32px 32px 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 400,
                    fontSize: 20
                }}>
                    Profil Fotoğrafını Değiştir
                </div>

                <Item style={{color: "rgb(0, 149, 246)"}}>
                    <label>
                        <input type="file" onChange={UpdateProfilePicture}/>
                        <span>Fotoğraf Yükle</span>
                    </label>
                </Item>
                <Item style={{color: "rgb(237, 73, 86)"}} onClick={RemoveProfilePicture}>Mevcut Fotoğrafı Kaldır</Item>
                <Item style={{fontWeight: 400}} onClick={() => setOpen(false)}>İptal</Item>
            </DialogContent>
        </Dialog>
    );
}