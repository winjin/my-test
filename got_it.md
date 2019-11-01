### PHP 接收数据 $_REQUEST 和 php://input

简单笼统来说，php://input 是以流的形式传数据，是字符串的形式。php://input 不能用于 enctype=multipart/form-data 类型的数据。
$_REQUEST 是传输的 post get 的值，可以是数组、json等形式。$_POST 是 Content-Type 为 application/x-www-form-urlencoded 或者为   multipart/form-data 时 http 的 body 中的数据。
当请求方式是 post 类型， 且 enctype 不是 multipart/form-data 类型时， php://input 中的数据才等于 $_POST 中的数据。


```
// 请求接口，发送参数
$db= array('db'=>'all');
$res = sendSQL($db);
$data = json_decode($res, true);
echo "<pre>";
var_dump($res);
// if (0 == $data['code']) {
    // ...
// }
exit;

function sendSQL($sql){
    $url = "http://workflow.test/api/dd_xx.php";
    // $header = array('Content-Type: Application/json;charset=utf-8');
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($sql));    // 
    // curl_setopt($curl, CURLOPT_POSTFIELDS, $sql);    // php://input 接收不到，只能用 $_REQUEST
    $output = curl_exec($curl);
    curl_close($curl);
    // $data = json_decode($output, true);
    // if (0 == $data['code']) {
    //     return $data['data'];
    // }else{
    //     return '';
    // }
    // 此处在外面判断 code 状态更好
    return $output;
}

// 接收参数，返回数据
$receivedData = file_get_contents('php://input', 'r');
// $receivedData = $_REQUEST['agrs'];

if (!empty($receivedData)) {
    // process arguments
    $result = fncGetResultByArgs($receivedData);
    if (empty($result)) {
        $data['code'] = 2;
        $data['msg']  = "No data was obtained.";
        $data['data'] = '';
    } else {
        $data['code'] = 0;
        $data['msg']  = "Success.";
        $data['data'] = $result;
    }
} else {
    $data['code'] = 1;
    $data['msg']  = "No data received.";
    $data['data'] = '';
    
}
echo json_encode($data);
exit;

```
