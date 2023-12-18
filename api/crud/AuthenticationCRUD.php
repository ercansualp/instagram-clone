<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
require_once "../manager/DbManager.php";

class AuthenticationCRUD
{
    private static $conn; // Bu sınıfın içindeki tüm static fonksiyonlardan erişilebilecek bir özellik.

    // Bu fonksiyonu çağırdığınızda, DbManager nesnesini oluşturur ve $conn değişkenine atar.
    private static function initialize()
    {
        self::$conn = new DbManager();
    }

    static function AddUser($user)
    {
        self::initialize();

        $addUserQuery = "
                INSERT INTO Users (uid, email, username, password, name)
                VALUES (?, ?, ?, ?, ?)
            ";
        $addUserQueryParams = array(
            $user["uid"],
            $user["email"],
            $user["username"],
            $user["password"],
            $user["name"]
        );

        $result = self::$conn->Fetch($addUserQuery, $addUserQueryParams);

        return $result;
    }

    static function GetUser($uid)
    {
        self::initialize();

        $getUserQuery = "SELECT * FROM users WHERE uid = ? OR username = ?";
        $getUserQueryParams = array($uid, $uid);

        $result = self::$conn->SelectSingleRow($getUserQuery, $getUserQueryParams);

        return $result;
    }

    static function GetMessages($data) {
        self::initialize();

        $getUserQuery = "SELECT * FROM messages WHERE (message_sender = ? AND message_recipient = ?) OR (message_sender = ? AND message_recipient = ?)";
        $getUserQueryParams = array($data["uid"], $data["username"], $data["username"], $data["uid"]);

        $result = self::$conn->SelectMultipleRow($getUserQuery, $getUserQueryParams);

        return $result;
    }

    static function UpdateUser($user)
    {
        self::initialize();

        $updateUserQuery = "
                UPDATE Users SET email = ?, username = ?, password = ?, name = ?, biography = ?, gender = ?, birthdate = ?, picture = ? WHERE uid = ?
            ";
        $updateUserQueryParams = array(
            $user["email"],
            $user["username"],
            $user["password"],
            $user["name"],
            $user["biography"],
            $user["gender"],
            $user["birthdate"],
            $user["picture"],
            $user["uid"]
        );

        $result = self::$conn->Fetch($updateUserQuery, $updateUserQueryParams);

        return $result;
    }

    // running good
    static function UpdateProfilePicture($data)
    {
        self::initialize();

        if($data["oldProfilePicturePath"]) {
            $oldProfilePicture = explode("/", $data["oldProfilePicturePath"]);
            $oldProfilePicture = $oldProfilePicture[count($oldProfilePicture) - 1];

            try {
                unlink("../profile_pictures/" . $oldProfilePicture);
            } catch (Exception $e) {
                return false;
            }
        }

        $updateUserProfilePictureQuery = "UPDATE users SET picture = ? WHERE uid = ?";
        $updateUserProfilePictureQueryParams = array($data["newProfilePicturePath"], $data["uid"]);

        try {
            $result = self::$conn->Fetch($updateUserProfilePictureQuery, $updateUserProfilePictureQueryParams);

            if ($result) {
                return $data["newProfilePicturePath"];
            }
        } catch (Exception $e) {

        }

        return false;
    }

    static function GetProfilePicture($uid)
    {
        self::initialize();

        $getProfilePictureQuery = "SELECT picture FROM users WHERE uid = ?";
        $getProfilePictureQueryParams = array($uid);

        $result = self::$conn->SelectSingleRow($getProfilePictureQuery, $getProfilePictureQueryParams);

        return $result;
    }

    static function CheckIsUser($username)
    {
        self::initialize();

        $checkIsUserQuery = "SELECT id FROM users WHERE username = ?";
        $checkIsUserQueryParams = array($username);

        $result = self::$conn->SelectSingleRow($checkIsUserQuery, $checkIsUserQueryParams);

        return $result;
    }

