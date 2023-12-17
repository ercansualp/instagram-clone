import styled from "styled-components";
import SideBarItemLogo from "./SideBarItemLogo";

const SideBarItemComponent = styled.div`
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

export default function SideBarItem(props) {
    const {icon, text} = props;

    return (
        <SideBarItemComponent>
            <SideBarItemLogo>{icon}</SideBarItemLogo>
            <span>{text}</span>
        </SideBarItemComponent>
    )
}