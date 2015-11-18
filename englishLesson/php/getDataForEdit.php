<?php
	
	include 'ConnectDatabase.php';
	$questionID = $_POST['id'];
	$questionSql = "SELECT * FROM Question WHERE Question_ID='$questionID'";
	$questionQuery = mysqli_query($conn, $questionSql);

	$questionResult = $questionQuery->fetch_assoc();

	$question = array(
			"questionId" => $questionResult['Question_ID'],
			"question" => $questionResult['Question']
		);

	$elseSql = "SELECT * FROM ElseAnswer WHERE Question_ID='$questionID'";
	$elseQuery = mysqli_query($conn, $elseSql);

	$elseResult = $elseQuery->fetch_assoc();

	$else = array(
			"elseId" => $elseResult['Else_ID'],
			"elseAnswer" => $elseResult['Else_Answer'],
		);

	$questionAndElse = $question + $else;
	echo json_encode($questionAndElse);

?>	