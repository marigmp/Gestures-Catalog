YUI.add("dd-plugin",function(e,t){var n=function(t){e.Widget&&t.host instanceof e.Widget?(t.node=t.host.get("boundingBox"),t.widget=t.host):(t.node=t.host,t.widget=!1),n.superclass.constructor.call(this,t)},r="drag:start",i="drag:drag",s="drag:end";n.NAME="dd-plugin",n.NS="dd",e.extend(n,e.DD.Drag,{_widgetHandles:null,_widget:undefined,_stoppedPosition:undefined,_usesWidgetPosition:function(t){var n=!1;return t&&(n=t.hasImpl&&t.hasImpl(e.WidgetPosition)?!0:!1),n},_checkEvents:function(){this._widget&&(this.proxy?this._widgetHandles.length>0&&this._removeWidgetListeners():this._widgetHandles.length===0&&this._attachWidgetListeners())},_removeWidgetListeners:function(){e.Array.each(this._widgetHandles,function(e){e.detach()}),this._widgetHandles=[]},_attachWidgetListeners:function(){this._usesWidgetPosition(this._widget)&&(this._widgetHandles.push(this.on(i,this._setWidgetCoords)),this._widgetHandles.push(this.on(s,this._updateStopPosition)))},initializer:function(e){this._widgetHandles=[],this._widget=e.widget,this.on(r,this._checkEvents),this._attachWidgetListeners()},_setWidgetCoords:function(e){var t=this._stoppedPosition||e.target.nodeXY,n=e.target.realXY,r=[n[0]-t[0],n[1]-t[1]];r[0]!==0&&r[1]!==0?this._widget.set("xy",n):r[0]===0?this._widget.set("y",n[1]):r[1]===0&&this._widget.set("x",n[0])},_updateStopPosition:function(e){this._stoppedPosition=e.target.realXY}}),e.namespace("Plugin"),e.Plugin.Drag=n},"patched-v3.16.0",{optional:["dd-constrain","dd-proxy"],requires:["dd-drag"]});
