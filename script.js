var public_spreadsheet_key = 'https://docs.google.com/spreadsheets/d/13qwCqlQBfqEpu3MZuqjIBHxhSMFI5-L5aVop1nxmIgU/pubhtml';
var html = "";


function init() {
  Tabletop.init( { key: public_spreadsheet_key,
                   callback: showInfo,
                   simpleSheet: true } )
}

function showInfo(data) {
	console.log(data);
		html += "<table id=\"cadu\" border=1><thead><th>Index</th><th>Movie</th><th>Gesture</th><th>Task</th><th>Pattern</th><th>Type</th><th>Manipulation</th><th>Telekinesis</th><th>Year</th><th>Feedback</th><th>Input</th><th>Output</th><th>Domain</th><th>Production</th><th id=\"botao\"></th></thead>";
		html += "<tbody>"
		for (i = 0; i < data.length; i++) { 
		html += "<tr>";
		html += "<td>" + (i+1) + "</td>";
		html += "<td>" + data[i].Movie + "</td>";
		html += "<td>" + data[i].Gesture + "</td>";
		html += "<td>" + data[i].Task + "</td>";
		html += "<td>" + data[i].Pattern + "</td>";
		html += "<td>" + data[i].Type + "</td>";
		html += "<td>" + data[i].Manipulation + "</td>";
		html += "<td>" + data[i].Telekinesis + "</td>";
		html += "<td>" + data[i].Year + "</td>";
		html += "<td>" + data[i].Feedback + "</td>";
		html += "<td>" + data[i].Input + "</td>";
		html += "<td>" + data[i].Output + "</td>";
		html += "<td>" + data[i].Domain + "</td>";
		html += "<td>" + data[i].Production + "</td>";
		html += "<td><button class=\"btn\" data-toggle=\"modal\" data-target=\"#myModal"+i+"\">Launch media</button>";
		html += "<div id=\"myModal"+i+"\" class=\"modal fade\"><div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button><h4 class=\"modal-title\">Modal title</h4></div><div class=\"modal-body\"><iframe width=\"420\" height=\"315\" src=\"https://www.youtube.com/embed/bAOle-FM3tc\" frameborder=\"0\" allowfullscreen></iframe></div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button><button type=\"button\" class=\"btn btn-primary\">Save changes</button></div></div><!-- /.modal-content --></div><!-- /.modal-dialog --></div><!-- /.modal -->"
		html += "</td>"
		html += "</tr>";
		}
		html += "</tbody>";
		html += "</table>";		
		document.getElementById('tableContainer').innerHTML = html;/*
		var $records = $(JSON.stringify(data)),
			myRecords = JSON.parse($records.text());
		$('#cadu').dynatable({
		  dataset: {
			records: myRecords
		  }
		});*/


}

