<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    require_once "../manager/DbManager.php";

    class AuthenticationCRUD {
        private static $conn; // Bu sınıfın içindeki tüm static fonksiyonlardan erişilebilecek bir özellik.

        // Bu fonksiyonu çağırdığınızda, DbManager nesnesini oluşturur ve $conn değişkenine atar.
        private static function initialize() {
            self::$conn = new DbManager();
        }
        static function AddUser($user) {
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

        static function GetUser($uid) {
            self::initialize();

            $getUserQuery = "SELECT * FROM Users WHERE uid = ?";
            $getUserQueryParams = array($uid);

            $result = self::$conn->SelectSingleRow($getUserQuery, $getUserQueryParams);

            return $result;
        }

        static function UpdateUser($user) {
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

        static function RemoveUser($uid) {
            self::initialize();

            $removeUserQuery = "DELETE FROM Users WHERE uid = ?";
            $removeUserQueryParams = array($uid);

            $result = self::$conn->Fetch($removeUserQuery, $removeUserQueryParams);

            return $result;
        }
    }

?>