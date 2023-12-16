import LoadingIcon from "../assets/img/favicon.png";

export default function Loading() {
    return (
        <div style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff"
        }}>
            <img src={LoadingIcon} alt="" style={{width: 80, height: 80}}/>
        </div>
    )
}