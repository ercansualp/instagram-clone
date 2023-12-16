import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import SideBar from '../../components/SideBar';
import PostForVideo from './components/PostForVideo';
import PostForImg from './components/PostForImg';

const Box = styled.div`
    height: 100vh;
    display: flex;
`

const Content = styled.div`
    height: 100vh;
    flex-grow: 1;
    padding-right: 22px;
    display: flex;
    justify-content: center;
    margin-left: 300px;
`

const Stories = styled.ul`
    margin-bottom: 48px;
    padding: 8px 0;
    height: 85px;
    display: flex;
    gap: 20px;
`;

const Posts = styled.div`
    width: 470px;
    display: flex;
    flex-direction: column;
    gap: 30px;
`;

const Post2 = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const PostUserImg = styled.img`
    width: 42px;
    height: 42px;
    border-radius: 56px;
`;

const PostInfo = styled.span`
    font-weight: 600;
    font-size: 14px;
`;

const PostUserInfos = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`

const PostHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const PostImg = styled.img`
    width: 700px;
`

const PostSeparator = styled.div`
    height: 0.2px;
    width: 100%;
    background-color: #ddd;
`

const PostFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  > .post_actions {
    display: flex;
    align-items: center;
  }
  > .post_infos {
    > div:nth-child(1) {
      float: left;
      margin-right: 5px;
    }
  }
  > .add_comment {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const PostActions = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    > div {
        display: flex;
        > button:nth-child(2) {
          margin: 0 8px;
        }
    }
`;