    static function CheckIsUserHave($username)
    {
        self::initialize();

        $checkIsUserQuery = "SELECT uid FROM users WHERE username = ?";
        $checkIsUserQueryParams = array($username);

        $result = self::$conn->SelectSingleRow($checkIsUserQuery, $checkIsUserQueryParams);

        return $result;
    }

    static function GetUserWithUsername($username)
    {
        self::initialize();

        $getUserQuery = "SELECT * FROM users WHERE username = ?";
        $getUserQueryParams = array($username);

        $result = self::$conn->SelectSingleRow($getUserQuery, $getUserQueryParams);
        $result = json_decode($result);

        if($result) {
            $getUserFollowersQuery = "SELECT followers.*, users.* FROM followers LEFT JOIN users ON users.uid = followers.followed WHERE followers.followed = ?";
            $getUserFollowersQueryParams = [$result->uid];

            $followers = self::$conn->SelectMultipleRow($getUserFollowersQuery, $getUserFollowersQueryParams);
            $followers = json_decode($followers);

            $result->followers = $followers;
            $result = json_encode($result);

            return $result;
        } else {
            return json_encode($result);
        }
    }

    static function UpdateProfile($data)
    {
        self::initialize();

        $updateProfileQuery = "UPDATE users SET biography = ?, gender = ?, name = ?, username = ?, private = ? WHERE uid = ?";
        $updateProfileQueryParams = array($data["biography"], $data["gender"], $data["name"], $data["username"], $data["private"], $data["uid"]);

        $result = self::$conn->Fetch($updateProfileQuery, $updateProfileQueryParams);

        return $result;
    }

    static function UpdatePassword($data)
    {
        self::initialize();

        $updateUserPasswordQuery = "UPDATE users SET password = ? WHERE uid = ?";
        $updateUserPasswordQueryParams = array($data["password"], $data["uid"]);

        $result = self::$conn->Fetch($updateUserPasswordQuery, $updateUserPasswordQueryParams);

        return $result;
    }

    static function GetAllUsers($uid)
    {
        self::initialize();

        $getAllUsersQuery = "SELECT * FROM users WHERE uid != ?";
        $getAllUsersQueryParams = array($uid);

        $result = self::$conn->SelectMultipleRow($getAllUsersQuery, $getAllUsersQueryParams);

        return $result;
    }

    static function SendMessage($data)
    {
        self::initialize();

        $sendMessageQuery = "INSERT INTO messages (message_sender, message_recipient, message_content, message_type) VALUES (?, ?, ?, ?)";
        $sendMessageQueryParams = array($data["message_sender"], $data["message_recipient"], $data["message_content"], $data["message_type"]);

        $result = self::$conn->Fetch($sendMessageQuery, $sendMessageQueryParams);

        return $result;
    }

    static function DeleteUserCommentLikes($uid) {
        self::initialize();

        $deleteUserCommentLikesQuery = "DELETE FROM comment_likes WHERE like_author = ?";
        $deleteUserCommentLikesQueryArray = array($uid);

        $response = self::$conn->Fetch($deleteUserCommentLikesQuery, $deleteUserCommentLikesQueryArray);

        return $response;
    }

    static function DeleteUserComments($uid) {
        self::initialize();

        $deleteUserCommentsQuery = "DELETE FROM post_comments WHERE comment_author = ?";
        $deleteUserCommentsQueryArray = array($uid);

        $response = self::$conn->Fetch($deleteUserCommentsQuery, $deleteUserCommentsQueryArray);

        return $response;
    }

    static function DeleteUserPostLikes($uid) {
        self::initialize();

        $deleteUserPostLikesQuery = "DELETE FROM post_likes WHERE like_author = ?";
        $deleteUserPostLikesQueryArray = array($uid);

        $response = self::$conn->Fetch($deleteUserPostLikesQuery, $deleteUserPostLikesQueryArray);

        return $response;
    }

    static function DeleteUserPosts($uid) {
        self::initialize();

        $deleteUserPostsQuery = "DELETE FROM posts WHERE uid = ?";
        $deleteUserPostsQueryArray = array($uid);

        $response = self::$conn->Fetch($deleteUserPostsQuery, $deleteUserPostsQueryArray);

        return $response;
    }

