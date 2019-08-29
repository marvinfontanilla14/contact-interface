$(document).ready(function () {

initDtContact();
initAddContact();
initSave();
});




//-- Contact
function initDtContact() {

	$.get( endpoint+"api/contact/identification", function( data ) {
	  	$.each(data.resultList,function(i,v){
			console.log(v.firstName);

				var html = 	'<tr>' + 
			        '<td class="vFirstName">'+v.firstName+'</td>' + 
			        '<td class="vLastName">'+v.lastName+'</td>' + 
			        '<td class="vDob">'+v.dob+'</td>' +
			        '<td class="vGender">'+v.gender+'</td>' +
			        '<td class="vTitle">'+v.title+'</td>' + 
			        '<td recordId="'+v.id+'">' + 
			           '<button class="btn btn-primary dropdown-toggle mr-4 align-right" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Action</button>' + 
			           '<div class="dropdown-menu">' + 
			              '<a class="dropdown-item editContact"  data-toggle="modal" data-target="#basicExampleModal" href="#" >Edit contact</a>' + 
			              '<a class="dropdown-item removeContact"  href="#" >Remove contact</a>' + 
			              '<a class="dropdown-item manageAddress"  target="_blank" href="address.html?contactId='+v.id+'">Manage Address</a>' + 
			              '<a class="dropdown-item manageCommunication"   target="_blank" href="communication.html?contactId='+v.id+'" >Manage Communication</a>' + 
			           '</div>' + 
			        '</td>' + 
		     	'</tr>';

			$('#dtContact tbody').append(html);

		});


	    $('#dtContact').DataTable();
		$('.dataTables_length').addClass('bs-select');

		$('.removeContact').click(function(evt){
			evt.preventDefault();
			console.log("removeContact");
			id = $(this).closest('td').attr('recordId');
			initDeleteContact(id);
		});

		$('.editContact').click(function(evt){
			evt.preventDefault();
			id = $(this).closest('td').attr('recordId');
			var parent = $(this).closest('tr');
			$('#hContactId').val(id);
			$('#hModule').val('updateContact');

			console.log('test');
			$('#cFirstName').val(parent.find('.vFirstName').text());
			$('#cLastName').val(parent.find('.vLastName').text());
			$('#cDob').val(parent.find('.vDob').text());
			$('#cGender').val(parent.find('.vGender').text());
			$('#cTitle').val(parent.find('.vTitle').text());

		});
	});
	
}


function initDeleteContact(id) {
	$.ajax({
	    url: endpoint+'api/contact/identification/'+id,
	    type: 'DELETE',
	    success: function(result) {
	    	alert(result.message);
	       	location.reload();
	    },
	    error: function(result) {
	    	alert(result.message);
	    }
	});
}


function restHidden() {
	$('#hContactId').val('');
	$('#hAddressId').val('');
	$('#hCommunicationId').val('');
	$('#hModule').val('');
}

function resetAlerts() {
	$('.alert.alert-success').html('');
	$('.alert.alert-danger').html('');
	$('.alert.alert-success').hide();
	$('.alert.alert-danger').hide();
}

function resetFields() {
	$('#cFirstName').val('');
	$('#cLastName').val('');
	$('#cDob').val('');
	$('#cTitle').val('');
}

function initAddContact() {
	$('.btnAddContact').click(function(evt) {
		restHidden();
		resetFields();
		$('#hModule').val('addContact');
	});
}

function initSave() {
	$('.btnSave').click(function(evt) {
		evt.preventDefault();
		var firstName = $('#cFirstName').val();
		var lastName = $('#cLastName').val();
		var dob = $('#cDob').val();
		var gender = $('#cGender').val();
		var title = $('#cTitle').val();
		var hContactId = $('#hContactId').val();
		var hModule = $('#hModule').val();

		resetAlerts();	
		
		if(firstName.length == 0) {
			$('.alert.alert-danger').show();
		    $('.alert.alert-danger').html('First Name is required');
		}
		else if(lastName.length == 0) {
			$('.alert.alert-danger').show();
		    $('.alert.alert-danger').html('Last Name is required');
		}
		else if(dob.length == 0) {
			$('.alert.alert-danger').show();
		    $('.alert.alert-danger').html('Date of Birth is required');
		}
		else if(gender == "Gender") {
			$('.alert.alert-danger').show();
		    $('.alert.alert-danger').html('Gender is required');
		}
		else {

			if(hModule == 'updateContact') {
				$.ajax({
				    url: endpoint+'api/contact/identification/'+hContactId,
				    type: 'PATCH',
			     	headers: {
				      'Accept': 'application/json',
				      'Content-Type': 'application/json'
				    },

					   data: JSON.stringify({
			     		  firstName: $('#cFirstName').val(),
						  lastName: $('#cLastName').val(),
						  dob: $('#cDob').val(),
						  gender: $('#cGender').val(),
						  title: $('#cTitle').val()
					    }),
					// dataType: "json",
				    success: function(result) {
				    	console.log(result);
				    	alert(result.message);
				       	location.reload();
				    },
				    error: function(result) {
				    	$('.alert.alert-danger').show();
				    	$('.alert.alert-danger').html(result.message);
				    }
				});
			} else {
				$.ajax({
				    url: endpoint+'api/contact/identification',
				    type: 'POST',
			     	headers: {
				      'Accept': 'application/json',
				      'Content-Type': 'application/json'
				    },

					   data: JSON.stringify({
			     		  firstName: $('#cFirstName').val(),
						  lastName: $('#cLastName').val(),
						  dob: $('#cDob').val(),
						  gender: $('#cGender').val(),
						  title: $('#cTitle').val()
					    }),
					// dataType: "json",
				    success: function(result) {
				    	console.log(result);
				    	alert(result.message);
				       	location.reload();
				    },
				    error: function(result) {
				    	$('.alert.alert-danger').show();
				    	$('.alert.alert-danger').html(result.message);
				    }
				});
			}


		}

	
	

	});
}
//-- Contact