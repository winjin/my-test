### PHP 接收数据 $_REQUEST 和 php://input

简单笼统来说，php://input 是以流的形式传数据，可以是个 json 字符串。$_REQUEST 是传输的 post get 的值


```
$db= array('db'=>'all');
$res = sendSQL($db);
$data = json_decode($res, true);
echo "<pre>";
var_dump($res);
exit;

function sendSQL($sql){
    // $url = $this->workflowBaseUrl."/general/data_lineage/dd-api_parse_sql.php";
    $url = "http://workflow.test/general/data_lineage/api/dd-api_parse_sql.php";
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
    return $output;
}

// 接收
$receivedData = file_get_contents('php://input', 'r');
// $receivedData = $_REQUEST['db'];

if (!empty($receivedData)) {
    // arguments
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
