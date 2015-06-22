var public_spreadsheet_key = 'https://docs.google.com/spreadsheets/d/13qwCqlQBfqEpu3MZuqjIBHxhSMFI5-L5aVop1nxmIgU/pubhtml';
var html = "";


function init() {
  Tabletop.init( { key: public_spreadsheet_key,
                   callback: showInfo,
                   simpleSheet: true } )
}

function showInfo(data) {
		html += "<table id=\"cadu\" border=1><tr><th>Index</th><th>Movie</th><th>Gesture</th><th>Task</th><th>Pattern</th><th>Type</th><th>Manipulation</th><th>Telekinesis</th><th>Year</th><th>Feedback</th><th>Input</th><th>Output</th><th>Domain</th><th>Production</th></tr>";
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
		html += "</tr>";
		}
		html += "</table>";		
		document.getElementById('tableContainer').innerHTML = html;
}

