import styled from "styled-components";
import {InstagramIcon} from "../../assets/img/svg";
import {Link} from "react-router-dom";

const Container = styled.div`
  height: 60px;
  border-bottom: 1px solid rgb(219, 219, 219);
  display: flex;
  justify-content: center;
  align-items: center;
`

const Content = styled.div`
  width: 935px;
  padding: 0 20px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const AuthButtons = styled.div`
  gap: 16px;
  display: flex;
  align-items: center;
`

const LoginButton = styled(Link)`
  font-size: 14px;
  font-weight: 600;
  background-color: rgb(0, 149, 246);
  height: 32px;
  padding: 0 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  color: white;

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

  &:hover {
    color: rgb(0, 55, 107);
  }
`

export default function NavBar() {
    return (
        <>
            <Container>
                <Content>
                    <Link to="/">
                        <InstagramIcon/>
                    </Link>
                    <AuthButtons>
                        <LoginButton to="/login">Giriş Yap</LoginButton>
                        <RegisterButton to="/register">Kaydol</RegisterButton>
                    </AuthButtons>
                </Content>
            </Container>
        </>
    )
}