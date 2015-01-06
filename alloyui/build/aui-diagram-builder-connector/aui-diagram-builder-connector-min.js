YUI.add("aui-diagram-builder-connector",function(e,t){var n=e.Lang,r=n.isArray,i=n.isBoolean,s=n.isObject,o=n.isString,u=e.Array,a=function(e){return e*e*e},f=function(e){return 3*e*e*(1-e)},l=function(e){return 3*e*(1-e)*(1-e)},c=function(e){return(1-e)*(1-e)*(1-e)},h=function(e,t,n,r,i){var s=t[0]*a(e)+r[0]*f(e)+i[0]*l(e)+n[0]*c(e),o=t[1]*a(e)+r[1]*f(e)+i[1]*l(e)+n[1]*c(e);return[s,o]},p=function(t){return e.instanceOf(t,e.Graphic)},d=function(e){return e*180/Math.PI},v=function(e){return e===0?0:e<0?-1:1},m=e.getClassName,g=m("diagram","builder","connector","name"),y=m("hide");e.PolygonUtil={ARROW_POINTS:[[-12,-6],[-8,0],[-12,6],[6,0]],drawArrow:function(e,t,n,r,i,s){var o=this,u=Math.atan2(i-n,r-t);e.moveTo(r,i),r-=5*Math.cos(u),i-=5*Math.sin(u),o.drawPolygon(e,o.translatePoints(o.rotatePoints(s||o.ARROW_POINTS,u),r,i))},drawPolygon:function(e,t){var n=this;e.moveTo(t[0][0],t[0][1]),u.each(t,function(n,r){r>0&&e.lineTo(t[r][0],t[r][1])}),e.lineTo(t[0][0],t[0][1])},translatePoints:function(e,t,n){var r=this,i=[];return u.each(e,function(r,s){i.push([e[s][0]+t,e[s][1]+n])}),i},rotatePoints:function(e,t){var n=this,r=[];return u.each(e,function(i,s){r.push(n.rotatePoint(t,e[s][0],e[s][1]))}),r},rotatePoint:function(e,t,n){return[t*Math.cos(e)-n*Math.sin(e),t*Math.sin(e)+n*Math.cos(e)]}},e.Connector=e.Base.create("line",e.Base,[],{SERIALIZABLE_ATTRS:["color","lazyDraw","name","shapeSelected","shapeHover","p1","p2"],shape:null,shapeArrow:null,initializer:function(e){var t=this,n=t.get("lazyDraw");t.after({nameChange:t._afterNameChange,p1Change:t.draw,p2Change:t.draw,selectedChange:t._afterSelectedChange,showNameChange:t._afterShowNameChange,visibleChange:t._afterVisibleChange}),t._initShapes(),n||t.draw(),t._uiSetVisible(t.get("visible")),t._uiSetName(t.get("name")),t._uiSetSelected(t.get("selected"),!n),t._uiSetShowName(t.get("showName"))},destructor:function(){var e=this;e.shape.destroy(),e.shapeArrow.destroy(),e.get("nodeName").remove()},draw:function(){var t=this,n=t.shape,r=t.shapeArrow,i=t.get("p1"),s=t.get("p2"),o=t.toCoordinate(i),u=t.toCoordinate(s),a=o[0],f=o[1],l=u[0],c=u[1],p=Math.max(Math.abs(a-l)/2,10),m=Math.max(Math.abs(f-c)/2,10),g=null,y=8,b=d(Math.atan2(c-f,l-a)),w=Math.round(Math.abs(b)/(360/y));v(b)<0?g=[[a+p,f,l-p,c,l,c],[a+p,f,l,f-m,l,c],[a,f-m,l,f-m,l,c],[a-p,f,l,f-m,l,c],[a-p,f,l+p,c,l,c]]:g=[[a+p,f,l-p,c,l,c],[a+p,f,l,f+m,l,c],[a,f+m,l,f+m,l,c],[a-p,f,l,f+m,l,c],[a-p,f,l+p,c,l,c]];var E=g[w];n.clear(),n.moveTo(a,f),n.curveTo.apply(n,E),n.end();var S=h(0,[a,f],[l,c],[E[0],E[1]],[E[2],E[3]]),x=h(.075,[a,f],[l,c],[E[0],E[1]],[E[2],E[3]]),T=h(.5,[a,f],[l,c],[E[0],E[1]],[E[2],E[3]]);return r.clear(),e.PolygonUtil.drawArrow(r,x[0],x[1],S[0],S[1],t.get("arrowPoints")),r.end(),t.get("showName")&&t.get("nodeName").center(t.toXY(T)),t},getProperties:function(){var e=this,t=e.getPropertyModel();return u.each(t,function(t){t.value=e.get(t.attributeName)}),t},getPropertyModel:function(){var t=this,n=t.getStrings();return[{attributeName:"name",editor:new e.TextCellEditor({validator:{rules:{value:{required:!0}}}}),name:n.name}]},getStrings:function(){return e.Connector.STRINGS},hide:function(){var e=this;return e.set("visible",!1),e},show:function(){var e=this;return e.set("visible",!0),e},toCoordinate:function(e){var t=this;return t._offsetXY(e,-1)},toJSON:function(){var e=this,t={};return u.each(e.SERIALIZABLE_ATTRS,function(n){t[n]=e.get(n)}),t},toXY:function(e){var t=this;return t._offsetXY(e,1)},_afterNameChange:function(e){var t=this;t._uiSetName(e.newVal),t.draw()},_afterSelectedChange:function(e){var t=this;t._uiSetSelected(e.newVal)},_afterShowNameChange:function(e){var t=this;t._uiSetShowName(e.newVal)},_afterVisibleChange:function(e){var t=this;t._uiSetVisible(e.newVal)},_initShapes:function(){var t=this,n=t.shape=t.get("graphic").addShape(t.get("shape")),r=t.shapeArrow=t.get("graphic").addShape(t.get("shapeArrow"));n.on("click",e.bind(t._onShapeClick,t)),n.on("mouseenter",e.bind(t._onShapeMouseEnter,t)),n.on("mouseleave",e.bind(t._onShapeMouseLeave,t)),r.on("click",e.bind(t._onShapeClick,t)),t.get("nodeName").on("click",e.bind(t._onShapeClick,t))},_offsetXY:function(e,t){var n=this,r=n.get("graphic").getXY();return[e[0]+r[0]*t,e[1]+r[1]*t]},_onShapeClick:function(e){var t=this,n=t.get("builder"),r=t.get("selected");n&&(e.hasModifier()?n.closeEditProperties():(n.unselectConnectors(),r?n.closeEditProperties():n.editConnector(t))),t.set("selected",!r),e.halt()},_onShapeMouseEnter:function(e){var t=this;if(!t.get("selected")){var n=t.get("shapeHover"),r=t.get("shapeArrowHover");n&&t._updateShape(t.shape,n),r&&t._updateShape(t.shapeArrow,r)}},_onShapeMouseLeave:function(e){var t=this;t.get("selected")||(t._updateShape(t.shape,t.get("shape")),t._updateShape(t.shapeArrow,t.get("shapeArrow")))},_setNodeName:function(t){var n=this;return e.instanceOf(t,e.Node)||(t=new e.Node.create(t),n.get("builder").canvas.append(t.unselectable())),t},_setShape:function(t){var n=this;return e.merge({type:"path",stroke:{color:n.get("color"),weight:2,opacity:1}},t)},_setShapeArrow:function(t){var n=this;return e.merge({type:"path",fill:{color:n.get("color"),opacity:1},stroke:{color:n.get("color"),weight:2,opacity:1}},t)},_uiSetName:function(e){var t=this;t.get("nodeName").html(e)},_uiSetSelected:function(e,t){var n=this;n._updateShape(n.shape,e?n.get("shapeSelected"):n.get("shape"),t),n._updateShape(n.shapeArrow,e?n.get("shapeArrowSelected"):n.get("shapeArrow"),t)},_uiSetShowName:function(e){var t=this;t.get("nodeName").toggleClass(y,!e)},_uiSetVisible:function(e){var t=this;t.shape.set("visible",e),t.shapeArrow.set("visible",e),t._uiSetShowName(e&&t.get("showName"))},_updateShape:function(e,t,n){var r=this;t.hasOwnProperty("fill")&&e.set("fill",t.fill),t.hasOwnProperty("stroke")&&e.set("stroke",t.stroke),n!==!1&&r.draw()}},{ATTRS:{arrowPoints:{value:e.PolygonUtil.ARROW_POINTS},builder:{},color:{value:"#27aae1",validator:o},graphic:{validator:p},lazyDraw:{value:!1,validator:i},name:{valueFn:function(
){var t=this;return"connector"+ ++e.Env._uidx},validator:o},nodeName:{setter:"_setNodeName",value:'<span class="'+g+'"></span>',writeOnce:!0},p1:{value:[0,0],validator:r},p2:{value:[0,0],validator:r},selected:{value:!1,validator:i},shape:{value:null,setter:"_setShape"},shapeArrow:{value:null,setter:"_setShapeArrow"},shapeArrowHover:{value:{fill:{color:"#ffd700"},stroke:{color:"#ffd700",weight:5,opacity:.8}}},shapeArrowSelected:{value:{fill:{color:"#ff6600"},stroke:{color:"#ff6600",weight:5,opacity:.8}}},shapeHover:{value:{stroke:{color:"#ffd700",weight:5,opacity:.8}}},shapeSelected:{value:{stroke:{color:"#ff6600",weight:5,opacity:.8}}},showName:{validator:i,value:!0},transition:{value:{},validator:s},visible:{validator:i,value:!0}},STRINGS:{name:"Name"}})},"2.5.0",{requires:["arraylist-add","arraylist-filter","json","graphics","dd"],skinnable:!0});
