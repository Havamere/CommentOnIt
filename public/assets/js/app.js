$(document).ready(function(){
	$("#submit").on('click', function(){
		//console.log($(this).val());
		$.ajax({
		    type: "GET",
		    url: '/submit',
		    dataType: 'JSON',
		  })
		  .done(function(data) {
		    console.log(data);
		    //can build out wells here in a for loop or use handlebars helper function
		  });
		return false;
	});

	$("#addComment").on('click', function(){
		//console.log($(this).val());
		$.ajax({
		    type: "POST",
		    url: '/addComment',
		    dataType: 'json',
		    data: {
		      id: $(this).val(),
		      user: $('#user').val().trim(),
		      comment: $('#comment').val().trim(),
		      created: Date.now()
		    }
		  })
		  .done(function(data) {
		    console.log(data);
		    $('#user').val("");
		    $('#comment').val("");
		    $('.comments').append("<p>"+data.user+": "+data.comment+"</p>");
		  });
		return false;
	});

	$("#delete").on('click', function(){
		$.ajax({
		    type: "POST",
		    url: '/delete',
		    dataType: 'json',
		    data: {
		      id: $(this).parent().parent().val(),
		      user: $('#user').val().trim(),
		      comment: $('#comment').val().trim(),
		      created: $(this).val(),
		    }
		  })
		  .done(function(response) {
		    console.log(response);
		  });
		return false;
	});
})