YUI.add("aui-image-viewer-gallery",function(e,t){var n=e.Lang,r=n.isBoolean,i=n.isNumber,s=n.isObject,o=n.isString,u=function(){return Array.prototype.slice.call(arguments).join(" ")},a=e.getClassName,f=a("icon","pause"),l=a("icon","play"),c=a("image-gallery","pagination"),h=a("image-gallery","pagination","thumb"),p=a("image-gallery","player"),d=a("image-gallery","player","content"),v=a("well"),m='<div class="'+c+'"></div>',g='<li><a class="'+u(h,v)+'"><img src="{src}" /></a></li>',y='<div class="'+p+'"></div>',b='<span class="'+d+'"></span>',w=e.Component.create({NAME:"image-gallery",ATTRS:{autoPlay:{value:!1,validator:r},delay:{value:7e3,validator:i},pagination:{value:{},setter:function(t){var n=this;return e.merge({formatter:e.bind(n._thumbnailFormatter,n),after:{changeRequest:function(e){n.fire("changeRequest",{lastState:e.lastState,state:e.state})}},render:n.get("paginationEl"),showControls:!1},t)},validator:s},paginationEl:{readyOnly:!0,valueFn:function(){return e.Node.create(m)}},paginationInstance:{value:null},paused:{value:!1,validator:r},pausedLabel:{value:"",validator:o},playing:{value:!1,validator:r},playingLabel:{value:"(playing)",validator:o},repeat:{value:!0,validator:r},showPlayer:{value:!0,validator:r},toolbar:{value:{},setter:"_setToolbar",validator:s},useOriginalImage:{value:!1,validator:r}},EXTENDS:e.ImageViewer,prototype:{toolbar:null,_timer:null,renderUI:function(){var e=this;w.superclass.renderUI.apply(this,arguments),e._renderPagination(),e.get("showPlayer")&&e._renderPlayer()},bindUI:function(){var e=this;w.superclass.bindUI.apply(this,arguments),e.on("playingChange",e._onPlayingChange),e.on("pausedChange",e._onPausedChange),e.on("currentIndexChange",e._onCurrentIndexChange),e.publish("changeRequest",{defaultFn:this._changeRequest})},destroy:function(){var e=this;w.superclass.destroy.apply(this,arguments),e.get("paginationInstance").destroy(),e.toolbar.destroy()},hidePagination:function(){var e=this;e.get("paginationEl").hide()},pause:function(){var e=this;e.set("paused",!0),e.set("playing",!1),e._syncInfoUI()},play:function(){var e=this;e.set("paused",!1),e.set("playing",!0),e._syncInfoUI()},show:function(){var t=this,n=t.getCurrentLink();if(n){e.ImageViewer.superclass.show.apply(this,arguments);var r=t.get("paginationInstance");r._dispatchRequest({page:t.get("currentIndex")+1})}},showPagination:function(){var e=this;e.get("paginationEl").show()},_cancelTimer:function(){var e=this;e._timer&&e._timer.cancel()},_renderPagination:function(){var t=this,n=t.get("paginationEl");e.one("body").append(n.hide());var r=(new e.Pagination(t.get("pagination"))).render();t.set("paginationInstance",r)},_renderPlayer:function(){var t=this,n=t.get("paginationEl"),r=e.Node.create(b);n.append(e.Node.create(y).append(r)),t.toolbar=(new e.Toolbar(t.get("toolbar"))).render(r)},_setToolbar:function(t){var n=this;return n.get("showPlayer")&&(t=e.merge({children:[[{icon:l,on:{click:e.bind(n.play,n)}},{icon:f,on:{click:e.bind(n.pause,n)}}]]},t)),t},_startTimer:function(){var t=this,n=t.get("delay");t._cancelTimer(),t._timer=e.later(n,t,t._syncSlideShow)},_syncControlsUI:function(){var e=this;w.superclass._syncControlsUI.apply(this,arguments),e.get("visible")?e.showPagination():(e.hidePagination(),e._cancelTimer())},_syncSlideShow:function(){var e=this;e.hasNext()||(e.get("repeat")?e.set("currentIndex",-1):e._cancelTimer()),e.next()},_changeRequest:function(e){var t=this,n=e.state,r=e.lastState,i=n.page;if(!t.get("visible"))return!1;if(!r||r&&r.page!=i)t.set("currentIndex",i-1),t._processChangeRequest();var s=t.get("links").size(),o=t.get("paginationInstance"),u=o.get("total");if(s>u){var a=parseInt(i/u,10)*u+1;i%u===0&&(a-=u),i=i%u||u,o.set("offset",a),o.setState({page:i})}},_processChangeRequest:function(){var e=this;e.loadImage(e.getCurrentLink().attr("href"));var t=e.get("paused"),n=e.get("playing");n&&!t&&e._startTimer()},_thumbnailFormatter:function(e){var t=this,r=t.get("paginationInstance"),i=t.get("links").size(),s=e-1;if(e>i)return"";var o=t.getLink(s),u=null;if(t.get("useOriginalImage"))u=o.attr("href");else{var a=o.one("img");a&&(u=a.attr("src"))}return n.sub(g,{src:u})},_getInfoTemplate:function(e){var t,n=this,r=n.get("paused"),i=n.get("playing");return i?t=n.get("playingLabel"):r&&(t=n.get("pausedLabel")),u(w.superclass._getInfoTemplate.apply(this,arguments),t)},_afterVisibleChange:function(e){var t=this;w.superclass._afterVisibleChange.apply(this,arguments),e.newVal&&t.get("autoPlay")&&t.play()},_onPausedChange:function(e){var t=this;e.newVal&&t._cancelTimer()},_onPlayingChange:function(e){var t=this;e.newVal&&t._startTimer()}}});e.ImageGallery=w},"2.5.0",{requires:["aui-image-viewer-base","aui-pagination","aui-toolbar"],skinnable:!0});
