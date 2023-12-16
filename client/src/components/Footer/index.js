import {useState} from "react";
import styled from "styled-components";
import IgIcon from '../../assets/img/icons.png';
import {Link} from 'react-router-dom';
import CancelIcon from '../../assets/img/icons.png';

const Container = styled.div`
  padding: 20px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  height: 114px;
  position: absolute;
  bottom: 0;
  width: 100%;
`

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 903px;
`

const LoginToInstagram = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const InstagramIcon = styled.span`
  background-image: url(${IgIcon});
  background-repeat: no-repeat;
  background-position: -440px -288px;
  height: 56px;
  width: 56px;
  display: block;
  margin-right: 12px;
`

const LoginToInstagramTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  font-weight: 600;
  color: white;
`

const AuthButtons = styled.div`
  gap: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const LoginButton = styled(Link)`
  font-size: 14px;
  font-weight: 600;
  background-color: rgb(0, 149, 246);
  height: 32px;
  padding: 7px 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  color: white;
  width: 112px;
  justify-content: center;

  &:hover {
    background-color: rgb(24, 119, 242);
  }
`

const RegisterButton = styled(Link)`
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  color: rgb(0, 149, 246);
`

const CloseFooterButton = styled.button`
  position: absolute;
  right: 20px;
  top: 20px;
`

const CloseFooterIcon = styled.span`
  background-repeat: no-repeat;
  background-position: -283px -370px;
  height: 9px;
  width: 9px;
  display: block;
  background-image: url(${CancelIcon});
`

export default function Footer() {
    const [showFooter, setShowFooter] = useState(true);
    return <>
        {
            showFooter && (
                <Container>
                    <Content>
                        <LoginToInstagram>
                            <InstagramIcon/>
                            <LoginToInstagramTextContainer>
                                <span>Instagram'a giriş yap</span>
                                <span>Arkadaşlarından fotoğraflar ve videolar görmek ve hoşuna gidecek diğer hesapları keşfetmek için kaydol.</span>
                            </LoginToInstagramTextContainer>
                        </LoginToInstagram>
                        <AuthButtons>
                            <LoginButton to="/login">Giriş Yap</LoginButton>
                            <RegisterButton to="/register">Kaydol</RegisterButton>
                        </AuthButtons>
                    </Content>
                    <CloseFooterButton onClick={() => setShowFooter(false)}>
                        <CloseFooterIcon/>
                    </CloseFooterButton>
                </Container>
            )
        }
    </>
}