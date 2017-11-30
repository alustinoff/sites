<pre>
<?php
require "vendor/PHPMailerAutoload.php";
$message = "Ваши данные для отправки заказа: <br>"."Имя: ".$_REQUEST['name']."<br>"." Телефон: ".$_REQUEST['phone']."<br>"." Улица: ".$_REQUEST['street']."<br>"." Дом: ".$_REQUEST['house']."<br>"." Корпус: ".$_REQUEST['house number']."<br>"." Квартира: ".$_REQUEST['room']."<br>"." Этаж: ".$_REQUEST['floor']."<br>"." Комментарий: ".$_REQUEST['comment']."<br>"." Оплата: ".$_REQUEST['payment']."<br>"." Обратный звонок: ".$_REQUEST['callback']."<br>";
$mail = new PHPMailer;

$mail->isSMTP();
$mail->Host = 'smtp.yandex.ru';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'testustinov@yandex.ru';                 // SMTP username
$mail->Password = '';                           // SMTP password
$mail->SMTPSecure = 'tls';
$mail->Port = 587;                              // TCP port to connect to
$mail->setFrom('testustinov@yandex.ru', 'Отправитель');
$mail->addAddress('testustinov@yandex.ru', 'Получатель');     // Add a recipient
$mail->addReplyTo('testustinov@yandex.ru', 'Information');

//$mail->addAttachment('js/main.js');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Заказ доставки';
$mail->Body    = $message;
//$mail->AltBody = $message;

if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message has been sent';
}