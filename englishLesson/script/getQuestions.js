var perQuestion = "";
var x = 1, y=1;
var perGroup = "";
var perAnswer= "";
var answers;
$(document).ready(function(){



	$("#newQuestion").click(function(){

		$("#homePage").css("display", "none");
		$("#addNewQuestion").css("display", "inline-block");
		document.getElementById("nav").innerHTML = '<a href="index.html">Home</a> / New Talk';
	});

	$("#myform").on('submit', (function(e){
		e.preventDefault();
		console.log("submitting form");
		$.ajax({
			url: "php/submitQuestion.php",
			type: "POST",
			data: new FormData(this),
			dataType: "JSON",
			contentType: false,
			cache: false,
			processData: false,
			success: function(data){
				console.log(data);
			},
			error: function(e){
				console.log("Something went wrong while saving question");
			}
		});
	}));

	
	var wrapper = $(".groups");



	$("#newGroup").click(function(){
		x++;
		var groupField = '<div class="addedGroup" id="addedGroup-'+x+'">' +
							'<input type="text" readonly value="'+x+'" name="group[]"/>' +
							'<span class="removeGroup"><i class="fa fa-trash-o"></i>&nbsp;</span>' + 
							'<div class="addedAnswer" id ="add">' +
								'<div class="addRow"><i class="fa fa-plus"></i>&nbsp; Add Answer</div>' +
								'<p><span class="inputname">Answer Text<span class="required">*</span></span></p>' + 
								'<input type="text" class="inputText" name="answerText_'+x+'[]" value=""/>' + 
								'<p><span class="inputname">Pepper\'s Answer<span class="required">*</span></span></p>' +
								'<input type="text" class="inputText" name="pepperAnswer_'+x+'[]" value=""/>' +
							'</div>'+
						'</div>';
		
		$(wrapper).append(groupField);
		console.log("x: "+ x);
		$("#counter").val(x) 

	});

	$(wrapper).on('click', '.addRow', function(){
		y = $(this).parent('div').parent('div').attr("id").split('-')[1];
		var answerField = '<div class="addedAnswer">' +
							'<div class="removeField"><i class="fa fa-trash-o"></i>&nbsp;</div>' +
							'<p><span class="inputname">Answer Text<span class="required">*</span></span></p>' + 
							'<input type="text" class="inputText" name="answerText_'+y+'[]" value=""/>' + 
							'<p><span class="inputname">Pepper\'s Answer<span class="required">*</span></span></p>' +
							'<input type="text" class="inputText" name="pepperAnswer_'+y+'[]" value=""/>' +
						'</div>';
		
		$(this).parent('div').append(answerField);
		// console.log("Y: "+ y);
		

		
	});

	$(wrapper).on('click', '.removeGroup', function(e){
		e.preventDefault();
		$(this).parent('div').remove();
		x--;
		console.log("x: " + x);
		$("#counter").val(x) 
	});

	$(wrapper).on('click', '.removeField', function(e){
		e.preventDefault();
		$(this).parent('div').remove();
		y--;
		console.log("y: " + y);
	});
	
});


	
function fetchDataForEdit(element) {
	questionId = element.id.split('-')[1];
	$("#homePage").css("display", "none");
	$("#editQuestionDiv").css("display", "inline-block");
	document.getElementById("nav").innerHTML = '<a href="index.html">Home</a> / Edit Talk';
	getQuestionAndElseAnswer(questionId, function(result){
		if(result){
			var question = jQuery.parseJSON(result);
			$("#talkTextEdit").val(question.question);
			$("#elseAnswerEdit").val(question.elseAnswer);
			$("#pepperTextId").val(question.questionId);
			$("#elseID").val(question.elseId);
		}
	});

	getGroups(questionId);

}



function getQuestionAndElseAnswer(id, callback){
	$.ajax({
		url: "php/getDataForEdit.php",
		type: "POST",
		data: {'id':id},
		success: function(data){
			callback(data);
		},
		error: function(e){
			console.log("error getting data for question and else answer");
		}
	});
}


