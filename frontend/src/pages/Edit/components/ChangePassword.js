import styled2 from "styled-components";
import {useContext, useState, useRef} from "react";
import {Context} from "../../../contexts/AuthContext";
import axios from "axios";
import {authApi} from "../../../url";
import {UpdatePassword} from "../../../firebase";

const Content = styled2.div`
  display: flex;
  flex-direction: column;
  margin: 32px 0 30px 45px;

  > .edit-profile-text {
    font-size: 24px;
    font-weight: 400;
    margin-bottom: 24px;
  }

  > .edit-profile-photo {
    display: flex;
    align-items: center;

    > button {
      > img {
        margin-right: 32px;
        border-radius: 50%;
        width: 38px;
        height: 38px;
        object-fit: contain;
      }
    }

    > div {
      display: flex;
      flex-direction: column;

      > .username {
        font-size: 16px;
        font-weight: 400;
      }

      > button {
        font-size: 14px;
        font-weight: 600;
        color: rgb(0, 149, 246);

        &:hover {
          color: rgb(0, 55, 107);
        }
      }
    }
  }
`

const EditUserInfos = styled2.div`
  display: flex;
  flex-direction: column;
  width: 610px;
  gap: 16px;
`

const EditPassword = styled2.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  > span {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 16px;
  }

  > div {
    position: relative;

    > input {
      padding: 10px 80px 10px 16px;
      height: 60px;
      border-radius: 12px;
      font-size: 16px;
      font-weight: 400;
      border: 1px solid rgb(219, 223, 228);
      width: 100%;
    }
  }
`

const Post = styled2.div`
  display: flex;
  align-items: center;
  justify-content: end;
  font-size: 14px;
  font-weight: 600;
  margin-top: 50px;

  > button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 253px;
    color: white;
    height: 44px;
    border-radius: 8px;
    background-color: rgb(0, 149, 246);

    &:disabled {
      background-color: #B2DFFC;
    }
  }
`

export default function ChangePassword() {
    const {currentUser, setCurrentUser} = useContext(Context);
    const [data, setData] = useState({...currentUser});
    const [oldPass, setOldPass] = useState("");
    const [newPassAgain, setNewPassAgain] = useState("");
    const newPassRef = useRef("");

    const UpdatePass = async () => {
        const response = await UpdatePassword(data.password);
        if(response) {
            const response2 = await axios.post(authApi, {
                actionType: "UpdatePassword",
                data: data
            });
            if (response2.data) {
                const result = await axios.post(authApi, {
                    actionType: "GetUser",
                    uid: currentUser.uid
                });
                setCurrentUser({...currentUser, ...result.data});
                setData(result.data);
                setOldPass("");
                setNewPassAgain("");
                newPassRef.current.value = "";
            }
        }
    }

    return (
        <>
            <Content>
                <EditUserInfos>
                    <EditPassword>
                        <span>Şifreyı Değiştir</span>
                        <div>
                            <input
                                type="password" placeholder="Eski Şifre" value={oldPass}
                                onChange={e => setOldPass(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="password" placeholder="Yeni Şifre (En az 6 karakter)" ref={newPassRef}
                                onChange={e => setData({...data, password: e.target.value})}
                                style={{margin: "10px 0"}}
                            />
                        </div>
                        <div>
                            <input
                                type="password" placeholder="Yeni Şifre Tekrar" value={newPassAgain}
                                onChange={e => setNewPassAgain(e.target.value)}
                            />
                        </div>
                    </EditPassword>
                </EditUserInfos>
                <Post>
                    <button
                        disabled={
                            oldPass !== currentUser.password ||
                            newPassAgain !== data.password ||
                            data.password === currentUser.password ||
                            data.password.length < 6
                        }
                        onClick={UpdatePass}
                    >
                        Gönder
                    </button>
                </Post>
            </Content>
        </>
    )
}