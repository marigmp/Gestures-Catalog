YUI.add("aui-arraysort",function(e,t){ASort=e.ArraySort,e.mix(ASort,{compareIgnoreWhiteSpace:function(e,t,n,r){var i;return r=r||ASort.compare,e===""&&t===""?i=0:e===""?i=1:t===""?i=-1:i=r.apply(this,arguments),i},stableSort:function(e,t){var n,r=e.length;for(n=0;n<r;n++)e[n]={index:n,value:e[n]};e.sort(function(n,r){var i=t.call(e,n.value,r.value);return i===0?n.index-r.index:i});for(n=0;n<r;n++)e[n]=e[n].value}})},"2.5.0",{requires:["arraysort"]});
