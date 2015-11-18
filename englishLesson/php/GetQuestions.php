<?php

include 'ConnectDatabase.php';
$questions = array();

$sql = "SELECT * FROM Question ORDER BY Question";
$query = mysqli_query($conn, $sql);

while($row = mysqli_fetch_array($query, MYSQLI_ASSOC)){
	$perQuestion = array();
	$perQuestion['questionId'] = $row['Question_ID'];
	$perQuestion['question'] = $row['Question'];

	array_push($questions, $perQuestion);
}

echo json_encode($questions);
?>