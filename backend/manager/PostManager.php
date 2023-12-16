<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
$_POST = json_decode(file_get_contents("php://input"),true);

require_once "../crud/PostCRUD.php";
$actionType = $_POST["actionType"];

switch($actionType) {
    case "AddPost":
        $result = PostCRUD::AddPost($_POST["post"]);
        print_r($result);
        break;

    case "GetPost":
        $result = PostCRUD::GetPost($_POST["post_id"]);
        print_r($result);
        break;

    case "GetUserPosts":
        $result = PostCRUD::GetUserPosts($_POST["uid"]);
        print_r($result);
        break;

    case "UpdatePost":
        $result = PostCRUD::UpdatePost($_POST["post"]);
        print_r($result);
        break;

    case "RemovePost":
        $result = PostCRUD::RemovePost($_POST["post_id"]);
        print_r($result);
        break;

    case "AddPostComment":
        $result = PostCRUD::AddPostComment($_POST["data"]);
        print_r($result);
        break;

    case "GetPostComment":
        $result = PostCRUD::GetPostComment($_POST["comment_id"]);
        print_r($result);
        break;

    case "GetPostComments":
        $result = PostCRUD::GetPostComments($_POST["post_id"]);
        print_r($result);
        break;

    case "UpdatePostComment":
        $result = PostCRUD::UpdatePostComment($_POST["data"]);
        print_r($result);
        break;

    case "RemovePostComment":
        $result = PostCRUD::RemovePostComment($_POST["comment_id"]);
        print_r($result);
        break;
}
?>