<?php

	include 'ConnectDatabase.php';
	$questionId = $_POST['id'];

	$sql = "DELETE FROM Question WHERE Question_ID=".$questionId;
	$sql_2 = "DELETE FROM Answer WHERE Question_ID=".$questionId;
	$sql_3 = "DELETE FROM ElseAnswer WHERE Question_ID=".$questionId;

	if(mysqli_query($conn, $sql)){
		mysqli_query($conn, $sql_2);
		mysqli_query($conn, $sql_3);
		echo json_encode("Successfully Deleted Question");
	}else {
		echo json_encode("error deleting question");
	}
?>