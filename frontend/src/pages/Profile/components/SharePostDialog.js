import {useState} from 'react';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import {BackArrowIcon, ChangeSharedImgSize} from "../../../assets/img/svg";
import styled2 from 'styled-components';
import BackToShare from "./BackToShare";
import {useContext} from "react";
import {Context} from "../../../contexts/AuthContext";
import SharedGif from '../../../assets/img/SharedGif.gif';
import axios from 'axios';

const BootstrapDialog = styled(Dialog)(({theme}) => ({
    margin: 0
}));

const ChangeImgSize = styled2.button`
  position: absolute; 
  left: 10px;
  bottom: 10px;
  color: white;
  padding: 8px;
`

const CutePhotoContainer = styled2.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
    
  > button {
    > div {
        font-size: 14px;
        color: rgb(0, 149, 246);
        font-weight: 600;
    }
  }
`

const CommentContainer = styled2.div`
  width: 322px;
  display: flex;
  flex-direction: column;
`

const CommentHeader = styled2.div`
  display: flex;
  gap: 12px;
  align-items: center;
  height: 60px;
  padding: 0 16px;
  align-items: center;
  
  > img {
    width: 28px;
    height: 28px;
    border-radius: 50%;
  }
  
  > span {
    font-size: 14px;
    font-weight: 600;
  }
`

const Comment = styled2.textarea`
  padding: 0 16px;
  border-bottom: 1px solid rgb(219, 219, 219);
  width: 100%;
  max-width: 322px;
  font-size: 16px;
  font-weight: 400;
  max-height: 168px;
  min-height: 168px;
`

export default function SharePostDialog(props) {
    const {user, currentUser} = useContext(Context);
    const {open, handleClose, username = user.displayName} = props;

    const [file, setFile] = useState([]);
    const [img, setImg] = useState(null);
    const [showSureDialog, setShowSureDialog] = useState(false);
    const [showAddCommentWindow, setShowAddCommentWindow] = useState(false);
    const [comment, setComment] = useState("");
    const [postShareSuccess, setPostShareSuccess] = useState(false);
    const [title, setTitle] = useState("Kırp");

    const uploadFiles = e => {
        var file = e.target.files[0];
        setFile(file);
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            setImg(reader.result)
        };
        reader.onerror = function (error) {

        }
    }

    const backToShare = () => {
        if (showAddCommentWindow) {
            setComment("");
            setShowAddCommentWindow(false);
        } else setShowSureDialog(true);
    }

    const changeComment = e => {
        setComment(e.target.value);
    }

    const sharePost = async () => {
        if (showAddCommentWindow) {
            const formData = new FormData();
            const imagefile = file;
            formData.append("image", imagefile);
            const {data} = await axios.post('http://localhost/instagram-clone/upload_post_image.php', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if(data) {
                let post_key = data.split("_");
                post_key = post_key[post_key.length - 1];
                post_key = post_key.split(".");
                post_key = post_key[0];
                try {
                    const response = await axios
                        .post("http://localhost/instagram-clone/manager/PostManager.php", {
                            actionType: "AddPost",
                            post: {
                                post_author: user.uid,
                                post_description: comment,
                                post_url: data,
                                post_key: post_key,
                                post_like_count_visibility: 1,
                                post_comments_visibility: 1
                            }
                        })
                    if(response) {
                        setComment("");
                        setTitle("Gönderi paylaşıldı");
                        setPostShareSuccess(true);
                        const sleep = (milliseconds) => {
                            return new Promise(resolve => setTimeout(resolve, milliseconds))
                        }
                        await sleep(3000);
                        document.location.reload(true);
                    }
                } catch (error) {

                }
            }
        } else setShowAddCommentWindow(true);
    }

    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                maxWidth="lg"
                PaperProps={{
                    style: {
                        borderRadius: 12,
                        minWidth: 726,
                        minHeight: 726
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        m: 0,
                        height: 42,
                        justifyContent: "center",
                        fontSize: 16,
                        color: "black",
                        display: "flex",
                        alignItems: "center",
                        fontWeight: 600
                    }}
                    id="customized-dialog-title"
                >
                    {
                        img === null ? (
                            <>Yeni gönderi oluştur</>
                        ) : (
                            <CutePhotoContainer>
                                {title === "Kırp" && <button onClick={backToShare}><BackArrowIcon/></button>}
                                <span style={{textAlign: "center", width: "100%"}}>{title}</span>
                                {
                                    title === "Kırp" && (
                                        <button onClick={sharePost}>
                                            <div>İleri</div>
                                        </button>
                                    )
                                }
                            </CutePhotoContainer>
                        )
                    }
                </DialogTitle>
                <DialogContent
                    dividers
                    PaperProps={{
                        style: {},
                    }}
                    sx={{
                        padding: 0,
                        display: "flex",
                        alignItems: "center",
                        minWidth: 726,
                        minHeight: 726,
                        border: "none",
                        margin: 0
                    }}
                >
                    {
                        img === null ? (
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "column",
                                    width: "100%",
                                    height: "100%",
                                }}
                            >
                                <svg
                                    aria-label="Görsel veya video gibi medya içeriklerini temsil eden simge"
                                    className="x1lliihq x1n2onr6 x5n08af"
                                    fill="currentColor"
                                    height="77"
                                    role="img"
                                    viewBox="0 0 97.6 77.3"
                                    width="96"
                                >
                                    <title>
                                        Görsel veya video gibi medya içeriklerini temsil eden simge
                                    </title>
                                    <path
                                        d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
                                        fill="currentColor"
                                    ></path>
                                    <path
                                        d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
                                        fill="currentColor"
                                    ></path>
                                    <path
                                        d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                                <label className="custom-file-upload" style={{marginTop: 24}}>
                                    <input type="file" style={{display: "none"}} onChange={uploadFiles} accept="video/mp4, image/png, image/jpeg"/>
                                    <div
                                        style={{
                                            backgroundColor: "rgb(24, 119, 242)",
                                            padding: "7px 16px",
                                            color: "white",
                                            borderRadius: 8,
                                            cursor: "pointer"
                                        }}
                                    >
                                        Bilgisayardan seç
                                    </div>
                                </label>
                            </div>
                        ) : (img !== null && postShareSuccess) ? (
                            <div
                                style={{
                                    width: 726,
                                    height: 726,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "column",
                                    fontSize: 20,
                                    fontWeight: 400,
                                    gap: 8
                                }}
                            >
                                <img src={SharedGif}></img>
                                <span>Gönderin paylaşıldı.</span>
                            </div>
                        ) : (
                            <div style={{display: "flex"}}>
                                <img src={img} style={{width: 726, height: 726, objectFit: "cover"}}/>
                                <ChangeImgSize><ChangeSharedImgSize/></ChangeImgSize>
                                {
                                    showAddCommentWindow && (
                                        <CommentContainer>
                                            <div>
                                                <CommentHeader>
                                                    <img src="https://picsum.photos/200/300"/>
                                                    <span>{user.displayName}</span>
                                                </CommentHeader>
                                                <Comment type="text" placeholder="Açıklama yaz..." value={comment}
                                                         onChange={changeComment}/>
                                            </div>
                                        </CommentContainer>
                                    )
                                }
                            </div>
                        )
                    }
                </DialogContent>
            </BootstrapDialog>

            {
                showSureDialog && (
                    <BackToShare open={showSureDialog} setOpen={setShowSureDialog} setImg={setImg}/>
                )
            }
        </div>
    );
}