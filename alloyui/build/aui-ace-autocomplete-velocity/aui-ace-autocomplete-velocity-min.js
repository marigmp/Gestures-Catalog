YUI.add("aui-ace-autocomplete-velocity",function(e,t){var n=e.Lang,r=e.AceEditor.AutoCompleteBase,i=0,s=1,o=e.Base.create("aui-ace-autocomplete-velocity",e.AceEditor.TemplateProcessor,[],{getMatch:function(e){var t=this,n,r;return(r=e.lastIndexOf("#"))>=0?(e=e.substring(r),t.get("directivesMatcher").test(e)&&(n={content:e.substring(1),start:r,type:i})):(r=e.lastIndexOf("$"))>=0&&(e=e.substring(r),t.get("variablesMatcher").test(e)&&(n={content:e.substring(1),start:r,type:s})),n}},{NAME:"aui-ace-autocomplete-velocity",NS:"aui-ace-autocomplete-velocity",ATTRS:{directives:{validator:n.isArray,value:["else","elseif","foreach","if","include","macro","parse","set","stop"]},directivesMatcher:{setter:"_setRegexValue",value:/#[\w]*[^#]*$/},host:{validator:n.isObject},variables:{validator:n.isObject},variablesMatcher:{setter:"_setRegexValue",value:/\$[\w., ()"]*(?:[^$]|\\\$)*$/}}});e.AceEditor.AutoCompleteVelocity=o},"2.5.0",{requires:["aui-ace-autocomplete-templateprocessor"]});
