var contactId = "";
$(document).ready(function () {
contactId =  getParameterByName('contactId');
initDtContact();
initAddContact();
initSave();
});




//-- Contact
function initDtContact() {
	$.get( endpoint+"api/contact/address?contactId="+contactId, function( data ) {
	  	$.each(data.resultList,function(i,v){
			
				var html = 	'<tr>' + 
			        '<td class="vType">'+v.type+'</td>' + 
			        '<td class="vNumber">'+v.number+'</td>' + 
			        '<td class="vStreet">'+v.street+'</td>' + 
			        '<td class="vUnit">'+v.unit+'</td>' +
			        '<td class="vCity">'+v.city+'</td>' +
			        '<td class="vState">'+v.state+'</td>' + 
			        '<td class="vZipcode">'+v.zipcode+'</td>' + 
			        '<td recordId="'+v.id+'">' + 
			           '<button class="btn btn-primary dropdown-toggle mr-4 align-right" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Action</button>' + 
			           '<div class="dropdown-menu">' + 
			              '<a class="dropdown-item editContact"  data-toggle="modal" data-target="#basicExampleModal" href="#" >Edit address</a>' + 
			              '<a class="dropdown-item removeContact"  href="#" >Remove address</a>' + 
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
			$('#aType').val(parent.find('.vType').text());
			$('#aNumber').val(parent.find('.vNumber').text());
			$('#aStreet').val(parent.find('.vStreet').text());
			$('#aUnit').val(parent.find('.vUnit').text());
			$('#aCity').val(parent.find('.vCity').text());
			$('#aState').val(parent.find('.vState').text());
			$('#aZipcode').val(parent.find('.vZipcode').text());

		});
	});
	
}


function initDeleteContact(id) {
	$.ajax({
	    url: endpoint+'api/contact/address/'+id,
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
	$('#aType').val('Type');
	$('#aNumber').val('');
	$('#aStreet').val('');
	$('#aUnit').val('');
	$('#aCity').val('');
	$('#aState').val('');
	$('#aZipcode').val('');
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
		var type = $('#aType').val();
		var number = $('#aNumber').val();
		var street = $('#aStreet').val();
		var unit = $('#aUnit').val();
		var city = $('#aCity').val();
		var state = $('#aState').val();
		var zipcode = $('#aZipcode').val();

		var hContactId = $('#hContactId').val();
		var hModule = $('#hModule').val();



		resetAlerts();	
		if(type == 'Type') {
			$('.alert.alert-danger').show();
		    $('.alert.alert-danger').html('Type is required');
		} 
		else if(number.length == 0) {
			$('.alert.alert-danger').show();
		    $('.alert.alert-danger').html('Number is required');
		}
		else if(street.length == 0) {
			$('.alert.alert-danger').show();
		    $('.alert.alert-danger').html('Street is required');
		}
		else if(unit.length == 0) {
			$('.alert.alert-danger').show();
		    $('.alert.alert-danger').html('Unit is required');
		}
		else if(city.length == 0) {
			$('.alert.alert-danger').show();
		    $('.alert.alert-danger').html('City is required');
		}
		else if(state.length == 0) {
			$('.alert.alert-danger').show();
		    $('.alert.alert-danger').html('State is required');
		}
		else if(zipcode.length == 0) {
			$('.alert.alert-danger').show();
		    $('.alert.alert-danger').html('Zipcode is required');
		}
		else {

			if(hModule == 'updateContact') {
				$.ajax({
				    url: endpoint+'api/contact/address/'+hContactId,
				    type: 'PATCH',
			     	headers: {
				      'Accept': 'application/json',
				      'Content-Type': 'application/json'
				    },

					   data: JSON.stringify({
					   	  contactId : contactId,
					   	  type: type,
			     		  number: number,
						  street: street,
						  unit: unit,
						  city: city,
						  state: state,
						  zipcode: zipcode
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
				    url: endpoint+'api/contact/address',
				    type: 'POST',
			     	headers: {
				      'Accept': 'application/json',
				      'Content-Type': 'application/json'
				    },

   					   data: JSON.stringify({
   					   	  contactId : contactId,
   					   	  type: type,
			     		  number: number,
						  street: street,
						  unit: unit,
						  city: city,
						  state: state,
						  zipcode: zipcode
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