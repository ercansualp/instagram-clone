<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
$_FILE = json_decode(file_get_contents("php://input"),true);

$file = $_FILES["image"];

$dosyaAdi = $file['name']; // Yüklenen dosyanın adını al
$geciciAd = $file['tmp_name']; // Yüklenen dosyanın geçici olarak saklandığı yer
$hedefKlasor = __DIR__ . '/message_files/'; // Dosyanın kaydedileceği klasörün yolu

// Klasör mevcut değilse oluştur
if (!file_exists($hedefKlasor)) {
    mkdir($hedefKlasor, 0777, true);
}

$bytes = random_bytes(20); // dosya adı için random text ekliyoruz.
$bytes = bin2hex($bytes);
$exploded = explode(".", $dosyaAdi);
$yol = "";
for ($i=0; $i < count($exploded) - 1; $i++) { 
    $yol .= $exploded[$i];
}

$yol .= "_" . $bytes . "." . $exploded[count($exploded) - 1];
$hedefYol = str_replace("\\", "/", $hedefKlasor) . $yol; // Dosyanın kaydedileceği tam yol

try {
    // Dosyayı belirtilen klasöre taşı
    move_uploaded_file($geciciAd, $hedefYol);
    echo str_replace("\\",'/',"http://".$_SERVER['HTTP_HOST'].substr(getcwd(),strlen($_SERVER['DOCUMENT_ROOT']))."/message_files/") . $yol;
} catch (Exception $e) {
    echo false;
}

?>