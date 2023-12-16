import {useRef, useState, useEffect, useContext, forwardRef} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import {useNavigate, Link} from 'react-router-dom';
import styled from 'styled-components';
import {
    CommentIcon,
    CommentOptionsIcon,
    SavedPostsIcon,
    SharePostIcon,
    UnlikeCommentIcon,
    LikeCommentIcon,
    UnlikePostIcon
} from "../../assets/img/svg";
import {AiOutlineHeart} from 'react-icons/ai';
import axios from "axios";
import {Context} from '../../contexts/AuthContext';
import PostOptions from './components/PostOptions';
import CommentOptions from "../../pages/Profile/components/CommentOptions";
import {authApi, postApi} from "../../url";
import LikedUsers from "../../pages/Profile/components/LikedUsers";
import {ProfilePicture} from "../Common";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const PostImg = styled.img`
  object-fit: contain;
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

const Comment = styled.div`
  &:hover {
    > div:nth-child(2) {
      > div:nth-child(2) {
        > button {
          visibility: visible !important;
        }
      }
    }
  }
`

export default function Post({open, setOpen, post, GetUserPostsPreview, setPost}) {
    const navigate = useNavigate();
    const {user, currentUser} = useContext(Context);
    const videoRef = useRef();
    const [videoPlayState, setVideoPlayState] = useState(false);
    const [commentCount, setCommentCount] = useState(15);
    const [comment, setComment] = useState("");
    const [showPostOptions, setShowPostOptions] = useState(false);
    const [showMoreCommentResponseCount, setShowMoreCommentResponseCount] = useState(7);
    const commentRef = useRef();
    const [showCommentOptions, setShowCommentOptions] = useState(false);
    const [commentId, setCommentId] = useState();
    const [showLikedUsersDialog, setShowLikedUsersDialog] = useState(false);
    const [likedUsers, setLikedUsers] = useState([]);
    const [postLikesCount, setPostLikesCount] = useState(0);
    const [postLikes, setPostLikes] = useState([]);

    const GetPost = async () => {
        const {data} = await axios.post(postApi, {
            actionType: "GetPost",
            post_id: post.id
        });
        setPost(data);
    }

    useEffect(() => {
        GetPost();
    }, []);

    const handleClose = () => {
        navigate("");
        setOpen(false);
    };

    useEffect(() => {
        window.history.replaceState(null, "New Page Title", "p/" + post.post_key)
    }, []);

    const RemovePost = async () => {
        const {data} = await axios.post(postApi, {
            actionType: "RemovePost",
            data: {
                post_id: post.postId,
                post_url: post.url,
                commentIds: post.postComments.map(c => c.comment_id)
            }
        });

        if (data) {
            GetUserPostsPreview();
            navigate("");
            setOpen(false);
        }
    }

    const AddPostComment = async e => {
        e.preventDefault();
        const comment = commentRef.current.value;
        const {data} = await axios.post(postApi, {
            actionType: "AddPostComment",
            data: {
                post_id: post.postId,
                comment: comment,
                comment_author: user.uid
            }
        });
        if (data) {
            setComment("");
            await GetPostComments();
        }
    }

    const RemovePostComment = async comment => {
        const {data} = await axios.post(authApi, {
            actionType: "RemovePostComment",
            comment_id: comment.comment_id
        });
        if (data) {

        }
    }

    const LikePostComment = async comment_id => {
        const {data} = await axios.post(postApi, {
            actionType: "LikePostComment",
            data: {
                uid: user.uid,
                comment_id: comment_id
            }
        });
        if (data) {
            await GetPostComments();
        }
    }

    const UnlikePostComment = async commentId => {
        const {data} = await axios.post(postApi, {
            actionType: "UnlikePostComment",
            data: {
                uid: user.uid,
                comment_id: commentId
            }
        });
        if (data) {
            await GetPostComments();
        }
    }

    const GetPostComments = async () => {
        let comments = await axios.post(postApi, {
            actionType: "GetPostComments",
            post_id: post.postId
        });
        comments = comments.data;
        for (let i = 0; i < comments.length; i++) {
            let likes = await axios.post(postApi, {
                actionType: "GetCommentLikes",
                comment_id: comments[i].comment_id
            });
            likes = likes.data;
            comments[i].likes = likes;
        }
        setPost({...post, postComments: comments});
        setPostLikesCount(comments.length);
    }

    const isUserLikedThisComment = likes => {
        return likes.find(l => l.like_author === currentUser.uid) ? <UnlikeCommentIcon/> : <LikeCommentIcon/>
    }

    const GoToPostCommentOptions = comment_id => {
        setCommentId(comment_id);
        setShowCommentOptions(true);
    }

    const showLikedUsersDialogFunction = async users => {
        setLikedUsers(users);
        setShowLikedUsersDialog(true);
    }

    const LikePost = async () => {
        const {data} = await axios.post(postApi, {
            actionType: "LikePost",
            data: {
                post_id: post.postId,
                like_author: currentUser.uid
            }
        });
        if (data) {
            GetPostLikes();
        }
    }

    const GetPostLikes = async () => {
        let {data} = await axios.post(postApi, {
            actionType: "GetPostLikes",
            post_id: post.postId
        })
        setPost({...post, postLikes: data});
        setPostLikes(data)
        setPostLikesCount(data.length);
    }

    const UnlikePost = async () => {
        const {data} = await axios.post(postApi, {
            actionType: "UnlikePost",
            data: {
                post_id: post.postId,
                like_author: currentUser.uid
            }
        });
        if (data) {
            // setPost({...post, postLikes: postLikes.data});
            GetPostLikes();
        }
    }

    useEffect(() => {
        setPostLikesCount(post.postLikes.length);
    }, []);

    useEffect(() => {
        setPostLikes(post.postLikes);
    }, []);

    const getPost = url => {
        let extension = url.split(".");
        extension = extension[extension.length - 1];
        if(extension === "mp4") {
            return (
                <video style={{width: "100%"}} controls>
                    <source src={url} type="video/mp4" />
                </video>
            )
        } else {
            return (
                <PostImg src={url}/>
            )
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
                        >
                            { getPost(post.url) }
                        </div>
                        <PostDetails>
                            <PostDetailsHeader>
                                <div className="user_infos">
                                    <Link to={`/${post.username}`}>
                                        <PostUserImg src={post.picture}
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
                                            to={`/${currentUser && currentUser.username}`}
                                            style={{display: "flex"}}
                                            onClick={() => setOpen(false)}
                                        >
                                            <PostUserUsername>
                                                {user.user_username}
                                            </PostUserUsername>
                                        </Link>

                                        <Link
                                            to={`/${post.username}`}
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
                                <div
                                    style={{
                                        display: "flex",
                                        marginBottom: 16
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 46,
                                        }}
                                    >
                                        <img
                                            src={post.picture}
                                            style={{
                                                borderRadius: "50%",
                                                width: 28,
                                                height: 28,
                                            }}
                                            alt=""
                                        />
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "flex-start",
                                            width: "100%"
                                        }}
                                    >
                                        <div style={{width: "100%"}}>
                                            <div
                                                style={{
                                                    marginRight: 4,
                                                    float: "left",
                                                    fontSize: 14,
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {post.username}
                                            </div>
                                            <div
                                                style={{
                                                    fontSize: 14,
                                                    fontWeight: 400,
                                                    maxWidth: 412,
                                                    wordWrap: "break-word",
                                                    wordBreak: "break-all"
                                                }}
                                            >
                                                {post.description}
                                            </div>
                                        </div>
                                        <div
                                            style={{
                                                marginTop: 8,
                                                marginBottom: 4,
                                                display: "flex",
                                                gap: 12,
                                                fontSize: 12,
                                                alignItems: "center"
                                            }}
                                        >
                                            <div style={{fontWeight: 400}}>
                                                1g
                                            </div>
                                            {
                                                /*
                                                comment.uid === user.uid && <button
                                                    onClick={() => GoToPostCommentOptions(comment.comment_id)}>
                                                    <CommentOptionsIcon/></button>
                                                 */
                                            }
                                        </div>
                                    </div>
                                </div>

                                {
                                    post.postComments && post.postComments.length !== 0 && post.postComments.map(
                                        (comment, index) =>
                                            index <= commentCount && (
                                                <>
                                                    <Comment
                                                        style={{
                                                            display: "flex",
                                                            marginBottom: 16
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                width: 46,
                                                            }}
                                                        >
                                                            <img
                                                                src={comment.picture}
                                                                style={{
                                                                    borderRadius: "50%",
                                                                    width: 28,
                                                                    height: 28
                                                                }}
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                flexDirection: "column",
                                                                alignItems: "flex-start",
                                                                width: "100%",
                                                                marginRight: 5
                                                            }}
                                                        >
                                                            <div style={{width: "100%"}}>
                                                                <div
                                                                    style={{
                                                                        marginRight: 4,
                                                                        float: "left",
                                                                        fontSize: 14,
                                                                        fontWeight: 600,
                                                                    }}
                                                                >
                                                                    {comment.username}
                                                                </div>
                                                                <div
                                                                    style={{
                                                                        fontSize: 14,
                                                                        fontWeight: 400,
                                                                        maxWidth: 412,
                                                                        wordWrap: "break-word",
                                                                        wordBreak: "break-all"
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
                                                                    alignItems: "center"
                                                                }}
                                                            >
                                                                <div style={{fontWeight: 400}}>
                                                                    1g
                                                                </div>
                                                                {
                                                                    comment.likes.length !== 0 && (
                                                                        <div style={{fontWeight: 400}}>
                                                                            <CommentLikeCount
                                                                                onClick={() => showLikedUsersDialogFunction(comment.likes)}>{comment.likes.length} beğenme</CommentLikeCount>
                                                                        </div>
                                                                    )
                                                                }
                                                                {
                                                                    comment.uid === currentUser.uid && <button
                                                                        className="comment-options"
                                                                        style={{visibility: "hidden"}}
                                                                        onClick={() => GoToPostCommentOptions(comment.comment_id)}>
                                                                        <CommentOptionsIcon/></button>
                                                                }
                                                            </div>
                                                        </div>
                                                        <button
                                                            style={{
                                                                display: "flex",
                                                                alignItems: "start",
                                                                marginTop: 3,
                                                                marginLeft: "auto"
                                                            }}
                                                            onClick={() => comment.likes.find(l => l.like_author === currentUser.uid) ? UnlikePostComment(comment.comment_id) : LikePostComment(comment.comment_id)}
                                                        >
                                                            {isUserLikedThisComment(comment.likes)}
                                                        </button>
                                                    </Comment>
                                                </>
                                            )
                                    )
                                }

                                {
                                    /*
                                    post.postComments && post.postComments.length !== 0 && post.postComments.map(
                                        (comment, index) =>
                                            index <= commentCount && (
                                                <Comment
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
                                                            src={comment.picture}
                                                            style={{
                                                                borderRadius: "50%",
                                                                width: 28,
                                                                height: 28
                                                            }}
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            alignItems: "flex-start",
                                                            width: "100%"
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
                                                                {comment.username}
                                                            </div>
                                                            <div
                                                                style={{
                                                                    marginRight: 4,
                                                                    float: "left",
                                                                    fontSize: 14,
                                                                    fontWeight: 600,
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
                                                                alignItems: "center"
                                                            }}
                                                        >
                                                            <div style={{fontWeight: 400}}>
                                                                1g
                                                            </div>
                                                            {
                                                                comment.likes.length !== 0 && (
                                                                    <div style={{fontWeight: 400}}>
                                                                        <CommentLikeCount
                                                                            onClick={() => showLikedUsersDialogFunction(comment.likes)}>{comment.likes.length} beğenme</CommentLikeCount>
                                                                    </div>
                                                                )
                                                            }
                                                            {
                                                                comment.uid === user.uid && <button
                                                                    className="comment-options"
                                                                    style={{visibility: "hidden"}}
                                                                    onClick={() => GoToPostCommentOptions(comment.comment_id)}>
                                                                    <CommentOptionsIcon/></button>
                                                            }
                                                        </div>
                                                    </div>
                                                    <button
                                                        style={{
                                                            display: "flex",
                                                            alignItems: "start",
                                                            marginTop: 3,
                                                            marginLeft: "auto"
                                                        }}
                                                        onClick={() => comment.likes.find(l => l.like_author === currentUser.uid) ? UnlikePostComment(comment.comment_id) : LikePostComment(comment.comment_id)}
                                                    >
                                                        {isUserLikedThisComment(comment.likes)}
                                                    </button>
                                                </Comment>
                                            )
                                    )

                                     */
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
                                    {
                                        postLikes.find(l => l.like_author === currentUser.uid) ?
                                            <button onClick={UnlikePost}><UnlikePostIcon/></button> : (
                                                <button onClick={LikePost}><AiOutlineHeart/></button>
                                            )
                                    }

                                    <button onClick={() => commentRef.current.focus()}><CommentIcon/></button>
                                    <button><SharePostIcon/></button>
                                    <button><SavedPostsIcon/></button>
                                </div>
                                <button className="like_count">{postLikesCount} beğenme</button>
                                <span className="post_date">9 EKİM</span>
                                <div className="add_comment">
                                    <ProfilePicture height={32} width={32} src={currentUser.picture} />
                                    <form>
                                        <textarea placeholder="Yorum ekle..." autoComplete="off" autoCorrect="off"
                                                  rows="50" value={comment}
                                                  onChange={e => setComment(e.target.value)}
                                                  ref={commentRef}
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
                <PostOptions open={showPostOptions} setOpen={setShowPostOptions} RemovePost={RemovePost} post={post}
                             setOpenPostDialog={setOpen}/>)}

            {
                showCommentOptions && (
                    <CommentOptions open={showCommentOptions} setOpen={setShowCommentOptions} commentId={commentId}
                                    GetPostComments={GetPostComments}/>
                )
            }

            {
                showLikedUsersDialog &&
                <LikedUsers open={showLikedUsersDialog} setOpen={setShowLikedUsersDialog} likedUsers={likedUsers}/>
            }
        </>
    );
}