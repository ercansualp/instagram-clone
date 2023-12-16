import DefaultUserProfilePicture from "../../assets/img/default_profile_picture.jpg";

export default function ProfilePicture(props) {
    const {width, height, src, isActive} = props;

    return (
        <img
            src={src || DefaultUserProfilePicture}
            alt="Profil Resmi"
            style={{
                objectFit: "cover",
                borderRadius: "50%",
                width: width,
                height: height,
                border: isActive && "2px solid black"
            }}
        />
    )
}