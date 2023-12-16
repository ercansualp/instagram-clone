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

        case "RemoveUser":
            $result = AuthenticationCRUD::RemoveUser($_POST["uid"]);
            print_r($result);
            break;
    }

?>