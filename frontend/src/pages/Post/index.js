import {useParams} from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const PostContainer = styled.div`
  height: 599px;
  width: 815px;
  background-color: red;
  display: flex;
`

const PostData = styled.div`
  height: 100%;
  background-color: yellow;
`

export default function Post() {
    const {post_key} = useParams();

    return (
        <Container>
            <PostContainer>
                <PostData>

                </PostData>
            </PostContainer>
        </Container>
    )
}