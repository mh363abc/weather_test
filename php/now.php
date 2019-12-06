<?php
// http://localhost/wechat/xiaochengxu/t1/php/now.php
error_reporting(0);
header('Content-Type:text/plain;charset=utf8;');

// 参数整理
$location = $_GET['location'] ?? 'beijing';
$key = $_GET['key'] ?? 'cb5acaf12eb94aec8a0595459419cd58';

// 请求地址：
$url = 'https://free-api.heweather.net/s6/weather/now?location=' . $location . '&key=' . $key . '';
// $rest = file_get_contents($url);
$rest = curl($url, 0, 0, 1);
// var_dump($rest);
echo $rest;



// ============================================================
// curl
function curl($url, $params = false, $ispost = 0, $https = 0)
{
    $httpInfo = array();
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.118 Safari/537.36');
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    if ($https) {
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // 对认证证书来源的检查
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false); // 从证书中检查SSL加密算法是否存在
    }
    if ($ispost) {
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
        curl_setopt($ch, CURLOPT_URL, $url);
    } else {
        if ($params) {
            if (is_array($params)) {
                $params = http_build_query($params);
            }
            curl_setopt($ch, CURLOPT_URL, $url . '?' . $params); // 此处就是参数的列表,给你加了个?
        } else {
            curl_setopt($ch, CURLOPT_URL, $url);
        }
    }

    $response = curl_exec($ch);

    if ($response === false) {
        // $errno = curl_errno($ch);
        // $error = curl_error($ch);
        //echo "cURL Error: " . curl_error($ch);
        return false;
    }
    // $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    // $httpInfo = array_merge($httpInfo, curl_getinfo($ch));
    curl_close($ch);
    return $response;
}


// ============================================================
// ============================================================
// $rest = curl_version();//ok
// // 发送请求 
// $result = self::curl('网址', '参数', true); 
// // 收到的数据需要转化一下
//  $json = json_decode($result);
// // 我的用法是,应为我调用的是天气预报的接口
// $result= Curl::curl($url,"city=北京");
