function Home({ open, setOpen }) {
    const [posts, setPosts] = useState([
        {
            postId: 1,
            postUrl: "https://picsum.photos/200/300",
            postUserUsername: "ercansualp",
            postTitle: "dsfgdsfg",
            postLikeCount: 3831535,
            postCommentCount: 1310,
            postCode: "post_code_1",
            postType: "img",
            postComments: [
                {
                    comment: "yorum 1",
                    isPostTitle: true,
                    commentUserUsername: "ronaldo",
                    commentUserImg: "https://picsum.photos/200/300",
                    commentDate: "15s",
                },
                {
                    comment:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum facilisis diam, nec gravida arcu. Mauris quis diam justo. Nulla pretium libero orci, aliquet cursus eros dignissim eu. Aenean hendrerit.",
                    isPostTitle: false,
                    commentUserUsername: "messi",
                    commentUserImg: "https://picsum.photos/200/300",
                    commentDate: "13s",
                },
                {
                    comment:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum facilisis diam, nec gravida arcu. Mauris quis diam justo. Nulla pretium libero orci, aliquet cursus eros dignissim eu. Aenean hendrerit.",
                    isPostTitle: false,
                    commentUserUsername: "messi",
                    commentUserImg: "https://picsum.photos/200/300",
                    commentDate: "13s",
                },
                {
                    comment:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum facilisis diam, nec gravida arcu. Mauris quis diam justo. Nulla pretium libero orci, aliquet cursus eros dignissim eu. Aenean hendrerit.",
                    isPostTitle: false,
                    commentUserUsername: "messi",
                    commentUserImg: "https://picsum.photos/200/300",
                    commentDate: "13s",
                },
                {
                    comment:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum facilisis diam, nec gravida arcu. Mauris quis diam justo. Nulla pretium libero orci, aliquet cursus eros dignissim eu. Aenean hendrerit.",
                    isPostTitle: false,
                    commentUserUsername: "messi",
                    commentUserImg: "https://picsum.photos/200/300",
                    commentDate: "13s",
                }
            ],
            postUserImg: "https://picsum.photos/200/300",
            postDate: "1g",
            postUserAccountVerified: false,
        },
        {
            postId: 2,
            postUrl: "https://picsum.photos/200/300",
            postUserUsername: "emresualp",
            postTitle: "dsfgdsfg",
            postLikeCount: 1234567,
            postCommentCount: 2800,
            postCode: "post_code_2",
            postType: "video",
            postComments: [
                {
                    comment: "yorum 1",
                    isPostTitle: true,
                    commentUserUsername: "messi",
                    commentUserImg: "https://picsum.photos/200/300",
                    commentDate: "15s",
                },
            ],
            postUserImg: "https://picsum.photos/200/300",
            postDate: "1g",
            postUserAccountVerified: false,
        },
    ]);
    const [post, setPost] = useState({});

    const breakStoryDescriptionText = text => {
        if(text.length >= 120) {
            return text.slice(1, 120) + "...";
        }
        return text;
    }

    const openKesfetVideo = (videoUrl, post) => {
        window.history.pushState("", "", `/p/${videoUrl}`);
        setOpen(true);
        setPost(post);
    }

    return (
        <>
            <Helmet>
                <title>Instagram</title>
                <link
                    rel="icon"
                    type="image/png"
                    href="https://static.cdninstagram.com/rsrc.php/v3/yI/r/VsNE-OHk_8a.png"
                    sizes="16x16"
                />
            </Helmet>
            <Box>
                <div
                    style={{
                        maxWidth: 630,
                        width: 630,
                    }}
                >
                    <div
                        style={{
                            marginTop: 16,
                        }}
                    >
                        <Stories>
                            <li>
                                <button
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "start",
                                    }}
                                >
                                    <img
                                        src="https://picsum.photos/200/300"
                                        style={{
                                            width: 56,
                                            height: 56,
                                            borderRadius: 56,
                                        }}
                                        alt=""
                                    />
                                    <div style={{ fontSize: 12, marginTop: 8 }}>
                                        tatawerneck
                                    </div>
                                </button>
                            </li>

                            <li>
                                <button
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "start",
                                    }}
                                >
                                    <img
                                        src="https://picsum.photos/200/300"
                                        style={{
                                            width: 56,
                                            height: 56,
                                            borderRadius: 56,
                                        }}
                                        alt=""
                                    />
                                    <div style={{ fontSize: 12, marginTop: 8 }}>
                                        tatawerneck
                                    </div>
                                </button>
                            </li>

                            <li>
                                <button
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "start",
                                    }}
                                >
                                    <img
                                        src="https://picsum.photos/200/300"
                                        style={{
                                            width: 56,
                                            height: 56,
                                            borderRadius: 56,
                                        }}
                                        alt=""
                                    />
                                    <div style={{ fontSize: 12, marginTop: 8 }}>
                                        tatawerneck
                                    </div>
                                </button>
                            </li>

                            <li>
                                <button
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "start",
                                    }}
                                >
                                    <img
                                        src="https://picsum.photos/200/300"
                                        style={{
                                            width: 56,
                                            height: 56,
                                            borderRadius: 56,
                                        }}
                                        alt=""
                                    />
                                    <div style={{ fontSize: 12, marginTop: 8 }}>
                                        tatawerneck
                                    </div>
                                </button>
                            </li>
                        </Stories>
                        <div
                            style={{ display: "flex", justifyContent: "center", gap: 20 }}
                        >
                            <Posts>
                                {posts.map((post, index) => (
                                    <>
                                        <Post2 key={index}>
                                            <PostHeader>
                                                <PostUserInfos>
                                                    <Link to={`/${post.postUserUsername}`}>
                                                        <PostUserImg src={post.postUrl} />
                                                    </Link>
                                                    <Link to={`/${post.postUserUsername}`}>
                                                        <PostInfo>{post.postUserUsername}</PostInfo>
                                                    </Link>
                                                </PostUserInfos>
                                                <button>
                                                    <svg
                                                        className="x1lliihq x1n2onr6"
                                                        color="rgb(0, 0, 0)"
                                                        fill="rgb(0, 0, 0)"
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
                                            </PostHeader>

                                            <PostImg src={post.postUrl} />

                                            <PostFooter>
                                                <div className='post_actions'>
                                                    <PostActions>
                                                        <div>
                                                            <button>
                                                                <svg
                                                                    className="x1lliihq x1n2onr6"
                                                                    color="rgb(38, 38, 38)"
                                                                    fill="rgb(38, 38, 38)"
                                                                    height="24"
                                                                    role="img"
                                                                    viewBox="0 0 24 24"
                                                                    width="24"
                                                                >
                                                                    <title>Beğen</title>
                                                                    <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
                                                                </svg>
                                                            </button>

                                                            <button>
                                                                <svg
                                                                    className="x1lliihq x1n2onr6"
                                                                    color="rgb(0, 0, 0)"
                                                                    fill="rgb(0, 0, 0)"
                                                                    height="24"
                                                                    role="img"
                                                                    viewBox="0 0 24 24"
                                                                    width="24"
                                                                >
                                                                    <title>Yorum Yap</title>
                                                                    <path
                                                                        d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="2"
                                                                    ></path>
                                                                </svg>
                                                            </button>

                                                            <button>
                                                                <svg
                                                                    className="x1lliihq x1n2onr6"
                                                                    color="rgb(115, 115, 115)"
                                                                    fill="rgb(115, 115, 115)"
                                                                    height="24"
                                                                    role="img"
                                                                    viewBox="0 0 24 24"
                                                                    width="24"
                                                                >
                                                                    <title>Gönderi Paylaş</title>
                                                                    <line
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="2"
                                                                        x1="22"
                                                                        x2="9.218"
                                                                        y1="3"
                                                                        y2="10.083"
                                                                    ></line>
                                                                    <polygon
                                                                        fill="none"
                                                                        points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                                                                        stroke="currentColor"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="2"
                                                                    ></polygon>
                                                                </svg>
                                                            </button>
                                                        </div>

                                                        <button>
                                                            <svg
                                                                className="x1lliihq x1n2onr6"
                                                                color="rgb(115, 115, 115)"
                                                                fill="rgb(115, 115, 115)"
                                                                height="24"
                                                                role="img"
                                                                viewBox="0 0 24 24"
                                                                width="24"
                                                            >
                                                                <title>Kaydet</title>
                                                                <polygon
                                                                    fill="none"
                                                                    points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                                                                    stroke="currentColor"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                ></polygon>
                                                            </svg>
                                                        </button>
                                                    </PostActions>
                                                </div>
                                                <PostInfo>{post.postLikeCount} beğenme</PostInfo>
                                                <div className='post_infos'>
                                                    <div>
                                                        <PostInfo>{post.postUserUsername}</PostInfo>
                                                    </div>
                                                    <div>
                                                        {breakStoryDescriptionText(post.postTitle)}
                                                    </div>
                                                </div>
                                                <div>
                                                    <button
                                                        onClick={() => openKesfetVideo("video1", post)}
                                                    >
                                                        {post.postCommentCount} yorumun tümünü gör
                                                    </button>
                                                </div>
                                                <div className='add_comment'>
                                                    <input
                                                        type="text"
                                                        placeholder="Yorum ekle..."
                                                        style={{
                                                            width: "100%",
                                                        }}
                                                    />
                                                    <button>
                                                        <svg
                                                            className="x1lliihq x1n2onr6"
                                                            color="rgb(115, 115, 115)"
                                                            fill="rgb(115, 115, 115)"
                                                            height="13"
                                                            role="img"
                                                            viewBox="0 0 24 24"
                                                            width="13"
                                                        >
                                                            <title>İfade Simgesi</title>
                                                            <path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </PostFooter>
                                        </Post2>

                                        {index + 1 !== posts.length && (
                                            <PostSeparator></PostSeparator>
                                        )}
                                    </>
                                ))}
                            </Posts>
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        paddingLeft: 64,
                        width: 319,
                    }}
                >
                    <div
                        style={{
                            marginTop: 36,
                            display: "flex",
                            flexDirection: "column",
                            gap: 15,
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <div style={{ display: "flex", gap: 10 }}>
                                <div>
                                    <img
                                        src="https://picsum.photos/200/300"
                                        style={{
                                            height: 44,
                                            width: 44,
                                            borderRadius: "50%",
                                        }}
                                        alt=""
                                    />
                                </div>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <div style={{ fontWeight: 600, fontSize: 14 }}>
                                        ercansualp01
                                    </div>
                                    <div
                                        style={{
                                            color: "rgb(115, 115, 115)",
                                            fontSize: 14,
                                            fontWeight: 400,
                                        }}
                                    >
                                        Alpay
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Link
                                    to="/"
                                    style={{
                                        color: "rgb(0, 149, 246)",
                                        fontWeight: 600,
                                        fontSize: 12,
                                    }}
                                >
                                    Geçiş Yap
                                </Link>
                            </div>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <div
                                style={{
                                    color: "rgb(115, 115, 115)",
                                    fontSize: 14,
                                    fontWeight: 600,
                                }}
                            >
                                Senin için önerilenler
                            </div>
                            <div>
                                <Link
                                    to="/"
                                    style={{
                                        color: "black",
                                        fontWeight: 600,
                                        fontSize: 12,
                                    }}
                                >
                                    Tümünü Gör
                                </Link>
                            </div>
                        </div>
                        <div>
                            <ul
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 15,
                                }}
                            >
                                <li
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <div style={{ display: "flex" }}>
                                        <div style={{ marginRight: 10 }}>
                                            <img
                                                src="https://picsum.photos/200/300"
                                                style={{
                                                    height: 44,
                                                    width: 44,
                                                    borderRadius: "50%",
                                                }}
                                                alt=""
                                            />
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <div style={{ fontSize: 14, fontWeight: 600 }}>
                                                realmadrid
                                            </div>
                                            <div
                                                style={{
                                                    color: "rgb(115, 115, 115)",
                                                    fontSize: 12,
                                                    fontWeight: 400,
                                                }}
                                            >
                                                Instagram tavsiye ediyor
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            color: "rgb(0, 149, 246)",
                                            fontSize: 12,
                                            fontWeight: 600,
                                        }}
                                    >
                                        Takip Et
                                    </div>
                                </li>

                                <li
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <div style={{ display: "flex" }}>
                                        <div style={{ marginRight: 10 }}>
                                            <img
                                                src="https://picsum.photos/200/300"
                                                style={{
                                                    height: 44,
                                                    width: 44,
                                                    borderRadius: "50%",
                                                }}
                                                alt=""
                                            />
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <div style={{ fontSize: 14, fontWeight: 600 }}>
                                                realmadrid
                                            </div>
                                            <div
                                                style={{
                                                    color: "rgb(115, 115, 115)",
                                                    fontSize: 12,
                                                    fontWeight: 400,
                                                }}
                                            >
                                                Instagram tavsiye ediyor
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            color: "rgb(0, 149, 246)",
                                            fontSize: 12,
                                            fontWeight: 600,
                                        }}
                                    >
                                        Takip Et
                                    </div>
                                </li>

                                <li
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <div style={{ display: "flex" }}>
                                        <div style={{ marginRight: 10 }}>
                                            <img
                                                src="https://picsum.photos/200/300"
                                                style={{
                                                    height: 44,
                                                    width: 44,
                                                    borderRadius: "50%",
                                                }}
                                                alt=""
                                            />
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <div style={{ fontSize: 14, fontWeight: 600 }}>
                                                realmadrid
                                            </div>
                                            <div
                                                style={{
                                                    color: "rgb(115, 115, 115)",
                                                    fontSize: 12,
                                                    fontWeight: 400,
                                                }}
                                            >
                                                Instagram tavsiye ediyor
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            color: "rgb(0, 149, 246)",
                                            fontSize: 12,
                                            fontWeight: 600,
                                        }}
                                    >
                                        Takip Et
                                    </div>
                                </li>

                                <li
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <div style={{ display: "flex" }}>
                                        <div style={{ marginRight: 10 }}>
                                            <img
                                                src="https://picsum.photos/200/300"
                                                style={{
                                                    height: 44,
                                                    width: 44,
                                                    borderRadius: "50%",
                                                }}
                                                alt=""
                                            />
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <div style={{ fontSize: 14, fontWeight: 600 }}>
                                                realmadrid
                                            </div>
                                            <div
                                                style={{
                                                    color: "rgb(115, 115, 115)",
                                                    fontSize: 12,
                                                    fontWeight: 400,
                                                }}
                                            >
                                                Instagram tavsiye ediyor
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            color: "rgb(0, 149, 246)",
                                            fontSize: 12,
                                            fontWeight: 600,
                                        }}
                                    >
                                        Takip Et
                                    </div>
                                </li>

                                <li
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <div style={{ display: "flex" }}>
                                        <div style={{ marginRight: 10 }}>
                                            <img
                                                src="https://picsum.photos/200/300"
                                                style={{
                                                    height: 44,
                                                    width: 44,
                                                    borderRadius: "50%",
                                                }}
                                                alt=""
                                            />
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <div style={{ fontSize: 14, fontWeight: 600 }}>
                                                realmadrid
                                            </div>
                                            <div
                                                style={{
                                                    color: "rgb(115, 115, 115)",
                                                    fontSize: 12,
                                                    fontWeight: 400,
                                                }}
                                            >
                                                Instagram tavsiye ediyor
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            color: "rgb(0, 149, 246)",
                                            fontSize: 12,
                                            fontWeight: 600,
                                        }}
                                    >
                                        Takip Et
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Box>

            {open && post.postType === "img" ? <PostForImg open={open} setOpen={setOpen} post={post} /> : <PostForVideo open={open} setOpen={setOpen} post={post} />}
        </>
    );
}

export default Home;