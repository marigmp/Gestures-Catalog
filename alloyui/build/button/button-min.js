YUI.add("button",function(e,t){function o(){o.superclass.constructor.apply(this,arguments)}function u(){o.superclass.constructor.apply(this,arguments)}var n=e.ButtonCore,r=n.CLASS_NAMES,i=n.ARIA_STATES,s=n.ARIA_ROLES;e.extend(o,e.Widget,{BOUNDING_TEMPLATE:n.prototype.TEMPLATE,CONTENT_TEMPLATE:null},{NAME:n.NAME,ATTRS:n.ATTRS,HTML_PARSER:{labelHTML:n._getHTMLFromNode,disabled:n._getDisabledFromNode},CLASS_NAMES:r}),e.mix(o.prototype,n.prototype),e.extend(u,o,{trigger:"click",selectedAttrName:"",initializer:function(e){var t=this,n=t.get("type"),r=n==="checkbox"?"checked":"pressed",i=e[r]||!1;t.addAttr(r,{value:i}),t.selectedAttrName=r},destructor:function(){delete this.selectedAttrName},bindUI:function(){var e=this,t=e.get("contentBox");u.superclass.bindUI.call(e),t.on(e.trigger,e.toggle,e),e.after(e.selectedAttrName+"Change",e._afterSelectedChange)},syncUI:function(){var e=this,t=e.get("contentBox"),n=e.get("type"),r=u.ARIA_ROLES,i=n==="checkbox"?r.CHECKBOX:r.TOGGLE,s=e.selectedAttrName;u.superclass.syncUI.call(e),t.set("role",i),e._uiSetSelected(e.get(s))},_afterSelectedChange:function(e){this._uiSetSelected(e.newVal)},_uiSetSelected:function(e){var t=this,n=t.get("contentBox"),r=u.ARIA_STATES,i=t.get("type"),s=i==="checkbox"?r.CHECKED:r.PRESSED;n.toggleClass(o.CLASS_NAMES.SELECTED,e),n.set(s,e)},toggle:function(){var e=this;e._set(e.selectedAttrName,!e.get(e.selectedAttrName))}},{NAME:"toggleButton",ATTRS:{type:{value:"toggle",writeOnce:"initOnly"}},HTML_PARSER:{checked:function(e){return e.hasClass(r.SELECTED)},pressed:function(e){return e.hasClass(r.SELECTED)}},ARIA_STATES:i,ARIA_ROLES:s,CLASS_NAMES:r}),e.Button=o,e.ToggleButton=u},"patched-v3.16.0",{requires:["button-core","cssbutton","widget"]});
