import {Grid} from "@mui/material";
import styled from 'styled-components';
import {AiFillHeart} from 'react-icons/ai';
import {FaComment} from 'react-icons/fa';
import {useEffect, useState} from "react";
import Post from '../../../components/Post';

const Container = styled.div`
  width: 100%;
  height: 300px;
`

const UserPost = styled.button`
  position: relative;
  color: white;
  width: 100%;
  height: 100%;
  &:hover {
    > img {
      -webkit-filter: brightness(70%);
    }
    > div {
      display: flex;
    }
    
    > video {
      -webkit-filter: brightness(70%);
    }
  }
  
  > div {
    position: absolute;
    top: 2%;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    display: none;
    
    > svg {
      color: white;
      width: 19px;
      height: 19px;
    }
  }
`

export default function UserPosts({postPreviews, GetUserPostsPreview}) {
    const [showPost, setShowPost] = useState(false);
    const [post, setPost] = useState(null);

    const openPost = post => {
        setPost(post);
        setShowPost(true);
    }

    const getPost = url => {
        let extension = url.split(".");
        extension = extension[extension.length - 1];
        if(extension === "mp4") {
            return (
                <video preload="metadata" autoPlay={false} style={{width: "100%", height: "100%", objectFit: "cover"}}>
                    <source src={url} type="video/mp4" />
                </video>
            )
        } else {
            return (
                <img src={url} style={{width: "100%", height: "100%", objectFit: "cover"}} alt="" />
            )
        }
    }

    return (
        <>
            <Container>
                <Grid
                    container
                    spacing={1}
                >
                    {
                        postPreviews && postPreviews.length !== 0 && postPreviews.map((post, index) => (
                            <Grid item style={{width: 309, height: 309}} key={index}>
                                <UserPost onClick={() => openPost(post)}>
                                    { getPost(post.url) }
                                    <div>
                                        <AiFillHeart />
                                        <span style={{marginLeft: 5, marginRight: 15}}>{post.postLikes.length}</span>
                                        <FaComment style={{transform: "rotate(270deg)"}} />
                                        <span style={{marginLeft: 5}}>{post.post_comment_count}</span>
                                    </div>
                                </UserPost>
                            </Grid>
                        ))
                    }
                </Grid>
            </Container>

            {showPost && <Post open={showPost} setOpen={setShowPost} post={post} GetUserPostsPreview={GetUserPostsPreview} setPost={setPost} />}
        </>
    )
}