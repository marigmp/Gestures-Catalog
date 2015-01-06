<div id="buttonsContainer"> 
                    </br>
                    <div id="pagination" class="pagination pagination-centered">
                        <ul class="pagination-content">
                            <li><a href="#">Prev</a></li>
                            <li><a href="#">1</a></li>
                            <li><a href="#">2</a></li>
                            <li><a href="#">3</a></li>
                            <li><a href="#">Next</a></li>
                        </ul>
                    </div>
                    <!-- <button id="hide" class="yui3-button">Hide</button>
                    <button id="show" class="yui3-button">Show</button>
                    <button id="toggle" class="yui3-button">Toggle</button>  -->

                    <script>
                        YUI().use(
                                'aui-pagination',
                                function(Y) {
                                    var pages = Y.all('.scenesContainer div');

                                    new Y.Pagination(
                                        {
                                            boundingBox: '#pagination',
                                            circular: false,
                                            contentBox: '#scenesContainer .pagination-content',
                                            on: {
                                                changeRequest: function(event) {
                                                    var instance = this,
                                                        state = event.state,
                                                        lastState = event.lastState;
                                                                            
                                                    if(lastState) {
                                                        pages.item(lastState.page - 1).setStyle('display', 'none');
                                                    }    

                                                    pages.item(state.page - 1).setStyle('display', 'block');
                                                }
                                            },
                                            page: 1
                                        }
                                    ).render();
                                }
                            );
                    </script>
                </div>
                </br>


                <li><a href="#">Prev</a></li>
                <li><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#">5</a></li>
                <li><a href="#">6</a></li>
                <li><a href="#">7</a></li>
                <li><a href="#">8</a></li>
                <li><a href="#">9</a></li>
                <li><a href="#">Next</a></li>











// function for create the quantity of button in the pagination
// ****remember to add one before pass pages to this function****
function paginationContent(pages) {
    var div = document.getElementById('pagination');

    var html = "<ul class=\"pagination-content\"><li><a href=\"#\">Prev</a></li>";    

    for(i = 0; i < pages; i++) {
        html = html + "<li><a href=\"#\">" + i + "</a></li>";
    }

    html = html + "<li><a href=\"#\">Next</a></li>"
    div.innerHTML = div.innerHTML + html;
}

/*<ul class="pagination-content">
    <li><a href="#">Prev</a></li>
    <li><a href="#">1</a></li>
    <li><a href="#">2</a></li>
    <li><a href="#">3</a></li>
    <li><a href="#">Next</a></li>
</ul>*/














































