import {useRef, useState, useEffect, useContext, forwardRef} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import {useNavigate, Link} from 'react-router-dom';
import styled from 'styled-components';
import {CommentIcon, SavedPostsIcon, SharePostIcon} from "../../assets/img/svg";
import {AiOutlineHeart} from 'react-icons/ai';
import axios from "axios";
import {Context} from '../../contexts/AuthContext';
import PostOptions from './components/PostOptions';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const PostImg = styled.img`
  object-fit: cover;
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  height: 100%;
`

const PostDetails = styled.div`
  width: 500px;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const PostDetailsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid rgb(239, 239, 239);

  > .user_infos {
    padding: 14px 4px 14px 16px;
    display: flex;
    align-items: center;
  }
`

const PostDetailsBody = styled.div`
  flex-grow: 1;
  padding: 16px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`

const PostDetailsFooter = styled.div`
  flex-grow: 1;
  border-top: 1px solid rgb(239, 239, 239);
  display: flex;
  flex-direction: column;
  padding: 6px 16px;
  max-height: 200px;

  > .actions {
    display: flex;

    > button {
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: start;
      align-items: center;

      > svg {
        width: 24px;
        height: 24px;
      }
    }

    > button:last-child {
      margin-left: auto;
      justify-content: end;
    }
  }

  > .like_count {
    text-align: start;
    font-size: 14px;
    font-weight: 600;
  }

  > .post_date {
    font-size: 10px;
    font-weight: 400;
    margin-top: 4px;
  }

  > .add_comment {
    display: flex;
    align-items: center;
    flex-grow: 1;

    > .user_img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }

    > form {
      padding: 8px;
      flex-grow: 1;
      display: flex;
      max-height: 96px;
      height: 100%;
      align-items: center;

      > textarea {
        height: 100%;
        flex-grow: 1;
        -webkit-appearance: none;
        resize: none;
        font-size: 14px;
        font-weight: 400;
        border: 1px solid rgb(239, 239, 239);
      }

      > button {
        font-size: 14px;
        font-weight: 600;
        color: rgb(0, 149, 246);
        margin-left: 10px;
      }
    }
  }
`

const PostUserImg = styled.img`
  border-radius: 50%;
  width: 32px;
  height: 32px;
`

const PostUserUsername = styled.span`
  font-size: 14px;
  font-weight: 600;
`

const CommentLikeCount = styled.button`
  font-size: 12px;
  font-weight: 600;
  color: rgb(115, 115, 115);
`

