<?php 

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';
require 'phpmailer/src/Exception.php';

$name = $_POST['name'];
$email = $_POST['email'];

$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth = true;
$mail->Username = 'frontendfile@gmail.com';
$mail->Password = 'wyws tzfh baay dlxl';
$mail->SMTPSecure = 'ssl';
$mail->Port = 465;

$mail->setFrom('frontendfile@gmail.com', 'Pulse');
$mail->addAddress('frontendfile@gmail.com');

$mail->isHTML(true);
$mail->Subject = 'Данные';
$mail->Body    = '
    Пользователь оставил данные <br> 
    Имя: ' . $name . ' <br>
    E-mail: ' . $email . '';

if (!$mail->send()) {
    echo 'Error: ' . $mail->ErrorInfo;
    return false;
} else {
    echo 'Message sent successfully!';
    return true;
}
?>