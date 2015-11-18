<?php

	$id = $_POST['id'];
	$groupId = $_POST['groupId'];

	include 'ConnectDatabase.php';

	$sql = "SELECT * FROM Answer WHERE Question_ID='$id' AND GroupId='$groupId'";
	$query = mysqli_query($conn, $sql);

	$answers = array();

	while($row = mysqli_fetch_array($query, MYSQLI_ASSOC)){
		$answer = array();
		$answer['userAnswer'] = $row['User_Answer'];
		$answer['pepperAnswer'] = $row['Pepper_Answer'];
		$answer['answerId'] = $row['Answer_ID'];

		array_push($answers, $answer);
	}

	echo json_encode($answers);

?>