import {Grid} from "@mui/material";
import styled from 'styled-components';
import {AiFillHeart} from 'react-icons/ai';
import {FaComment} from 'react-icons/fa';
import {useState} from "react";
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

export default function UserPhotos({posts, getUserPosts}) {
    const [showPost, setShowPost] = useState(false);
    const [post, setPost] = useState([]);

    const openPost = post => {
        setPost(post);
        setShowPost(true);
    }

    return (
        <>
            <Container>
                <Grid
                    container
                    spacing={1}
                >
                    {
                        posts.map(post => (
                            <Grid item style={{width: 309, height: 309}}>
                                <UserPost onClick={() => openPost(post)}>
                                    <img src={post.post_url} style={{width: "100%", height: "100%", objectFit: "cover"}} />
                                    <div>
                                        <AiFillHeart />
                                        <span style={{marginLeft: 5, marginRight: 15}}>339 B</span>
                                        <FaComment style={{transform: "rotate(270deg)"}} />
                                        <span style={{marginLeft: 5}}>1.135</span>
                                    </div>
                                </UserPost>
                            </Grid>
                        ))
                    }
                </Grid>
            </Container>

            {showPost && <Post open={showPost} setOpen={setShowPost} post={post} getUserPosts={getUserPosts} setPost={setPost} />}
        </>
    )
}