<?php
	include 'ConnectDatabase.php';
	$question = mysqli_real_escape_string($conn, $_POST['talkText']);
	$else = mysqli_real_escape_string($conn, $_POST['elseAnswer']);
	$checkQuestion = mysqli_query($conn, "SELECT * FROM Question WHERE Question='$question'");
	if(mysqli_num_rows($checkQuestion)){
		echo "<script>alert('Question already exists! Please try another question!');</script>";
	}else{
		$id = mysqli_query($conn, "SELECT MAX(Question_ID) FROM Question");
        $questionID = mysqli_fetch_row($id)[0] + 1;

		$questionSql = "INSERT INTO Question(Question_ID, Question) VALUES('$questionID', '$question')";
		mysqli_query($conn, $questionSql);
		$groups = $_REQUEST['group'];

		foreach($groups as $value){

			$answerText_array = $_REQUEST["answerText_$value"];
			$pepperAnswer_array = $_REQUEST["pepperAnswer_$value"];
			
			foreach(array_combine($answerText_array, $pepperAnswer_array) as $answerKey => $pepperAnswer){
				$answerKey = mysqli_real_escape_string($conn, $answerKey);
				$pepperAnswer = mysqli_real_escape_string($conn, $pepperAnswer);
				$insertAnswer = "INSERT INTO Answer(Question_ID, User_Answer, Pepper_Answer, GroupId) VALUES ('$questionID', '$answerKey', '$pepperAnswer', '$value')";
				$query = mysqli_query($conn, $insertAnswer);
			}
		}

		$elseSql = "INSERT INTO ElseAnswer(Question_ID, Else_Answer) VALUES('$questionID', '$else')";
		mysqli_query($conn, $elseSql);

		echo json_encode("success");
	}
	

	
	




?>
