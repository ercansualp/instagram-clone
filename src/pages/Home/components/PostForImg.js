import React, { useRef, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PostImg = styled.img`
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
    height: 668px;
    padding: 16px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`

const PostDetailsFooter = styled.div`
    flex-grow: 1;
    background-color: yellow;
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

export default function PostForImg({ open, setOpen, post }) {
  const navigate = useNavigate();
  const videoRef = useRef();
  const [videoPlayState, setVideoPlayState] = useState(false);
  const [commentCount, setCommentCount] = useState(15);

  const handleClose = () => {
    navigate("");
    setOpen(false);
  };

  const changeVideoPlayState = () => {
    if(videoPlayState) {
        videoRef.current.pause();
    } else {
        videoRef.current.play();
    }
    setVideoPlayState(!videoPlayState);
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
              <PostImg src={post.postUrl} />
            </div>

            <PostDetails>
              <PostDetailsHeader>
                <div className="user_infos">
                  <Link to={`/${post.postUserUsername}`}>
                    <PostUserImg src={post.postUserImg} />
                  </Link>

                  <div
                    style={{
                      marginLeft: 14,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Link
                      to={`/${post.postUserUsername}`}
                      style={{ display: "flex" }}
                    >
                      <PostUserUsername>
                        {post.postUserUsername}
                      </PostUserUsername>
                    </Link>

                    <Link
                      to={`/${post.postUserUsername}`}
                      style={{ display: "flex" }}
                    >
                      <span style={{ fontSize: 12, fontWeight: 400 }}>
                        Caracas
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
                >
                  <svg
                    aria-label="Diğer seçenekler"
                    class="x1lliihq x1n2onr6 x5n08af"
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
                {post.postComments.map(
                  (comment, index) =>
                    index <= commentCount && (
                      <div
                        style={{
                          display: "flex",
                          marginBottom: 16,
                        }}
                      >
                        <div
                          style={{
                            marginRight: 18,
                          }}
                        >
                          <img
                            src={comment.commentUserImg}
                            style={{
                              borderRadius: "50%",
                              width: 28,
                              height: 28,
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
                              {comment.commentUserUsername}
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
                            <div style={{ fontWeight: 400 }}>
                              {comment.commentDate}
                            </div>
                            <div style={{ fontWeight: 400 }}>
                              Çevirisine bak
                            </div>
                          </div>
                        </div>
                        {!comment.isPostTitle && (
                          <button
                            style={{
                              display: "flex",
                              alignItems: "start",
                              marginTop: 9,
                            }}
                          >
                            <svg
                              aria-label="Beğen"
                              class="x1lliihq x1n2onr6 xyb1xck"
                              fill="currentColor"
                              height="12"
                              role="img"
                              viewBox="0 0 24 24"
                              width="12"
                            >
                              <title>Beğen</title>
                              <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
                            </svg>
                          </button>
                        )}
                      </div>
                    )
                )}

                <div style={{ height: 40, padding: 8, display: "flex", justifyContent: "center" }}>
                  <button onClick={() => setCommentCount(commentCount + 15)}>
                    <svg
                      aria-label="Daha fazla yorum yükle"
                      class="x1lliihq x1n2onr6 x5n08af"
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
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      ></circle>
                      <line
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        x1="7.001"
                        x2="17.001"
                        y1="12.005"
                        y2="12.005"
                      ></line>
                      <line
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        x1="12.001"
                        x2="12.001"
                        y1="7.005"
                        y2="17.005"
                      ></line>
                    </svg>
                  </button>
                </div>
              </PostDetailsBody>

              <PostDetailsFooter></PostDetailsFooter>
            </PostDetails>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}