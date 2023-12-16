import styled from "styled-components";
import SideBar from "../SideBar";
import Main from "../Main";
import Content from "../Content";
import {useContext} from "react";
import {Context} from "../../contexts/AuthContext";
import NavBar from "../NavBar";
import Footer from "../Footer";

const ContainerMain = styled.div`
  display: flex;
  height: 100vh;
`

export default function Container({children}) {
    const {user, currentUser} = useContext(Context);

    return (
        <ContainerMain style={{flexDirection: user ? "row" : "column"}}>
            {user ? <SideBar /> : <NavBar />}
            <Main>
                <Content>{children}</Content>
                {!user && <Footer />}
            </Main>
        </ContainerMain>
    )
}