export default function Post({open, setOpen, post, getUserPosts, setPost}) {
    const navigate = useNavigate();
    const {user, currentUser} = useContext(Context);
    const videoRef = useRef();
    const [videoPlayState, setVideoPlayState] = useState(false);
    const [commentCount, setCommentCount] = useState(15);
    const post_ = {
        postComments: [""]
    };
    const [comment, setComment] = useState("");
    const [showPostOptions, setShowPostOptions] = useState(false);
    const [showMoreCommentResponseCount, setShowMoreCommentResponseCount] = useState(7);
    const comemntRef = useRef();
    const [postComments, setPostComments] = useState([]);

    const GetPostComments = async () => {
        const {data} = await axios.post("http://localhost/instagram-clone/manager/PostManager.php", {
            actionType: "GetPostComments",
            post_id: post.post_id
        });
        setPostComments(data);
    }

    useEffect(() => {
        GetPostComments();
    }, [])

    const handleClose = () => {
        navigate("");
        setOpen(false);
    };

    const changeVideoPlayState = () => {
        if (videoPlayState) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setVideoPlayState(!videoPlayState);
    }

    useEffect(() => {
        window.history.replaceState(null, "New Page Title", "p/" + post.post_key)
    }, []);

    const deletePost = async () => {
        const {data} = await axios.post("http://localhost/instagram-clone/manager/PostManager.php", {
            actionType: "RemovePost",
            data: {
                post_id: post.post_id,
                post_url: post.post_url
            }
        });
        if (data) {
            navigate(`/${currentUser.username}`);
            setOpen(false);
            getUserPosts();
        }
    }

    const AddPostComment = async e => {
        e.preventDefault();
        const comment = comemntRef.current.value;
        const {data} = await axios.post("http://localhost/instagram-clone/manager/PostManager.php", {
            actionType: "AddPostComment",
            data: {
                post_id: post.post_id,
                comment: comment,
                comment_author: user.uid
            }
        });
        if (data) {
            const {data} = await axios.post("http://localhost/instagram-clone/manager/PostManager.php", {
                actionType: "GetPost",
                data: {
                    post_id: post.post_id
                }
            });
            if(data) {
                GetPostComments();
            }
        }
    }

    const likeComment = async comment => {
        const {data} = await axios.post("http://localhost/instagram-clone/manager/PostManager.php", {
            actionType: "LikeComment",
            data: {
                user_uid: user.user_uid,
                comment_id: comment.comment_id
            }
        });
        if(data) {
            await GetPostComments();
        }
    }


    return (
        <>
            <div>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                    PaperProps={{
                        sx: {
                            height: 898,
                            width: 1217,
                        },
                    }}
                    maxWidth="xl"
                    fullWidth={true}
                >
                    <DialogContent
                        style={{
                            padding: 0,
                            display: "flex",
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        <div
                            style={{
                                width: 717,
                                height: "100%",
                                overflow: "hidden",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                backgroundColor: "black",
                            }}
                            onClick={() => changeVideoPlayState()}
                        >
                            <PostImg src={post.post_url}/>
                        </div>

                        <PostDetails>
                            <PostDetailsHeader>
                                <div className="user_infos">
                                    <Link to={`/${currentUser.username}`}>
                                        <PostUserImg src={currentUser.user_picture}
                                                     onClick={() => setOpen(false)}/>
                                    </Link>

                                    <div
                                        style={{
                                            marginLeft: 14,
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Link
                                            to={`/${currentUser.username}`}
                                            style={{display: "flex"}}
                                            onClick={() => setOpen(false)}
                                        >
                                            <PostUserUsername>
                                                {currentUser.username}
                                            </PostUserUsername>
                                        </Link>

                                        <Link
                                            to={`/${post.postUserUsername}`}
                                            style={{display: "flex"}}
                                        >
                                            <span style={{fontSize: 14, fontWeight: 600}}>
                                                {post.username}
                                            </span>
                                        </Link>
                                    </div>
                                </div>

                                <button
                                    style={{
                                        padding: 8,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                    onClick={() => setShowPostOptions(true)}
                                >
                                    <svg
                                        aria-label="Diğer seçenekler"
                                        className="x1lliihq x1n2onr6 x5n08af"
                                        fill="currentColor"
                                        height="24"
                                        role="img"
                                        viewBox="0 0 24 24"
                                        width="24"
                                    >
                                        <title>Diğer seçenekler</title>
                                        <circle cx="12" cy="12" r="1.5"></circle>
                                        <circle cx="6" cy="12" r="1.5"></circle>
                                        <circle cx="18" cy="12" r="1.5"></circle>
                                    </svg>
                                </button>
                            </PostDetailsHeader>

                            <PostDetailsBody>
                                {
                                    postComments.map(
                                        (comment, index) =>
                                            index <= commentCount && (
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        marginBottom: 16
                                                    }}
                                                    key={index}
                                                >
                                                    <div
                                                        style={{
                                                            marginRight: 18,
                                                        }}
                                                    >
                                                        <img
                                                            src="https://picsum.photos/200/300"
                                                            style={{
                                                                borderRadius: "50%",
                                                                width: 28,
                                                                height: 28
                                                            }}
                                                        />
                                                    </div>
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            alignItems: "flex-start",
                                                        }}
                                                    >
                                                        <div>
                                                            <div
                                                                style={{
                                                                    marginRight: 4,
                                                                    float: "left",
                                                                    fontSize: 14,
                                                                    fontWeight: 600,
                                                                }}
                                                            >
                                                                {comment.user_name}
                                                            </div>
                                                            <div
                                                                style={{
                                                                    fontSize: 14,
                                                                    fontWeight: 400,
                                                                    maxWidth: 412,
                                                                }}
                                                            >
                                                                {comment.comment}
                                                            </div>
                                                        </div>
                                                        <div
                                                            style={{
                                                                marginTop: 8,
                                                                marginBottom: 4,
                                                                display: "flex",
                                                                gap: 12,
                                                                fontSize: 12,
                                                            }}
                                                        >
                                                            <div style={{fontWeight: 400}}>
                                                                1g
                                                            </div>
                                                            <div style={{fontWeight: 400}}>
                                                                <CommentLikeCount>{comment.like_count} beğenme</CommentLikeCount>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {
                                                        !comment.isPostTitle && (
                                                        <button
                                                            style={{
                                                                display: "flex",
                                                                alignItems: "start",
                                                                marginTop: 3,
                                                                marginLeft: "auto"
                                                            }}
                                                            onClick={() => likeComment(comment)}
                                                        >
                                                            <svg
                                                                aria-label="Beğen"
                                                                className="x1lliihq x1n2onr6 xyb1xck"
                                                                fill="currentColor"
                                                                height="12"
                                                                role="img"
                                                                viewBox="0 0 24 24"
                                                                width="12"
                                                            >
                                                                <title>Beğen</title>
                                                                <path
                                                                    d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
                                                            </svg>
                                                        </button>
                                                    )
                                                    }
                                                </div>
                                            )
                                    )
                                }

                                <div style={{height: 40, padding: 8, display: "flex", justifyContent: "center"}}>
                                    <button onClick={() => setCommentCount(commentCount + 15)}>
                                        <svg
                                            aria-label="Daha fazla yorum yükle"
                                            className="x1lliihq x1n2onr6 x5n08af"
                                            fill="currentColor"
                                            height="24"
                                            role="img"
                                            viewBox="0 0 24 24"
                                            width="24"
                                        >
                                            <title>Daha fazla yorum yükle</title>
                                            <circle
                                                cx="12.001"
                                                cy="12.005"
                                                fill="none"
                                                r="10.5"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                            ></circle>
                                            <line
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                x1="7.001"
                                                x2="17.001"
                                                y1="12.005"
                                                y2="12.005"
                                            ></line>
                                            <line
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                x1="12.001"
                                                x2="12.001"
                                                y1="7.005"
                                                y2="17.005"
                                            ></line>
                                        </svg>
                                    </button>
                                </div>
                            </PostDetailsBody>

                            <PostDetailsFooter>
                                <div className="actions">
                                    <button><AiOutlineHeart/></button>
                                    <button><CommentIcon/></button>
                                    <button><SharePostIcon/></button>
                                    <button><SavedPostsIcon/></button>
                                </div>
                                <button className="like_count">271.131 beğenme</button>
                                <span className="post_date">9 EKİM</span>
                                <div className="add_comment">
                                    <img className="user_img" src="https://picsum.photos/200/300"/>
                                    <form>
                                        <textarea placeholder="Yorum ekle..." autoComplete="off" autoCorrect="off"
                                                  rows="50" value={comment}
                                                  onChange={e => setComment(e.target.value)}
                                                  ref={comemntRef}
                                        ></textarea>
                                        {comment && <button onClick={AddPostComment}>Paylaş</button>}
                                    </form>
                                </div>
                            </PostDetailsFooter>
                        </PostDetails>
                    </DialogContent>
                </Dialog>
            </div>

            {showPostOptions && (
                <PostOptions open={showPostOptions} setOpen={setShowPostOptions} deletePost={deletePost} post={post}
                             setOpenPostDialog={setOpen}/>)}
        </>
    );
}