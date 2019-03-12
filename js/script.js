var dataTable;
$(document).ready(function () {
	dataTable = $('#data').DataTable(
		{
			"language": {
				"url": "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Hebrew.json"
			},
			"columns": [
				{ "orderDataType": "dom-text", type: 'string' },
				{ "orderDataType": "dom-text", type: 'string' },
				{ "orderDataType": "dom-text", type: 'string' },
				{ "orderDataType": "dom-text", type: 'string' },
				{ "orderDataType": "dom-text", type: 'string' },
				{ "orderDataType": "dom-text", type: 'string' },
				{ "orderDataType": "dom-text", type: 'string' },
				{ "orderDataType": "dom-text", type: 'string' },
				{ "orderDataType": "dom-text", type: 'string' },
				null,
			]
		}
	);

});
/* Create an array with the values of all the input boxes in a column */
$.fn.dataTable.ext.order['dom-text'] = function  ( settings, col )
{
    return this.api().column( col, {order:'index'} ).nodes().map( function ( td, i ) {
        return $('input', td).val();
    } );
}
//initialize firebase
const firebaseObj = firebase.database().ref();

//check live changes and set table
firebaseObj.child("data").on('value', data => {
	console.log("data changed:", data.val());
	dataTable.clear().draw();
	
	data.forEach(snapshot => {
		var key = JSON.stringify(snapshot.key);
		var d = snapshot.val();
		dataTable.row.add([
			`<input type="text" data-key="${snapshot.key}" class="karteset" value="${d.karteset}" onfocusout=editRow(${key},"karteset") />`,
			`<input type="text" data-key="${snapshot.key}" class="tnuat_yoman" value="${d.tnuat_yoman}" onfocusout=editRow(${key},"tnuat_yoman") />`,
			`<input type="text" data-key="${snapshot.key}" class="taarich_maazan" value="${d.taarich_maazan}" onfocusout=editRow(${key},"taarich_maazan") />`,
			`<input type="text" data-key="${snapshot.key}" class="taarich_erech" value="${d.taarich_erech}" onfocusout=editRow(${key},"taarich_erech") />`,
			`<input type="text" data-key="${snapshot.key}" class="pratim" value="${d.pratim}" onfocusout=editRow(${key},"pratim") />`,
			`<input type="text" data-key="${snapshot.key}" class="asmachta" value="${d.asmachta}" onfocusout=editRow(${key},"asmachta") />`,
			`<input type="text" data-key="${snapshot.key}" class="hova" value="${d.hova}" onfocusout=editRow(${key},"hova") />`,
			`<input type="text" data-key="${snapshot.key}" class="zchut" value="${d.zchut}" onfocusout=editRow(${key},"zchut") />`,
			`<input type="text" data-key="${snapshot.key}" class="yitra" value="${d.yitra}" onfocusout=editRow(${key},"yitra") />`,
			`<button onclick=deleteRow(${key})>מחק</button>`
		]).draw(false);

		$(".karteset").focusout(function () {
			var karteset = $(this).val();
			var key = $(this).attr("data-key");
			console.log(karteset + " " + key);
			console.log($(this));
		});

	})
})

function editRow(key,className){
	var newValue = $(`.${className}[data-key=${key}]`).val();
	console.log(newValue);
	firebaseObj.child("data/" + key).update({
		[className]: newValue
	  });
	  
}

//Delete
function deleteRow(key) {
	firebaseObj.child("data/" + key).remove();
}
//Add
function setTR() {
	var newTr = {
		karteset: $("#karteset").val() !== '' ? $("#karteset").val() : '',
		tnuat_yoman: $("#tnuat_yoman").val() !== '' ? $("#tnuat_yoman").val() : '',
		taarich_maazan: $("#taarich_maazan").val() !== '' ? $("#taarich_maazan").val() : '',
		taarich_erech: $("#taarich_erech").val() !== '' ? $("#taarich_erech").val() : '',
		pratim: $("#pratim").val() !== '' ? $("#pratim").val() : '',
		asmachta: $("#asmachta").val() !== '' ? $("#asmachta").val() : '',
		hova: $("#hova").val() !== '' ? $("#hova").val() : '',
		zchut: $("#zchut").val() !== '' ? $("#zchut").val() : '',
		yitra: $("#yitra").val() !== '' ? $("#yitra").val() : '',
	}
	firebaseObj.child("data").push(newTr);
}

