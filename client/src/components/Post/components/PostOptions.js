import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import styled from 'styled-components';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {authApi, postApi} from "../../../url";

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

export default function PostOptions({open, setOpen, RemovePost, post, currentuser, setOpenPostDialog}) {
    const navigate = useNavigate();
    const handleClose = () => {
        setOpen(false);
    };

    const disableComments = async () => {
        const {data} = await axios.post(authApi, {
            actionType: "disable_post_comments",
            data: {
                post_id: post.post_id,
                status: post.comment_status === 0 ? 1 : 0
            }
        });
        if(data) {
            setOpen(false);
            setOpenPostDialog(false)
            window.location.replace(`/${currentuser.user_username}`);
            // window.location.href = "http://stackoverflow.com";
        }
    }

    const hidePostLikeCounts = async () => {
        const {data} = await axios.post(postApi, {
            actionType: "hide_post_like_counts",
            data: {
                post_id: post.post_id,
                status: post.show_like_count === 0 ? 1 : 0
            }
        });
        if(data) {
            setOpen(false);
            setOpenPostDialog(false);
            window.location.replace(`/${currentuser.user_username}`);
            // window.location.href = "http://stackoverflow.com";
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
                <Item style={{color: "rgb(237, 73, 86)"}} onClick={RemovePost}>Sil</Item>
                <Item style={{fontWeight: 400}}>Düzenle</Item>
                <Item style={{fontWeight: 400}} onClick={hidePostLikeCounts}>Beğenme sayısını {post.show_like_count === 0 ? "Göster" : "Gizle"}</Item>
                <Item style={{fontWeight: 400}} onClick={disableComments}>Yorum yapmayı {post.comment_status === 1 ? "Kapat" : "Aç"}</Item>
                <Item style={{fontWeight: 400}}>Gönderiye git</Item>
                <Item style={{fontWeight: 400}}>Bu hesap hakkında</Item>
                <Item style={{fontWeight: 400}} onClick={() => setOpen(false)}>İptal</Item>
            </DialogContent>
        </Dialog>
    );
}