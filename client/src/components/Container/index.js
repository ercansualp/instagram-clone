import styled from "styled-components";
import SideBar from "../SideBar";
import Main from "../Main";
import Content from "../Content";
import {useContext} from "react";
import {Context} from "../../contexts/AuthContext";
import NavBar from "../NavBar";
import Footer from "../Footer";
import {Helmet} from "react-helmet";
import Favicon from '../../assets/img/Instagram_logo_svg.svg';

const ContainerMain = styled.div`
  display: flex;
  height: 100vh;
`

export default function Container({children, width}) {
    const {user, currentUser} = useContext(Context);

    return (
        <>
            <Helmet>
                <link data-default-icon={Favicon} rel="icon" sizes="192x192" href={Favicon} type="image/png"/>
                <title>Instagram</title>
            </Helmet>
            <ContainerMain style={{flexDirection: user && currentUser ? "row" : "column"}}>
                {user && currentUser ? <SideBar/> : <NavBar/>}
                <Main>
                    {width ? children : <Content>{children}</Content>}
                    {!user && !currentUser && <Footer/>}
                </Main>
            </ContainerMain>
        </>
    )
}