<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "test";
//
$http_response_header['Access-Control-Allow-Origin'] = '*';
$http_response_header['Content-Type'] = 'application/json';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');
header("Access-Control-Allow-Methods: GET, POST, PATCH");
// Получаем входящий поток данных в формате JSON
$json = file_get_contents('php://input');

// Декодируем JSON в ассоциативный массив
$data = json_decode($json, true);
//print_r($data);
// Теперь вы можете обращаться к данным, как обычно
$email = $data['email'];
$phone = $data['phone'];
$name = $data['name'];

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // Устанавливаем режим ошибок PDO на исключение
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if (isset($email) && isset($phone)) {

        // Валидация email и телефона
        if (filter_var($email, FILTER_VALIDATE_EMAIL) && preg_match("/^\+?[0-9]{10,}$/", $phone)) {
            // Подготовленный запрос для проверки наличия записи в таблице и времени отправки
            $sql = "SELECT * FROM users WHERE email = :email AND phone = :phone AND TIMESTAMPDIFF(MINUTE, created_at, NOW()) <= 5";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':phone', $phone);
            $stmt->execute();

            if ($stmt->rowCount() == 0) {
                // Подготовленный запрос для вставки данных в базу данных
                $sql = "INSERT INTO users (email, phone, name) VALUES (:email, :phone, :name)";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':email', $email);
                $stmt->bindParam(':phone', $phone);
                $stmt->bindParam(':name', $name);
                $stmt->execute();
                echo "Данные успешно сохранены!";
            } else {
                echo "Заявка уже подана в течение последних 5 минут!";
            }
        } else {
            echo "Некорректный номер телефона или e-mail!";
        }
    } else {
        echo "Укажите номер телефона и e-mail!";
    }
} catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}

$conn = null;
?>