import styled2 from 'styled-components';
import EditUser from "./components/EditUser";
import ChangePassword from "./components/ChangePassword";
import {useState} from "react";

const Container = styled2.div`
  display: flex;
`

const SettingsContainer = styled2.div`
  display: flex;
  flex-direction: column;
  width: 332px;
  border-right: 1px solid #ddd;

  > div {
    position: fixed;
      > span {
        font-size: 20px;
        font-weight: 700;
        margin-left: 16px;
        display: block;
        margin-bottom: 24px;
      }
  }
`

const SettingsItem = styled2.button`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  font-weight: 400;
  margin-right: 48px;
  padding: 16px;
  border-radius: 8px;
  height: 50px;
  width: 231px;
`

export default function Edit() {
    const [menu, setMenu] = useState(0);

    return (
        <Container>
            <SettingsContainer>
                <div>
                    <span>Ayarlar</span>
                    <SettingsItem
                        style={{
                            backgroundColor: menu === 0 && "#E3E3E3"
                        }}
                        onClick={() => setMenu(0)}
                    >
                        Profili düzenle
                    </SettingsItem>

                    <SettingsItem
                        style={{
                            backgroundColor: menu === 1 && "#E3E3E3"
                        }}
                        onClick={() => setMenu(1)}
                    >
                        Şifreyi Değiştir
                    </SettingsItem>
                </div>
            </SettingsContainer>

            {
                menu === 0 ? (
                    <EditUser />
                ) : (
                    <ChangePassword />
                )
            }
        </Container>
    )
}