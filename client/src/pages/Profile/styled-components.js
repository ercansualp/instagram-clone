import styled from 'styled-components';
import {NavLink} from 'react-router-dom';
import SharePostSvg from '../../assets/img/icons2.png';
import NoPostIcon from "../../assets/img/icons.png";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const User = styled.div`
  display: flex;
  height: 194px;
`

export const UserImageContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const UserInfosContainer = styled.div`
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  max-width: 613px;
  justify-content: space-between;
`

export const UsernameContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`

export const UsernameText = styled.span`
  margin-right: 20px;
  font-size: 20px;
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 8px;
`

export const UserActionButtons = styled.div`
  display: flex;
  margin-right: 5px;
  align-items: center;
  gap: 8px;
`

export const UserActionButton = styled(NavLink)`
  background-color: rgb(239, 239, 239);
  font-size: 14px;
  border-radius: 8px;
  padding: 0 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  height: 32px;

  &:hover {
    background-color: rgb(219, 219, 219);
  }
`

export const FollowUserButton = styled.button`
  background-color: rgb(239, 239, 239);
  font-size: 14px;
  border-radius: 8px;
  padding: 0 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  height: 32px;
`

export const SendMessage = styled(NavLink)`
  background-color: rgb(239, 239, 239);
  font-size: 14px;
  border-radius: 8px;
  padding: 0 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  height: 32px;

  &:hover {
    background-color: rgb(219, 219, 219) !important;
  }
`

export const SettingsButton = styled.button`
  width: 40px;
  height: 40px;
  padding: 8px;

  > svg {
    width: 24px;
    height: 24px;
  }
`

export const UserDataCounts = styled.ul`
  display: flex;
  gap: 40px;
  align-items: center;
`

export const UserDataCount = styled.li`
  font-size: 16px;
  font-weight: 600;

  > button {
    > span {
      font-weight: 400;
    }
  }

  > span {
    font-weight: 400;
  }
`

export const Biography = styled.div`
  font-size: 14px;
  font-weight: 400;
  overflow-wrap: break-word;
  word-break: break-all;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid rgb(219, 219, 219);
  margin-top: 15px;
`

export const MenuItems = styled.div`
  width: 935px;
  display: flex;
  justify-content: center;
  gap: 60px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 10px;
`

export const MenuItem = styled(NavLink)`
  height: 52px;
  display: flex;
  gap: 6px;
  align-items: center;
  letter-spacing: 1px;
`

export const PostsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const SharePost = styled.label`
  > input {
    display: none;
  }

  > div {
    width: 62px;
    height: 62px;
    background-position: -128px -269px;
    background-repeat: no-repeat;
    background-image: url(${SharePostSvg});
    cursor: pointer;
  }
`

export const SharePostContainer = styled.div`
  margin: 60px 44px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;

  > span {
    font-size: 30px;
    font-weight: 800;
  }

  > div {
    font-size: 14px;
    font-weight: 400;
  }

  > button {
    color: rgb(0, 149, 246);
    font-size: 14px;
    font-weight: 600;

    &:hover {
      color: rgb(0, 55, 107);
    }
  }
`

export const PrivateAccountContainer = styled.div`
  padding: 40px;
  font-size: 14px;
  font-weight: 400;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-color: rgb(239, 239, 239);
  border-width: 0 1px 1px;
  border-style: solid;
  width: 100%;

  > span {
    margin-bottom: 13px;
  }

  > div {
    max-width: 230px;
    text-align: center;

    > a {
      color: rgb(0, 149, 246);
    }
  }
`

export const Name = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin: 15px 0;
`

export const NoPostContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 60px;
  align-items: center;
  
  > div {
    width: 62px;
    height: 62px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 3px solid rgb(38, 38, 38);
    border-radius: 50%;
    
    > span {
      background-image: url(${NoPostIcon});
      background-repeat: no-repeat;
      background-position: -384px -396px;
      height: 24px;
      width: 24px;
      display: block;
    }
  }
  
  > h1 {
    font-size: 30px;
    font-weight: 800;
    margin-top: 30px;
  }
`