    static function DeleteUserProfilePictureFile($userProfilePicturePath)
    {
        self::initialize();

        if($userProfilePicturePath) {
            $oldProfilePicture = explode("/", $userProfilePicturePath);
            $oldProfilePicture = $oldProfilePicture[count($oldProfilePicture) - 1];

            try {
                unlink("../profile_pictures/" . $oldProfilePicture);
                return true;
            } catch (Exception $e) {
                return false;
            }
        }

        return false;
    }

    static function DeleteUserPostsFiles($uid)
    {
        self::initialize();

        $getUserPosts = "SELECT url FROM posts WHERE uid = ?";
        $getUserPostsArray = array($uid);

        $userPosts = self::$conn->SelectMultipleRow($getUserPosts, $getUserPostsArray);
        $userPosts = json_decode($userPosts);
        foreach ($userPosts as $post) {
            $oldProfilePicture = explode("/", $post->url);
            $oldProfilePicture = $oldProfilePicture[count($oldProfilePicture) - 1];

            try {
                unlink("../posts/" . $oldProfilePicture);
            } catch (Exception $e) {
                return false;
            }
        }

        return true;
    }

    static function DeleteUser($data) {
        self::initialize();

        self::DeleteUserCommentLikes($data["uid"]);
        self::DeleteUserComments($data["uid"]);
        self::DeleteUserPostLikes($data["uid"]);
        self::DeleteUserPostsFiles($data["uid"]);
        self::DeleteUserPosts($data["uid"]);
        self::DeleteUserProfilePictureFile($data["oldProfilePicturePath"]);

        $deleteUserQuery = "DELETE FROM users WHERE uid = ?";
        $deleteUserQueryArray = array($data["uid"]);

        $response = self::$conn->Fetch($deleteUserQuery, $deleteUserQueryArray);

        return $response;
    }

    static function FollowUser($data) {
        self::initialize();

        $getFollowedUidQuery = "SELECT uid FROM users WHERE username = ?";
        $getFollowedUidQueryArray = array($data["followed"]);

        $followed = self::$conn->SelectSingleRow($getFollowedUidQuery, $getFollowedUidQueryArray);

        $followed = json_decode($followed);
        $followed_uid = $followed->uid;

        $followUserQuery = "INSERT INTO followers (followed_by, followed) VALUES (?, ?)";
        $followUserQueryParams = [$data["followed_by"], $followed_uid];

        $response = self::$conn->Fetch($followUserQuery, $followUserQueryParams);

        return $response;
    }

    static function GetUserMessages($username) {
        self::initialize();

        $getUserMessagesQuery = "
            SELECT
                message_content,
                name,
                picture,
                username,
                messages.message_sender,
                0 as isTyping
            FROM messages
            INNER JOIN users ON messages.message_sender = users.username OR messages.message_recipient = users.username
            WHERE messages.message_sender = ? OR messages.message_recipient = ?
            ORDER BY messages.message_time DESC
        ";
        $getUserMessagesQueryArray = array($username, $username);

        $userMessages = self::$conn->SelectMultipleRow($getUserMessagesQuery, $getUserMessagesQueryArray);

        return $userMessages;
    }

    static function UnfollowUser($data) {
        self::initialize();

        $getFollowedUidQuery = "SELECT uid FROM users WHERE username = ?";
        $getFollowedUidQueryArray = array($data["followed"]);

        $followed = self::$conn->SelectSingleRow($getFollowedUidQuery, $getFollowedUidQueryArray);

        $followed = json_decode($followed);
        $followed_uid = $followed->uid;

        $unfollowUserQuery = "DELETE FROM followers WHERE followed = ? AND followed_by = ?";
        $unfollowUserQueryParams = [$followed_uid, $data["followed_by"]];

        $response = self::$conn->Fetch($unfollowUserQuery, $unfollowUserQueryParams);

        return $response;
    }
}

?>