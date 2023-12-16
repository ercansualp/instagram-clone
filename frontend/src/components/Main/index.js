import styled from "styled-components";
import {useContext} from "react";
import {Context} from "../../contexts/AuthContext";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-left: 363px;
`

export default function Main({children}) {
    const {user, currentUser} = useContext(Context);

    return (
        <Container style={{ marginLeft: user ? "336px" : 0 }}>
            {children}
        </Container>
    )
}