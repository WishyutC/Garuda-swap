<?php
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = $_POST["username"] ?? '';
    $password = $_POST["password"] ?? '';

    // Example hardcoded credentials
    $validUsername = "user";
    $validPassword = "pass123";

    if ($username === $validUsername && $password === $validPassword) {
        echo json_encode([
            "success" => true,
            "message" => "Login successful!"
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Invalid username or password."
        ]);
    }
} else {
    echo json_encode([
        "success" => false,
        "message" => "Invalid request method."
    ]);
}
?>
