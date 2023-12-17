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
    static function GetUserPostsPreview($username) {
        self::initialize();

        $getUserPostsPreviewQuery = "SELECT posts.id, posts.url, posts.post_key FROM posts LEFT JOIN users ON users.uid = posts.uid WHERE users.username = ? ORDER BY posts.id DESC";
        $getUserPostsPreviewQueryParams = array($username);

        $result = self::$conn->SelectMultipleRow($getUserPostsPreviewQuery, $getUserPostsPreviewQueryParams);
        $result = json_decode($result);
        for($i = 0; $i < count($result); $i++) {

            $postLikes = self::GetPostLikes($result[$i]->id);
            $postLikes = json_decode($postLikes);
            $result[$i]->postLikes = $postLikes;
        }

        $result = json_encode($result);

        return $result;
    }

    static function AddPost($post) {
        self::initialize();

        $addPostQuery = "
                INSERT INTO Posts (uid, description, url, post_key)
                VALUES (?, ?, ?, ?)
            ";
        $addPostQueryParams = array(
            $post["uid"],
            $post["description"],
            $post["url"],
            $post["post_key"]
        );

        $result = self::$conn->Fetch($addPostQuery, $addPostQueryParams);

        return $result;
    }

    static function GetCommentLikes($comment_id) {
        self::initialize();

        $getCommentLikesQuery = "SELECT comment_likes.*, users.* FROM comment_likes LEFT JOIN users ON users.uid = comment_likes.like_author WHERE comment_likes.comment_id = ?";
        $getCommentLikesQueryParams = array($comment_id);

        $commentLikes = self::$conn->SelectMultipleRow($getCommentLikesQuery, $getCommentLikesQueryParams);
        return $commentLikes;
    }

    static function GetPostComments($post_id) {
        self::initialize();

        $getPostCommentsQuery = "SELECT post_comments.*, users.*, post_comments.id AS comment_id FROM post_comments LEFT JOIN users ON users.uid = post_comments.comment_author WHERE post_comments.post_id = ?";
        $getPostCommentsQueryParams = array($post_id);

        $postComments = self::$conn->SelectMultipleRow($getPostCommentsQuery, $getPostCommentsQueryParams);
        return $postComments;
    }

    /*
    static function GetPost($post_id) {
        self::initialize();

        $getPostQuery = "SELECT posts.*, users.* FROM posts LEFT JOIN users ON users.uid = posts.uid WHERE posts.id = ?";
        $getPostQueryParams = array($post_id);

        $post = self::$conn->SelectSingleRow($getPostQuery, $getPostQueryParams);

        $post = json_decode($post);
        $post->postComments = json_decode(self::GetPostComments($post_id));

        foreach ($post->postComments as $comment) {
            $commentLikes = self::GetCommentLikes($comment->id);
            $comment->likes = json_decode($commentLikes);
        }

        $post = json_encode($post);
        return $post;
    }
    */

    static function GetUserPosts($uid) {
        self::initialize();

        $getUserPostsQuery = "SELECT posts.*, posts.id AS post_id, users.* FROM posts LEFT JOIN users ON posts.uid = users.uid WHERE users.uid = ?";
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

    static function RemovePost($data) {
        self::initialize();
        $fileName = explode("/", $data["post_url"]);
        $fileName = $fileName[count($fileName) - 1];
        $post_url = '../posts/' . $fileName;

        if (file_exists($post_url)) {
            unlink($post_url);
        }

        foreach ($data["commentIds"] as $commentId) {
            self::RemoveCommentLikes($commentId);
            self::RemovePostComment($commentId);
        }

        $removePostQuery = "DELETE FROM posts WHERE id = ?";
        $removePostQueryParams = array($data["post_id"]);

        $result = self::$conn->Fetch($removePostQuery, $removePostQueryParams);

        return $result;
    }

// Post Comments
    static function AddPostComment($data) {
        self::initialize();

        $addPostCommentQuery = "
                INSERT INTO post_comments
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

        $result = self::$conn->SelectMultipleRow($getPostCommentQuery, $getPostCommentQueryParams);

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

    static function RemoveCommentLikes($comment_id) {
        self::initialize();

        $removeCommentLikesQuery = "
                DELETE FROM comment_likes
                WHERE comment_id = ?
            ";
        $removeCommentLikesQueryParams = array($comment_id);

        $result = self::$conn->Fetch($removeCommentLikesQuery, $removeCommentLikesQueryParams);

        return $result;
    }

    static function RemovePostComment($comment_id) {
        self::initialize();
        self::RemoveCommentLikes($comment_id);
        $removePostCommentQuery = "
                DELETE FROM post_comments
                WHERE id = ?
            ";
        $removePostCommentQueryParams = array($comment_id);

        $result = self::$conn->Fetch($removePostCommentQuery, $removePostCommentQueryParams);

        return $result;
    }

    static function LikePostComment($data) {
        self::initialize();

        $likePostCommentQuery = "
            INSERT INTO comment_likes
            (comment_id, like_author)
            VALUES (?, ?)
        ";
        $likePostCommentQueryParams = array(
            $data["comment_id"],
            $data["uid"]
        );

        $result = self::$conn->Fetch($likePostCommentQuery, $likePostCommentQueryParams);

        return $result;
    }

    static function UnlikePostComment($data) {
        self::initialize();

        $unlikePostCommentQuery = "DELETE FROM comment_likes WHERE like_author = ? AND comment_id = ?";
        $unlikePostCommentQueryParams = array($data["uid"], $data["comment_id"]);

        $result = self::$conn->Fetch($unlikePostCommentQuery, $unlikePostCommentQueryParams);

        return $result;
    }

    static function GetPostLikes($post_id) {
        self::initialize();

        $getPostLikesQuery = "SELECT post_likes.*, users.* FROM post_likes LEFT JOIN users ON users.uid = post_likes.like_author WHERE post_likes.post_id = ?";
        $getPostLikesQueryArray = array($post_id);

        $postLikes = self::$conn->SelectMultipleRow($getPostLikesQuery, $getPostLikesQueryArray);
        return $postLikes;
    }

    // later
    static function GetPost($post_id) {
        self::initialize();

        $getPostQuery = "SELECT posts.*, users.*, posts.id as postId FROM posts LEFT JOIN users ON users.uid = posts.uid WHERE posts.id = ?";
        $getPostQueryArray = array($post_id);

        $post = self::$conn->SelectSingleRow($getPostQuery, $getPostQueryArray);
        $post = json_decode($post);
        $postComments = self::GetPostComments($post_id);
        $postComments = json_decode($postComments);
        $post->postComments =  $postComments;
        foreach ($postComments as $comment) {
            $likes = self::GetCommentLikes($comment->id);
            $likes = json_decode($likes);
            $comment->likes = $likes;
        }
        $post = json_encode($post);
        return $post;
    }

    static function LikePost($data) {
        self::initialize();

        $likePostQuery = "INSERT INTO post_likes (post_id, like_author) VALUES (?, ?)";
        $likePostQueryArray = array($data["post_id"], $data["like_author"]);

        $response = self::$conn->Fetch($likePostQuery, $likePostQueryArray);

        return $response;
    }

    static function UnlikePost($data) {
        self::initialize();

        $unlikePostQuery = "DELETE FROM post_likes WHERE post_id = ? AND like_author = ?";
        $unlikePostQueryArray = array($data["post_id"], $data["like_author"]);

        $response = self::$conn->Fetch($unlikePostQuery, $unlikePostQueryArray);

        return $response;
    }
}
?>