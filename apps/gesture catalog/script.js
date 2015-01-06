var worksheet;
var rows;
var categories;
var paginationAllowed = false;
var tableID = "tableID";
var nbPagination = 5;

var public_spreadsheet_key = 'https://docs.google.com/spreadsheets/d/13qwCqlQBfqEpu3MZuqjIBHxhSMFI5-L5aVop1nxmIgU/pubhtml';


function sceneContainer() {	
	window.onload = function() { init() };	
}

function init() {
    worksheet = Tabletop.init( { key: public_spreadsheet_key, 
        callback: showInfo, 
        simpleSheet: true,
        debug: true } );
    //categories = worksheet.sheets("Main Worksheet").column_names;
}

// util function
function capitaliseFirstLetter(string) {
    
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

// helper for filtersContainer
function inArray(uniqueTypes, datai) {
    
    var exist = false;

    for(var i = 0; i < uniqueTypes.length; i++) {
        //if(uniqueTypes[i].toLowerCase() === datai.toLowerCase()) {
        if(datai.toLowerCase().indexOf(uniqueTypes[i].toLowerCase()) > -1) {
            exist = true;
        }
    }

    return exist;
}

// helper for filtersContainer
function listFilters(movies, colName) { // where data (rows) is an array of strings
    /*for(var i = 0; i < movies.length; i++) {
        console.log(movies[i][colName]);
    }*/
    var uniqueTypes = new Array();
    var next = 0;

    if(movies.length >= 0) {
        for(var i = 0; i < movies.length; i++) {
            if(movies[i][colName] != "-" && movies[i][colName] != "") {
                //console.log(movies[i][colName]);
                if(!inArray(uniqueTypes, movies[i][colName])) {
                    uniqueTypes[next] = capitaliseFirstLetter(movies[i][colName]);
                    //console.log(uniqueTypes[next]);
                    next++;
                }
            }
        }
    }
    return uniqueTypes;
}

function filtersContainer(rows, tabletop) {

    var tableCategories = tabletop.sheets("Main Worksheet").column_names;
    //categories =  tabletop.sheets("Main Worksheet").column_names;
    var div = document.getElementById('filtersContainer');
    var html = "<table align=\"left\" class=\"table\"><tr>";
    var arrayFilters = new Array();
    categories = tabletop.sheets("Main Worksheet").column_names;

    // 6 is the first valid filter column
    for(i = 6; i < tableCategories.length; i++) {
        //console.log('categories: ', categories);
        arrayFilters = listFilters(rows, tableCategories[i]);
        arrayFilters = arrayFilters.sort();

        html += "<td valign=\"top\" width=\"25%\"><div class=\"scrollbar\" id=\"style-3\" style=\"overflow: auto; height: 200px;\"><b>" + capitaliseFirstLetter(tableCategories[i]) + "</b><form>";

        for(var j = 0; j < arrayFilters.length; j++) {
            html += "<input id=\"" + tableCategories[i] + arrayFilters[j] + "\" type=\"checkbox\" name=\"domain\" value=\"X\">"+ arrayFilters[j] + "<br>";
        }        

        html += "</form></div></td>";
    }

    //console.log('log: ', tabletop.sheets("Main Worksheet").all());
    html += "</tr></table>";
    div.innerHTML = div.innerHTML + html;

    document.getElementById('buttonRefresh').innerHTML = "<button type=\"button\" class=\"btn btn-default\" style=\"position: relative; float: right;\" onclick=\"refreshMovies()\">Refresh</button></br>";
}

function refreshMovies() {
    var arrayFilters;
    var tempRows = rows.slice();
    var indexsLeft = new Array();
    var videosPerPage = 6;
    //console.log(tempRows[0]['title']);

    /* 
        Applying filters choice
    */
    for(i = 6; i < categories.length; i++) {
        var selectedArrayFilters = new Array();

        arrayFilters = listFilters(rows, categories[i]);
        for(var j = 0; j < arrayFilters.length; j++) {
            //console.log(arrayFilters[j]);
            if(document.getElementById(categories[i]+arrayFilters[j]).checked) {
                selectedArrayFilters[selectedArrayFilters.length] = arrayFilters[j];
                //console.log(selectedArrayFilters[selectedArrayFilters.length-1]);
            }
        }        

        for(var k = 0; k < tempRows.length; k++) {
            if(tempRows[k]) {
                //console.log(tempRows[k][categories[i]]);
                if(selectedArrayFilters.length != 0) {
                    var found = false;        
                    for(var j = 0; j < selectedArrayFilters.length && !found; j++) {   

                        if(tempRows[k][categories[i]].toLowerCase() == selectedArrayFilters[j].toLowerCase()) {
                            found = true;
                            break;
                        }
                    }
                    if(!found) {
                        delete tempRows[k];
                        //console.log(tempRows[k]);
                    }
                }
            }
        }
    }

    // -----------------------------------------------------------------------------------

    /* 
        Filling the table with the data of selected scenes 
    */

    var html="<table class=\"table table-hover\" align=\"left\" style=\"margin:20px;\">";
    html += "<tr><th><b> Index</th></b>";
    for(var k = 0; k < categories.length; k++) {
        html += "<th><b>"+capitaliseFirstLetter(categories[k].toLowerCase())+"</b></th>";
    }
    html += "</tr>";

// html += "<td valign=\"top\" width=\"25%\"><div id=\"filters1\" style=\"overflow: auto; height: 200px;\"><b>" + capitaliseFirstLetter(tableCategories[i]) + "</b><form>";


    var count = 1;
    for(var j = 0; j < tempRows.length; j++) {
        if(tempRows[j]) {
            //console.log(tempRows[j]['title']);
            indexsLeft[indexsLeft.length] = j;
            html += "<tr><td>" + (count++) + "</td>";
            for(var k = 0; k < categories.length; k++) {
                html += "<td><div class=\"scrollbar\" id=\"style-3\" style=\"overflow: auto; height: 100px; width: auto;\">"+tempRows[j][categories[k]]+"</div></td>";

            }
            html += "</tr>";
        }
    }
    html += "</table>";
    document.getElementById('tableContainer').innerHTML = html;

    // -----------------------------------------------------------------------------------

    /*
        Showing the selected scenes videos
    */

    var scenesHTML = "";
    for(var j = 0; j < indexsLeft.length/6; ++j) 
    {
        scenesHTML += "<table style=\"width:100%\">";

        for(var i = 0; i < 6; ++i)
        {
            //start table
            if(i % 3 == 0)
            {
                scenesHTML += "<tr>";
            }

            if(j*6 + i < indexsLeft.length) {
                var youtubeID = rows[indexsLeft[j*6 + i]]['youtubeid'];
                scenesHTML += 
                "<td><div class=\"youtube\" id=" + youtubeID + " style=\"width: 360px; height: 200px; float: left; border: 2px solid #000000; text-align: center;\"></div></td>";   
            }

            if(i % 3 == 2)
            {
                scenesHTML += "</tr>";
            }       

        }
        scenesHTML += "</table>";
    }
    //console.log(indexsLeft.length);
    document.getElementById('scenesContainer').innerHTML = scenesHTML;

    // ------------------------------------------------------------------------------------

    executeRawYoutubeScript();
    numberOfPages = indexsLeft.length / videosPerPage + 1;
    pagination(numberOfPages);
}

function chargeScenes() {

    var div_buttons = document.getElementById('button_div');    
    var html_div_buttons = "<a href=\"#\" class=\"btn\" id=\"play-btn\">Play</a>";

    document.getElementById('button_div').innerHTML += html_div_buttons;
/*    var div = document.getElementById('tabledebug');
    var html_div = "";*/
    YUI({ filter:'raw' }).use('aui-video', function(Y) {
        var video = new Y.Video({
            boudingBox: '#tabledebug',
            width: 360,
            height: 270,
            url: 'assets/parts/2.BlackMirror.15MillionMerits.HDTV.XviD-RiVER_part1.avi',
            poster: 'assets/posters/2.BlackMirror.15MillionMerits.HDTV.XviD-RiVER_part1.avi.jpg',
            fixedAttributes: {
                allowfullscreen: 'false'
            }
        }).render();
        video.load();
        Y.one('#play-btn').on('click', function(e) {
            e.preventDefault();

            video.play();
        });
    });

    
}

function showInfo(data, tabletop) {
    rows = data;
    var videosPerPage = 6;
    var numberOfPages; // MAX NUMBER OF PAGES DISPLAYED
    
    var categories = tabletop.sheets("Main Worksheet").column_names;    
    var scenesHTML = document.getElementById('scenesContainer').innerHTML;
    
    /*
        Showing the selected scenes videos
    */

    for(var j = 0; j < rows.length/6; ++j) 
    {
        scenesHTML += "<table style=\"width:100%\">";

        for(var i = 0; i < 6; ++i)
        {
            //start table
            if(i % 3 == 0)
            {
                scenesHTML += "<tr>";
            }

            if(j*6 + i < rows.length) {
                var youtubeID = rows[j*6 + i]['youtubeid'];
                scenesHTML += 
                "<td><div class=\"youtube\" id=" + youtubeID + " style=\"width: 360px; height: 200px; float: left; border: 2px solid #000000; text-align: center;\"></div></td>";   
            }

            if(i % 3 == 2)
            {
                scenesHTML += "</tr>";
            }       

        }
        scenesHTML += "</table>";
    }

    document.getElementById('scenesContainer').innerHTML = scenesHTML;

    executeRawYoutubeScript();
    numberOfPages = rows.length / videosPerPage + 1;
    pagination(numberOfPages);
    filtersContainer(rows, tabletop);
    chargeScenes();
    //refreshMovies();
/*  var div = document.getElementById('tabledebug');
    var html = "<h1>SHEET CATEGORIES: " + categories.length + "</h1>";
    var prop, i;
    for(i = 0; i < rows.length; i++) {
      for(prop in rows[i]) {
        html = html + "&nbsp;-&nbsp;" + rows[i][prop];
      }
      html = html + "<hr><br>";
    }
    div.innerHTML = div.innerHTML + html;
*/
}

//showing videos
function executeRawYoutubeScript(){
    var i,c,y,v,s,n;v=document.getElementsByClassName("youtube");
    if(v.length>0){s=document.createElement("style");s.type="text/css";s.innerHTML='.youtube{background-color:#000;max-width:100%;overflow:hidden;position:relative;cursor:hand;cursor:pointer}.youtube .thumb{bottom:0;display:block;left:0;margin:auto;max-width:100%;position:absolute;right:0;top:0;width:100%;height:auto}.youtube .play{filter:alpha(opacity=80);opacity:.8;height:77px;left:50%;margin-left:-38px;margin-top:-38px;position:absolute;top:50%;width:77px;background:url("data:image/png;base64,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") no-repeat}';document.body.appendChild(s)}for(n=0;n<v.length;n++){y=v[n];i=document.createElement("img");i.setAttribute("src","http://i.ytimg.com/vi/"+y.id+"/hqdefault.jpg");i.setAttribute("class","thumb");c=document.createElement("div");c.setAttribute("class","play");y.appendChild(i);y.appendChild(c);y.onclick=function(){var a=document.createElement("iframe");a.setAttribute("src","https://www.youtube.com/embed/"+this.id+"?autoplay=1&autohide=1&border=0&wmode=opaque&enablejsapi=1");a.style.width=this.style.width;a.style.height=this.style.height;this.parentNode.replaceChild(a,this)}};
   paginationAllowed = true;
}


function changePaginationContent(numberOfPages) {
    var div = document.getElementById('pagination');

    var html = "<ul class=\"pagination-content\"><li><a href=\"#\">Prev</a></li>";  

    for(i = 0; i < numberOfPages; i++) {
        html = html + "<li "+ "id=\""+"\"" + " ><a href=\"#\" style=\"color: gray\">" + i + "</a></li>";
    }

    html = html + "<li><a href=\"#\">Next</a></li>";
    div.innerHTML = html;
}

function pagination(numberOfPages) {

	changePaginationContent(numberOfPages);

    while(paginationAllowed) {
		
		YUI({filter:'raw'}).use(
		    'aui-pagination',
		    function(Y) {
		        var pages = Y.all('.content table'); // array[37]

		        new Y.Pagination({
		            contentBox: '#pagination .pagination-content',
		            circular: false,
		            page: 1,
                    total: numberOfPages,
                    maxPageLinks: 5,
		            after: {
            			changeRequest: function(event) {
		                    console.log(
		                        'page:', event.state.page,
		                        'getOffsetPageNumber:', this.getOffsetPageNumber());
	                	}
	            	},
                    strings: {
                      next: '»',
                      prev: '«'
                    },
		            on: {
		                changeRequest: function(event) {
		                    var instance = this,
		                        state = event.state,
		                        lastState = event.lastState;
		                          
		                    if(lastState) {
		                        pages.item(lastState.page - 1).setStyle('display','none');
		                    }
		                    pages.item(state.page - 1).setStyle('display', 'block');

                            $('ul.pagination-content li a').each(function(index, element){
                                var content = parseInt($(element).html());

                                if((content < state.page && numberOfPages - content >= nbPagination) || content >= state.page + nbPagination)
                                    $(element).parent().hide();
                                else
                                    $(element).parent().show();
                                });
		                }
		            }
		        }).render();
		    }
		);
		paginationAllowed = false;
	}
}