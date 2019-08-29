var contactId = "";
$(document).ready(function () {
contactId =  getParameterByName('contactId');
initDtContact();
initAddContact();
initSave();
});




//-- Contact
function initDtContact() {
	$.get( endpoint+"api/contact/communication?contactId="+contactId, function( data ) {
	  	$.each(data.resultList,function(i,v){
			
				var html = 	'<tr>' + 
			        '<td class="vType">'+v.type+'</td>' + 
			        '<td class="vValue">'+v.value+'</td>' + 
			        '<td class="vPreferred">'+v.preferred+'</td>' +
			        '<td recordId="'+v.id+'">' + 
			           '<button class="btn btn-primary dropdown-toggle mr-4 align-right" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Action</button>' + 
			           '<div class="dropdown-menu">' + 
			              '<a class="dropdown-item editContact"  data-toggle="modal" data-target="#basicExampleModal" href="#" >Edit communication</a>' + 
			              '<a class="dropdown-item removeContact"  href="#" >Remove communication</a>' + 
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
			$('#cmType').val(parent.find('.vType').text());
			$('#cmValue').val(parent.find('.vValue').text());
			$('#cmPreferred').val(parent.find('.vPreferred').text());

		});
	});
	
}


function initDeleteContact(id) {
	$.ajax({
	    url: endpoint+'api/contact/communication/'+id,
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
	$('#cmType').val('Type');
	$('#cmValue').val('');
	$('#cmPreferred').prop('checked', true);
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
		var type = $('#cmType').val();
		var value = $('#cmValue').val();

		var hContactId = $('#hContactId').val();
		var hModule = $('#hModule').val();



		resetAlerts();	
		if(type == 'Type') {
			$('.alert.alert-danger').show();
		    $('.alert.alert-danger').html('Type is required');
		} 
		else if(value.length == 0) {
			$('.alert.alert-danger').show();
		    $('.alert.alert-danger').html('Number is required');
		}
		
		else {

			if(hModule == 'updateContact') {
				$.ajax({
				    url: endpoint+'api/contact/communication/'+hContactId,
				    type: 'PATCH',
			     	headers: {
				      'Accept': 'application/json',
				      'Content-Type': 'application/json'
				    },

					   data: JSON.stringify({
					   	  contactId : contactId,
					   	  type: type,
			     		  value: value,
						  preferred: $('#cmPreferred').is(':checked')
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
				    url: endpoint+'api/contact/communication',
				    type: 'POST',
			     	headers: {
				      'Accept': 'application/json',
				      'Content-Type': 'application/json'
				    },

   					   data: JSON.stringify({
					   	  contactId : contactId,
					   	  type: type,
			     		  value: value,
						  preferred: $('#cmPreferred').is(':checked')
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