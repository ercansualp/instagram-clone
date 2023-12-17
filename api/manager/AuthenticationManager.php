<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    $_POST = json_decode(file_get_contents("php://input"),true);

    require_once "../crud/AuthenticationCRUD.php";
    $actionType = $_POST["actionType"];

    switch($actionType) {
        case "AddUser":
            $result = AuthenticationCRUD::AddUser($_POST["user"]);
            print_r($result);
            break;

        case "GetUser":
            $result = AuthenticationCRUD::GetUser($_POST["uid"]);
            print_r($result);
            break;

        case "UpdateUser":
            $result = AuthenticationCRUD::UpdateUser($_POST["user"]);
            print_r($result);
            break;

        case "DeleteUser":
            $result = AuthenticationCRUD::DeleteUser($_POST["data"]);
            print_r($result);
            break;

        case "GetMessages":
            $result = AuthenticationCRUD::GetMessages($_POST["data"]);
            print_r($result);
            break;

        case "FollowUser":
            $result = AuthenticationCRUD::FollowUser($_POST["data"]);
            print_r($result);
            break;

        case "GetUserMessages":
            $result = AuthenticationCRUD::GetUserMessages($_POST["username"]);
            print_r($result);
            break;

        case "UnfollowUser":
            $result = AuthenticationCRUD::UnfollowUser($_POST["data"]);
            print_r($result);
            break;

        case "CheckIsUserHave":
            $result = AuthenticationCRUD::CheckIsUserHave($_POST["username"]);
            print_r($result);
            break;

        // running good
        case "UpdateProfilePicture":
            $result = AuthenticationCRUD::UpdateProfilePicture($_POST["data"]);
            print_r($result);
            break;

        case "GetProfilePicture":
            $result = AuthenticationCRUD::GetProfilePicture($_POST["uid"]);
            print_r($result);
            break;

        case "CheckIsUser":
            $result = AuthenticationCRUD::CheckIsUser($_POST["username"]);
            print_r($result);
            break;

        case "GetUserWithUsername":
            $result = AuthenticationCRUD::GetUserWithUsername($_POST["username"]);
            print_r($result);
            break;

        case "UpdateProfile":
            $result = AuthenticationCRUD::UpdateProfile($_POST["data"]);
            print_r($result);
            break;

        case "UpdatePassword":
            $result = AuthenticationCRUD::UpdatePassword($_POST["data"]);
            print_r($result);
            break;

        case "GetAllUsers":
            $result = AuthenticationCRUD::GetAllUsers($_POST["uid"]);
            print_r($result);
            break;

        case "SendMessage":
            $result = AuthenticationCRUD::SendMessage($_POST["data"]);
            print_r($result);
            break;
    }

?>