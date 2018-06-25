<?php
$newsApiKey = "YOUR_API_KEY";
$weatherApiKey = "YOUR_API_KEY";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: X-Requested-With");
header("Content-Type:text/json");
$json = false;

switch ($_GET["type"]) {
    case "news":
        $url = "https://newsapi.org/v2/top-headlines?sources=reuters&apiKey=" . $newsApiKey;
        $json = file_get_contents($url);
        break;
    case "weather":
        $city = $_GET["city"];
        if (isset($city) && !empty($city)) {
            $url = "https://api.openweathermap.org/data/2.5/forecast?q=" .
                $city . ",DE&appid=" . $weatherApiKey;
            $json = file_get_contents($url);
        }
        break;
}

if ($json == false)
    $json = json_encode(array("cod" => "400"));
echo $json;
?>

