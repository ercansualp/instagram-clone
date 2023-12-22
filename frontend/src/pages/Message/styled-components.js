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

  > a {
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
  overflow-y: hidden;
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
  position: relative;

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

  > #emoji-picker {
    z-index: 999;
    > aside {
      position: absolute !important;
      bottom: 62px;
      left: 16px;
    }
  }

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
      0.0000%, 25% {
        content: "";
      }
      25%, 50% {
        content: "•";
      }
      50%, 75% {
        content: "••";
      }
      75%, 100% {
        content: "•••";
      }
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

export const VideoMessageFromMe = styled.div`
  margin-left: auto !important;
  max-height: 340px;
  max-width: 236px;
  position: relative;
  cursor: pointer;
  
  > video {
    display: block;
    max-height: 340px;
    max-width: 200px;
    width: 100%;
    height: 100%;
    border-radius: 22px 4px 4px 22px;
  }
  
  > span {
    position: absolute;
    right: 0;
    top: 0;
    > img {
      width: 45px;
      height: 45px;
      color: black;
    }
  }
`

export const PhotoMessageFromYou = styled.div`
  display: flex;
  max-height: 340px;
  max-width: 236px;
  cursor: pointer;

  > a {
    margin-top: auto;
    margin-right: 8px;
    > img {
      width: 28px;
      height: 28px;
      object-fit: cover;
    }
  }
  
  > .message-img {
    display: block;
    max-height: 340px;
    max-width: 200px;
    width: 100%;
    height: 100%;
    border-radius: 4px 22px 22px 4px;
  }
`

export const VideoMessageFromYou = styled.div`
  display: flex;
  max-height: 340px;
  max-width: 236px;
  position: relative;
  cursor: pointer;

  > a {
    margin-top: auto;
    margin-right: 8px;
    > img {
      width: 28px;
      height: 28px;
      object-fit: cover;
    }
  }

  > video {
    display: block;
    max-height: 340px;
    max-width: 200px;
    width: 100%;
    height: 100%;
    border-radius: 4px 22px 22px 4px;
  }

  > span {
    position: absolute;
    right: 45px;
    top: 0;
    > img {
      width: 45px;
      height: 45px;
      color: black;
    }
  }
`

export const PhotoMessageFromMe = styled.div`  
  margin-left: auto !important;
  max-height: 340px;
  max-width: 236px;
  cursor: pointer;
  
  > img {
    display: block;
    max-height: 340px;
    max-width: 200px;
    width: 100%;
    height: 100%;
    border-radius: 22px 4px 4px 22px;
  }
`

export const ImagesWrapper = styled.span`
  height: 80px;
  border-color: #ddd;
  border-width: 1px 1px 0;
  border-style: solid;
  width: 100%;
  border-radius: 22px 22px 0 0;
  display: block;
  max-width: 1154px;
  overflow-x: auto;
  overflow-y: hidden;

  > div {
    display: flex;
    width: 100%;
    padding: 12px;
    gap: 12px;
    
    > div {
      min-width: 48px;
      min-height: 48px;
      width: 48px;
      height: 48px;
    }
  }

  > div {
    > #add-more-image {
      padding: 8px;
      background-color: rgba(134, 142, 153, 0.25);
      border-radius: 10px;

      > label {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;

        > input {
          display: none;
        }
      }
    }
  }

  > div {
    > div.image-wrapper {
      margin: 2px 0 6px 0;
      position: relative;

      > #play-video-img {
        width: 100%;
        height: 100%;
        display: block;
        position: absolute;
        top: 0;
        > img {
          width: 24px;
          height: 24px;
          position: absolute;
          top: 12.5px;
          left: 12.5px;
        }
      }

      > img, video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
      }

      > div {
        width: 34px;
        height: 34px;
        padding: 8px;
        position: absolute;
        top: -16px;
        right: -16px;
      }
    }
  }
`

export const SendMessageContainer = styled.div`
  padding: 16px;
  position: relative;
  
  > div {
    height: 100%;
    position: relative;
    
    > button {
      line-height: 46px;
      position: absolute;
    }
    
    > #add-image {
      font-size: 14px;
      right: 56px;
      bottom: 16px;
      position: absolute;
      cursor: pointer;
    }
    
    > #send-heart {
      font-size: 14px;
      right: 16px;
      bottom: 16px
    }
    
    > input {
      border: 1px solid rgb(219, 219, 219);
      padding: 16px 80px 16px 45px;
      width: 100%;
    }
    
    > #select-emoji-btn {
      position: absolute;
      left: 16px;
      bottom: 16px;
    }
    
    > #send-message {
      color: rgb(0, 149, 246);
      font-size: 14px;
      font-weight: 600;
      right: 16px;
      line-height: 58px;
    }
  }
`

export const HeartMessageFromMe = styled.div`
  display: flex;
  justify-content: end;
  > div {
    width: 68.66px;
    height: 62px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 50px !important;
  }
`

export const HeartMessageFromYou = styled.div`
  display: flex;
  justify-content: start;

  > a {
    margin-top: auto;
    margin-right: 8px;

    > img {
      width: 28px;
      height: 28px;
      object-fit: cover;
    }
  }
  
  > div {
    width: 68.66px;
    height: 62px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 50px !important;
    margin-left: 37px;
  }
  
  > span {
    width: 68.66px;
    height: 62px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 50px !important;
  }
`