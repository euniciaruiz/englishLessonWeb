<?php
	
	$id = $_POST['id'];

	include 'ConnectDatabase.php';

	$sql = "SELECT DISTINCT GroupId FROM Answer WHERE Question_ID='$id'";
	$query = mysqli_query($conn, $sql);

	$groups = array();

	while($row = mysqli_fetch_array($query, MYSQLI_ASSOC)){
		$group = array();
		$group['groupId'] = $row['GroupId'];

		array_push($groups, $group);
	}

	echo json_encode($groups);

?>