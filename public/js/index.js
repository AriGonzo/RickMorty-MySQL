coolnessPage = function(){
	//clears the template container
	clearTemplateDiv()

	//API call with Ascending Order
	multiCastCall('/coolness-chart/desc')
};

uncoolnessPage = function(){
	//clears the template container
	clearTemplateDiv()

	//API call with Ascending Order
	multiCastCall('/coolness-chart/asc')	
};

castPage = function(){
	//clears the template container
	clearTemplateDiv()

	//API Call
	multiCastCall('/cast');
};

attitudeChange = function(){
	var attitude = $(this).val();
	if (attitude == "false") {
		clearTemplateDiv();
		$('#templateContainer').html('<h2 class="text-center">Select an option above to get started!</h2>')
		return false
	}

	singleCastCall('/attitude-chart/'+attitude)
};

multiCastCall = function(url){
	//api call to get data
	$.get(url, function(data){
		
		//for loop through the array of data received
		for(var i = 0; i < data.length; i++) {

			//creates the div to drop the template into and adds template 
			var template = $('<div>');
			template.addClass('template'+i);

			//adds bootstrap class for grid
			template.addClass('col-md-3')

			//appends template div to templateContainer
			$('#templateContainer').append(template);

			//using templating library to drop data
			$(".template"+i).loadTemplate("../templates/castTemplate.html",
		    {
		        image: data[i].image,
		        name: data[i].name,
		        id: data[i].id,
		        coolness_points: "Coolness Points: " + data[i].coolness_points,
		        attitude: "Attitude: " + data[i].attitude,
		    });
		}
	});
};

singleCastCall = function(url){
	$.get(url, function(castMember){
		console.log(castMember);
		$('#templateContainer').loadTemplate("../templates/singleTemplate.html", 
			{
	      image: castMember.image,
	      id: "id: " + castMember.id,
	      name: castMember.name,
	      coolness_points: "Coolness Points: " + castMember.coolness_points,
	      attitude: "Attitude: " + castMember.attitude,
	      bio: castMember.description
			});
	});
}

getAttitudes = function(){
	$('#attitude').empty();
	$('#attitude').append('<option value="false">Select Attitude</option>');
	$.get('/attitudes', function(attitudeArray){
		attitudeArray.forEach(function(attitudeObj){
			var optionElement = $('<option>');
			optionElement.text(attitudeObj.attitude);
			$('#attitude').append(optionElement);
		});
	});
};

viewCharacter = function(){
	var characterId = $(this).attr('id');
	singleCastCall('/characters/'+characterId);
}

addCharacter = function(){
	$('#templateContainer').loadTemplate("../templates/newCharacterTemplate.html");
}

submitCharacter = function(){
	var characterData = {
		name: $('#characterName').val().trim(),
		coolness_points: $('#coolnessPoints').val().trim(),
		attitude: $('#attitudeInput').val().trim(),
		image: $('#characterImage').val().trim(),
		description: $('#characterDesc').val().trim()
	}

	$.post('/newCharacter', characterData, function(){
		getAttitudes();
		castPage();
	});
}

clearTemplateDiv = function(){
	$('#attitude').val("false")
	$('#templateContainer').empty();
};

//trigger on page load
getAttitudes();

//Button Triggers
$('#castBtn').on('click', castPage);
$('#coolnessBtn').on('click', coolnessPage);
$('#uncoolnessBtn').on('click', uncoolnessPage);
$('#attitude').on('change', attitudeChange);
$('#addNewCharacter').on('click', addCharacter);
$(document).on('click', '.characterName', viewCharacter);
$(document).on('click', '#submitCharacter', submitCharacter);
