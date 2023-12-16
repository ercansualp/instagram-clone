import {Menu, MenuItem, MenuButton, MenuDivider} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import './Options.css';
import {
    SettingsIcon,
    MovementsIcon,
    SavedPostsIcon,
    ChangeViewIcon,
    ReportProblemIcon
} from "../../assets/img/svg";
import {Logout} from "../../firebase";

export default function Options() {
    const handleLogout = async () => {
        await Logout();
    }

    return (
        <Menu menuStyle={{top: 0, left: 0, position: "relative"}}
              menuButton={<MenuButton style={{color: "black", fontSize: 16, fontWeight: 400}}>Daha fazla</MenuButton>}>
            <MenuItem>
                <SettingsIcon/>
                <span style={{marginLeft: 12}}>Ayarlar</span>
            </MenuItem>

            <MenuItem>
                <MovementsIcon/>
                <span style={{marginLeft: 12}}>Hareketlerin</span>
            </MenuItem>

            <MenuItem>
                <SavedPostsIcon/>
                <span style={{marginLeft: 12}}>Kaydedilenler</span>
            </MenuItem>

            <MenuItem>
                <ChangeViewIcon/>
                <span style={{marginLeft: 12}}>Görünümü değiştir</span>
            </MenuItem>

            <MenuItem>
                <ReportProblemIcon/>
                <span style={{marginLeft: 12}}>Bir sorun bildir</span>
            </MenuItem>

            <MenuDivider style={{
                backgroundColor: "rgba(219, 219, 219, 0.3)",
                height: 6,
                width: 266,
                position: "relative",
                left: "-8px"
            }}/>

            <MenuItem>
                Hesap Değiştir
            </MenuItem>

            <MenuDivider style={{
                backgroundColor: "rgba(219, 219, 219, 0.5)",
                height: 0.500,
                width: 266,
                position: "relative",
                left: "-8px"
            }}/>

            <MenuItem onClick={handleLogout}>
                Çıkış yap
            </MenuItem>
        </Menu>
    );
}