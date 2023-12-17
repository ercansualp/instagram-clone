import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
`

export const Sidebar = styled.div`
  min-width: 398px;
  width: 398px;
  height: 100%;
  border-right: 1px solid rgb(219, 219, 219);
  display: flex;
  flex-direction: column;

  > #new-message {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    align-items: center;

    > h1 {
      font-size: 16px;
      font-weight: 700;
    }
  }
`

export const Contacts = styled.div`
  overflow-y: auto;

  > div {
    padding: 8px 24px;
    height: 72px;
    cursor: pointer;
    display: flex;
    width: 100%;

    &:hover {
      background-color: rgb(250, 250, 250);
    }

    > img {
      margin-right: 12px;
      width: 56px;
      height: 56px;
    }

    > div.contact-info {
      font-weight: 400;
      display: flex;
      flex-direction: column;
      justify-content: center;

      > span {
        font-size: 14px;
      }

      > p {
        max-width: 275px;
        font-size: 12px;
        color: rgb(115, 115, 115);
        word-break: keep-all;
        word-wrap: break-word;
        max-height: 35px;
      }
    }
  }
`

export const MessageContainer = styled.div`
  flex-grow: 1;
`

export const NoSelectedContact = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  > div#container {
    display: flex;
    flex-direction: column;
    align-items: center;

    > span {
      font-size: 20px;
      font-weight: 400;
      margin-top: 10px;
    }

    > div {
      color: rgb(115, 115, 115);
      font-size: 14px;
      font-weight: 400;
      margin: 10px 0;
    }

    > button {
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      padding: 0 16px;
      background-color: rgb(0, 149, 246);
      color: white;
      height: 32px;

      &:hover {
        background-color: rgb(24, 119, 242);
      }
    }
  }
`

export const SelectedContact = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  > div#selected-contact-info {
    display: flex;
    justify-content: start;
    padding: 9.5px 16px;
    border-bottom: 1px solid rgb(219, 219, 219);
    align-items: center;
    height: 75px;

    > a {
      display: flex;
      align-items: center;

      > img {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        margin-right: 12px;
      }

      > span {
        font-weight: 600;
        font-size: 16px;
        margin-right: 8px;
      }
    }
  }
`

export const ContactMessageContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  > div#header {
    min-height: 284px;
    height: 284px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    > img {
      width: 96px;
      height: 128px;
      object-fit: cover;
      padding: 16px 0;
    }

    > div {
      display: flex;
      align-items: center;
      font-size: 20px;
      font-weight: 600;

      > span {
        margin-right: 8px;
      }
    }

    > span {
      color: rgb(115, 115, 115);
      font-size: 14px;
      font-weight: 400;
      margin-bottom: 10px;
    }

    > a {
      border-radius: 8px;
      height: 32px;
      padding: 0 16px;
      background-color: rgb(239, 239, 239);
      font-size: 14px;
      font-weight: 600;
      display: flex;
      align-items: center;

      &:hover {
        background-color: rgb(219, 219, 219);
      }
    }
  }

  > div#content {
    flex-grow: 1;
    padding: 0 16px;
    display: flex;
    flex-direction: column;

    @keyframes typing {
      0.0000%, 25% { content: ""; }
      25%, 50% { content: "•"; }
      50%, 75% { content: "••"; }
      75%, 100% { content: "•••"; }
    }
    
    > #typing-container {
      > span {
        height: 34px;
      }
      
      > span::before {
        content: "";
        animation: typing 5s infinite;
      }
    }

    > div {
      font-size: 15px;
      font-weight: 400;
      line-height: 20px;
      margin: 1px 0;
    }

    > div.message-from-me {
      background-color: rgb(55, 151, 240);
      color: white;
      margin-left: auto;
      max-width: 500px;
      padding: 7px 12px;
      border-radius: 18px;
    }

    > div.message-from-you {
      margin-right: auto;
      display: flex;

      > a {
        margin-top: auto;
        margin-right: 8px;

        > img {
          width: 28px;
          height: 28px;
          object-fit: cover;
        }
      }

      > span {
        background-color: rgb(239, 239, 239);
        color: black;
        max-width: 500px;
        padding: 7px 12px;
        border-radius: 18px;
      }
    }
  }
`

export const SendMessageContainer = styled.div`
  min-height: 78px;
  height: 78px;
  padding: 16px;
  
  > div {
    height: 100%;
    position: relative;
    
    > input {
      border: 1px solid rgb(219, 219, 219);
      border-radius: 22px;
      padding: 16px 80px 16px 16px;
      height: 100%;
      width: 100%;
    }
    
    > button {
      color: rgb(0, 149, 246);
      font-size: 14px;
      font-weight: 600;
      position: absolute;
      height: auto;
      right: 16px;
      line-height: 46px;
    }
  }
`