var worksheet;
                        var rows;
                        var categories;

                        window.onload = function() { init() };

                        //loading spreadsheet
                        var public_spreadsheet_key = '13qwCqlQBfqEpu3MZuqjIBHxhSMFI5-L5aVop1nxmIgU';
                        function init() {
                            worksheet = Tabletop.init( { key: public_spreadsheet_key,
                                             callback: showInfo,
                                             simpleSheet: true } );
                        }

                        // data comes through as a simple array since simpleSheet is turned on
                        function showInfo(data, tabletop) {
                            rows = data;
                            var categories = tabletop.sheets("Main Worksheet").column_names;

                            var div = document.getElementById('tabledebug');
                            var html = "<h1>SHEET CATEGORIES: " + categories.length + "</h1>";
                            var prop, i;

                            for(i = 0; i < rows.length; i++) {
                              for(prop in rows[i]) {
                                html = html + "&nbsp;-&nbsp;" + rows[i][prop];
                              }
                              html = html + "<hr><br>";
                            }
                            div.innerHTML = div.innerHTML + html;

                            var scenesHTML = document.getElementById('scenesContainer').innerHTML;
                            scenesHTML += "<table style=\"width:100%\">";

                            for(var i = 0; i < 6; ++i)
                            {
                                //start table
                                if(i % 3 == 0)
                                {
                                    scenesHTML += "<tr>";
                                }

                                var youtubeID = rows[i]['youtubeid'];
                                scenesHTML += 
                                "<td><div class=\"youtube\" id=" + youtubeID + " style=\"width: 360px; height: 200px; float: left; border: 2px solid #000000;\"></div></td>";
                                
                                if(i % 3 == 2)
                                {
                                    scenesHTML += "</tr>";
                                }
                            }
                            scenesHTML += "</table>";
                            document.getElementById('scenesContainer').innerHTML = scenesHTML;
                            executeRawYoutubeScript();
                        }

                    
                        //showing videos
                        function executeRawYoutubeScript(){
                            var i,c,y,v,s,n;v=document.getElementsByClassName("youtube");if(v.length>0){s=document.createElement("style");s.type="text/css";s.innerHTML='.youtube{background-color:#000;max-width:100%;overflow:hidden;position:relative;cursor:hand;cursor:pointer}.youtube .thumb{bottom:0;display:block;left:0;margin:auto;max-width:100%;position:absolute;right:0;top:0;width:100%;height:auto}.youtube .play{filter:alpha(opacity=80);opacity:.8;height:77px;left:50%;margin-left:-38px;margin-top:-38px;position:absolute;top:50%;width:77px;background:url("data:image/png;base64,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") no-repeat}';document.body.appendChild(s)}for(n=0;n<v.length;n++){y=v[n];i=document.createElement("img");i.setAttribute("src","http://i.ytimg.com/vi/"+y.id+"/hqdefault.jpg");i.setAttribute("class","thumb");c=document.createElement("div");c.setAttribute("class","play");y.appendChild(i);y.appendChild(c);y.onclick=function(){var a=document.createElement("iframe");a.setAttribute("src","https://www.youtube.com/embed/"+this.id+"?autoplay=1&autohide=1&border=0&wmode=opaque&enablejsapi=1");a.style.width=this.style.width;a.style.height=this.style.height;this.parentNode.replaceChild(a,this)}};
                        }
                    </script> 












                    var w = 380;
                    var h = 210;

                    YUI({ filter: 'raw' }).use('aui-datatable', function(Y) {        

                        var tableColumns = [];
                        for(var categorie in categories)
                        {
                            tableColumns.push({key: categorie, sortable: true});
                        }

                        var data = [
                            { name: 'teste', address: '3271 Another Ave', city: 'New York', state: 'AL', amount: 3, active: 'no', colors: ['red','blue'], fruit: ['apple'], date: '2013-01-01' },
                            { name: 'Bob C. Uncle', address: '9996 Random Road', city: 'Los Angeles', state: 'CA', amount: 0, active: 'maybe', colors: ['green'], fruit: ['cherry'], date: '2013-01-01' },
                            { name: 'John D. Smith', address: '1623 Some Street', city: 'San Francisco', state: 'CA', amount: 5, active: 'yes', colors: ['red'], fruit: ['cherry'], date: '' },
                            { name: 'Joan E. Jones', address: '3217 Another Ave', city: 'New York', state: 'KY', amount: 3, active: 'no', colors: ['red','blue'], fruit: ['apple','cherry'], date: '2013-01-06' }
                        ];

                        new Y.DataTable({
                            boundingBox: '#tableContainer',
                            columns: [
                                {
                                    key: 'name',
                                    sortable: true,
                                    editor: new Y.TextAreaCellEditor({
                                        on: {
                                            save: function(event) {
                                                console.log('save', event.newVal);
                                            },
                                            cancel: function(event) {
                                                console.log('cancel', event);
                                            }
                                        },
                                        validator: {
                                            rules: {
                                                value: {
                                                    required: true
                                                }
                                            }
                                        }
                                    })
                                },
                                {
                                    key: 'address',
                                    editor: new Y.TextAreaCellEditor()
                                },
                                {
                                    key: 'city',
                                    editor: new Y.TextAreaCellEditor()
                                },
                                {
                                    key: 'state',
                                    editor: new Y.DropDownCellEditor({
                                        editable: true,
                                        options: ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA"]
                                    })
                                },
                                'amount',
                                {
                                    key:"active",
                                    editor: new Y.RadioCellEditor({
                                        editable: true,
                                        options: {
                                            yes: 'Yes',
                                            no: 'No',
                                            maybe: 'Maybe'
                                        }
                                    })
                                },
                                {
                                    key:"colors",
                                    editor: new Y.CheckboxCellEditor({
                                        editable: true,
                                        multiple: true,
                                        options: {
                                            red: 'Red',
                                            green: 'Green',
                                            blue: 'Blue'
                                        }
                                    })
                                },
                                {
                                    key: 'fruit',
                                    sortable: true,
                                    editor: new Y.DropDownCellEditor({
                                        editable: true,
                                        multiple: true,
                                        options: {
                                            apple: 'Apple',
                                            cherry: 'Cherry',
                                            banana: 'Banana',
                                            kiwi: 'Kiwi'
                                        }
                                    })
                                },
                                {
                                    key: 'date',
                                    sortable: true,
                                    editor: new Y.DateCellEditor({
                                        calendar: {
                                            width:'400px',
                                            showPrevMonth: true,
                                            showNextMonth: true,
                                            selectionMode: 'multiple'
                                        }
                                    })
                                }
                            ],
                            data: data,
                            editEvent: 'dblclick',
                            plugins: [
                                {
                                    fn: Y.Plugin.DataTableHighlight,
                                    cfg: {
                                        // highlightRange: false,
                                        // type: 'rows',
                                        // activeBorderWidth: 5,
                                        // rangeBorderWidth: 1
                                    }
                                }
                            ]
                        }).render();

                    });
                    
                    YUI().use('node', function(Y) {
                        Y.delegate('click', function(e) {
                            var buttonID = e.currentTarget.get('id'),
                                node = Y.one('#cell11');
                                
                            if (buttonID === 'show') {
                                node.show();
                            } else if (buttonID === 'hide') {
                                node.hide();
                            } else if (buttonID === 'toggle') {
                                node.toggleView();
                            }

                        }, document, 'button');
                    });
                </script>
