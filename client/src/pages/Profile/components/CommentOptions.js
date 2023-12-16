import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import styled from 'styled-components';
import axios from 'axios';
import {postApi} from "../../../url";

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

export default function CommentOptions({open, setOpen, commentId, GetPostComments}) {
    const handleClose = () => {
        setOpen(false);
    };

    const RemovePostComment = async () => {
        const {data} = await axios.post(postApi, {
            actionType: "RemovePostComment",
            comment_id: commentId
        });
        if (data) {
            await GetPostComments();
            handleClose();
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
                <Item style={{color: "rgb(237, 73, 86)"}} onClick={RemovePostComment}>Sil</Item>
                <Item style={{fontWeight: 400}} onClick={() => setOpen(false)}>İptal</Item>
            </DialogContent>
        </Dialog>
    );
}