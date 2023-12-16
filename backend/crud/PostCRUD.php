<?php
require_once "../manager/DbManager.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

class PostCRUD {
    private static $conn; // Bu sınıfın içindeki tüm static fonksiyonlardan erişilebilecek bir özellik.

    // Bu fonksiyonu çağırdığınızda, DbManager nesnesini oluşturur ve $conn değişkenine atar.
    private static function initialize() {
        self::$conn = new DbManager();
    }
    static function AddPost($post) {
        self::initialize();

        $addPostQuery = "
                INSERT INTO posts (post_author, post_description, post_url, post_key, post_like_count_visibility, post_comments_visibility)
                VALUES (?, ?, ?, ?, ?, ?)
            ";
        $addPostQueryParams = array(
            $post["post_author"],
            $post["post_description"],
            $post["post_url"],
            $post["post_key"],
            $post["post_like_count_visibility"],
            $post["post_comments_visibility"]
        );

        $result = self::$conn->Fetch($addPostQuery, $addPostQueryParams);

        return $result;
    }

    static function GetPost($post_id) {
        self::initialize();

        $getPostQuery = "SELECT * FROM Posts WHERE post_id = ?";
        $getPostQueryParams = array($post_id);

        $result = self::$conn->SelectSingleRow($getPostQuery, $getPostQueryParams);

        return $result;
    }

    static function GetUserPosts($uid) {
        self::initialize();

        $getUserPostsQuery = "SELECT Posts.*, Users.* FROM Posts LEFT JOIN Users ON Posts.post_author = Users.uid WHERE Users.uis = ?";
        $getUserPostsQueryParams = array($uid);

        $result = self::$conn->SelectMultipleRow($getUserPostsQuery, $getUserPostsQueryParams);

        return $result;
    }

    static function UpdatePost($post) {
        self::initialize();

        $updatePostQuery = "
                UPDATE Posts 
                SET post_description = ?, post_like_count_visibility = ?, post_comments_visibility = ? 
                WHERE post_id = ?
            ";
        $updatePostQueryParams = array(
            $post["post_description"],
            $post["post_like_count_visibility"],
            $post["post_comments_visibility"],
            $post["post_id"]
        );

        $result = self::$conn->Fetch($updatePostQuery, $updatePostQueryParams);

        return $result;
    }

    static function RemovePost($post_id) {
        self::initialize();

        $removePostQuery = "DELETE FROM Posts WHERE post_id = ?";
        $removePostQueryParams = array($post_id);

        $result = self::$conn->Fetch($removePostQuery, $removePostQueryParams);

        return $result;
    }

// Post Comments
    static function AddPostComment($data) {
        self::initialize();

        $addPostCommentQuery = "
                INSERT INTO Post_Comments
                (comment_author, comment, post_id) 
                VALUES (?, ?, ?)
            ";
        $addPostCommentQueryParams = array(
            $data["comment_author"],
            $data["comment"],
            $data["post_id"]
        );

        $result = self::$conn->Fetch($addPostCommentQuery, $addPostCommentQueryParams);

        return $result;
    }

    static function GetPostComment($comment_id) {
        self::initialize();

        $getPostCommentQuery = "
                SELECT * FROM Post_Comments
                WHERE comment_id = ?
            ";
        $getPostCommentQueryParams = array($comment_id);

        $result = self::$conn->SelectSingleRow($getPostCommentQuery, $getPostCommentQueryParams);

        return $result;
    }

    static function GetPostComments($post_id) {
        self::initialize();

        $getPostCommentsQuery = "
                SELECT * FROM Post_Comments
                WHERE post_id = ?
            ";
        $getPostCommentsQueryParams = array($post_id);

        $result = self::$conn->SelectMultipleRow($getPostCommentsQuery, $getPostCommentsQueryParams);

        return $result;
    }

    static function UpdatePostComment($data) {
        self::initialize();

        $updatePostCommentQuery = "
                UPDATE Post_Comments
                SET comment = ?
                WHERE comment_id = ?
            ";
        $updatePostCommentQueryParams = array($data["comment"], $data["comment_id"]);

        $result = self::$conn->Fetch($updatePostCommentQuery, $updatePostCommentQueryParams);

        return $result;
    }

    static function RemovePostComment($comment_id) {
        self::initialize();

        $removePostCommentQuery = "
                DELETE FROM Post_Comments
                WHERE comment_id = ?
            ";
        $removePostCommentQueryParams = array($comment_id);

        $result = self::$conn->Fetch($removePostCommentQuery, $removePostCommentQueryParams);

        return $result;
    }
}
?>