function getGroups(id){
	console.log("getting groups...");
	$.ajax({
		url: 'php/getGroups.php',
		type: 'POST',
		dataType: 'JSON',
		data: {'id': id},
		success: function(data){
			console.log(data.length);
			for(index = 0; index < data.length; index++){
				groupId = data[index].groupId;
				getAnswersByGroup(groupId, id, function(result){
					answers = result;
					perGroup += '<div id="group-'+groupId+'" class="addedGroup">'+
								'<span class="removeGroup"><i class="fa fa-trash-o"></i>&nbsp;</span>' + 
								 answers + 
							'</div>';
					$(".editGroups").append(perGroup);
					perGroup = "";
				});
				console.log("id: "+ groupId);
				


			}


		},
		error: function(e){
			console.log("error getting groups");
		}
	});
}

function getAnswersByGroup(groupId, id, handleData){
	console.log("getting answers by group");
	$.ajax({
		url: 'php/getAnswers.php',
		type: 'POST',
		dataType: 'JSON',
		data: {'id': id, 'groupId':groupId},
		success: function(data){
			for(index=0; index < data.length; index++) {
				
				answerText = data[index].userAnswer;
				pepperAnswer = data[index].pepperAnswer;
				perAnswer += '<div id="addedAnswer-'+groupId+'" class="addedAnswer">' +
								'<div class="removeField"><i class="fa fa-trash-o"></i>&nbsp;</div>' +
								'<p><span class="inputname">Answer Text<span class="required">*</span></span></p>' +
								'<input type="text" class="inputText" id="answerText_'+groupId+'[]" value="'+answerText+'" />' +
								'<p><span class="inputname">Pepper Answer<span class="required">*</span></span></p>' +
								'<input type="text" class="inputText" id="pepperAnswer_'+groupId+'[]" value="'+pepperAnswer+'" />' +
							'</div>';
				
			}
		handleData(perAnswer);
		perAnswer = "";
		},
		error: function(e){
			console.log("something went wrong while getting answers for this group");
		}
	});
	
}

function getQuestions() {
	console.log("getting Questions...");
	$.ajax({
		url: 'php/GetQuestions.php',
		type: 'POST',
		dataType: 'JSON',
		success: function(data){
			for(index = 0; index < data.length; index++){
				perQuestion += '<tr class="talkQuestion" id="question-'+data[index].questionId+'">' +
									'<td style="width: 300%"><span><div class="questionText">'+data[index].question+'</div></span>' + 
									'<td><div title="Edit" id="editQuestion-'+data[index].questionId+'" class="editQuestionQuestion" onclick="fetchDataForEdit(this)"><i class="fa fa-pencil"></i>&nbsp;</div></td>' + 
									'<td><div title="Delete" id="deleteQuestion-'+data[index].questionId+'" class="deleteQuestion" onclick="deleteThisQuestion(this)"><i class="fa fa-trash-o"></i>&nbsp;</div></td>'+
								'</tr>';
			}
			$("#questionTable").append(perQuestion);
		},
		error: function(e){
			alert("Something went wrong fetching data!");
		}
	});
}

function deleteThisQuestion(element) {
	questionId = element.id.split('-')[1];

	console.log("delete: "+questionId);

	if(confirm("Do you really want to delete this talk?") == true){
		$.ajax({
			type: "POST",
			url: "php/DeleteQuestion.php",
			data: "id="+questionId,
			dataType: "JSON",
			success: function(data){
				console.log(data);
				if(data.indexOf("error") > -1){
					console.log("error deleting question");
				}else{
					console.log("success! Deleted question");
				}
			$("#questionTable").html("");
			perQuestion = "";
			getQuestions();
			},
			error: function(e){
				console.log("Something went wrong while performing action!");
			}
		});
	}
}

