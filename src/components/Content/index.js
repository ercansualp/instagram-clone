import styled from "styled-components";

const Container = styled.div`
  width: 975px;
  padding: 30px 20px 0;
`

export default function Content({children}) {
    return (
        <Container>
            {children}
        </Container>
    )
}