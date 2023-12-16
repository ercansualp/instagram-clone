import styled from "styled-components";
import {
    AddIcon, DirectMessageIcon,
    HomeIcon,
    InstagramLogo,
    MoreIcon
} from "../../assets/img/svg";
import {NavLink} from "react-router-dom";
import {useContext, useState} from "react";
import {Context} from '../../contexts/AuthContext';
import Options from './Options';
import SharePostDialog from "../../pages/Profile/components/SharePostDialog";
import {ProfilePicture} from "../Common";
import SideBarItem from "./components/SideBarItem";

const Container = styled.div`
  width: 336px;
  position: fixed;
  height: 100%;
  border-right: 1px solid rgb(219, 219, 219);
  display: flex;
  padding: 8px 12px 20px 12px;
  flex-direction: column;
`

const LogoContainer = styled.div`
  width: 311px;
  height: 92px;
  display: flex;
  align-items: center;
  padding-bottom: 19px;
  justify-content: center;
`

const Logo = styled(InstagramLogo)`
  margin-top: 7px;
  width: 103px;
  height: 29px;
`

const SideBarContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const Footer = styled.div`
  margin-top: auto;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`

const MoreOptions = styled.button`
  height: 56px;
  display: flex;
  align-items: center;
  padding: 16px 12px 12px;;
  font-size: 16px;
  border-radius: 10px;
  width: 100%;

  > svg, img {
    transition: transform 0.5s;
    margin-right: 16px;
  }

  &:hover {
    > svg, img {
      transform: scale(1.1);
    }

    background-color: rgba(0, 0, 0, 0.05);
  }
`

const SharePost = styled.button`
  height: 56px;
  display: flex;
  align-items: center;
  font-size: 16px;
  border-radius: 10px;
  width: 100%;

  > svg, img {
    transition: transform 0.5s;
    margin-right: 16px;
  }

  &:hover {
    > svg, img {
      transform: scale(1.1);
    }

    background-color: rgba(0, 0, 0, 0.05);
  }
`

export default function SideBar() {
    const {currentUser} = useContext(Context);
    const [showSharePostDialog, setShowSharePostDialog] = useState(false);

    const closeSharePostDialog = () => {
        setShowSharePostDialog(false);
    }

    return (
        <>
            <Container>
                <LogoContainer>
                    <NavLink to="/"><Logo/></NavLink>
                </LogoContainer>
                <SideBarContent>
                    <div>
                        <NavLink to="/" style={({isActive}) => {
                            return {
                                fontWeight: isActive ? 700 : 400
                            };
                        }}>
                            {({ isActive}) => (
                                <SideBarItem text="Ana Sayfa" icon={<HomeIcon isActive={isActive}/>}/>
                            )}
                        </NavLink>
                        <NavLink to="/direct/inbox" style={({isActive}) => {
                            return {
                                fontWeight: isActive ? 700 : 400
                            };
                        }}>
                            {({ isActive}) => (
                                <SideBarItem text="Mesajlar" icon={<DirectMessageIcon isActive={isActive} />}/>
                            )}
                        </NavLink>
                        <SharePost onClick={() => setShowSharePostDialog(true)}>
                            <SideBarItem text="Oluştur" icon={<AddIcon />}/>
                        </SharePost>
                        <NavLink to={`/${currentUser.username}`} style={({isActive}) => {
                            return {
                                fontWeight: isActive ? 700 : 400
                            };
                        }}>
                            {({ isActive}) => (
                                <SideBarItem text="Profil"
                                             icon={<ProfilePicture width={isActive ? 28 : 24} height={isActive ? 28 : 24} src={currentUser.picture} isActive={isActive}/>}/>
                            )}
                        </NavLink>
                    </div>
                    <Footer>
                        <MoreOptions>
                            {<MoreIcon/>}
                            <Options/>
                        </MoreOptions>
                    </Footer>
                </SideBarContent>
            </Container>

            {showSharePostDialog && <SharePostDialog open={showSharePostDialog} handleClose={closeSharePostDialog}/>}
        </>
    )
}