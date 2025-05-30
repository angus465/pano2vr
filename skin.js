// Garden Gnome Software - Skin
// Pano2VR 6.1.9/17985
// Filename: a.ggsk
// Generated 2025-05-29T16:31:28

function pano2vrSkin(player,base) {
	player.addVariable('vis_info_popup', 2, false);
	player.addVariable('dthotsopt', 2, false);
	player.addVariable('vis_image_popup', 2, false);
	player.addVariable('menu_open', 2, false);
	player.addVariable('menu_touch', 2, false);
	player.addVariable('menu_cloner', 1, 0);
	player.addVariable('category_var', 0, "");
	player.addVariable('category_visible', 2, false);
	player.addVariable('node_visible', 2, false);
	var me=this;
	var skin=this;
	var flag=false;
	var hotspotTemplates={};
	var skinKeyPressed = 0;
	this.player=player;
	this.player.skinObj=this;
	this.divSkin=player.divSkin;
	this.ggUserdata=player.userdata;
	this.lastSize={ w: -1,h: -1 };
	var basePath="";
	// auto detect base path
	if (base=='?') {
		var scripts = document.getElementsByTagName('script');
		for(var i=0;i<scripts.length;i++) {
			var src=scripts[i].src;
			if (src.indexOf('skin.js')>=0) {
				var p=src.lastIndexOf('/');
				if (p>=0) {
					basePath=src.substr(0,p+1);
				}
			}
		}
	} else
	if (base) {
		basePath=base;
	}
	this.elementMouseDown=[];
	this.elementMouseOver=[];
	var cssPrefix='';
	var domTransition='transition';
	var domTransform='transform';
	var prefixes='Webkit,Moz,O,ms,Ms'.split(',');
	var i;
	var hs,el,els,elo,ela,elHorScrollFg,elHorScrollBg,elVertScrollFg,elVertScrollBg,elCornerBg;
	if (typeof document.body.style['transform'] == 'undefined') {
		for(var i=0;i<prefixes.length;i++) {
			if (typeof document.body.style[prefixes[i] + 'Transform'] !== 'undefined') {
				cssPrefix='-' + prefixes[i].toLowerCase() + '-';
				domTransition=prefixes[i] + 'Transition';
				domTransform=prefixes[i] + 'Transform';
			}
		}
	}
	
	player.setMargins(0,0,0,0);
	
	this.updateSize=function(startElement) {
		var stack=[];
		stack.push(startElement);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggUpdatePosition) {
				e.ggUpdatePosition();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	
	this.callNodeChange=function(startElement) {
		var stack=[];
		stack.push(startElement);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggNodeChange) {
				e.ggNodeChange();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	player.addListener('changenode', function() { me.ggUserdata=player.userdata; me.callNodeChange(me.divSkin); });
	
	var parameterToTransform=function(p) {
		var hs='translate(' + p.rx + 'px,' + p.ry + 'px) rotate(' + p.a + 'deg) scale(' + p.sx + ',' + p.sy + ')';
		return hs;
	}
	
	this.findElements=function(id,regex) {
		var r=[];
		var stack=[];
		var pat=new RegExp(id,'');
		stack.push(me.divSkin);
		while(stack.length>0) {
			var e=stack.pop();
			if (regex) {
				if (pat.test(e.ggId)) r.push(e);
			} else {
				if (e.ggId==id) r.push(e);
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
		return r;
	}
	
	this.addSkin=function() {
		var hs='';
		this.ggCurrentTime=new Date().getTime();
		el=me._menu_background=document.createElement('div');
		el.ggId="menu_background";
		el.ggDy=-6;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : rgba(0,0,0,0.501961);';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 100%;';
		hs+='position : absolute;';
		hs+='right : 0px;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 287px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='100% 50%';
		me._menu_background.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._menu_background.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('category_visible') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._menu_background.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._menu_background.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._menu_background.style[domTransition]='opacity 500ms ease 0ms';
				if (me._menu_background.ggCurrentLogicStateAlpha == 0) {
					me._menu_background.style.visibility=me._menu_background.ggVisible?'inherit':'hidden';
					me._menu_background.style.opacity=1;
				}
				else {
					me._menu_background.style.visibility=me._menu_background.ggVisible?'inherit':'hidden';
					me._menu_background.style.opacity=1;
				}
			}
		}
		me._menu_background.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me._buttons_social=document.createElement('div');
		el.ggId="buttons_social";
		el.ggDx=-632;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='bottom : 24px;';
		hs+='height : 32px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 64px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='100% 100%';
		me._buttons_social.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._buttons_social.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		el=me._image_140=document.createElement('div');
		els=me._image_140__img=document.createElement('img');
		els.className='ggskin ggskin_image_140';
		hs=basePath + 'images/image_140.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 14";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='bottom : -28px;';
		hs+='cursor : pointer;';
		hs+='height : 83px;';
		hs+='position : absolute;';
		hs+='right : -553px;';
		hs+='visibility : inherit;';
		hs+='width : 115px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='100% 100%';
		me._image_140.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._image_140.onclick=function (e) {
			player.openUrl("https:\/\/www.facebook.com\/@TAINAN.FOSSIL\/","");
		}
		me._image_140.ggUpdatePosition=function (useTransition) {
		}
		me._buttons_social.appendChild(me._image_140);
		el=me._image_16=document.createElement('div');
		els=me._image_16__img=document.createElement('img');
		els.className='ggskin ggskin_image_16';
		hs=basePath + 'images/image_16.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 16";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='bottom : -29px;';
		hs+='cursor : pointer;';
		hs+='height : 83px;';
		hs+='position : absolute;';
		hs+='right : -653px;';
		hs+='visibility : inherit;';
		hs+='width : 115px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='100% 100%';
		me._image_16.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._image_16.onclick=function (e) {
			player.openUrl("https:\/\/www.youtube.com\/@%E8%87%BA%E5%8D%97%E5%B7%A6%E9%8E%AE%E5%8C%96%E7%9F%B3%E5%9C%92%E5%8D%80-p8q","");
		}
		me._image_16.ggUpdatePosition=function (useTransition) {
		}
		me._buttons_social.appendChild(me._image_16);
		el=me._image_15=document.createElement('div');
		els=me._image_15__img=document.createElement('img');
		els.className='ggskin ggskin_image_15';
		hs=basePath + 'images/image_15.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 15";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='bottom : -30px;';
		hs+='cursor : pointer;';
		hs+='height : 83px;';
		hs+='position : absolute;';
		hs+='right : -753px;';
		hs+='visibility : inherit;';
		hs+='width : 115px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='100% 100%';
		me._image_15.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._image_15.onclick=function (e) {
			player.openUrl("https:\/\/www.instagram.com\/tainan.fossil\/","");
		}
		me._image_15.ggUpdatePosition=function (useTransition) {
		}
		me._buttons_social.appendChild(me._image_15);
		me._menu_background.appendChild(me._buttons_social);
		el=me._image_27=document.createElement('div');
		els=me._image_27__img=document.createElement('img');
		els.className='ggskin ggskin_image_27';
		hs=basePath + 'images/image_27.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 27";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 112px;';
		hs+='left : 53px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 415px;';
		hs+='visibility : hidden;';
		hs+='width : 268px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_27.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._image_27.onclick=function (e) {
			if (player.transitionsDisabled) {
				me._node_scroller_5.style[domTransition]='none';
			} else {
				me._node_scroller_5.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._node_scroller_5.style.opacity='1';
			me._node_scroller_5.style.visibility=me._node_scroller_5.ggVisible?'inherit':'hidden';
			if (player.transitionsDisabled) {
				me._image_28.style[domTransition]='none';
			} else {
				me._image_28.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_28.style.opacity='1';
			me._image_28.style.visibility=me._image_28.ggVisible?'inherit':'hidden';
			var flag=me._image_19.ggOpacitiyActive;
			if (player.transitionsDisabled) {
				me._image_19.style[domTransition]='none';
			} else {
				me._image_19.style[domTransition]='all 0ms ease-out 0ms';
			}
			if (flag) {
				me._image_19.style.opacity='0';
				me._image_19.style.visibility='hidden';
			} else {
				me._image_19.style.opacity='0';
				me._image_19.style.visibility='hidden';
			}
			me._image_19.ggOpacitiyActive=!flag;
			var flag=me._image_200.ggOpacitiyActive;
			if (player.transitionsDisabled) {
				me._image_200.style[domTransition]='none';
			} else {
				me._image_200.style[domTransition]='all 0ms ease-out 0ms';
			}
			if (flag) {
				me._image_200.style.opacity='0';
				me._image_200.style.visibility='hidden';
			} else {
				me._image_200.style.opacity='0';
				me._image_200.style.visibility='hidden';
			}
			me._image_200.ggOpacitiyActive=!flag;
			var flag=me._image_21.ggOpacitiyActive;
			if (player.transitionsDisabled) {
				me._image_21.style[domTransition]='none';
			} else {
				me._image_21.style[domTransition]='all 0ms ease-out 0ms';
			}
			if (flag) {
				me._image_21.style.opacity='0';
				me._image_21.style.visibility='hidden';
			} else {
				me._image_21.style.opacity='0';
				me._image_21.style.visibility='hidden';
			}
			me._image_21.ggOpacitiyActive=!flag;
			var flag=me._image_25.ggOpacitiyActive;
			if (player.transitionsDisabled) {
				me._image_25.style[domTransition]='none';
			} else {
				me._image_25.style[domTransition]='all 0ms ease-out 0ms';
			}
			if (flag) {
				me._image_25.style.opacity='0';
				me._image_25.style.visibility='hidden';
			} else {
				me._image_25.style.opacity='0';
				me._image_25.style.visibility='hidden';
			}
			me._image_25.ggOpacitiyActive=!flag;
			var flag=me._image_27.ggOpacitiyActive;
			if (player.transitionsDisabled) {
				me._image_27.style[domTransition]='none';
			} else {
				me._image_27.style[domTransition]='all 0ms ease-out 0ms';
			}
			if (flag) {
				me._image_27.style.opacity='0';
				me._image_27.style.visibility='hidden';
			} else {
				me._image_27.style.opacity='0';
				me._image_27.style.visibility='hidden';
			}
			me._image_27.ggOpacitiyActive=!flag;
		}
		me._image_27.ggUpdatePosition=function (useTransition) {
		}
		me._menu_background.appendChild(me._image_27);
		el=me._image_25=document.createElement('div');
		els=me._image_25__img=document.createElement('img');
		els.className='ggskin ggskin_image_25';
		hs=basePath + 'images/image_25.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 25";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 126px;';
		hs+='left : 37px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 311px;';
		hs+='visibility : hidden;';
		hs+='width : 298px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_25.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._image_25.onclick=function (e) {
			if (player.transitionsDisabled) {
				me._node_scroller_4.style[domTransition]='none';
			} else {
				me._node_scroller_4.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._node_scroller_4.style.opacity='1';
			me._node_scroller_4.style.visibility=me._node_scroller_4.ggVisible?'inherit':'hidden';
			if (player.transitionsDisabled) {
				me._image_26.style[domTransition]='none';
			} else {
				me._image_26.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_26.style.opacity='1';
			me._image_26.style.visibility=me._image_26.ggVisible?'inherit':'hidden';
			var flag=me._image_19.ggOpacitiyActive;
			if (player.transitionsDisabled) {
				me._image_19.style[domTransition]='none';
			} else {
				me._image_19.style[domTransition]='all 0ms ease-out 0ms';
			}
			if (flag) {
				me._image_19.style.opacity='0';
				me._image_19.style.visibility='hidden';
			} else {
				me._image_19.style.opacity='0';
				me._image_19.style.visibility='hidden';
			}
			me._image_19.ggOpacitiyActive=!flag;
			var flag=me._image_200.ggOpacitiyActive;
			if (player.transitionsDisabled) {
				me._image_200.style[domTransition]='none';
			} else {
				me._image_200.style[domTransition]='all 0ms ease-out 0ms';
			}
			if (flag) {
				me._image_200.style.opacity='0';
				me._image_200.style.visibility='hidden';
			} else {
				me._image_200.style.opacity='0';
				me._image_200.style.visibility='hidden';
			}
			me._image_200.ggOpacitiyActive=!flag;
			var flag=me._image_21.ggOpacitiyActive;
			if (player.transitionsDisabled) {
				me._image_21.style[domTransition]='none';
			} else {
				me._image_21.style[domTransition]='all 0ms ease-out 0ms';
			}
			if (flag) {
				me._image_21.style.opacity='0';
				me._image_21.style.visibility='hidden';
			} else {
				me._image_21.style.opacity='0';
				me._image_21.style.visibility='hidden';
			}
			me._image_21.ggOpacitiyActive=!flag;
			var flag=me._image_25.ggOpacitiyActive;
			if (player.transitionsDisabled) {
				me._image_25.style[domTransition]='none';
			} else {
				me._image_25.style[domTransition]='all 0ms ease-out 0ms';
			}
			if (flag) {
				me._image_25.style.opacity='0';
				me._image_25.style.visibility='hidden';
			} else {
				me._image_25.style.opacity='0';
				me._image_25.style.visibility='hidden';
			}
			me._image_25.ggOpacitiyActive=!flag;
			var flag=me._image_27.ggOpacitiyActive;
			if (player.transitionsDisabled) {
				me._image_27.style[domTransition]='none';
			} else {
				me._image_27.style[domTransition]='all 0ms ease-out 0ms';
			}
			if (flag) {
				me._image_27.style.opacity='0';
				me._image_27.style.visibility='hidden';
			} else {
				me._image_27.style.opacity='0';
				me._image_27.style.visibility='hidden';
			}
			me._image_27.ggOpacitiyActive=!flag;
		}
		me._image_25.ggUpdatePosition=function (useTransition) {
		}
		me._menu_background.appendChild(me._image_25);
		el=me._image_21=document.createElement('div');
		els=me._image_21__img=document.createElement('img');
		els.className='ggskin ggskin_image_21';
		hs=basePath + 'images/image_21.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 21";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 129px;';
		hs+='left : 57px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 207px;';
		hs+='visibility : hidden;';
		hs+='width : 260px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_21.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._image_21.onclick=function (e) {
			if (player.transitionsDisabled) {
				me._node_scroller_3.style[domTransition]='none';
			} else {
				me._node_scroller_3.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._node_scroller_3.style.opacity='1';
			me._node_scroller_3.style.visibility=me._node_scroller_3.ggVisible?'inherit':'hidden';
			if (player.transitionsDisabled) {
				me._image_24.style[domTransition]='none';
			} else {
				me._image_24.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_24.style.opacity='1';
			me._image_24.style.visibility=me._image_24.ggVisible?'inherit':'hidden';
			var flag=me._image_19.ggOpacitiyActive;
			if (player.transitionsDisabled) {
				me._image_19.style[domTransition]='none';
			} else {
				me._image_19.style[domTransition]='all 0ms ease-out 0ms';
			}
			if (flag) {
				me._image_19.style.opacity='0';
				me._image_19.style.visibility='hidden';
			} else {
				me._image_19.style.opacity='0';
				me._image_19.style.visibility='hidden';
			}
			me._image_19.ggOpacitiyActive=!flag;
			var flag=me._image_200.ggOpacitiyActive;
			if (player.transitionsDisabled) {
				me._image_200.style[domTransition]='none';
			} else {
				me._image_200.style[domTransition]='all 0ms ease-out 0ms';
			}
			if (flag) {
				me._image_200.style.opacity='0';
				me._image_200.style.visibility='hidden';
			} else {
				me._image_200.style.opacity='0';
				me._image_200.style.visibility='hidden';
			}
			me._image_200.ggOpacitiyActive=!flag;
			var flag=me._image_21.ggOpacitiyActive;
			if (player.transitionsDisabled) {
				me._image_21.style[domTransition]='none';
			} else {
				me._image_21.style[domTransition]='all 0ms ease-out 0ms';
			}
			if (flag) {
				me._image_21.style.opacity='0';
				me._image_21.style.visibility='hidden';
			} else {
				me._image_21.style.opacity='0';
				me._image_21.style.visibility='hidden';
			}
			me._image_21.ggOpacitiyActive=!flag;
			var flag=me._image_25.ggOpacitiyActive;
			if (player.transitionsDisabled) {
				me._image_25.style[domTransition]='none';
			} else {
				me._image_25.style[domTransition]='all 0ms ease-out 0ms';
			}
			if (flag) {
				me._image_25.style.opacity='0';
				me._image_25.style.visibility='hidden';
			} else {
				me._image_25.style.opacity='0';
				me._image_25.style.visibility='hidden';
			}
			me._image_25.ggOpacitiyActive=!flag;
			var flag=me._image_27.ggOpacitiyActive;
			if (player.transitionsDisabled) {
				me._image_27.style[domTransition]='none';
			} else {
				me._image_27.style[domTransition]='all 0ms ease-out 0ms';
			}
			if (flag) {
				me._image_27.style.opacity='0';
				me._image_27.style.visibility='hidden';
			} else {
				me._image_27.style.opacity='0';
				me._image_27.style.visibility='hidden';
			}
			me._image_27.ggOpacitiyActive=!flag;
		}
		me._image_21.ggUpdatePosition=function (useTransition) {
		}
		me._menu_background.appendChild(me._image_21);
		el=me._image_200=document.createElement('div');
		els=me._image_200__img=document.createElement('img');
		els.className='ggskin ggskin_image_200';
		hs=basePath + 'images/image_200.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 20";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 135px;';
		hs+='left : 40px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 100px;';
		hs+='visibility : hidden;';
		hs+='width : 293px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_200.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._image_200.onclick=function (e) {
			if (player.transitionsDisabled) {
				me._node_scroller_2.style[domTransition]='none';
			} else {
				me._node_scroller_2.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._node_scroller_2.style.opacity='1';
			me._node_scroller_2.style.visibility=me._node_scroller_2.ggVisible?'inherit':'hidden';
			if (player.transitionsDisabled) {
				me._image_23.style[domTransition]='none';
			} else {
				me._image_23.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_23.style.opacity='1';
			me._image_23.style.visibility=me._image_23.ggVisible?'inherit':'hidden';
			var flag=me._image_19.ggOpacitiyActive;
			if (player.transitionsDisabled) {
				me._image_19.style[domTransition]='none';
			} else {
				me._image_19.style[domTransition]='all 0ms ease-out 0ms';
			}
			if (flag) {
				me._image_19.style.opacity='0';
				me._image_19.style.visibility='hidden';
			} else {
				me._image_19.style.opacity='0';
				me._image_19.style.visibility='hidden';
			}
			me._image_19.ggOpacitiyActive=!flag;
			var flag=me._image_200.ggOpacitiyActive;
			if (player.transitionsDisabled) {
				me._image_200.style[domTransition]='none';
			} else {
				me._image_200.style[domTransition]='all 0ms ease-out 0ms';
			}
			if (flag) {
				me._image_200.style.opacity='0';
				me._image_200.style.visibility='hidden';
			} else {
				me._image_200.style.opacity='0';
				me._image_200.style.visibility='hidden';
			}
			me._image_200.ggOpacitiyActive=!flag;
			var flag=me._image_21.ggOpacitiyActive;
			if (player.transitionsDisabled) {
				me._image_21.style[domTransition]='none';
			} else {
				me._image_21.style[domTransition]='all 0ms ease-out 0ms';
			}
			if (flag) {
				me._image_21.style.opacity='0';
				me._image_21.style.visibility='hidden';
			} else {
				me._image_21.style.opacity='0';
				me._image_21.style.visibility='hidden';
			}
			me._image_21.ggOpacitiyActive=!flag;
			var flag=me._image_25.ggOpacitiyActive;
			if (player.transitionsDisabled) {
				me._image_25.style[domTransition]='none';
			} else {
				me._image_25.style[domTransition]='all 0ms ease-out 0ms';
			}
			if (flag) {
				me._image_25.style.opacity='0';
				me._image_25.style.visibility='hidden';
			} else {
				me._image_25.style.opacity='0';
				me._image_25.style.visibility='hidden';
			}
			me._image_25.ggOpacitiyActive=!flag;
			var flag=me._image_27.ggOpacitiyActive;
			if (player.transitionsDisabled) {
				me._image_27.style[domTransition]='none';
			} else {
				me._image_27.style[domTransition]='all 0ms ease-out 0ms';
			}
			if (flag) {
				me._image_27.style.opacity='0';
				me._image_27.style.visibility='hidden';
			} else {
				me._image_27.style.opacity='0';
				me._image_27.style.visibility='hidden';
			}
			me._image_27.ggOpacitiyActive=!flag;
		}
		me._image_200.ggUpdatePosition=function (useTransition) {
		}
		me._menu_background.appendChild(me._image_200);
		el=me._image_19=document.createElement('div');
		els=me._image_19__img=document.createElement('img');
		els.className='ggskin ggskin_image_19';
		hs=basePath + 'images/image_19.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 19";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 140px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='right : -36px;';
		hs+='top : -10px;';
		hs+='visibility : hidden;';
		hs+='width : 265px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='100% 50%';
		me._image_19.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._image_19.onclick=function (e) {
			if (player.transitionsDisabled) {
				me._node_scroller.style[domTransition]='none';
			} else {
				me._node_scroller.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._node_scroller.style.opacity='1';
			me._node_scroller.style.visibility=me._node_scroller.ggVisible?'inherit':'hidden';
			if (player.transitionsDisabled) {
				me._image_22.style[domTransition]='none';
			} else {
				me._image_22.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_22.style.opacity='1';
			me._image_22.style.visibility=me._image_22.ggVisible?'inherit':'hidden';
			var flag=me._image_21.ggOpacitiyActive;
			if (player.transitionsDisabled) {
				me._image_21.style[domTransition]='none';
			} else {
				me._image_21.style[domTransition]='all 0ms ease-out 0ms';
			}
			if (flag) {
				me._image_21.style.opacity='0';
				me._image_21.style.visibility='hidden';
			} else {
				me._image_21.style.opacity='0';
				me._image_21.style.visibility='hidden';
			}
			me._image_21.ggOpacitiyActive=!flag;
			var flag=me._image_19.ggOpacitiyActive;
			if (player.transitionsDisabled) {
				me._image_19.style[domTransition]='none';
			} else {
				me._image_19.style[domTransition]='all 0ms ease-out 0ms';
			}
			if (flag) {
				me._image_19.style.opacity='0';
				me._image_19.style.visibility='hidden';
			} else {
				me._image_19.style.opacity='0';
				me._image_19.style.visibility='hidden';
			}
			me._image_19.ggOpacitiyActive=!flag;
			var flag=me._image_200.ggOpacitiyActive;
			if (player.transitionsDisabled) {
				me._image_200.style[domTransition]='none';
			} else {
				me._image_200.style[domTransition]='all 0ms ease-out 0ms';
			}
			if (flag) {
				me._image_200.style.opacity='0';
				me._image_200.style.visibility='hidden';
			} else {
				me._image_200.style.opacity='0';
				me._image_200.style.visibility='hidden';
			}
			me._image_200.ggOpacitiyActive=!flag;
			var flag=me._image_25.ggOpacitiyActive;
			if (player.transitionsDisabled) {
				me._image_25.style[domTransition]='none';
			} else {
				me._image_25.style[domTransition]='all 0ms ease-out 0ms';
			}
			if (flag) {
				me._image_25.style.opacity='0';
				me._image_25.style.visibility='hidden';
			} else {
				me._image_25.style.opacity='0';
				me._image_25.style.visibility='hidden';
			}
			me._image_25.ggOpacitiyActive=!flag;
			var flag=me._image_27.ggOpacitiyActive;
			if (player.transitionsDisabled) {
				me._image_27.style[domTransition]='none';
			} else {
				me._image_27.style[domTransition]='all 0ms ease-out 0ms';
			}
			if (flag) {
				me._image_27.style.opacity='0';
				me._image_27.style.visibility='hidden';
			} else {
				me._image_27.style.opacity='0';
				me._image_27.style.visibility='hidden';
			}
			me._image_27.ggOpacitiyActive=!flag;
		}
		me._image_19.ggUpdatePosition=function (useTransition) {
		}
		me._menu_background.appendChild(me._image_19);
		el=me._node_scroller_5=document.createElement('div');
		els=me._node_scroller_5__content=document.createElement('div');
		els.className='ggskin ggskin_subelement ggskin_scrollarea';
		el.ggContent=els;
		el.appendChild(els);
		el.ggHorScrollVisible = false;
		el.ggVertScrollVisible = false;
		el.ggContentLeftOffset = 0;
		el.ggContentTopOffset = 0;
		hs ='';
		hs+='height : 94px;';
		hs+='overflow : visible;';
		hs+='position : absolute;';
		hs+='right : 0px;';
		hs+='top : 0px;';
		hs+='width : 240px;';
		hs+="";
		els.setAttribute('style',hs);
		me._node_scroller_5.ggScrollByX = function(diffX) {
			if(!me._node_scroller_5.ggHorScrollVisible || diffX == 0 || me._node_scroller_5.ggHPercentVisible >= 1.0) return;
			me._node_scroller_5.ggScrollPosX = (me._node_scroller_5__horScrollFg.offsetLeft + diffX);
			me._node_scroller_5.ggScrollPosX = Math.max(me._node_scroller_5.ggScrollPosX, 0);
			me._node_scroller_5.ggScrollPosX = Math.min(me._node_scroller_5.ggScrollPosX, me._node_scroller_5__horScrollBg.offsetWidth - me._node_scroller_5__horScrollFg.offsetWidth);
			me._node_scroller_5__horScrollFg.style.left = me._node_scroller_5.ggScrollPosX + 'px';
			me._node_scroller_5__content.style.left = -(Math.round(me._node_scroller_5.ggScrollPosX / me._node_scroller_5.ggHPercentVisible)) + me._node_scroller_5.ggContentLeftOffset + 'px';
			me._node_scroller_5.ggScrollPosXPercent = (me._node_scroller_5__horScrollFg.offsetLeft / me._node_scroller_5__horScrollBg.offsetWidth);
		}
		me._node_scroller_5.ggScrollByXSmooth = function(diffX) {
			if(!me._node_scroller_5.ggHorScrollVisible || diffX == 0 || me._node_scroller_5.ggHPercentVisible >= 1.0) return;
			var scrollPerInterval = diffX / 25;
			var scrollCurrX = 0;
			var id = setInterval(function() {
				scrollCurrX += scrollPerInterval;
				me._node_scroller_5.ggScrollPosX += scrollPerInterval;
				if (diffX > 0 && (scrollCurrX >= diffX || me._node_scroller_5.ggScrollPosX >= me._node_scroller_5__horScrollBg.offsetWidth - me._node_scroller_5__horScrollFg.offsetWidth)) {
					me._node_scroller_5.ggScrollPosX = Math.min(me._node_scroller_5.ggScrollPosX, me._node_scroller_5__horScrollBg.offsetWidth - me._node_scroller_5__horScrollFg.offsetWidth);
					clearInterval(id);
				}
				if (diffX < 0 && (scrollCurrX <= diffX || me._node_scroller_5.ggScrollPosX <= 0)) {
					me._node_scroller_5.ggScrollPosX = Math.max(me._node_scroller_5.ggScrollPosX, 0);
					clearInterval(id);
				}
			me._node_scroller_5__horScrollFg.style.left = me._node_scroller_5.ggScrollPosX + 'px';
			me._node_scroller_5__content.style.left = -(Math.round(me._node_scroller_5.ggScrollPosX / me._node_scroller_5.ggHPercentVisible)) + me._node_scroller_5.ggContentLeftOffset + 'px';
			me._node_scroller_5.ggScrollPosXPercent = (me._node_scroller_5__horScrollFg.offsetLeft / me._node_scroller_5__horScrollBg.offsetWidth);
			}, 10);
		}
		me._node_scroller_5.ggScrollByY = function(diffY) {
			if(!me._node_scroller_5.ggVertScrollVisible || diffY == 0 || me._node_scroller_5.ggVPercentVisible >= 1.0) return;
			me._node_scroller_5.ggScrollPosY = (me._node_scroller_5__vertScrollFg.offsetTop + diffY);
			me._node_scroller_5.ggScrollPosY = Math.max(me._node_scroller_5.ggScrollPosY, 0);
			me._node_scroller_5.ggScrollPosY = Math.min(me._node_scroller_5.ggScrollPosY, me._node_scroller_5__vertScrollBg.offsetHeight - me._node_scroller_5__vertScrollFg.offsetHeight);
			me._node_scroller_5__vertScrollFg.style.top = me._node_scroller_5.ggScrollPosY + 'px';
			me._node_scroller_5__content.style.top = -(Math.round(me._node_scroller_5.ggScrollPosY / me._node_scroller_5.ggVPercentVisible)) + me._node_scroller_5.ggContentTopOffset + 'px';
			me._node_scroller_5.ggScrollPosYPercent = (me._node_scroller_5__vertScrollFg.offsetTop / me._node_scroller_5__vertScrollBg.offsetHeight);
		}
		me._node_scroller_5.ggScrollByYSmooth = function(diffY) {
			if(!me._node_scroller_5.ggVertScrollVisible || diffY == 0 || me._node_scroller_5.ggVPercentVisible >= 1.0) return;
			var scrollPerInterval = diffY / 25;
			var scrollCurrY = 0;
			var id = setInterval(function() {
				scrollCurrY += scrollPerInterval;
				me._node_scroller_5.ggScrollPosY += scrollPerInterval;
				if (diffY > 0 && (scrollCurrY >= diffY || me._node_scroller_5.ggScrollPosY >= me._node_scroller_5__vertScrollBg.offsetHeight - me._node_scroller_5__vertScrollFg.offsetHeight)) {
					me._node_scroller_5.ggScrollPosY = Math.min(me._node_scroller_5.ggScrollPosY, me._node_scroller_5__vertScrollBg.offsetHeight - me._node_scroller_5__vertScrollFg.offsetHeight);
					clearInterval(id);
				}
				if (diffY < 0 && (scrollCurrY <= diffY || me._node_scroller_5.ggScrollPosY <= 0)) {
					me._node_scroller_5.ggScrollPosY = Math.max(me._node_scroller_5.ggScrollPosY, 0);
					clearInterval(id);
				}
			me._node_scroller_5__vertScrollFg.style.top = me._node_scroller_5.ggScrollPosY + 'px';
			me._node_scroller_5__content.style.top = -(Math.round(me._node_scroller_5.ggScrollPosY / me._node_scroller_5.ggVPercentVisible)) + me._node_scroller_5.ggContentTopOffset + 'px';
			me._node_scroller_5.ggScrollPosYPercent = (me._node_scroller_5__vertScrollFg.offsetTop / me._node_scroller_5__vertScrollBg.offsetHeight);
			}, 10);
		}
		me._node_scroller_5.ggScrollIntoView = function(posX, posY, width, height) {
			if (me._node_scroller_5.ggHorScrollVisible) {
				if (posX < 0) {
					var diffX = Math.floor(posX * me._node_scroller_5.ggHPercentVisible);
					me._node_scroller_5.ggScrollByXSmooth(diffX);
				} else if (posX + width > me._node_scroller_5.offsetWidth - (me._node_scroller_5.ggVertScrollVisible ? 15 : 0)) {
					var diffX = Math.ceil(((posX + width) - (me._node_scroller_5.offsetWidth - (me._node_scroller_5.ggVertScrollVisible ? 15 : 0))) * me._node_scroller_5.ggHPercentVisible);
					me._node_scroller_5.ggScrollByXSmooth(diffX);
				}
			}
			if (me._node_scroller_5.ggVertScrollVisible) {
				if (posY < 0) {
					var diffY = Math.floor(posY * me._node_scroller_5.ggVPercentVisible);
					me._node_scroller_5.ggScrollByYSmooth(diffY);
				} else if (posY + height > me._node_scroller_5.offsetHeight - (me._node_scroller_5.ggHorScrollVisible ? 15 : 0)) {
					var diffY = Math.ceil(((posY + height) - (me._node_scroller_5.offsetHeight - (me._node_scroller_5.ggHorScrollVisible ? 15 : 0))) * me._node_scroller_5.ggVPercentVisible);
					me._node_scroller_5.ggScrollByYSmooth(diffY);
				}
			}
		}
		els.ontouchstart = function(e) {
			e = e || window.event;
			var t = e.touches;
			me._node_scroller_5.ggDragLastX = t ? t[0].clientX : e.clientX;
			me._node_scroller_5.ggDragLastY = t ? t[0].clientY : e.clientY;
			me._node_scroller_5__content.ontouchend = function() {
				let inertiaInterval = setInterval(function() {
					me._node_scroller_5.ggDragInertiaX *= 0.65;
					me._node_scroller_5.ggDragInertiaY *= 0.65;
					me._node_scroller_5.ggScrollByX(-me._node_scroller_5.ggDragInertiaX);
					me._node_scroller_5.ggScrollByY(-me._node_scroller_5.ggDragInertiaY);
					if (Math.abs(me._node_scroller_5.ggDragInertiaX) < 1.0 && Math.abs(me._node_scroller_5.ggDragInertiaY) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 50);
				me._node_scroller_5__content.ontouchend = null;
				me._node_scroller_5__content.ontouchmove = null;
				me._node_scroller_5__content.onpointerup = null;
				me._node_scroller_5__content.onpointermove = null;
			}
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			me._node_scroller_5__content.onpointerup = me._node_scroller_5__content.ontouchend;
		}
			me._node_scroller_5__content.ontouchmove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var t = e.touches;
				var diffX = (t ? t[0].clientX : e.clientX) - me._node_scroller_5.ggDragLastX;
				var diffY = (t ? t[0].clientY : e.clientY) - me._node_scroller_5.ggDragLastY;
				me._node_scroller_5.ggDragInertiaX = diffX;
				me._node_scroller_5.ggDragInertiaY = diffY;
				me._node_scroller_5.ggDragLastX = t ? t[0].clientX : e.clientX;
				me._node_scroller_5.ggDragLastY = t ? t[0].clientY : e.clientY;
				me._node_scroller_5.ggScrollByX(-diffX);
				me._node_scroller_5.ggScrollByY(-diffY);
			}
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				me._node_scroller_5__content.onpointermove = me._node_scroller_5__content.ontouchmove;
			}
		}
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			els.onpointerdown = els.ontouchstart;
		}
		elVertScrollBg = me._node_scroller_5__vertScrollBg = document.createElement('div');
		el.appendChild(elVertScrollBg);
		elVertScrollBg.setAttribute('style', 'position: absolute; right: 0px; top: 0px; visibility: hidden; width: 15px; height: 99.9999px; background-color: rgba(0,0,0,0.12549); pointer-events: auto;');
		elVertScrollBg.className='ggskin ggskin_scrollarea_vscrollbg';
		elVertScrollFg = me._node_scroller_5__vertScrollFg = document.createElement('div');
		elVertScrollBg.appendChild(elVertScrollFg);
		elVertScrollFg.setAttribute('style', 'position: absolute; left: 0px; top: 0px; visibility: hidden; width: 15px; height: 99.9999px; background-color: rgba(255,255,255,0.25098); pointer-events: auto;');
		elVertScrollFg.className='ggskin ggskin_scrollarea_vscrollfg';
		me._node_scroller_5.ggScrollPosY = 0;
		me._node_scroller_5.ggScrollPosYPercent = 0.0;
		elVertScrollFg.onmousedown = function(e) {
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) return;
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			me._node_scroller_5.ggDragLastY = e.clientY;
			document.onmouseup = function() {
				let inertiaInterval = setInterval(function() {
					me._node_scroller_5.ggDragInertiaY *= 0.65;
					me._node_scroller_5.ggScrollByY(me._node_scroller_5.ggDragInertiaY);
					if (Math.abs(me._node_scroller_5.ggDragInertiaY) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 50);
				document.onmouseup = null;
				document.onmousemove = null;
			}
			document.onmousemove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var diffY = e.clientY - me._node_scroller_5.ggDragLastY;
				me._node_scroller_5.ggDragInertiaY = diffY;
				me._node_scroller_5.ggDragLastY = e.clientY;
				me._node_scroller_5.ggScrollByY(diffY);
			}
		}
		elVertScrollFg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			me._node_scroller_5.ggDragLastY = t ? t[0].clientY : e.clientY;
			document.ontouchend = function() {
				let inertiaInterval = setInterval(function() {
					me._node_scroller_5.ggDragInertiaY *= 0.65;
					me._node_scroller_5.ggScrollByY(me._node_scroller_5.ggDragInertiaY);
					if (Math.abs(me._node_scroller_5.ggDragInertiaY) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 50);
				document.ontouchend = null;
				document.ontouchmove = null;
				document.onpointerup = null;
				document.onpointermove = null;
			}
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				document.onpointerup = document.ontouchend;
			}
			document.ontouchmove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var t = e.touches;
				var diffY = (t ? t[0].clientY : e.clientY) - me._node_scroller_5.ggDragLastY;
				me._node_scroller_5.ggDragInertiaY = diffY;
				me._node_scroller_5.ggDragLastY = t ? t[0].clientY : e.clientY;
				me._node_scroller_5.ggScrollByY(diffY);
			}
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				document.onpointermove = document.ontouchmove;
			}
		}
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			elVertScrollFg.onpointerdown = elVertScrollFg.ontouchstart;
		}
		elVertScrollBg.onmousedown = function(e) {
			e = e || window.event;
			e.preventDefault();
			var diffY = me._node_scroller_5.ggScrollHeight;
			if (e.offsetY < me._node_scroller_5.ggScrollPosY) {
				diffY = diffY * -1;
			}
			me._node_scroller_5.ggScrollByYSmooth(diffY);
		}
		elVertScrollBg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			var rect = me._node_scroller_5__vertScrollBg.getBoundingClientRect();
			var diffY = me._node_scroller_5.ggScrollHeight;
			if ((t[0].clientY - rect.top) < me._node_scroller_5.ggScrollPosY) {
				diffY = diffY * -1;
			}
			me._node_scroller_5.ggScrollByYSmooth(diffY);
		}
		el.addEventListener('wheel', function(e) {
			e.preventDefault();
			var wheelDelta = Math.sign(e.deltaY);
			me._node_scroller_5.ggScrollByYSmooth(20 * wheelDelta);
		});
		elCornerBg = me._node_scroller_5__cornerBg = document.createElement('div');
		el.appendChild(elCornerBg);
		elCornerBg.setAttribute('style', 'position: absolute; right: 0px; bottom: 0px; visibility: hidden; width: 15px; height: 15px; background-color: rgba(255,255,255,1);');
		elCornerBg.className='ggskin ggskin_scrollarea_scrollcorner';
		el.ggId="node_scroller 5";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_scrollarea ";
		el.ggType='scrollarea';
		hs ='';
		hs+='border : 1px solid rgba(0, 0, 0, 0);';
		hs+='height : calc(87%  -  50px);';
		hs+='opacity : 0;';
		hs+='overflow : hidden;';
		hs+='position : absolute;';
		hs+='right : -2px;';
		hs+='top : 9px;';
		hs+='visibility : hidden;';
		hs+='width : 244px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._node_scroller_5.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._node_scroller_5.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('category_visible') == true)) && 
				((player.getVariableValue('node_visible') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._node_scroller_5.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._node_scroller_5.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._node_scroller_5.style[domTransition]='opacity 500ms ease 0ms';
				if (me._node_scroller_5.ggCurrentLogicStateAlpha == 0) {
					me._node_scroller_5.style.visibility=me._node_scroller_5.ggVisible?'inherit':'hidden';
					me._node_scroller_5.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._node_scroller_5.style.opacity == 0.0) { me._node_scroller_5.style.visibility="hidden"; } }, 505);
					me._node_scroller_5.style.opacity=0;
				}
			}
		}
		me._node_scroller_5.ggUpdatePosition=function (useTransition) {
			{
				var horScrollWasVisible = this.ggHorScrollVisible;
				var vertScrollWasVisible = this.ggVertScrollVisible;
				this.ggContent.style.left = '0px';
				this.ggContent.style.top = '0px';
				this.ggContentLeftOffset = 0;
				this.ggContentTopOffset = 0;
				var offsetWidthWithScale = this.getBoundingClientRect().width;
				var offsetHeightWithScale = this.getBoundingClientRect().height;
				var domRectContent = this.ggContent.getBoundingClientRect();
				var minX = 0;
				var minY = 0;
				var maxX = 0;
				var maxY = 0;
				var stack=[];
				stack.push(this.ggContent);
				while(stack.length>0) {
					var e=stack.pop();
					if (e!=this.ggContent && e.getBoundingClientRect && e.style['display']!='none') {
						var domRectChild = e.getBoundingClientRect();
						var diffX = domRectChild.left - domRectContent.left;
						minX = Math.min(minX, diffX);
						maxX = Math.max(maxX, diffX + domRectChild.width);
						var diffY = domRectChild.top - domRectContent.top;
						minY = Math.min(minY, diffY);
						maxY = Math.max(maxY, diffY + domRectChild.height);
					}
					if (e.hasChildNodes() && e.style['display']!='none') {
						for(var i=0;i<e.childNodes.length;i++) {
							stack.push(e.childNodes[i]);
						}
					}
				}
				if (minX < 0) this.ggContentLeftOffset = -minX;
				if (minY < 0) this.ggContentTopOffset = -minY;
				var contentWidth = maxX - minX;
				var contentHeight = maxY - minY;
				this.ggContent.style.left = this.ggContentLeftOffset + 'px';
				this.ggContent.style.top = this.ggContentTopOffset + 'px';
				this.ggContent.style.width = contentWidth + 'px';
				this.ggContent.style.height = contentHeight + 'px';
				var containerWidth = offsetWidthWithScale;
				if (this.ggVertScrollVisible) containerWidth -= 15;
				if (contentWidth < containerWidth) {
					this.ggContent.style.right = (this.ggVertScrollVisible ? 15 : 0) + 'px';
					this.ggContent.style.left = '';
					this.ggContent.style.marginRight = '0px';
				}
				else {
					this.ggContent.style.left = this.ggContentLeftOffset + 'px';
					this.ggContent.style.marginLeft = '0px';
				}
				this.ggContent.style.top = -(Math.round(me._node_scroller_5.ggScrollPosY / me._node_scroller_5.ggVPercentVisible)) + this.ggContentTopOffset + 'px';
				this.ggContent.style.marginTop = '0px';
				me._node_scroller_5__vertScrollBg.style.visibility = 'inherit';
				me._node_scroller_5__vertScrollFg.style.visibility = 'inherit';
				me._node_scroller_5.ggVertScrollVisible = true;
				if(me._node_scroller_5.ggVertScrollVisible) {
					me._node_scroller_5.ggAvailableWidth = me._node_scroller_5.offsetWidth - 15;
					if (me._node_scroller_5.ggHorScrollVisible) {
						me._node_scroller_5.ggAvailableHeight = me._node_scroller_5.offsetHeight - 15;
						me._node_scroller_5.ggAvailableHeightWithScale = me._node_scroller_5.getBoundingClientRect().height - me._node_scroller_5__vertScrollBg.getBoundingClientRect().width;
						me._node_scroller_5__cornerBg.style.visibility = 'inherit';
					} else {
						me._node_scroller_5.ggAvailableHeight = me._node_scroller_5.offsetHeight;
						me._node_scroller_5.ggAvailableHeightWithScale = me._node_scroller_5.getBoundingClientRect().height;
						me._node_scroller_5__cornerBg.style.visibility = 'hidden';
					}
					me._node_scroller_5__vertScrollBg.style.height = me._node_scroller_5.ggAvailableHeight + 'px';
					me._node_scroller_5.ggVPercentVisible = contentHeight != 0 ? me._node_scroller_5.ggAvailableHeightWithScale / contentHeight : 0.0;
					if (me._node_scroller_5.ggVPercentVisible > 1.0) me._node_scroller_5.ggVPercentVisible = 1.0;
					me._node_scroller_5.ggScrollHeight =  Math.round(me._node_scroller_5__vertScrollBg.offsetHeight * me._node_scroller_5.ggVPercentVisible);
					me._node_scroller_5__vertScrollFg.style.height = me._node_scroller_5.ggScrollHeight + 'px';
					me._node_scroller_5.ggScrollPosY = me._node_scroller_5.ggScrollPosYPercent * me._node_scroller_5.ggAvailableHeight;
					me._node_scroller_5.ggScrollPosY = Math.min(me._node_scroller_5.ggScrollPosY, me._node_scroller_5__vertScrollBg.offsetHeight - me._node_scroller_5__vertScrollFg.offsetHeight);
					me._node_scroller_5__vertScrollFg.style.top = me._node_scroller_5.ggScrollPosY + 'px';
					if (me._node_scroller_5.ggVPercentVisible < 1.0) {
						me._node_scroller_5__content.style.top = -(Math.round(me._node_scroller_5.ggScrollPosY / me._node_scroller_5.ggVPercentVisible)) + this.ggContentTopOffset + 'px';
					}
				} else {
					me._node_scroller_5.ggAvailableWidth = me._node_scroller_5.offsetWidth;
					me._node_scroller_5.ggScrollPosY = 0;
					me._node_scroller_5.ggScrollPosYPercent = 0.0;
					me._node_scroller_5__content.style.top = this.ggContentTopOffset + 'px';
					me._node_scroller_5__cornerBg.style.visibility = 'hidden';
				}
				if(horScrollWasVisible != me._node_scroller_5.ggHorScrollVisible || vertScrollWasVisible != me._node_scroller_5.ggVertScrollVisible) {
					me.updateSize(me._node_scroller_5);
					me._node_scroller_5.ggUpdatePosition();
				}
			}
		}
		el=me._node_cloner3=document.createElement('div');
		el.ggPermeable=false;
		el.ggNumRepeat = 1;
		el.ggNumRows = 0;
		el.ggNumCols = 0;
		el.ggWidth = 235;
		el.ggHeight = 88;
		el.ggUpdating = false;
		el.ggFilter = [];
		el.ggInstances = [];
		me._node_cloner3.callChildLogicBlocks_changenode = function(){
			if(me._node_cloner3.ggInstances) {
				var i;
				for(i = 0; i < me._node_cloner3.ggInstances.length; i++) {
					if (me._node_cloner3.ggInstances[i]._node_title3 && me._node_cloner3.ggInstances[i]._node_title3.logicBlock_visible) {
						me._node_cloner3.ggInstances[i]._node_title3.logicBlock_visible();
					}
				}
			}
		}
		me._node_cloner3.callChildLogicBlocks_mouseover = function(){
			if(me._node_cloner3.ggInstances) {
				var i;
				for(i = 0; i < me._node_cloner3.ggInstances.length; i++) {
					if (me._node_cloner3.ggInstances[i]._node_visited3 && me._node_cloner3.ggInstances[i]._node_visited3.logicBlock_bordercolor) {
						me._node_cloner3.ggInstances[i]._node_visited3.logicBlock_bordercolor();
					}
				}
			}
		}
		me._node_cloner3.callChildLogicBlocks_active = function(){
			if(me._node_cloner3.ggInstances) {
				var i;
				for(i = 0; i < me._node_cloner3.ggInstances.length; i++) {
					if (me._node_cloner3.ggInstances[i]._node_visited3 && me._node_cloner3.ggInstances[i]._node_visited3.logicBlock_bordercolor) {
						me._node_cloner3.ggInstances[i]._node_visited3.logicBlock_bordercolor();
					}
				}
			}
		}
		me._node_cloner3.callChildLogicBlocks_changevisitednodes = function(){
			if(me._node_cloner3.ggInstances) {
				var i;
				for(i = 0; i < me._node_cloner3.ggInstances.length; i++) {
					if (me._node_cloner3.ggInstances[i]._node_visited3 && me._node_cloner3.ggInstances[i]._node_visited3.logicBlock_bordercolor) {
						me._node_cloner3.ggInstances[i]._node_visited3.logicBlock_bordercolor();
					}
				}
			}
		}
		me._node_cloner3.callChildLogicBlocks_activehotspotchanged = function(){
			if(me._node_cloner3.ggInstances) {
				var i;
				for(i = 0; i < me._node_cloner3.ggInstances.length; i++) {
					if (me._node_cloner3.ggInstances[i]._node_title3 && me._node_cloner3.ggInstances[i]._node_title3.logicBlock_visible) {
						me._node_cloner3.ggInstances[i]._node_title3.logicBlock_visible();
					}
				}
			}
		}
		el.ggUpdate = function(filter) {
			if(me._node_cloner3.ggUpdating == true) return;
			me._node_cloner3.ggUpdating = true;
			var el=me._node_cloner3;
			var curNumCols = 0;
			curNumCols = me._node_cloner3.ggNumRepeat;
			if (curNumCols < 1) curNumCols = 1;
			if (typeof filter=='object') {
				el.ggFilter = filter;
			} else {
				filter = el.ggFilter;
			};
			if (me.ggTag) filter.push(me.ggTag);
			filter=filter.sort();
			if ((el.ggNumCols == curNumCols) && (el.ggInstances.length > 0) && (filter.length === el.ggCurrentFilter.length) && (filter.every(function(value, index) { return value === el.ggCurrentFilter[index] }) )) {
				me._node_cloner3.ggUpdating = false;
				return;
			} else {
				el.ggNumRows = 1;
				el.ggNumCols = curNumCols;
			}
			el.ggCurrentFilter = filter;
			el.ggInstances = [];
			if (el.hasChildNodes() == true) {
				while (el.firstChild) {
					el.removeChild(el.firstChild);
				}
			}
			var tourNodes = player.getNodeIds();
			var row = 0;
			var column = 0;
			var currentIndex = 0;
			for (var i=0; i < tourNodes.length; i++) {
				var nodeId = tourNodes[i];
				var passed = true;
				var nodeData = player.getNodeUserdata(nodeId);
				if (filter.length > 0) {
					for (var j=0; j < filter.length; j++) {
						if (nodeData['tags'].indexOf(filter[j]) == -1) passed = false;
					}
				}
				if (passed) {
				var parameter={};
				parameter.top=(row * me._node_cloner3.ggHeight) + 'px';
				parameter.left=(column * me._node_cloner3.ggWidth) + 'px';
				parameter.width=me._node_cloner3.ggWidth + 'px';
				parameter.height=me._node_cloner3.ggHeight + 'px';
				parameter.index=currentIndex;
				parameter.title=nodeData['title'];
				var inst = new SkinCloner_node_cloner3_Class(nodeId, me, el, parameter);
				currentIndex++;
				el.ggInstances.push(inst);
				el.appendChild(inst.__div);
				inst.__div.ggObj=inst;
				skin.updateSize(inst.__div);
				column++;
				if (column >= el.ggNumCols) {
					column = 0;
					row++;
					el.ggNumRows++;
				}
				}
			}
			me._node_cloner3.callChildLogicBlocks_changenode();
			me._node_cloner3.callChildLogicBlocks_mouseover();
			me._node_cloner3.callChildLogicBlocks_active();
			me._node_cloner3.callChildLogicBlocks_changevisitednodes();
			me._node_cloner3.callChildLogicBlocks_activehotspotchanged();
			me._node_cloner3.ggUpdating = false;
			player.triggerEvent('clonerchanged');
			if (me._node_cloner3.parentNode.classList.contains('ggskin_subelement') && me._node_cloner3.parentNode.parentNode.classList.contains('ggskin_scrollarea')) me._node_cloner3.parentNode.parentNode.ggUpdatePosition();
		}
		el.ggFilter = [];
		el.ggFilter[0] = "探索館";
		el.ggId="node_cloner";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_cloner ";
		el.ggType='cloner';
		hs ='';
		hs+='height : 88px;';
		hs+='left : 6px;';
		hs+='overflow : visible;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : inherit;';
		hs+='width : 235px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._node_cloner3.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._node_cloner3.onclick=function (e) {
			me._map_1.ggClearMap();
			me._map_1.style[domTransition]='none';
			me._map_1.style.visibility='hidden';
			me._map_1.ggVisible=false;
		}
		me._node_cloner3.ggUpdateConditionNodeChange=function () {
			var cnode=player.getCurrentNode();
			for(var i=0; i<me._node_cloner3.childNodes.length; i++) {
				var child=me._node_cloner3.childNodes[i];
				if (child.ggObj && child.ggObj.ggNodeId==cnode) {
			        var childOffX = child.offsetLeft;
			        var childOffY = child.offsetTop;
					var p = child.parentElement;
			        while (p != null && p!==this.divSkin) {
						if (p.ggType && p.ggType == 'scrollarea') {
							p.ggScrollIntoView(childOffX, childOffY, child.clientWidth, child.clientHeight);
						}
						childOffX += p.offsetLeft;
						childOffY += p.offsetTop;
						p = p.parentElement;
					}
				}
			}
		}
		me._node_cloner3.ggUpdatePosition=function (useTransition) {
				me._node_cloner3.ggUpdate();
		}
		me._node_cloner3.ggNodeChange=function () {
			me._node_cloner3.ggUpdateConditionNodeChange();
		}
		me._node_scroller_5__content.appendChild(me._node_cloner3);
		me._menu_background.appendChild(me._node_scroller_5);
		el=me._node_scroller_4=document.createElement('div');
		els=me._node_scroller_4__content=document.createElement('div');
		els.className='ggskin ggskin_subelement ggskin_scrollarea';
		el.ggContent=els;
		el.appendChild(els);
		el.ggHorScrollVisible = false;
		el.ggVertScrollVisible = false;
		el.ggContentLeftOffset = 0;
		el.ggContentTopOffset = 0;
		hs ='';
		hs+='height : 94px;';
		hs+='overflow : visible;';
		hs+='position : absolute;';
		hs+='right : 0px;';
		hs+='top : 0px;';
		hs+='width : 240px;';
		hs+="";
		els.setAttribute('style',hs);
		me._node_scroller_4.ggScrollByX = function(diffX) {
			if(!me._node_scroller_4.ggHorScrollVisible || diffX == 0 || me._node_scroller_4.ggHPercentVisible >= 1.0) return;
			me._node_scroller_4.ggScrollPosX = (me._node_scroller_4__horScrollFg.offsetLeft + diffX);
			me._node_scroller_4.ggScrollPosX = Math.max(me._node_scroller_4.ggScrollPosX, 0);
			me._node_scroller_4.ggScrollPosX = Math.min(me._node_scroller_4.ggScrollPosX, me._node_scroller_4__horScrollBg.offsetWidth - me._node_scroller_4__horScrollFg.offsetWidth);
			me._node_scroller_4__horScrollFg.style.left = me._node_scroller_4.ggScrollPosX + 'px';
			me._node_scroller_4__content.style.left = -(Math.round(me._node_scroller_4.ggScrollPosX / me._node_scroller_4.ggHPercentVisible)) + me._node_scroller_4.ggContentLeftOffset + 'px';
			me._node_scroller_4.ggScrollPosXPercent = (me._node_scroller_4__horScrollFg.offsetLeft / me._node_scroller_4__horScrollBg.offsetWidth);
		}
		me._node_scroller_4.ggScrollByXSmooth = function(diffX) {
			if(!me._node_scroller_4.ggHorScrollVisible || diffX == 0 || me._node_scroller_4.ggHPercentVisible >= 1.0) return;
			var scrollPerInterval = diffX / 25;
			var scrollCurrX = 0;
			var id = setInterval(function() {
				scrollCurrX += scrollPerInterval;
				me._node_scroller_4.ggScrollPosX += scrollPerInterval;
				if (diffX > 0 && (scrollCurrX >= diffX || me._node_scroller_4.ggScrollPosX >= me._node_scroller_4__horScrollBg.offsetWidth - me._node_scroller_4__horScrollFg.offsetWidth)) {
					me._node_scroller_4.ggScrollPosX = Math.min(me._node_scroller_4.ggScrollPosX, me._node_scroller_4__horScrollBg.offsetWidth - me._node_scroller_4__horScrollFg.offsetWidth);
					clearInterval(id);
				}
				if (diffX < 0 && (scrollCurrX <= diffX || me._node_scroller_4.ggScrollPosX <= 0)) {
					me._node_scroller_4.ggScrollPosX = Math.max(me._node_scroller_4.ggScrollPosX, 0);
					clearInterval(id);
				}
			me._node_scroller_4__horScrollFg.style.left = me._node_scroller_4.ggScrollPosX + 'px';
			me._node_scroller_4__content.style.left = -(Math.round(me._node_scroller_4.ggScrollPosX / me._node_scroller_4.ggHPercentVisible)) + me._node_scroller_4.ggContentLeftOffset + 'px';
			me._node_scroller_4.ggScrollPosXPercent = (me._node_scroller_4__horScrollFg.offsetLeft / me._node_scroller_4__horScrollBg.offsetWidth);
			}, 10);
		}
		me._node_scroller_4.ggScrollByY = function(diffY) {
			if(!me._node_scroller_4.ggVertScrollVisible || diffY == 0 || me._node_scroller_4.ggVPercentVisible >= 1.0) return;
			me._node_scroller_4.ggScrollPosY = (me._node_scroller_4__vertScrollFg.offsetTop + diffY);
			me._node_scroller_4.ggScrollPosY = Math.max(me._node_scroller_4.ggScrollPosY, 0);
			me._node_scroller_4.ggScrollPosY = Math.min(me._node_scroller_4.ggScrollPosY, me._node_scroller_4__vertScrollBg.offsetHeight - me._node_scroller_4__vertScrollFg.offsetHeight);
			me._node_scroller_4__vertScrollFg.style.top = me._node_scroller_4.ggScrollPosY + 'px';
			me._node_scroller_4__content.style.top = -(Math.round(me._node_scroller_4.ggScrollPosY / me._node_scroller_4.ggVPercentVisible)) + me._node_scroller_4.ggContentTopOffset + 'px';
			me._node_scroller_4.ggScrollPosYPercent = (me._node_scroller_4__vertScrollFg.offsetTop / me._node_scroller_4__vertScrollBg.offsetHeight);
		}
		me._node_scroller_4.ggScrollByYSmooth = function(diffY) {
			if(!me._node_scroller_4.ggVertScrollVisible || diffY == 0 || me._node_scroller_4.ggVPercentVisible >= 1.0) return;
			var scrollPerInterval = diffY / 25;
			var scrollCurrY = 0;
			var id = setInterval(function() {
				scrollCurrY += scrollPerInterval;
				me._node_scroller_4.ggScrollPosY += scrollPerInterval;
				if (diffY > 0 && (scrollCurrY >= diffY || me._node_scroller_4.ggScrollPosY >= me._node_scroller_4__vertScrollBg.offsetHeight - me._node_scroller_4__vertScrollFg.offsetHeight)) {
					me._node_scroller_4.ggScrollPosY = Math.min(me._node_scroller_4.ggScrollPosY, me._node_scroller_4__vertScrollBg.offsetHeight - me._node_scroller_4__vertScrollFg.offsetHeight);
					clearInterval(id);
				}
				if (diffY < 0 && (scrollCurrY <= diffY || me._node_scroller_4.ggScrollPosY <= 0)) {
					me._node_scroller_4.ggScrollPosY = Math.max(me._node_scroller_4.ggScrollPosY, 0);
					clearInterval(id);
				}
			me._node_scroller_4__vertScrollFg.style.top = me._node_scroller_4.ggScrollPosY + 'px';
			me._node_scroller_4__content.style.top = -(Math.round(me._node_scroller_4.ggScrollPosY / me._node_scroller_4.ggVPercentVisible)) + me._node_scroller_4.ggContentTopOffset + 'px';
			me._node_scroller_4.ggScrollPosYPercent = (me._node_scroller_4__vertScrollFg.offsetTop / me._node_scroller_4__vertScrollBg.offsetHeight);
			}, 10);
		}
		me._node_scroller_4.ggScrollIntoView = function(posX, posY, width, height) {
			if (me._node_scroller_4.ggHorScrollVisible) {
				if (posX < 0) {
					var diffX = Math.floor(posX * me._node_scroller_4.ggHPercentVisible);
					me._node_scroller_4.ggScrollByXSmooth(diffX);
				} else if (posX + width > me._node_scroller_4.offsetWidth - (me._node_scroller_4.ggVertScrollVisible ? 15 : 0)) {
					var diffX = Math.ceil(((posX + width) - (me._node_scroller_4.offsetWidth - (me._node_scroller_4.ggVertScrollVisible ? 15 : 0))) * me._node_scroller_4.ggHPercentVisible);
					me._node_scroller_4.ggScrollByXSmooth(diffX);
				}
			}
			if (me._node_scroller_4.ggVertScrollVisible) {
				if (posY < 0) {
					var diffY = Math.floor(posY * me._node_scroller_4.ggVPercentVisible);
					me._node_scroller_4.ggScrollByYSmooth(diffY);
				} else if (posY + height > me._node_scroller_4.offsetHeight - (me._node_scroller_4.ggHorScrollVisible ? 15 : 0)) {
					var diffY = Math.ceil(((posY + height) - (me._node_scroller_4.offsetHeight - (me._node_scroller_4.ggHorScrollVisible ? 15 : 0))) * me._node_scroller_4.ggVPercentVisible);
					me._node_scroller_4.ggScrollByYSmooth(diffY);
				}
			}
		}
		els.ontouchstart = function(e) {
			e = e || window.event;
			var t = e.touches;
			me._node_scroller_4.ggDragLastX = t ? t[0].clientX : e.clientX;
			me._node_scroller_4.ggDragLastY = t ? t[0].clientY : e.clientY;
			me._node_scroller_4__content.ontouchend = function() {
				let inertiaInterval = setInterval(function() {
					me._node_scroller_4.ggDragInertiaX *= 0.65;
					me._node_scroller_4.ggDragInertiaY *= 0.65;
					me._node_scroller_4.ggScrollByX(-me._node_scroller_4.ggDragInertiaX);
					me._node_scroller_4.ggScrollByY(-me._node_scroller_4.ggDragInertiaY);
					if (Math.abs(me._node_scroller_4.ggDragInertiaX) < 1.0 && Math.abs(me._node_scroller_4.ggDragInertiaY) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 50);
				me._node_scroller_4__content.ontouchend = null;
				me._node_scroller_4__content.ontouchmove = null;
				me._node_scroller_4__content.onpointerup = null;
				me._node_scroller_4__content.onpointermove = null;
			}
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			me._node_scroller_4__content.onpointerup = me._node_scroller_4__content.ontouchend;
		}
			me._node_scroller_4__content.ontouchmove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var t = e.touches;
				var diffX = (t ? t[0].clientX : e.clientX) - me._node_scroller_4.ggDragLastX;
				var diffY = (t ? t[0].clientY : e.clientY) - me._node_scroller_4.ggDragLastY;
				me._node_scroller_4.ggDragInertiaX = diffX;
				me._node_scroller_4.ggDragInertiaY = diffY;
				me._node_scroller_4.ggDragLastX = t ? t[0].clientX : e.clientX;
				me._node_scroller_4.ggDragLastY = t ? t[0].clientY : e.clientY;
				me._node_scroller_4.ggScrollByX(-diffX);
				me._node_scroller_4.ggScrollByY(-diffY);
			}
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				me._node_scroller_4__content.onpointermove = me._node_scroller_4__content.ontouchmove;
			}
		}
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			els.onpointerdown = els.ontouchstart;
		}
		elVertScrollBg = me._node_scroller_4__vertScrollBg = document.createElement('div');
		el.appendChild(elVertScrollBg);
		elVertScrollBg.setAttribute('style', 'position: absolute; right: 0px; top: 0px; visibility: hidden; width: 15px; height: 99.9999px; background-color: rgba(0,0,0,0.12549); pointer-events: auto;');
		elVertScrollBg.className='ggskin ggskin_scrollarea_vscrollbg';
		elVertScrollFg = me._node_scroller_4__vertScrollFg = document.createElement('div');
		elVertScrollBg.appendChild(elVertScrollFg);
		elVertScrollFg.setAttribute('style', 'position: absolute; left: 0px; top: 0px; visibility: hidden; width: 15px; height: 99.9999px; background-color: rgba(255,255,255,0.25098); pointer-events: auto;');
		elVertScrollFg.className='ggskin ggskin_scrollarea_vscrollfg';
		me._node_scroller_4.ggScrollPosY = 0;
		me._node_scroller_4.ggScrollPosYPercent = 0.0;
		elVertScrollFg.onmousedown = function(e) {
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) return;
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			me._node_scroller_4.ggDragLastY = e.clientY;
			document.onmouseup = function() {
				let inertiaInterval = setInterval(function() {
					me._node_scroller_4.ggDragInertiaY *= 0.65;
					me._node_scroller_4.ggScrollByY(me._node_scroller_4.ggDragInertiaY);
					if (Math.abs(me._node_scroller_4.ggDragInertiaY) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 50);
				document.onmouseup = null;
				document.onmousemove = null;
			}
			document.onmousemove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var diffY = e.clientY - me._node_scroller_4.ggDragLastY;
				me._node_scroller_4.ggDragInertiaY = diffY;
				me._node_scroller_4.ggDragLastY = e.clientY;
				me._node_scroller_4.ggScrollByY(diffY);
			}
		}
		elVertScrollFg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			me._node_scroller_4.ggDragLastY = t ? t[0].clientY : e.clientY;
			document.ontouchend = function() {
				let inertiaInterval = setInterval(function() {
					me._node_scroller_4.ggDragInertiaY *= 0.65;
					me._node_scroller_4.ggScrollByY(me._node_scroller_4.ggDragInertiaY);
					if (Math.abs(me._node_scroller_4.ggDragInertiaY) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 50);
				document.ontouchend = null;
				document.ontouchmove = null;
				document.onpointerup = null;
				document.onpointermove = null;
			}
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				document.onpointerup = document.ontouchend;
			}
			document.ontouchmove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var t = e.touches;
				var diffY = (t ? t[0].clientY : e.clientY) - me._node_scroller_4.ggDragLastY;
				me._node_scroller_4.ggDragInertiaY = diffY;
				me._node_scroller_4.ggDragLastY = t ? t[0].clientY : e.clientY;
				me._node_scroller_4.ggScrollByY(diffY);
			}
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				document.onpointermove = document.ontouchmove;
			}
		}
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			elVertScrollFg.onpointerdown = elVertScrollFg.ontouchstart;
		}
		elVertScrollBg.onmousedown = function(e) {
			e = e || window.event;
			e.preventDefault();
			var diffY = me._node_scroller_4.ggScrollHeight;
			if (e.offsetY < me._node_scroller_4.ggScrollPosY) {
				diffY = diffY * -1;
			}
			me._node_scroller_4.ggScrollByYSmooth(diffY);
		}
		elVertScrollBg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			var rect = me._node_scroller_4__vertScrollBg.getBoundingClientRect();
			var diffY = me._node_scroller_4.ggScrollHeight;
			if ((t[0].clientY - rect.top) < me._node_scroller_4.ggScrollPosY) {
				diffY = diffY * -1;
			}
			me._node_scroller_4.ggScrollByYSmooth(diffY);
		}
		el.addEventListener('wheel', function(e) {
			e.preventDefault();
			var wheelDelta = Math.sign(e.deltaY);
			me._node_scroller_4.ggScrollByYSmooth(20 * wheelDelta);
		});
		elCornerBg = me._node_scroller_4__cornerBg = document.createElement('div');
		el.appendChild(elCornerBg);
		elCornerBg.setAttribute('style', 'position: absolute; right: 0px; bottom: 0px; visibility: hidden; width: 15px; height: 15px; background-color: rgba(255,255,255,1);');
		elCornerBg.className='ggskin ggskin_scrollarea_scrollcorner';
		el.ggId="node_scroller 4";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_scrollarea ";
		el.ggType='scrollarea';
		hs ='';
		hs+='border : 1px solid rgba(0, 0, 0, 0);';
		hs+='height : calc(87%  -  50px);';
		hs+='opacity : 0;';
		hs+='overflow : hidden;';
		hs+='position : absolute;';
		hs+='right : -2px;';
		hs+='top : 9px;';
		hs+='visibility : hidden;';
		hs+='width : 244px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._node_scroller_4.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._node_scroller_4.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('category_visible') == true)) && 
				((player.getVariableValue('node_visible') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._node_scroller_4.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._node_scroller_4.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._node_scroller_4.style[domTransition]='opacity 500ms ease 0ms';
				if (me._node_scroller_4.ggCurrentLogicStateAlpha == 0) {
					me._node_scroller_4.style.visibility=me._node_scroller_4.ggVisible?'inherit':'hidden';
					me._node_scroller_4.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._node_scroller_4.style.opacity == 0.0) { me._node_scroller_4.style.visibility="hidden"; } }, 505);
					me._node_scroller_4.style.opacity=0;
				}
			}
		}
		me._node_scroller_4.ggUpdatePosition=function (useTransition) {
			{
				var horScrollWasVisible = this.ggHorScrollVisible;
				var vertScrollWasVisible = this.ggVertScrollVisible;
				this.ggContent.style.left = '0px';
				this.ggContent.style.top = '0px';
				this.ggContentLeftOffset = 0;
				this.ggContentTopOffset = 0;
				var offsetWidthWithScale = this.getBoundingClientRect().width;
				var offsetHeightWithScale = this.getBoundingClientRect().height;
				var domRectContent = this.ggContent.getBoundingClientRect();
				var minX = 0;
				var minY = 0;
				var maxX = 0;
				var maxY = 0;
				var stack=[];
				stack.push(this.ggContent);
				while(stack.length>0) {
					var e=stack.pop();
					if (e!=this.ggContent && e.getBoundingClientRect && e.style['display']!='none') {
						var domRectChild = e.getBoundingClientRect();
						var diffX = domRectChild.left - domRectContent.left;
						minX = Math.min(minX, diffX);
						maxX = Math.max(maxX, diffX + domRectChild.width);
						var diffY = domRectChild.top - domRectContent.top;
						minY = Math.min(minY, diffY);
						maxY = Math.max(maxY, diffY + domRectChild.height);
					}
					if (e.hasChildNodes() && e.style['display']!='none') {
						for(var i=0;i<e.childNodes.length;i++) {
							stack.push(e.childNodes[i]);
						}
					}
				}
				if (minX < 0) this.ggContentLeftOffset = -minX;
				if (minY < 0) this.ggContentTopOffset = -minY;
				var contentWidth = maxX - minX;
				var contentHeight = maxY - minY;
				this.ggContent.style.left = this.ggContentLeftOffset + 'px';
				this.ggContent.style.top = this.ggContentTopOffset + 'px';
				this.ggContent.style.width = contentWidth + 'px';
				this.ggContent.style.height = contentHeight + 'px';
				var containerWidth = offsetWidthWithScale;
				if (this.ggVertScrollVisible) containerWidth -= 15;
				if (contentWidth < containerWidth) {
					this.ggContent.style.right = (this.ggVertScrollVisible ? 15 : 0) + 'px';
					this.ggContent.style.left = '';
					this.ggContent.style.marginRight = '0px';
				}
				else {
					this.ggContent.style.left = this.ggContentLeftOffset + 'px';
					this.ggContent.style.marginLeft = '0px';
				}
				this.ggContent.style.top = -(Math.round(me._node_scroller_4.ggScrollPosY / me._node_scroller_4.ggVPercentVisible)) + this.ggContentTopOffset + 'px';
				this.ggContent.style.marginTop = '0px';
				me._node_scroller_4__vertScrollBg.style.visibility = 'inherit';
				me._node_scroller_4__vertScrollFg.style.visibility = 'inherit';
				me._node_scroller_4.ggVertScrollVisible = true;
				if(me._node_scroller_4.ggVertScrollVisible) {
					me._node_scroller_4.ggAvailableWidth = me._node_scroller_4.offsetWidth - 15;
					if (me._node_scroller_4.ggHorScrollVisible) {
						me._node_scroller_4.ggAvailableHeight = me._node_scroller_4.offsetHeight - 15;
						me._node_scroller_4.ggAvailableHeightWithScale = me._node_scroller_4.getBoundingClientRect().height - me._node_scroller_4__vertScrollBg.getBoundingClientRect().width;
						me._node_scroller_4__cornerBg.style.visibility = 'inherit';
					} else {
						me._node_scroller_4.ggAvailableHeight = me._node_scroller_4.offsetHeight;
						me._node_scroller_4.ggAvailableHeightWithScale = me._node_scroller_4.getBoundingClientRect().height;
						me._node_scroller_4__cornerBg.style.visibility = 'hidden';
					}
					me._node_scroller_4__vertScrollBg.style.height = me._node_scroller_4.ggAvailableHeight + 'px';
					me._node_scroller_4.ggVPercentVisible = contentHeight != 0 ? me._node_scroller_4.ggAvailableHeightWithScale / contentHeight : 0.0;
					if (me._node_scroller_4.ggVPercentVisible > 1.0) me._node_scroller_4.ggVPercentVisible = 1.0;
					me._node_scroller_4.ggScrollHeight =  Math.round(me._node_scroller_4__vertScrollBg.offsetHeight * me._node_scroller_4.ggVPercentVisible);
					me._node_scroller_4__vertScrollFg.style.height = me._node_scroller_4.ggScrollHeight + 'px';
					me._node_scroller_4.ggScrollPosY = me._node_scroller_4.ggScrollPosYPercent * me._node_scroller_4.ggAvailableHeight;
					me._node_scroller_4.ggScrollPosY = Math.min(me._node_scroller_4.ggScrollPosY, me._node_scroller_4__vertScrollBg.offsetHeight - me._node_scroller_4__vertScrollFg.offsetHeight);
					me._node_scroller_4__vertScrollFg.style.top = me._node_scroller_4.ggScrollPosY + 'px';
					if (me._node_scroller_4.ggVPercentVisible < 1.0) {
						me._node_scroller_4__content.style.top = -(Math.round(me._node_scroller_4.ggScrollPosY / me._node_scroller_4.ggVPercentVisible)) + this.ggContentTopOffset + 'px';
					}
				} else {
					me._node_scroller_4.ggAvailableWidth = me._node_scroller_4.offsetWidth;
					me._node_scroller_4.ggScrollPosY = 0;
					me._node_scroller_4.ggScrollPosYPercent = 0.0;
					me._node_scroller_4__content.style.top = this.ggContentTopOffset + 'px';
					me._node_scroller_4__cornerBg.style.visibility = 'hidden';
				}
				if(horScrollWasVisible != me._node_scroller_4.ggHorScrollVisible || vertScrollWasVisible != me._node_scroller_4.ggVertScrollVisible) {
					me.updateSize(me._node_scroller_4);
					me._node_scroller_4.ggUpdatePosition();
				}
			}
		}
		el=me._node_cloner2=document.createElement('div');
		el.ggPermeable=false;
		el.ggNumRepeat = 1;
		el.ggNumRows = 0;
		el.ggNumCols = 0;
		el.ggWidth = 235;
		el.ggHeight = 88;
		el.ggUpdating = false;
		el.ggFilter = [];
		el.ggInstances = [];
		me._node_cloner2.callChildLogicBlocks_changenode = function(){
			if(me._node_cloner2.ggInstances) {
				var i;
				for(i = 0; i < me._node_cloner2.ggInstances.length; i++) {
					if (me._node_cloner2.ggInstances[i]._node_title2 && me._node_cloner2.ggInstances[i]._node_title2.logicBlock_visible) {
						me._node_cloner2.ggInstances[i]._node_title2.logicBlock_visible();
					}
				}
			}
		}
		me._node_cloner2.callChildLogicBlocks_mouseover = function(){
			if(me._node_cloner2.ggInstances) {
				var i;
				for(i = 0; i < me._node_cloner2.ggInstances.length; i++) {
					if (me._node_cloner2.ggInstances[i]._node_visited2 && me._node_cloner2.ggInstances[i]._node_visited2.logicBlock_bordercolor) {
						me._node_cloner2.ggInstances[i]._node_visited2.logicBlock_bordercolor();
					}
				}
			}
		}
		me._node_cloner2.callChildLogicBlocks_active = function(){
			if(me._node_cloner2.ggInstances) {
				var i;
				for(i = 0; i < me._node_cloner2.ggInstances.length; i++) {
					if (me._node_cloner2.ggInstances[i]._node_visited2 && me._node_cloner2.ggInstances[i]._node_visited2.logicBlock_bordercolor) {
						me._node_cloner2.ggInstances[i]._node_visited2.logicBlock_bordercolor();
					}
				}
			}
		}
		me._node_cloner2.callChildLogicBlocks_changevisitednodes = function(){
			if(me._node_cloner2.ggInstances) {
				var i;
				for(i = 0; i < me._node_cloner2.ggInstances.length; i++) {
					if (me._node_cloner2.ggInstances[i]._node_visited2 && me._node_cloner2.ggInstances[i]._node_visited2.logicBlock_bordercolor) {
						me._node_cloner2.ggInstances[i]._node_visited2.logicBlock_bordercolor();
					}
				}
			}
		}
		me._node_cloner2.callChildLogicBlocks_activehotspotchanged = function(){
			if(me._node_cloner2.ggInstances) {
				var i;
				for(i = 0; i < me._node_cloner2.ggInstances.length; i++) {
					if (me._node_cloner2.ggInstances[i]._node_title2 && me._node_cloner2.ggInstances[i]._node_title2.logicBlock_visible) {
						me._node_cloner2.ggInstances[i]._node_title2.logicBlock_visible();
					}
				}
			}
		}
		el.ggUpdate = function(filter) {
			if(me._node_cloner2.ggUpdating == true) return;
			me._node_cloner2.ggUpdating = true;
			var el=me._node_cloner2;
			var curNumCols = 0;
			curNumCols = me._node_cloner2.ggNumRepeat;
			if (curNumCols < 1) curNumCols = 1;
			if (typeof filter=='object') {
				el.ggFilter = filter;
			} else {
				filter = el.ggFilter;
			};
			if (me.ggTag) filter.push(me.ggTag);
			filter=filter.sort();
			if ((el.ggNumCols == curNumCols) && (el.ggInstances.length > 0) && (filter.length === el.ggCurrentFilter.length) && (filter.every(function(value, index) { return value === el.ggCurrentFilter[index] }) )) {
				me._node_cloner2.ggUpdating = false;
				return;
			} else {
				el.ggNumRows = 1;
				el.ggNumCols = curNumCols;
			}
			el.ggCurrentFilter = filter;
			el.ggInstances = [];
			if (el.hasChildNodes() == true) {
				while (el.firstChild) {
					el.removeChild(el.firstChild);
				}
			}
			var tourNodes = player.getNodeIds();
			var row = 0;
			var column = 0;
			var currentIndex = 0;
			for (var i=0; i < tourNodes.length; i++) {
				var nodeId = tourNodes[i];
				var passed = true;
				var nodeData = player.getNodeUserdata(nodeId);
				if (filter.length > 0) {
					for (var j=0; j < filter.length; j++) {
						if (nodeData['tags'].indexOf(filter[j]) == -1) passed = false;
					}
				}
				if (passed) {
				var parameter={};
				parameter.top=(row * me._node_cloner2.ggHeight) + 'px';
				parameter.left=(column * me._node_cloner2.ggWidth) + 'px';
				parameter.width=me._node_cloner2.ggWidth + 'px';
				parameter.height=me._node_cloner2.ggHeight + 'px';
				parameter.index=currentIndex;
				parameter.title=nodeData['title'];
				var inst = new SkinCloner_node_cloner2_Class(nodeId, me, el, parameter);
				currentIndex++;
				el.ggInstances.push(inst);
				el.appendChild(inst.__div);
				inst.__div.ggObj=inst;
				skin.updateSize(inst.__div);
				column++;
				if (column >= el.ggNumCols) {
					column = 0;
					row++;
					el.ggNumRows++;
				}
				}
			}
			me._node_cloner2.callChildLogicBlocks_changenode();
			me._node_cloner2.callChildLogicBlocks_mouseover();
			me._node_cloner2.callChildLogicBlocks_active();
			me._node_cloner2.callChildLogicBlocks_changevisitednodes();
			me._node_cloner2.callChildLogicBlocks_activehotspotchanged();
			me._node_cloner2.ggUpdating = false;
			player.triggerEvent('clonerchanged');
			if (me._node_cloner2.parentNode.classList.contains('ggskin_subelement') && me._node_cloner2.parentNode.parentNode.classList.contains('ggskin_scrollarea')) me._node_cloner2.parentNode.parentNode.ggUpdatePosition();
		}
		el.ggFilter = [];
		el.ggFilter[0] = "化石館";
		el.ggId="node_cloner";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_cloner ";
		el.ggType='cloner';
		hs ='';
		hs+='height : 88px;';
		hs+='left : 6px;';
		hs+='overflow : visible;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : inherit;';
		hs+='width : 235px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._node_cloner2.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._node_cloner2.onclick=function (e) {
			me._map_1.ggClearMap();
			me._map_1.style[domTransition]='none';
			me._map_1.style.visibility='hidden';
			me._map_1.ggVisible=false;
		}
		me._node_cloner2.ggUpdateConditionNodeChange=function () {
			var cnode=player.getCurrentNode();
			for(var i=0; i<me._node_cloner2.childNodes.length; i++) {
				var child=me._node_cloner2.childNodes[i];
				if (child.ggObj && child.ggObj.ggNodeId==cnode) {
			        var childOffX = child.offsetLeft;
			        var childOffY = child.offsetTop;
					var p = child.parentElement;
			        while (p != null && p!==this.divSkin) {
						if (p.ggType && p.ggType == 'scrollarea') {
							p.ggScrollIntoView(childOffX, childOffY, child.clientWidth, child.clientHeight);
						}
						childOffX += p.offsetLeft;
						childOffY += p.offsetTop;
						p = p.parentElement;
					}
				}
			}
		}
		me._node_cloner2.ggUpdatePosition=function (useTransition) {
				me._node_cloner2.ggUpdate();
		}
		me._node_cloner2.ggNodeChange=function () {
			me._node_cloner2.ggUpdateConditionNodeChange();
		}
		me._node_scroller_4__content.appendChild(me._node_cloner2);
		me._menu_background.appendChild(me._node_scroller_4);
		el=me._node_scroller_3=document.createElement('div');
		els=me._node_scroller_3__content=document.createElement('div');
		els.className='ggskin ggskin_subelement ggskin_scrollarea';
		el.ggContent=els;
		el.appendChild(els);
		el.ggHorScrollVisible = false;
		el.ggVertScrollVisible = false;
		el.ggContentLeftOffset = 0;
		el.ggContentTopOffset = 0;
		hs ='';
		hs+='height : 94px;';
		hs+='overflow : visible;';
		hs+='position : absolute;';
		hs+='right : 0px;';
		hs+='top : 0px;';
		hs+='width : 240px;';
		hs+="";
		els.setAttribute('style',hs);
		me._node_scroller_3.ggScrollByX = function(diffX) {
			if(!me._node_scroller_3.ggHorScrollVisible || diffX == 0 || me._node_scroller_3.ggHPercentVisible >= 1.0) return;
			me._node_scroller_3.ggScrollPosX = (me._node_scroller_3__horScrollFg.offsetLeft + diffX);
			me._node_scroller_3.ggScrollPosX = Math.max(me._node_scroller_3.ggScrollPosX, 0);
			me._node_scroller_3.ggScrollPosX = Math.min(me._node_scroller_3.ggScrollPosX, me._node_scroller_3__horScrollBg.offsetWidth - me._node_scroller_3__horScrollFg.offsetWidth);
			me._node_scroller_3__horScrollFg.style.left = me._node_scroller_3.ggScrollPosX + 'px';
			me._node_scroller_3__content.style.left = -(Math.round(me._node_scroller_3.ggScrollPosX / me._node_scroller_3.ggHPercentVisible)) + me._node_scroller_3.ggContentLeftOffset + 'px';
			me._node_scroller_3.ggScrollPosXPercent = (me._node_scroller_3__horScrollFg.offsetLeft / me._node_scroller_3__horScrollBg.offsetWidth);
		}
		me._node_scroller_3.ggScrollByXSmooth = function(diffX) {
			if(!me._node_scroller_3.ggHorScrollVisible || diffX == 0 || me._node_scroller_3.ggHPercentVisible >= 1.0) return;
			var scrollPerInterval = diffX / 25;
			var scrollCurrX = 0;
			var id = setInterval(function() {
				scrollCurrX += scrollPerInterval;
				me._node_scroller_3.ggScrollPosX += scrollPerInterval;
				if (diffX > 0 && (scrollCurrX >= diffX || me._node_scroller_3.ggScrollPosX >= me._node_scroller_3__horScrollBg.offsetWidth - me._node_scroller_3__horScrollFg.offsetWidth)) {
					me._node_scroller_3.ggScrollPosX = Math.min(me._node_scroller_3.ggScrollPosX, me._node_scroller_3__horScrollBg.offsetWidth - me._node_scroller_3__horScrollFg.offsetWidth);
					clearInterval(id);
				}
				if (diffX < 0 && (scrollCurrX <= diffX || me._node_scroller_3.ggScrollPosX <= 0)) {
					me._node_scroller_3.ggScrollPosX = Math.max(me._node_scroller_3.ggScrollPosX, 0);
					clearInterval(id);
				}
			me._node_scroller_3__horScrollFg.style.left = me._node_scroller_3.ggScrollPosX + 'px';
			me._node_scroller_3__content.style.left = -(Math.round(me._node_scroller_3.ggScrollPosX / me._node_scroller_3.ggHPercentVisible)) + me._node_scroller_3.ggContentLeftOffset + 'px';
			me._node_scroller_3.ggScrollPosXPercent = (me._node_scroller_3__horScrollFg.offsetLeft / me._node_scroller_3__horScrollBg.offsetWidth);
			}, 10);
		}
		me._node_scroller_3.ggScrollByY = function(diffY) {
			if(!me._node_scroller_3.ggVertScrollVisible || diffY == 0 || me._node_scroller_3.ggVPercentVisible >= 1.0) return;
			me._node_scroller_3.ggScrollPosY = (me._node_scroller_3__vertScrollFg.offsetTop + diffY);
			me._node_scroller_3.ggScrollPosY = Math.max(me._node_scroller_3.ggScrollPosY, 0);
			me._node_scroller_3.ggScrollPosY = Math.min(me._node_scroller_3.ggScrollPosY, me._node_scroller_3__vertScrollBg.offsetHeight - me._node_scroller_3__vertScrollFg.offsetHeight);
			me._node_scroller_3__vertScrollFg.style.top = me._node_scroller_3.ggScrollPosY + 'px';
			me._node_scroller_3__content.style.top = -(Math.round(me._node_scroller_3.ggScrollPosY / me._node_scroller_3.ggVPercentVisible)) + me._node_scroller_3.ggContentTopOffset + 'px';
			me._node_scroller_3.ggScrollPosYPercent = (me._node_scroller_3__vertScrollFg.offsetTop / me._node_scroller_3__vertScrollBg.offsetHeight);
		}
		me._node_scroller_3.ggScrollByYSmooth = function(diffY) {
			if(!me._node_scroller_3.ggVertScrollVisible || diffY == 0 || me._node_scroller_3.ggVPercentVisible >= 1.0) return;
			var scrollPerInterval = diffY / 25;
			var scrollCurrY = 0;
			var id = setInterval(function() {
				scrollCurrY += scrollPerInterval;
				me._node_scroller_3.ggScrollPosY += scrollPerInterval;
				if (diffY > 0 && (scrollCurrY >= diffY || me._node_scroller_3.ggScrollPosY >= me._node_scroller_3__vertScrollBg.offsetHeight - me._node_scroller_3__vertScrollFg.offsetHeight)) {
					me._node_scroller_3.ggScrollPosY = Math.min(me._node_scroller_3.ggScrollPosY, me._node_scroller_3__vertScrollBg.offsetHeight - me._node_scroller_3__vertScrollFg.offsetHeight);
					clearInterval(id);
				}
				if (diffY < 0 && (scrollCurrY <= diffY || me._node_scroller_3.ggScrollPosY <= 0)) {
					me._node_scroller_3.ggScrollPosY = Math.max(me._node_scroller_3.ggScrollPosY, 0);
					clearInterval(id);
				}
			me._node_scroller_3__vertScrollFg.style.top = me._node_scroller_3.ggScrollPosY + 'px';
			me._node_scroller_3__content.style.top = -(Math.round(me._node_scroller_3.ggScrollPosY / me._node_scroller_3.ggVPercentVisible)) + me._node_scroller_3.ggContentTopOffset + 'px';
			me._node_scroller_3.ggScrollPosYPercent = (me._node_scroller_3__vertScrollFg.offsetTop / me._node_scroller_3__vertScrollBg.offsetHeight);
			}, 10);
		}
		me._node_scroller_3.ggScrollIntoView = function(posX, posY, width, height) {
			if (me._node_scroller_3.ggHorScrollVisible) {
				if (posX < 0) {
					var diffX = Math.floor(posX * me._node_scroller_3.ggHPercentVisible);
					me._node_scroller_3.ggScrollByXSmooth(diffX);
				} else if (posX + width > me._node_scroller_3.offsetWidth - (me._node_scroller_3.ggVertScrollVisible ? 15 : 0)) {
					var diffX = Math.ceil(((posX + width) - (me._node_scroller_3.offsetWidth - (me._node_scroller_3.ggVertScrollVisible ? 15 : 0))) * me._node_scroller_3.ggHPercentVisible);
					me._node_scroller_3.ggScrollByXSmooth(diffX);
				}
			}
			if (me._node_scroller_3.ggVertScrollVisible) {
				if (posY < 0) {
					var diffY = Math.floor(posY * me._node_scroller_3.ggVPercentVisible);
					me._node_scroller_3.ggScrollByYSmooth(diffY);
				} else if (posY + height > me._node_scroller_3.offsetHeight - (me._node_scroller_3.ggHorScrollVisible ? 15 : 0)) {
					var diffY = Math.ceil(((posY + height) - (me._node_scroller_3.offsetHeight - (me._node_scroller_3.ggHorScrollVisible ? 15 : 0))) * me._node_scroller_3.ggVPercentVisible);
					me._node_scroller_3.ggScrollByYSmooth(diffY);
				}
			}
		}
		els.ontouchstart = function(e) {
			e = e || window.event;
			var t = e.touches;
			me._node_scroller_3.ggDragLastX = t ? t[0].clientX : e.clientX;
			me._node_scroller_3.ggDragLastY = t ? t[0].clientY : e.clientY;
			me._node_scroller_3__content.ontouchend = function() {
				let inertiaInterval = setInterval(function() {
					me._node_scroller_3.ggDragInertiaX *= 0.65;
					me._node_scroller_3.ggDragInertiaY *= 0.65;
					me._node_scroller_3.ggScrollByX(-me._node_scroller_3.ggDragInertiaX);
					me._node_scroller_3.ggScrollByY(-me._node_scroller_3.ggDragInertiaY);
					if (Math.abs(me._node_scroller_3.ggDragInertiaX) < 1.0 && Math.abs(me._node_scroller_3.ggDragInertiaY) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 50);
				me._node_scroller_3__content.ontouchend = null;
				me._node_scroller_3__content.ontouchmove = null;
				me._node_scroller_3__content.onpointerup = null;
				me._node_scroller_3__content.onpointermove = null;
			}
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			me._node_scroller_3__content.onpointerup = me._node_scroller_3__content.ontouchend;
		}
			me._node_scroller_3__content.ontouchmove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var t = e.touches;
				var diffX = (t ? t[0].clientX : e.clientX) - me._node_scroller_3.ggDragLastX;
				var diffY = (t ? t[0].clientY : e.clientY) - me._node_scroller_3.ggDragLastY;
				me._node_scroller_3.ggDragInertiaX = diffX;
				me._node_scroller_3.ggDragInertiaY = diffY;
				me._node_scroller_3.ggDragLastX = t ? t[0].clientX : e.clientX;
				me._node_scroller_3.ggDragLastY = t ? t[0].clientY : e.clientY;
				me._node_scroller_3.ggScrollByX(-diffX);
				me._node_scroller_3.ggScrollByY(-diffY);
			}
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				me._node_scroller_3__content.onpointermove = me._node_scroller_3__content.ontouchmove;
			}
		}
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			els.onpointerdown = els.ontouchstart;
		}
		elVertScrollBg = me._node_scroller_3__vertScrollBg = document.createElement('div');
		el.appendChild(elVertScrollBg);
		elVertScrollBg.setAttribute('style', 'position: absolute; right: 0px; top: 0px; visibility: hidden; width: 15px; height: 99.9999px; background-color: rgba(0,0,0,0.12549); pointer-events: auto;');
		elVertScrollBg.className='ggskin ggskin_scrollarea_vscrollbg';
		elVertScrollFg = me._node_scroller_3__vertScrollFg = document.createElement('div');
		elVertScrollBg.appendChild(elVertScrollFg);
		elVertScrollFg.setAttribute('style', 'position: absolute; left: 0px; top: 0px; visibility: hidden; width: 15px; height: 99.9999px; background-color: rgba(255,255,255,0.25098); pointer-events: auto;');
		elVertScrollFg.className='ggskin ggskin_scrollarea_vscrollfg';
		me._node_scroller_3.ggScrollPosY = 0;
		me._node_scroller_3.ggScrollPosYPercent = 0.0;
		elVertScrollFg.onmousedown = function(e) {
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) return;
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			me._node_scroller_3.ggDragLastY = e.clientY;
			document.onmouseup = function() {
				let inertiaInterval = setInterval(function() {
					me._node_scroller_3.ggDragInertiaY *= 0.65;
					me._node_scroller_3.ggScrollByY(me._node_scroller_3.ggDragInertiaY);
					if (Math.abs(me._node_scroller_3.ggDragInertiaY) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 50);
				document.onmouseup = null;
				document.onmousemove = null;
			}
			document.onmousemove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var diffY = e.clientY - me._node_scroller_3.ggDragLastY;
				me._node_scroller_3.ggDragInertiaY = diffY;
				me._node_scroller_3.ggDragLastY = e.clientY;
				me._node_scroller_3.ggScrollByY(diffY);
			}
		}
		elVertScrollFg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			me._node_scroller_3.ggDragLastY = t ? t[0].clientY : e.clientY;
			document.ontouchend = function() {
				let inertiaInterval = setInterval(function() {
					me._node_scroller_3.ggDragInertiaY *= 0.65;
					me._node_scroller_3.ggScrollByY(me._node_scroller_3.ggDragInertiaY);
					if (Math.abs(me._node_scroller_3.ggDragInertiaY) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 50);
				document.ontouchend = null;
				document.ontouchmove = null;
				document.onpointerup = null;
				document.onpointermove = null;
			}
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				document.onpointerup = document.ontouchend;
			}
			document.ontouchmove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var t = e.touches;
				var diffY = (t ? t[0].clientY : e.clientY) - me._node_scroller_3.ggDragLastY;
				me._node_scroller_3.ggDragInertiaY = diffY;
				me._node_scroller_3.ggDragLastY = t ? t[0].clientY : e.clientY;
				me._node_scroller_3.ggScrollByY(diffY);
			}
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				document.onpointermove = document.ontouchmove;
			}
		}
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			elVertScrollFg.onpointerdown = elVertScrollFg.ontouchstart;
		}
		elVertScrollBg.onmousedown = function(e) {
			e = e || window.event;
			e.preventDefault();
			var diffY = me._node_scroller_3.ggScrollHeight;
			if (e.offsetY < me._node_scroller_3.ggScrollPosY) {
				diffY = diffY * -1;
			}
			me._node_scroller_3.ggScrollByYSmooth(diffY);
		}
		elVertScrollBg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			var rect = me._node_scroller_3__vertScrollBg.getBoundingClientRect();
			var diffY = me._node_scroller_3.ggScrollHeight;
			if ((t[0].clientY - rect.top) < me._node_scroller_3.ggScrollPosY) {
				diffY = diffY * -1;
			}
			me._node_scroller_3.ggScrollByYSmooth(diffY);
		}
		el.addEventListener('wheel', function(e) {
			e.preventDefault();
			var wheelDelta = Math.sign(e.deltaY);
			me._node_scroller_3.ggScrollByYSmooth(20 * wheelDelta);
		});
		elCornerBg = me._node_scroller_3__cornerBg = document.createElement('div');
		el.appendChild(elCornerBg);
		elCornerBg.setAttribute('style', 'position: absolute; right: 0px; bottom: 0px; visibility: hidden; width: 15px; height: 15px; background-color: rgba(255,255,255,1);');
		elCornerBg.className='ggskin ggskin_scrollarea_scrollcorner';
		el.ggId="node_scroller 3";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_scrollarea ";
		el.ggType='scrollarea';
		hs ='';
		hs+='border : 1px solid rgba(0, 0, 0, 0);';
		hs+='height : calc(87%  -  50px);';
		hs+='opacity : 0;';
		hs+='overflow : hidden;';
		hs+='position : absolute;';
		hs+='right : -2px;';
		hs+='top : 9px;';
		hs+='visibility : hidden;';
		hs+='width : 244px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._node_scroller_3.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._node_scroller_3.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('category_visible') == true)) && 
				((player.getVariableValue('node_visible') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._node_scroller_3.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._node_scroller_3.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._node_scroller_3.style[domTransition]='opacity 500ms ease 0ms';
				if (me._node_scroller_3.ggCurrentLogicStateAlpha == 0) {
					me._node_scroller_3.style.visibility=me._node_scroller_3.ggVisible?'inherit':'hidden';
					me._node_scroller_3.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._node_scroller_3.style.opacity == 0.0) { me._node_scroller_3.style.visibility="hidden"; } }, 505);
					me._node_scroller_3.style.opacity=0;
				}
			}
		}
		me._node_scroller_3.ggUpdatePosition=function (useTransition) {
			{
				var horScrollWasVisible = this.ggHorScrollVisible;
				var vertScrollWasVisible = this.ggVertScrollVisible;
				this.ggContent.style.left = '0px';
				this.ggContent.style.top = '0px';
				this.ggContentLeftOffset = 0;
				this.ggContentTopOffset = 0;
				var offsetWidthWithScale = this.getBoundingClientRect().width;
				var offsetHeightWithScale = this.getBoundingClientRect().height;
				var domRectContent = this.ggContent.getBoundingClientRect();
				var minX = 0;
				var minY = 0;
				var maxX = 0;
				var maxY = 0;
				var stack=[];
				stack.push(this.ggContent);
				while(stack.length>0) {
					var e=stack.pop();
					if (e!=this.ggContent && e.getBoundingClientRect && e.style['display']!='none') {
						var domRectChild = e.getBoundingClientRect();
						var diffX = domRectChild.left - domRectContent.left;
						minX = Math.min(minX, diffX);
						maxX = Math.max(maxX, diffX + domRectChild.width);
						var diffY = domRectChild.top - domRectContent.top;
						minY = Math.min(minY, diffY);
						maxY = Math.max(maxY, diffY + domRectChild.height);
					}
					if (e.hasChildNodes() && e.style['display']!='none') {
						for(var i=0;i<e.childNodes.length;i++) {
							stack.push(e.childNodes[i]);
						}
					}
				}
				if (minX < 0) this.ggContentLeftOffset = -minX;
				if (minY < 0) this.ggContentTopOffset = -minY;
				var contentWidth = maxX - minX;
				var contentHeight = maxY - minY;
				this.ggContent.style.left = this.ggContentLeftOffset + 'px';
				this.ggContent.style.top = this.ggContentTopOffset + 'px';
				this.ggContent.style.width = contentWidth + 'px';
				this.ggContent.style.height = contentHeight + 'px';
				var containerWidth = offsetWidthWithScale;
				if (this.ggVertScrollVisible) containerWidth -= 15;
				if (contentWidth < containerWidth) {
					this.ggContent.style.right = (this.ggVertScrollVisible ? 15 : 0) + 'px';
					this.ggContent.style.left = '';
					this.ggContent.style.marginRight = '0px';
				}
				else {
					this.ggContent.style.left = this.ggContentLeftOffset + 'px';
					this.ggContent.style.marginLeft = '0px';
				}
				this.ggContent.style.top = -(Math.round(me._node_scroller_3.ggScrollPosY / me._node_scroller_3.ggVPercentVisible)) + this.ggContentTopOffset + 'px';
				this.ggContent.style.marginTop = '0px';
				me._node_scroller_3__vertScrollBg.style.visibility = 'inherit';
				me._node_scroller_3__vertScrollFg.style.visibility = 'inherit';
				me._node_scroller_3.ggVertScrollVisible = true;
				if(me._node_scroller_3.ggVertScrollVisible) {
					me._node_scroller_3.ggAvailableWidth = me._node_scroller_3.offsetWidth - 15;
					if (me._node_scroller_3.ggHorScrollVisible) {
						me._node_scroller_3.ggAvailableHeight = me._node_scroller_3.offsetHeight - 15;
						me._node_scroller_3.ggAvailableHeightWithScale = me._node_scroller_3.getBoundingClientRect().height - me._node_scroller_3__vertScrollBg.getBoundingClientRect().width;
						me._node_scroller_3__cornerBg.style.visibility = 'inherit';
					} else {
						me._node_scroller_3.ggAvailableHeight = me._node_scroller_3.offsetHeight;
						me._node_scroller_3.ggAvailableHeightWithScale = me._node_scroller_3.getBoundingClientRect().height;
						me._node_scroller_3__cornerBg.style.visibility = 'hidden';
					}
					me._node_scroller_3__vertScrollBg.style.height = me._node_scroller_3.ggAvailableHeight + 'px';
					me._node_scroller_3.ggVPercentVisible = contentHeight != 0 ? me._node_scroller_3.ggAvailableHeightWithScale / contentHeight : 0.0;
					if (me._node_scroller_3.ggVPercentVisible > 1.0) me._node_scroller_3.ggVPercentVisible = 1.0;
					me._node_scroller_3.ggScrollHeight =  Math.round(me._node_scroller_3__vertScrollBg.offsetHeight * me._node_scroller_3.ggVPercentVisible);
					me._node_scroller_3__vertScrollFg.style.height = me._node_scroller_3.ggScrollHeight + 'px';
					me._node_scroller_3.ggScrollPosY = me._node_scroller_3.ggScrollPosYPercent * me._node_scroller_3.ggAvailableHeight;
					me._node_scroller_3.ggScrollPosY = Math.min(me._node_scroller_3.ggScrollPosY, me._node_scroller_3__vertScrollBg.offsetHeight - me._node_scroller_3__vertScrollFg.offsetHeight);
					me._node_scroller_3__vertScrollFg.style.top = me._node_scroller_3.ggScrollPosY + 'px';
					if (me._node_scroller_3.ggVPercentVisible < 1.0) {
						me._node_scroller_3__content.style.top = -(Math.round(me._node_scroller_3.ggScrollPosY / me._node_scroller_3.ggVPercentVisible)) + this.ggContentTopOffset + 'px';
					}
				} else {
					me._node_scroller_3.ggAvailableWidth = me._node_scroller_3.offsetWidth;
					me._node_scroller_3.ggScrollPosY = 0;
					me._node_scroller_3.ggScrollPosYPercent = 0.0;
					me._node_scroller_3__content.style.top = this.ggContentTopOffset + 'px';
					me._node_scroller_3__cornerBg.style.visibility = 'hidden';
				}
				if(horScrollWasVisible != me._node_scroller_3.ggHorScrollVisible || vertScrollWasVisible != me._node_scroller_3.ggVertScrollVisible) {
					me.updateSize(me._node_scroller_3);
					me._node_scroller_3.ggUpdatePosition();
				}
			}
		}
		el=me._node_cloner1=document.createElement('div');
		el.ggPermeable=false;
		el.ggNumRepeat = 1;
		el.ggNumRows = 0;
		el.ggNumCols = 0;
		el.ggWidth = 235;
		el.ggHeight = 88;
		el.ggUpdating = false;
		el.ggFilter = [];
		el.ggInstances = [];
		me._node_cloner1.callChildLogicBlocks_changenode = function(){
			if(me._node_cloner1.ggInstances) {
				var i;
				for(i = 0; i < me._node_cloner1.ggInstances.length; i++) {
					if (me._node_cloner1.ggInstances[i]._node_title1 && me._node_cloner1.ggInstances[i]._node_title1.logicBlock_visible) {
						me._node_cloner1.ggInstances[i]._node_title1.logicBlock_visible();
					}
				}
			}
		}
		me._node_cloner1.callChildLogicBlocks_mouseover = function(){
			if(me._node_cloner1.ggInstances) {
				var i;
				for(i = 0; i < me._node_cloner1.ggInstances.length; i++) {
					if (me._node_cloner1.ggInstances[i]._node_visited1 && me._node_cloner1.ggInstances[i]._node_visited1.logicBlock_bordercolor) {
						me._node_cloner1.ggInstances[i]._node_visited1.logicBlock_bordercolor();
					}
				}
			}
		}
		me._node_cloner1.callChildLogicBlocks_active = function(){
			if(me._node_cloner1.ggInstances) {
				var i;
				for(i = 0; i < me._node_cloner1.ggInstances.length; i++) {
					if (me._node_cloner1.ggInstances[i]._node_visited1 && me._node_cloner1.ggInstances[i]._node_visited1.logicBlock_bordercolor) {
						me._node_cloner1.ggInstances[i]._node_visited1.logicBlock_bordercolor();
					}
				}
			}
		}
		me._node_cloner1.callChildLogicBlocks_changevisitednodes = function(){
			if(me._node_cloner1.ggInstances) {
				var i;
				for(i = 0; i < me._node_cloner1.ggInstances.length; i++) {
					if (me._node_cloner1.ggInstances[i]._node_visited1 && me._node_cloner1.ggInstances[i]._node_visited1.logicBlock_bordercolor) {
						me._node_cloner1.ggInstances[i]._node_visited1.logicBlock_bordercolor();
					}
				}
			}
		}
		me._node_cloner1.callChildLogicBlocks_activehotspotchanged = function(){
			if(me._node_cloner1.ggInstances) {
				var i;
				for(i = 0; i < me._node_cloner1.ggInstances.length; i++) {
					if (me._node_cloner1.ggInstances[i]._node_title1 && me._node_cloner1.ggInstances[i]._node_title1.logicBlock_visible) {
						me._node_cloner1.ggInstances[i]._node_title1.logicBlock_visible();
					}
				}
			}
		}
		el.ggUpdate = function(filter) {
			if(me._node_cloner1.ggUpdating == true) return;
			me._node_cloner1.ggUpdating = true;
			var el=me._node_cloner1;
			var curNumCols = 0;
			curNumCols = me._node_cloner1.ggNumRepeat;
			if (curNumCols < 1) curNumCols = 1;
			if (typeof filter=='object') {
				el.ggFilter = filter;
			} else {
				filter = el.ggFilter;
			};
			if (me.ggTag) filter.push(me.ggTag);
			filter=filter.sort();
			if ((el.ggNumCols == curNumCols) && (el.ggInstances.length > 0) && (filter.length === el.ggCurrentFilter.length) && (filter.every(function(value, index) { return value === el.ggCurrentFilter[index] }) )) {
				me._node_cloner1.ggUpdating = false;
				return;
			} else {
				el.ggNumRows = 1;
				el.ggNumCols = curNumCols;
			}
			el.ggCurrentFilter = filter;
			el.ggInstances = [];
			if (el.hasChildNodes() == true) {
				while (el.firstChild) {
					el.removeChild(el.firstChild);
				}
			}
			var tourNodes = player.getNodeIds();
			var row = 0;
			var column = 0;
			var currentIndex = 0;
			for (var i=0; i < tourNodes.length; i++) {
				var nodeId = tourNodes[i];
				var passed = true;
				var nodeData = player.getNodeUserdata(nodeId);
				if (filter.length > 0) {
					for (var j=0; j < filter.length; j++) {
						if (nodeData['tags'].indexOf(filter[j]) == -1) passed = false;
					}
				}
				if (passed) {
				var parameter={};
				parameter.top=(row * me._node_cloner1.ggHeight) + 'px';
				parameter.left=(column * me._node_cloner1.ggWidth) + 'px';
				parameter.width=me._node_cloner1.ggWidth + 'px';
				parameter.height=me._node_cloner1.ggHeight + 'px';
				parameter.index=currentIndex;
				parameter.title=nodeData['title'];
				var inst = new SkinCloner_node_cloner1_Class(nodeId, me, el, parameter);
				currentIndex++;
				el.ggInstances.push(inst);
				el.appendChild(inst.__div);
				inst.__div.ggObj=inst;
				skin.updateSize(inst.__div);
				column++;
				if (column >= el.ggNumCols) {
					column = 0;
					row++;
					el.ggNumRows++;
				}
				}
			}
			me._node_cloner1.callChildLogicBlocks_changenode();
			me._node_cloner1.callChildLogicBlocks_mouseover();
			me._node_cloner1.callChildLogicBlocks_active();
			me._node_cloner1.callChildLogicBlocks_changevisitednodes();
			me._node_cloner1.callChildLogicBlocks_activehotspotchanged();
			me._node_cloner1.ggUpdating = false;
			player.triggerEvent('clonerchanged');
			if (me._node_cloner1.parentNode.classList.contains('ggskin_subelement') && me._node_cloner1.parentNode.parentNode.classList.contains('ggskin_scrollarea')) me._node_cloner1.parentNode.parentNode.ggUpdatePosition();
		}
		el.ggFilter = [];
		el.ggFilter[0] = "生命演化館";
		el.ggId="node_cloner";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_cloner ";
		el.ggType='cloner';
		hs ='';
		hs+='height : 88px;';
		hs+='left : 6px;';
		hs+='overflow : visible;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : inherit;';
		hs+='width : 235px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._node_cloner1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._node_cloner1.onclick=function (e) {
			me._map_1.ggClearMap();
			me._map_1.style[domTransition]='none';
			me._map_1.style.visibility='hidden';
			me._map_1.ggVisible=false;
		}
		me._node_cloner1.ggUpdateConditionNodeChange=function () {
			var cnode=player.getCurrentNode();
			for(var i=0; i<me._node_cloner1.childNodes.length; i++) {
				var child=me._node_cloner1.childNodes[i];
				if (child.ggObj && child.ggObj.ggNodeId==cnode) {
			        var childOffX = child.offsetLeft;
			        var childOffY = child.offsetTop;
					var p = child.parentElement;
			        while (p != null && p!==this.divSkin) {
						if (p.ggType && p.ggType == 'scrollarea') {
							p.ggScrollIntoView(childOffX, childOffY, child.clientWidth, child.clientHeight);
						}
						childOffX += p.offsetLeft;
						childOffY += p.offsetTop;
						p = p.parentElement;
					}
				}
			}
		}
		me._node_cloner1.ggUpdatePosition=function (useTransition) {
				me._node_cloner1.ggUpdate();
		}
		me._node_cloner1.ggNodeChange=function () {
			me._node_cloner1.ggUpdateConditionNodeChange();
		}
		me._node_scroller_3__content.appendChild(me._node_cloner1);
		me._menu_background.appendChild(me._node_scroller_3);
		el=me._node_scroller_2=document.createElement('div');
		els=me._node_scroller_2__content=document.createElement('div');
		els.className='ggskin ggskin_subelement ggskin_scrollarea';
		el.ggContent=els;
		el.appendChild(els);
		el.ggHorScrollVisible = false;
		el.ggVertScrollVisible = false;
		el.ggContentLeftOffset = 0;
		el.ggContentTopOffset = 0;
		hs ='';
		hs+='height : 88px;';
		hs+='overflow : visible;';
		hs+='position : absolute;';
		hs+='right : 0px;';
		hs+='top : 0px;';
		hs+='width : 240px;';
		hs+="";
		els.setAttribute('style',hs);
		me._node_scroller_2.ggScrollByX = function(diffX) {
			if(!me._node_scroller_2.ggHorScrollVisible || diffX == 0 || me._node_scroller_2.ggHPercentVisible >= 1.0) return;
			me._node_scroller_2.ggScrollPosX = (me._node_scroller_2__horScrollFg.offsetLeft + diffX);
			me._node_scroller_2.ggScrollPosX = Math.max(me._node_scroller_2.ggScrollPosX, 0);
			me._node_scroller_2.ggScrollPosX = Math.min(me._node_scroller_2.ggScrollPosX, me._node_scroller_2__horScrollBg.offsetWidth - me._node_scroller_2__horScrollFg.offsetWidth);
			me._node_scroller_2__horScrollFg.style.left = me._node_scroller_2.ggScrollPosX + 'px';
			me._node_scroller_2__content.style.left = -(Math.round(me._node_scroller_2.ggScrollPosX / me._node_scroller_2.ggHPercentVisible)) + me._node_scroller_2.ggContentLeftOffset + 'px';
			me._node_scroller_2.ggScrollPosXPercent = (me._node_scroller_2__horScrollFg.offsetLeft / me._node_scroller_2__horScrollBg.offsetWidth);
		}
		me._node_scroller_2.ggScrollByXSmooth = function(diffX) {
			if(!me._node_scroller_2.ggHorScrollVisible || diffX == 0 || me._node_scroller_2.ggHPercentVisible >= 1.0) return;
			var scrollPerInterval = diffX / 25;
			var scrollCurrX = 0;
			var id = setInterval(function() {
				scrollCurrX += scrollPerInterval;
				me._node_scroller_2.ggScrollPosX += scrollPerInterval;
				if (diffX > 0 && (scrollCurrX >= diffX || me._node_scroller_2.ggScrollPosX >= me._node_scroller_2__horScrollBg.offsetWidth - me._node_scroller_2__horScrollFg.offsetWidth)) {
					me._node_scroller_2.ggScrollPosX = Math.min(me._node_scroller_2.ggScrollPosX, me._node_scroller_2__horScrollBg.offsetWidth - me._node_scroller_2__horScrollFg.offsetWidth);
					clearInterval(id);
				}
				if (diffX < 0 && (scrollCurrX <= diffX || me._node_scroller_2.ggScrollPosX <= 0)) {
					me._node_scroller_2.ggScrollPosX = Math.max(me._node_scroller_2.ggScrollPosX, 0);
					clearInterval(id);
				}
			me._node_scroller_2__horScrollFg.style.left = me._node_scroller_2.ggScrollPosX + 'px';
			me._node_scroller_2__content.style.left = -(Math.round(me._node_scroller_2.ggScrollPosX / me._node_scroller_2.ggHPercentVisible)) + me._node_scroller_2.ggContentLeftOffset + 'px';
			me._node_scroller_2.ggScrollPosXPercent = (me._node_scroller_2__horScrollFg.offsetLeft / me._node_scroller_2__horScrollBg.offsetWidth);
			}, 10);
		}
		me._node_scroller_2.ggScrollByY = function(diffY) {
			if(!me._node_scroller_2.ggVertScrollVisible || diffY == 0 || me._node_scroller_2.ggVPercentVisible >= 1.0) return;
			me._node_scroller_2.ggScrollPosY = (me._node_scroller_2__vertScrollFg.offsetTop + diffY);
			me._node_scroller_2.ggScrollPosY = Math.max(me._node_scroller_2.ggScrollPosY, 0);
			me._node_scroller_2.ggScrollPosY = Math.min(me._node_scroller_2.ggScrollPosY, me._node_scroller_2__vertScrollBg.offsetHeight - me._node_scroller_2__vertScrollFg.offsetHeight);
			me._node_scroller_2__vertScrollFg.style.top = me._node_scroller_2.ggScrollPosY + 'px';
			me._node_scroller_2__content.style.top = -(Math.round(me._node_scroller_2.ggScrollPosY / me._node_scroller_2.ggVPercentVisible)) + me._node_scroller_2.ggContentTopOffset + 'px';
			me._node_scroller_2.ggScrollPosYPercent = (me._node_scroller_2__vertScrollFg.offsetTop / me._node_scroller_2__vertScrollBg.offsetHeight);
		}
		me._node_scroller_2.ggScrollByYSmooth = function(diffY) {
			if(!me._node_scroller_2.ggVertScrollVisible || diffY == 0 || me._node_scroller_2.ggVPercentVisible >= 1.0) return;
			var scrollPerInterval = diffY / 25;
			var scrollCurrY = 0;
			var id = setInterval(function() {
				scrollCurrY += scrollPerInterval;
				me._node_scroller_2.ggScrollPosY += scrollPerInterval;
				if (diffY > 0 && (scrollCurrY >= diffY || me._node_scroller_2.ggScrollPosY >= me._node_scroller_2__vertScrollBg.offsetHeight - me._node_scroller_2__vertScrollFg.offsetHeight)) {
					me._node_scroller_2.ggScrollPosY = Math.min(me._node_scroller_2.ggScrollPosY, me._node_scroller_2__vertScrollBg.offsetHeight - me._node_scroller_2__vertScrollFg.offsetHeight);
					clearInterval(id);
				}
				if (diffY < 0 && (scrollCurrY <= diffY || me._node_scroller_2.ggScrollPosY <= 0)) {
					me._node_scroller_2.ggScrollPosY = Math.max(me._node_scroller_2.ggScrollPosY, 0);
					clearInterval(id);
				}
			me._node_scroller_2__vertScrollFg.style.top = me._node_scroller_2.ggScrollPosY + 'px';
			me._node_scroller_2__content.style.top = -(Math.round(me._node_scroller_2.ggScrollPosY / me._node_scroller_2.ggVPercentVisible)) + me._node_scroller_2.ggContentTopOffset + 'px';
			me._node_scroller_2.ggScrollPosYPercent = (me._node_scroller_2__vertScrollFg.offsetTop / me._node_scroller_2__vertScrollBg.offsetHeight);
			}, 10);
		}
		me._node_scroller_2.ggScrollIntoView = function(posX, posY, width, height) {
			if (me._node_scroller_2.ggHorScrollVisible) {
				if (posX < 0) {
					var diffX = Math.floor(posX * me._node_scroller_2.ggHPercentVisible);
					me._node_scroller_2.ggScrollByXSmooth(diffX);
				} else if (posX + width > me._node_scroller_2.offsetWidth - (me._node_scroller_2.ggVertScrollVisible ? 15 : 0)) {
					var diffX = Math.ceil(((posX + width) - (me._node_scroller_2.offsetWidth - (me._node_scroller_2.ggVertScrollVisible ? 15 : 0))) * me._node_scroller_2.ggHPercentVisible);
					me._node_scroller_2.ggScrollByXSmooth(diffX);
				}
			}
			if (me._node_scroller_2.ggVertScrollVisible) {
				if (posY < 0) {
					var diffY = Math.floor(posY * me._node_scroller_2.ggVPercentVisible);
					me._node_scroller_2.ggScrollByYSmooth(diffY);
				} else if (posY + height > me._node_scroller_2.offsetHeight - (me._node_scroller_2.ggHorScrollVisible ? 15 : 0)) {
					var diffY = Math.ceil(((posY + height) - (me._node_scroller_2.offsetHeight - (me._node_scroller_2.ggHorScrollVisible ? 15 : 0))) * me._node_scroller_2.ggVPercentVisible);
					me._node_scroller_2.ggScrollByYSmooth(diffY);
				}
			}
		}
		els.ontouchstart = function(e) {
			e = e || window.event;
			var t = e.touches;
			me._node_scroller_2.ggDragLastX = t ? t[0].clientX : e.clientX;
			me._node_scroller_2.ggDragLastY = t ? t[0].clientY : e.clientY;
			me._node_scroller_2__content.ontouchend = function() {
				let inertiaInterval = setInterval(function() {
					me._node_scroller_2.ggDragInertiaX *= 0.65;
					me._node_scroller_2.ggDragInertiaY *= 0.65;
					me._node_scroller_2.ggScrollByX(-me._node_scroller_2.ggDragInertiaX);
					me._node_scroller_2.ggScrollByY(-me._node_scroller_2.ggDragInertiaY);
					if (Math.abs(me._node_scroller_2.ggDragInertiaX) < 1.0 && Math.abs(me._node_scroller_2.ggDragInertiaY) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 50);
				me._node_scroller_2__content.ontouchend = null;
				me._node_scroller_2__content.ontouchmove = null;
				me._node_scroller_2__content.onpointerup = null;
				me._node_scroller_2__content.onpointermove = null;
			}
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			me._node_scroller_2__content.onpointerup = me._node_scroller_2__content.ontouchend;
		}
			me._node_scroller_2__content.ontouchmove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var t = e.touches;
				var diffX = (t ? t[0].clientX : e.clientX) - me._node_scroller_2.ggDragLastX;
				var diffY = (t ? t[0].clientY : e.clientY) - me._node_scroller_2.ggDragLastY;
				me._node_scroller_2.ggDragInertiaX = diffX;
				me._node_scroller_2.ggDragInertiaY = diffY;
				me._node_scroller_2.ggDragLastX = t ? t[0].clientX : e.clientX;
				me._node_scroller_2.ggDragLastY = t ? t[0].clientY : e.clientY;
				me._node_scroller_2.ggScrollByX(-diffX);
				me._node_scroller_2.ggScrollByY(-diffY);
			}
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				me._node_scroller_2__content.onpointermove = me._node_scroller_2__content.ontouchmove;
			}
		}
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			els.onpointerdown = els.ontouchstart;
		}
		elVertScrollBg = me._node_scroller_2__vertScrollBg = document.createElement('div');
		el.appendChild(elVertScrollBg);
		elVertScrollBg.setAttribute('style', 'position: absolute; right: 0px; top: 0px; visibility: hidden; width: 15px; height: 93.9996px; background-color: rgba(0,0,0,0.12549); pointer-events: auto;');
		elVertScrollBg.className='ggskin ggskin_scrollarea_vscrollbg';
		elVertScrollFg = me._node_scroller_2__vertScrollFg = document.createElement('div');
		elVertScrollBg.appendChild(elVertScrollFg);
		elVertScrollFg.setAttribute('style', 'position: absolute; left: 0px; top: 0px; visibility: hidden; width: 15px; height: 93.9996px; background-color: rgba(255,255,255,0.25098); pointer-events: auto;');
		elVertScrollFg.className='ggskin ggskin_scrollarea_vscrollfg';
		me._node_scroller_2.ggScrollPosY = 0;
		me._node_scroller_2.ggScrollPosYPercent = 0.0;
		elVertScrollFg.onmousedown = function(e) {
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) return;
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			me._node_scroller_2.ggDragLastY = e.clientY;
			document.onmouseup = function() {
				let inertiaInterval = setInterval(function() {
					me._node_scroller_2.ggDragInertiaY *= 0.65;
					me._node_scroller_2.ggScrollByY(me._node_scroller_2.ggDragInertiaY);
					if (Math.abs(me._node_scroller_2.ggDragInertiaY) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 50);
				document.onmouseup = null;
				document.onmousemove = null;
			}
			document.onmousemove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var diffY = e.clientY - me._node_scroller_2.ggDragLastY;
				me._node_scroller_2.ggDragInertiaY = diffY;
				me._node_scroller_2.ggDragLastY = e.clientY;
				me._node_scroller_2.ggScrollByY(diffY);
			}
		}
		elVertScrollFg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			me._node_scroller_2.ggDragLastY = t ? t[0].clientY : e.clientY;
			document.ontouchend = function() {
				let inertiaInterval = setInterval(function() {
					me._node_scroller_2.ggDragInertiaY *= 0.65;
					me._node_scroller_2.ggScrollByY(me._node_scroller_2.ggDragInertiaY);
					if (Math.abs(me._node_scroller_2.ggDragInertiaY) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 50);
				document.ontouchend = null;
				document.ontouchmove = null;
				document.onpointerup = null;
				document.onpointermove = null;
			}
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				document.onpointerup = document.ontouchend;
			}
			document.ontouchmove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var t = e.touches;
				var diffY = (t ? t[0].clientY : e.clientY) - me._node_scroller_2.ggDragLastY;
				me._node_scroller_2.ggDragInertiaY = diffY;
				me._node_scroller_2.ggDragLastY = t ? t[0].clientY : e.clientY;
				me._node_scroller_2.ggScrollByY(diffY);
			}
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				document.onpointermove = document.ontouchmove;
			}
		}
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			elVertScrollFg.onpointerdown = elVertScrollFg.ontouchstart;
		}
		elVertScrollBg.onmousedown = function(e) {
			e = e || window.event;
			e.preventDefault();
			var diffY = me._node_scroller_2.ggScrollHeight;
			if (e.offsetY < me._node_scroller_2.ggScrollPosY) {
				diffY = diffY * -1;
			}
			me._node_scroller_2.ggScrollByYSmooth(diffY);
		}
		elVertScrollBg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			var rect = me._node_scroller_2__vertScrollBg.getBoundingClientRect();
			var diffY = me._node_scroller_2.ggScrollHeight;
			if ((t[0].clientY - rect.top) < me._node_scroller_2.ggScrollPosY) {
				diffY = diffY * -1;
			}
			me._node_scroller_2.ggScrollByYSmooth(diffY);
		}
		el.addEventListener('wheel', function(e) {
			e.preventDefault();
			var wheelDelta = Math.sign(e.deltaY);
			me._node_scroller_2.ggScrollByYSmooth(20 * wheelDelta);
		});
		elCornerBg = me._node_scroller_2__cornerBg = document.createElement('div');
		el.appendChild(elCornerBg);
		elCornerBg.setAttribute('style', 'position: absolute; right: 0px; bottom: 0px; visibility: hidden; width: 15px; height: 15px; background-color: rgba(255,255,255,1);');
		elCornerBg.className='ggskin ggskin_scrollarea_scrollcorner';
		el.ggId="node_scroller 2";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_scrollarea ";
		el.ggType='scrollarea';
		hs ='';
		hs+='border : 1px solid rgba(0, 0, 0, 0);';
		hs+='height : calc(87%  -  50px);';
		hs+='opacity : 0;';
		hs+='overflow : hidden;';
		hs+='position : absolute;';
		hs+='right : -2px;';
		hs+='top : 9px;';
		hs+='visibility : hidden;';
		hs+='width : 244px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._node_scroller_2.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._node_scroller_2.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('category_visible') == true)) && 
				((player.getVariableValue('node_visible') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._node_scroller_2.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._node_scroller_2.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._node_scroller_2.style[domTransition]='opacity 500ms ease 0ms';
				if (me._node_scroller_2.ggCurrentLogicStateAlpha == 0) {
					me._node_scroller_2.style.visibility=me._node_scroller_2.ggVisible?'inherit':'hidden';
					me._node_scroller_2.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._node_scroller_2.style.opacity == 0.0) { me._node_scroller_2.style.visibility="hidden"; } }, 505);
					me._node_scroller_2.style.opacity=0;
				}
			}
		}
		me._node_scroller_2.ggUpdatePosition=function (useTransition) {
			{
				var horScrollWasVisible = this.ggHorScrollVisible;
				var vertScrollWasVisible = this.ggVertScrollVisible;
				this.ggContent.style.left = '0px';
				this.ggContent.style.top = '0px';
				this.ggContentLeftOffset = 0;
				this.ggContentTopOffset = 0;
				var offsetWidthWithScale = this.getBoundingClientRect().width;
				var offsetHeightWithScale = this.getBoundingClientRect().height;
				var domRectContent = this.ggContent.getBoundingClientRect();
				var minX = 0;
				var minY = 0;
				var maxX = 0;
				var maxY = 0;
				var stack=[];
				stack.push(this.ggContent);
				while(stack.length>0) {
					var e=stack.pop();
					if (e!=this.ggContent && e.getBoundingClientRect && e.style['display']!='none') {
						var domRectChild = e.getBoundingClientRect();
						var diffX = domRectChild.left - domRectContent.left;
						minX = Math.min(minX, diffX);
						maxX = Math.max(maxX, diffX + domRectChild.width);
						var diffY = domRectChild.top - domRectContent.top;
						minY = Math.min(minY, diffY);
						maxY = Math.max(maxY, diffY + domRectChild.height);
					}
					if (e.hasChildNodes() && e.style['display']!='none') {
						for(var i=0;i<e.childNodes.length;i++) {
							stack.push(e.childNodes[i]);
						}
					}
				}
				if (minX < 0) this.ggContentLeftOffset = -minX;
				if (minY < 0) this.ggContentTopOffset = -minY;
				var contentWidth = maxX - minX;
				var contentHeight = maxY - minY;
				this.ggContent.style.left = this.ggContentLeftOffset + 'px';
				this.ggContent.style.top = this.ggContentTopOffset + 'px';
				this.ggContent.style.width = contentWidth + 'px';
				this.ggContent.style.height = contentHeight + 'px';
				var containerWidth = offsetWidthWithScale;
				if (this.ggVertScrollVisible) containerWidth -= 15;
				if (contentWidth < containerWidth) {
					this.ggContent.style.right = (this.ggVertScrollVisible ? 15 : 0) + 'px';
					this.ggContent.style.left = '';
					this.ggContent.style.marginRight = '0px';
				}
				else {
					this.ggContent.style.left = this.ggContentLeftOffset + 'px';
					this.ggContent.style.marginLeft = '0px';
				}
				this.ggContent.style.top = -(Math.round(me._node_scroller_2.ggScrollPosY / me._node_scroller_2.ggVPercentVisible)) + this.ggContentTopOffset + 'px';
				this.ggContent.style.marginTop = '0px';
				me._node_scroller_2__vertScrollBg.style.visibility = 'inherit';
				me._node_scroller_2__vertScrollFg.style.visibility = 'inherit';
				me._node_scroller_2.ggVertScrollVisible = true;
				if(me._node_scroller_2.ggVertScrollVisible) {
					me._node_scroller_2.ggAvailableWidth = me._node_scroller_2.offsetWidth - 15;
					if (me._node_scroller_2.ggHorScrollVisible) {
						me._node_scroller_2.ggAvailableHeight = me._node_scroller_2.offsetHeight - 15;
						me._node_scroller_2.ggAvailableHeightWithScale = me._node_scroller_2.getBoundingClientRect().height - me._node_scroller_2__vertScrollBg.getBoundingClientRect().width;
						me._node_scroller_2__cornerBg.style.visibility = 'inherit';
					} else {
						me._node_scroller_2.ggAvailableHeight = me._node_scroller_2.offsetHeight;
						me._node_scroller_2.ggAvailableHeightWithScale = me._node_scroller_2.getBoundingClientRect().height;
						me._node_scroller_2__cornerBg.style.visibility = 'hidden';
					}
					me._node_scroller_2__vertScrollBg.style.height = me._node_scroller_2.ggAvailableHeight + 'px';
					me._node_scroller_2.ggVPercentVisible = contentHeight != 0 ? me._node_scroller_2.ggAvailableHeightWithScale / contentHeight : 0.0;
					if (me._node_scroller_2.ggVPercentVisible > 1.0) me._node_scroller_2.ggVPercentVisible = 1.0;
					me._node_scroller_2.ggScrollHeight =  Math.round(me._node_scroller_2__vertScrollBg.offsetHeight * me._node_scroller_2.ggVPercentVisible);
					me._node_scroller_2__vertScrollFg.style.height = me._node_scroller_2.ggScrollHeight + 'px';
					me._node_scroller_2.ggScrollPosY = me._node_scroller_2.ggScrollPosYPercent * me._node_scroller_2.ggAvailableHeight;
					me._node_scroller_2.ggScrollPosY = Math.min(me._node_scroller_2.ggScrollPosY, me._node_scroller_2__vertScrollBg.offsetHeight - me._node_scroller_2__vertScrollFg.offsetHeight);
					me._node_scroller_2__vertScrollFg.style.top = me._node_scroller_2.ggScrollPosY + 'px';
					if (me._node_scroller_2.ggVPercentVisible < 1.0) {
						me._node_scroller_2__content.style.top = -(Math.round(me._node_scroller_2.ggScrollPosY / me._node_scroller_2.ggVPercentVisible)) + this.ggContentTopOffset + 'px';
					}
				} else {
					me._node_scroller_2.ggAvailableWidth = me._node_scroller_2.offsetWidth;
					me._node_scroller_2.ggScrollPosY = 0;
					me._node_scroller_2.ggScrollPosYPercent = 0.0;
					me._node_scroller_2__content.style.top = this.ggContentTopOffset + 'px';
					me._node_scroller_2__cornerBg.style.visibility = 'hidden';
				}
				if(horScrollWasVisible != me._node_scroller_2.ggHorScrollVisible || vertScrollWasVisible != me._node_scroller_2.ggVertScrollVisible) {
					me.updateSize(me._node_scroller_2);
					me._node_scroller_2.ggUpdatePosition();
				}
			}
		}
		el=me._node_cloner0=document.createElement('div');
		el.ggPermeable=false;
		el.ggNumRepeat = 1;
		el.ggNumRows = 0;
		el.ggNumCols = 0;
		el.ggWidth = 235;
		el.ggHeight = 88;
		el.ggUpdating = false;
		el.ggFilter = [];
		el.ggInstances = [];
		me._node_cloner0.callChildLogicBlocks_changenode = function(){
			if(me._node_cloner0.ggInstances) {
				var i;
				for(i = 0; i < me._node_cloner0.ggInstances.length; i++) {
					if (me._node_cloner0.ggInstances[i]._node_title0 && me._node_cloner0.ggInstances[i]._node_title0.logicBlock_visible) {
						me._node_cloner0.ggInstances[i]._node_title0.logicBlock_visible();
					}
				}
			}
		}
		me._node_cloner0.callChildLogicBlocks_mouseover = function(){
			if(me._node_cloner0.ggInstances) {
				var i;
				for(i = 0; i < me._node_cloner0.ggInstances.length; i++) {
					if (me._node_cloner0.ggInstances[i]._node_visited0 && me._node_cloner0.ggInstances[i]._node_visited0.logicBlock_bordercolor) {
						me._node_cloner0.ggInstances[i]._node_visited0.logicBlock_bordercolor();
					}
				}
			}
		}
		me._node_cloner0.callChildLogicBlocks_active = function(){
			if(me._node_cloner0.ggInstances) {
				var i;
				for(i = 0; i < me._node_cloner0.ggInstances.length; i++) {
					if (me._node_cloner0.ggInstances[i]._node_visited0 && me._node_cloner0.ggInstances[i]._node_visited0.logicBlock_bordercolor) {
						me._node_cloner0.ggInstances[i]._node_visited0.logicBlock_bordercolor();
					}
				}
			}
		}
		me._node_cloner0.callChildLogicBlocks_changevisitednodes = function(){
			if(me._node_cloner0.ggInstances) {
				var i;
				for(i = 0; i < me._node_cloner0.ggInstances.length; i++) {
					if (me._node_cloner0.ggInstances[i]._node_visited0 && me._node_cloner0.ggInstances[i]._node_visited0.logicBlock_bordercolor) {
						me._node_cloner0.ggInstances[i]._node_visited0.logicBlock_bordercolor();
					}
				}
			}
		}
		me._node_cloner0.callChildLogicBlocks_activehotspotchanged = function(){
			if(me._node_cloner0.ggInstances) {
				var i;
				for(i = 0; i < me._node_cloner0.ggInstances.length; i++) {
					if (me._node_cloner0.ggInstances[i]._node_title0 && me._node_cloner0.ggInstances[i]._node_title0.logicBlock_visible) {
						me._node_cloner0.ggInstances[i]._node_title0.logicBlock_visible();
					}
				}
			}
		}
		el.ggUpdate = function(filter) {
			if(me._node_cloner0.ggUpdating == true) return;
			me._node_cloner0.ggUpdating = true;
			var el=me._node_cloner0;
			var curNumCols = 0;
			curNumCols = me._node_cloner0.ggNumRepeat;
			if (curNumCols < 1) curNumCols = 1;
			if (typeof filter=='object') {
				el.ggFilter = filter;
			} else {
				filter = el.ggFilter;
			};
			if (me.ggTag) filter.push(me.ggTag);
			filter=filter.sort();
			if ((el.ggNumCols == curNumCols) && (el.ggInstances.length > 0) && (filter.length === el.ggCurrentFilter.length) && (filter.every(function(value, index) { return value === el.ggCurrentFilter[index] }) )) {
				me._node_cloner0.ggUpdating = false;
				return;
			} else {
				el.ggNumRows = 1;
				el.ggNumCols = curNumCols;
			}
			el.ggCurrentFilter = filter;
			el.ggInstances = [];
			if (el.hasChildNodes() == true) {
				while (el.firstChild) {
					el.removeChild(el.firstChild);
				}
			}
			var tourNodes = player.getNodeIds();
			var row = 0;
			var column = 0;
			var currentIndex = 0;
			for (var i=0; i < tourNodes.length; i++) {
				var nodeId = tourNodes[i];
				var passed = true;
				var nodeData = player.getNodeUserdata(nodeId);
				if (filter.length > 0) {
					for (var j=0; j < filter.length; j++) {
						if (nodeData['tags'].indexOf(filter[j]) == -1) passed = false;
					}
				}
				if (passed) {
				var parameter={};
				parameter.top=(row * me._node_cloner0.ggHeight) + 'px';
				parameter.left=(column * me._node_cloner0.ggWidth) + 'px';
				parameter.width=me._node_cloner0.ggWidth + 'px';
				parameter.height=me._node_cloner0.ggHeight + 'px';
				parameter.index=currentIndex;
				parameter.title=nodeData['title'];
				var inst = new SkinCloner_node_cloner0_Class(nodeId, me, el, parameter);
				currentIndex++;
				el.ggInstances.push(inst);
				el.appendChild(inst.__div);
				inst.__div.ggObj=inst;
				skin.updateSize(inst.__div);
				column++;
				if (column >= el.ggNumCols) {
					column = 0;
					row++;
					el.ggNumRows++;
				}
				}
			}
			me._node_cloner0.callChildLogicBlocks_changenode();
			me._node_cloner0.callChildLogicBlocks_mouseover();
			me._node_cloner0.callChildLogicBlocks_active();
			me._node_cloner0.callChildLogicBlocks_changevisitednodes();
			me._node_cloner0.callChildLogicBlocks_activehotspotchanged();
			me._node_cloner0.ggUpdating = false;
			player.triggerEvent('clonerchanged');
			if (me._node_cloner0.parentNode.classList.contains('ggskin_subelement') && me._node_cloner0.parentNode.parentNode.classList.contains('ggskin_scrollarea')) me._node_cloner0.parentNode.parentNode.ggUpdatePosition();
		}
		el.ggFilter = [];
		el.ggFilter[0] = "故事館";
		el.ggId="node_cloner";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_cloner ";
		el.ggType='cloner';
		hs ='';
		hs+='height : 88px;';
		hs+='left : 4px;';
		hs+='overflow : visible;';
		hs+='position : absolute;';
		hs+='top : -1px;';
		hs+='visibility : inherit;';
		hs+='width : 235px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._node_cloner0.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._node_cloner0.onclick=function (e) {
			me._map_1.ggClearMap();
			me._map_1.style[domTransition]='none';
			me._map_1.style.visibility='hidden';
			me._map_1.ggVisible=false;
		}
		me._node_cloner0.ggUpdateConditionNodeChange=function () {
			var cnode=player.getCurrentNode();
			for(var i=0; i<me._node_cloner0.childNodes.length; i++) {
				var child=me._node_cloner0.childNodes[i];
				if (child.ggObj && child.ggObj.ggNodeId==cnode) {
			        var childOffX = child.offsetLeft;
			        var childOffY = child.offsetTop;
					var p = child.parentElement;
			        while (p != null && p!==this.divSkin) {
						if (p.ggType && p.ggType == 'scrollarea') {
							p.ggScrollIntoView(childOffX, childOffY, child.clientWidth, child.clientHeight);
						}
						childOffX += p.offsetLeft;
						childOffY += p.offsetTop;
						p = p.parentElement;
					}
				}
			}
		}
		me._node_cloner0.ggUpdatePosition=function (useTransition) {
				me._node_cloner0.ggUpdate();
		}
		me._node_cloner0.ggNodeChange=function () {
			me._node_cloner0.ggUpdateConditionNodeChange();
		}
		me._node_scroller_2__content.appendChild(me._node_cloner0);
		me._menu_background.appendChild(me._node_scroller_2);
		el=me._node_scroller=document.createElement('div');
		els=me._node_scroller__content=document.createElement('div');
		els.className='ggskin ggskin_subelement ggskin_scrollarea';
		el.ggContent=els;
		el.appendChild(els);
		el.ggHorScrollVisible = false;
		el.ggVertScrollVisible = false;
		el.ggContentLeftOffset = 0;
		el.ggContentTopOffset = 0;
		hs ='';
		hs+='height : 88px;';
		hs+='overflow : visible;';
		hs+='position : absolute;';
		hs+='right : 0px;';
		hs+='top : 0px;';
		hs+='width : 237px;';
		hs+="";
		els.setAttribute('style',hs);
		me._node_scroller.ggScrollByX = function(diffX) {
			if(!me._node_scroller.ggHorScrollVisible || diffX == 0 || me._node_scroller.ggHPercentVisible >= 1.0) return;
			me._node_scroller.ggScrollPosX = (me._node_scroller__horScrollFg.offsetLeft + diffX);
			me._node_scroller.ggScrollPosX = Math.max(me._node_scroller.ggScrollPosX, 0);
			me._node_scroller.ggScrollPosX = Math.min(me._node_scroller.ggScrollPosX, me._node_scroller__horScrollBg.offsetWidth - me._node_scroller__horScrollFg.offsetWidth);
			me._node_scroller__horScrollFg.style.left = me._node_scroller.ggScrollPosX + 'px';
			me._node_scroller__content.style.left = -(Math.round(me._node_scroller.ggScrollPosX / me._node_scroller.ggHPercentVisible)) + me._node_scroller.ggContentLeftOffset + 'px';
			me._node_scroller.ggScrollPosXPercent = (me._node_scroller__horScrollFg.offsetLeft / me._node_scroller__horScrollBg.offsetWidth);
		}
		me._node_scroller.ggScrollByXSmooth = function(diffX) {
			if(!me._node_scroller.ggHorScrollVisible || diffX == 0 || me._node_scroller.ggHPercentVisible >= 1.0) return;
			var scrollPerInterval = diffX / 25;
			var scrollCurrX = 0;
			var id = setInterval(function() {
				scrollCurrX += scrollPerInterval;
				me._node_scroller.ggScrollPosX += scrollPerInterval;
				if (diffX > 0 && (scrollCurrX >= diffX || me._node_scroller.ggScrollPosX >= me._node_scroller__horScrollBg.offsetWidth - me._node_scroller__horScrollFg.offsetWidth)) {
					me._node_scroller.ggScrollPosX = Math.min(me._node_scroller.ggScrollPosX, me._node_scroller__horScrollBg.offsetWidth - me._node_scroller__horScrollFg.offsetWidth);
					clearInterval(id);
				}
				if (diffX < 0 && (scrollCurrX <= diffX || me._node_scroller.ggScrollPosX <= 0)) {
					me._node_scroller.ggScrollPosX = Math.max(me._node_scroller.ggScrollPosX, 0);
					clearInterval(id);
				}
			me._node_scroller__horScrollFg.style.left = me._node_scroller.ggScrollPosX + 'px';
			me._node_scroller__content.style.left = -(Math.round(me._node_scroller.ggScrollPosX / me._node_scroller.ggHPercentVisible)) + me._node_scroller.ggContentLeftOffset + 'px';
			me._node_scroller.ggScrollPosXPercent = (me._node_scroller__horScrollFg.offsetLeft / me._node_scroller__horScrollBg.offsetWidth);
			}, 10);
		}
		me._node_scroller.ggScrollByY = function(diffY) {
			if(!me._node_scroller.ggVertScrollVisible || diffY == 0 || me._node_scroller.ggVPercentVisible >= 1.0) return;
			me._node_scroller.ggScrollPosY = (me._node_scroller__vertScrollFg.offsetTop + diffY);
			me._node_scroller.ggScrollPosY = Math.max(me._node_scroller.ggScrollPosY, 0);
			me._node_scroller.ggScrollPosY = Math.min(me._node_scroller.ggScrollPosY, me._node_scroller__vertScrollBg.offsetHeight - me._node_scroller__vertScrollFg.offsetHeight);
			me._node_scroller__vertScrollFg.style.top = me._node_scroller.ggScrollPosY + 'px';
			me._node_scroller__content.style.top = -(Math.round(me._node_scroller.ggScrollPosY / me._node_scroller.ggVPercentVisible)) + me._node_scroller.ggContentTopOffset + 'px';
			me._node_scroller.ggScrollPosYPercent = (me._node_scroller__vertScrollFg.offsetTop / me._node_scroller__vertScrollBg.offsetHeight);
		}
		me._node_scroller.ggScrollByYSmooth = function(diffY) {
			if(!me._node_scroller.ggVertScrollVisible || diffY == 0 || me._node_scroller.ggVPercentVisible >= 1.0) return;
			var scrollPerInterval = diffY / 25;
			var scrollCurrY = 0;
			var id = setInterval(function() {
				scrollCurrY += scrollPerInterval;
				me._node_scroller.ggScrollPosY += scrollPerInterval;
				if (diffY > 0 && (scrollCurrY >= diffY || me._node_scroller.ggScrollPosY >= me._node_scroller__vertScrollBg.offsetHeight - me._node_scroller__vertScrollFg.offsetHeight)) {
					me._node_scroller.ggScrollPosY = Math.min(me._node_scroller.ggScrollPosY, me._node_scroller__vertScrollBg.offsetHeight - me._node_scroller__vertScrollFg.offsetHeight);
					clearInterval(id);
				}
				if (diffY < 0 && (scrollCurrY <= diffY || me._node_scroller.ggScrollPosY <= 0)) {
					me._node_scroller.ggScrollPosY = Math.max(me._node_scroller.ggScrollPosY, 0);
					clearInterval(id);
				}
			me._node_scroller__vertScrollFg.style.top = me._node_scroller.ggScrollPosY + 'px';
			me._node_scroller__content.style.top = -(Math.round(me._node_scroller.ggScrollPosY / me._node_scroller.ggVPercentVisible)) + me._node_scroller.ggContentTopOffset + 'px';
			me._node_scroller.ggScrollPosYPercent = (me._node_scroller__vertScrollFg.offsetTop / me._node_scroller__vertScrollBg.offsetHeight);
			}, 10);
		}
		me._node_scroller.ggScrollIntoView = function(posX, posY, width, height) {
			if (me._node_scroller.ggHorScrollVisible) {
				if (posX < 0) {
					var diffX = Math.floor(posX * me._node_scroller.ggHPercentVisible);
					me._node_scroller.ggScrollByXSmooth(diffX);
				} else if (posX + width > me._node_scroller.offsetWidth - (me._node_scroller.ggVertScrollVisible ? 15 : 0)) {
					var diffX = Math.ceil(((posX + width) - (me._node_scroller.offsetWidth - (me._node_scroller.ggVertScrollVisible ? 15 : 0))) * me._node_scroller.ggHPercentVisible);
					me._node_scroller.ggScrollByXSmooth(diffX);
				}
			}
			if (me._node_scroller.ggVertScrollVisible) {
				if (posY < 0) {
					var diffY = Math.floor(posY * me._node_scroller.ggVPercentVisible);
					me._node_scroller.ggScrollByYSmooth(diffY);
				} else if (posY + height > me._node_scroller.offsetHeight - (me._node_scroller.ggHorScrollVisible ? 15 : 0)) {
					var diffY = Math.ceil(((posY + height) - (me._node_scroller.offsetHeight - (me._node_scroller.ggHorScrollVisible ? 15 : 0))) * me._node_scroller.ggVPercentVisible);
					me._node_scroller.ggScrollByYSmooth(diffY);
				}
			}
		}
		els.ontouchstart = function(e) {
			e = e || window.event;
			var t = e.touches;
			me._node_scroller.ggDragLastX = t ? t[0].clientX : e.clientX;
			me._node_scroller.ggDragLastY = t ? t[0].clientY : e.clientY;
			me._node_scroller__content.ontouchend = function() {
				let inertiaInterval = setInterval(function() {
					me._node_scroller.ggDragInertiaX *= 0.65;
					me._node_scroller.ggDragInertiaY *= 0.65;
					me._node_scroller.ggScrollByX(-me._node_scroller.ggDragInertiaX);
					me._node_scroller.ggScrollByY(-me._node_scroller.ggDragInertiaY);
					if (Math.abs(me._node_scroller.ggDragInertiaX) < 1.0 && Math.abs(me._node_scroller.ggDragInertiaY) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 50);
				me._node_scroller__content.ontouchend = null;
				me._node_scroller__content.ontouchmove = null;
				me._node_scroller__content.onpointerup = null;
				me._node_scroller__content.onpointermove = null;
			}
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			me._node_scroller__content.onpointerup = me._node_scroller__content.ontouchend;
		}
			me._node_scroller__content.ontouchmove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var t = e.touches;
				var diffX = (t ? t[0].clientX : e.clientX) - me._node_scroller.ggDragLastX;
				var diffY = (t ? t[0].clientY : e.clientY) - me._node_scroller.ggDragLastY;
				me._node_scroller.ggDragInertiaX = diffX;
				me._node_scroller.ggDragInertiaY = diffY;
				me._node_scroller.ggDragLastX = t ? t[0].clientX : e.clientX;
				me._node_scroller.ggDragLastY = t ? t[0].clientY : e.clientY;
				me._node_scroller.ggScrollByX(-diffX);
				me._node_scroller.ggScrollByY(-diffY);
			}
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				me._node_scroller__content.onpointermove = me._node_scroller__content.ontouchmove;
			}
		}
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			els.onpointerdown = els.ontouchstart;
		}
		elVertScrollBg = me._node_scroller__vertScrollBg = document.createElement('div');
		el.appendChild(elVertScrollBg);
		elVertScrollBg.setAttribute('style', 'position: absolute; right: 0px; top: 0px; visibility: hidden; width: 15px; height: 90px; background-color: rgba(0,0,0,0.12549); pointer-events: auto;');
		elVertScrollBg.className='ggskin ggskin_scrollarea_vscrollbg';
		elVertScrollFg = me._node_scroller__vertScrollFg = document.createElement('div');
		elVertScrollBg.appendChild(elVertScrollFg);
		elVertScrollFg.setAttribute('style', 'position: absolute; left: 0px; top: 0px; visibility: hidden; width: 15px; height: 90px; background-color: rgba(255,255,255,0.25098); pointer-events: auto;');
		elVertScrollFg.className='ggskin ggskin_scrollarea_vscrollfg';
		me._node_scroller.ggScrollPosY = 0;
		me._node_scroller.ggScrollPosYPercent = 0.0;
		elVertScrollFg.onmousedown = function(e) {
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) return;
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			me._node_scroller.ggDragLastY = e.clientY;
			document.onmouseup = function() {
				let inertiaInterval = setInterval(function() {
					me._node_scroller.ggDragInertiaY *= 0.65;
					me._node_scroller.ggScrollByY(me._node_scroller.ggDragInertiaY);
					if (Math.abs(me._node_scroller.ggDragInertiaY) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 50);
				document.onmouseup = null;
				document.onmousemove = null;
			}
			document.onmousemove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var diffY = e.clientY - me._node_scroller.ggDragLastY;
				me._node_scroller.ggDragInertiaY = diffY;
				me._node_scroller.ggDragLastY = e.clientY;
				me._node_scroller.ggScrollByY(diffY);
			}
		}
		elVertScrollFg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			me._node_scroller.ggDragLastY = t ? t[0].clientY : e.clientY;
			document.ontouchend = function() {
				let inertiaInterval = setInterval(function() {
					me._node_scroller.ggDragInertiaY *= 0.65;
					me._node_scroller.ggScrollByY(me._node_scroller.ggDragInertiaY);
					if (Math.abs(me._node_scroller.ggDragInertiaY) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 50);
				document.ontouchend = null;
				document.ontouchmove = null;
				document.onpointerup = null;
				document.onpointermove = null;
			}
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				document.onpointerup = document.ontouchend;
			}
			document.ontouchmove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var t = e.touches;
				var diffY = (t ? t[0].clientY : e.clientY) - me._node_scroller.ggDragLastY;
				me._node_scroller.ggDragInertiaY = diffY;
				me._node_scroller.ggDragLastY = t ? t[0].clientY : e.clientY;
				me._node_scroller.ggScrollByY(diffY);
			}
			if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
				document.onpointermove = document.ontouchmove;
			}
		}
		if (player.getOS() == 1 && navigator.maxTouchPoints > 0) {
			elVertScrollFg.onpointerdown = elVertScrollFg.ontouchstart;
		}
		elVertScrollBg.onmousedown = function(e) {
			e = e || window.event;
			e.preventDefault();
			var diffY = me._node_scroller.ggScrollHeight;
			if (e.offsetY < me._node_scroller.ggScrollPosY) {
				diffY = diffY * -1;
			}
			me._node_scroller.ggScrollByYSmooth(diffY);
		}
		elVertScrollBg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			var rect = me._node_scroller__vertScrollBg.getBoundingClientRect();
			var diffY = me._node_scroller.ggScrollHeight;
			if ((t[0].clientY - rect.top) < me._node_scroller.ggScrollPosY) {
				diffY = diffY * -1;
			}
			me._node_scroller.ggScrollByYSmooth(diffY);
		}
		el.addEventListener('wheel', function(e) {
			e.preventDefault();
			var wheelDelta = Math.sign(e.deltaY);
			me._node_scroller.ggScrollByYSmooth(20 * wheelDelta);
		});
		elCornerBg = me._node_scroller__cornerBg = document.createElement('div');
		el.appendChild(elCornerBg);
		elCornerBg.setAttribute('style', 'position: absolute; right: 0px; bottom: 0px; visibility: hidden; width: 15px; height: 15px; background-color: rgba(255,255,255,1);');
		elCornerBg.className='ggskin ggskin_scrollarea_scrollcorner';
		el.ggId="node_scroller";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_scrollarea ";
		el.ggType='scrollarea';
		hs ='';
		hs+='border : 1px solid rgba(0, 0, 0, 0);';
		hs+='height : calc(87%  -  50px);';
		hs+='opacity : 0;';
		hs+='overflow : hidden;';
		hs+='position : absolute;';
		hs+='right : -8px;';
		hs+='top : 9px;';
		hs+='visibility : hidden;';
		hs+='width : 244px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='100% 0%';
		me._node_scroller.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._node_scroller.ggUpdatePosition=function (useTransition) {
			{
				var horScrollWasVisible = this.ggHorScrollVisible;
				var vertScrollWasVisible = this.ggVertScrollVisible;
				this.ggContent.style.left = '0px';
				this.ggContent.style.top = '0px';
				this.ggContentLeftOffset = 0;
				this.ggContentTopOffset = 0;
				var offsetWidthWithScale = this.getBoundingClientRect().width;
				var offsetHeightWithScale = this.getBoundingClientRect().height;
				var domRectContent = this.ggContent.getBoundingClientRect();
				var minX = 0;
				var minY = 0;
				var maxX = 0;
				var maxY = 0;
				var stack=[];
				stack.push(this.ggContent);
				while(stack.length>0) {
					var e=stack.pop();
					if (e!=this.ggContent && e.getBoundingClientRect && e.style['display']!='none') {
						var domRectChild = e.getBoundingClientRect();
						var diffX = domRectChild.left - domRectContent.left;
						minX = Math.min(minX, diffX);
						maxX = Math.max(maxX, diffX + domRectChild.width);
						var diffY = domRectChild.top - domRectContent.top;
						minY = Math.min(minY, diffY);
						maxY = Math.max(maxY, diffY + domRectChild.height);
					}
					if (e.hasChildNodes() && e.style['display']!='none') {
						for(var i=0;i<e.childNodes.length;i++) {
							stack.push(e.childNodes[i]);
						}
					}
				}
				if (minX < 0) this.ggContentLeftOffset = -minX;
				if (minY < 0) this.ggContentTopOffset = -minY;
				var contentWidth = maxX - minX;
				var contentHeight = maxY - minY;
				this.ggContent.style.left = this.ggContentLeftOffset + 'px';
				this.ggContent.style.top = this.ggContentTopOffset + 'px';
				this.ggContent.style.width = contentWidth + 'px';
				this.ggContent.style.height = contentHeight + 'px';
				var containerWidth = offsetWidthWithScale;
				if (this.ggVertScrollVisible) containerWidth -= 15;
				if (contentWidth < containerWidth) {
					this.ggContent.style.right = (this.ggVertScrollVisible ? 15 : 0) + 'px';
					this.ggContent.style.left = '';
					this.ggContent.style.marginRight = '0px';
				}
				else {
					this.ggContent.style.left = this.ggContentLeftOffset + 'px';
					this.ggContent.style.marginLeft = '0px';
				}
				this.ggContent.style.top = -(Math.round(me._node_scroller.ggScrollPosY / me._node_scroller.ggVPercentVisible)) + this.ggContentTopOffset + 'px';
				this.ggContent.style.marginTop = '0px';
				me._node_scroller__vertScrollBg.style.visibility = 'inherit';
				me._node_scroller__vertScrollFg.style.visibility = 'inherit';
				me._node_scroller.ggVertScrollVisible = true;
				if(me._node_scroller.ggVertScrollVisible) {
					me._node_scroller.ggAvailableWidth = me._node_scroller.offsetWidth - 15;
					if (me._node_scroller.ggHorScrollVisible) {
						me._node_scroller.ggAvailableHeight = me._node_scroller.offsetHeight - 15;
						me._node_scroller.ggAvailableHeightWithScale = me._node_scroller.getBoundingClientRect().height - me._node_scroller__vertScrollBg.getBoundingClientRect().width;
						me._node_scroller__cornerBg.style.visibility = 'inherit';
					} else {
						me._node_scroller.ggAvailableHeight = me._node_scroller.offsetHeight;
						me._node_scroller.ggAvailableHeightWithScale = me._node_scroller.getBoundingClientRect().height;
						me._node_scroller__cornerBg.style.visibility = 'hidden';
					}
					me._node_scroller__vertScrollBg.style.height = me._node_scroller.ggAvailableHeight + 'px';
					me._node_scroller.ggVPercentVisible = contentHeight != 0 ? me._node_scroller.ggAvailableHeightWithScale / contentHeight : 0.0;
					if (me._node_scroller.ggVPercentVisible > 1.0) me._node_scroller.ggVPercentVisible = 1.0;
					me._node_scroller.ggScrollHeight =  Math.round(me._node_scroller__vertScrollBg.offsetHeight * me._node_scroller.ggVPercentVisible);
					me._node_scroller__vertScrollFg.style.height = me._node_scroller.ggScrollHeight + 'px';
					me._node_scroller.ggScrollPosY = me._node_scroller.ggScrollPosYPercent * me._node_scroller.ggAvailableHeight;
					me._node_scroller.ggScrollPosY = Math.min(me._node_scroller.ggScrollPosY, me._node_scroller__vertScrollBg.offsetHeight - me._node_scroller__vertScrollFg.offsetHeight);
					me._node_scroller__vertScrollFg.style.top = me._node_scroller.ggScrollPosY + 'px';
					if (me._node_scroller.ggVPercentVisible < 1.0) {
						me._node_scroller__content.style.top = -(Math.round(me._node_scroller.ggScrollPosY / me._node_scroller.ggVPercentVisible)) + this.ggContentTopOffset + 'px';
					}
				} else {
					me._node_scroller.ggAvailableWidth = me._node_scroller.offsetWidth;
					me._node_scroller.ggScrollPosY = 0;
					me._node_scroller.ggScrollPosYPercent = 0.0;
					me._node_scroller__content.style.top = this.ggContentTopOffset + 'px';
					me._node_scroller__cornerBg.style.visibility = 'hidden';
				}
				if(horScrollWasVisible != me._node_scroller.ggHorScrollVisible || vertScrollWasVisible != me._node_scroller.ggVertScrollVisible) {
					me.updateSize(me._node_scroller);
					me._node_scroller.ggUpdatePosition();
				}
			}
		}
		el=me._node_cloner=document.createElement('div');
		el.ggPermeable=false;
		el.ggNumRepeat = 1;
		el.ggNumRows = 0;
		el.ggNumCols = 0;
		el.ggWidth = 235;
		el.ggHeight = 89;
		el.ggUpdating = false;
		el.ggFilter = [];
		el.ggInstances = [];
		me._node_cloner.callChildLogicBlocks_changenode = function(){
			if(me._node_cloner.ggInstances) {
				var i;
				for(i = 0; i < me._node_cloner.ggInstances.length; i++) {
					if (me._node_cloner.ggInstances[i]._node_title && me._node_cloner.ggInstances[i]._node_title.logicBlock_visible) {
						me._node_cloner.ggInstances[i]._node_title.logicBlock_visible();
					}
				}
			}
		}
		me._node_cloner.callChildLogicBlocks_mouseover = function(){
			if(me._node_cloner.ggInstances) {
				var i;
				for(i = 0; i < me._node_cloner.ggInstances.length; i++) {
					if (me._node_cloner.ggInstances[i]._node_visited && me._node_cloner.ggInstances[i]._node_visited.logicBlock_bordercolor) {
						me._node_cloner.ggInstances[i]._node_visited.logicBlock_bordercolor();
					}
				}
			}
		}
		me._node_cloner.callChildLogicBlocks_active = function(){
			if(me._node_cloner.ggInstances) {
				var i;
				for(i = 0; i < me._node_cloner.ggInstances.length; i++) {
					if (me._node_cloner.ggInstances[i]._node_visited && me._node_cloner.ggInstances[i]._node_visited.logicBlock_bordercolor) {
						me._node_cloner.ggInstances[i]._node_visited.logicBlock_bordercolor();
					}
				}
			}
		}
		me._node_cloner.callChildLogicBlocks_changevisitednodes = function(){
			if(me._node_cloner.ggInstances) {
				var i;
				for(i = 0; i < me._node_cloner.ggInstances.length; i++) {
					if (me._node_cloner.ggInstances[i]._node_visited && me._node_cloner.ggInstances[i]._node_visited.logicBlock_bordercolor) {
						me._node_cloner.ggInstances[i]._node_visited.logicBlock_bordercolor();
					}
				}
			}
		}
		me._node_cloner.callChildLogicBlocks_activehotspotchanged = function(){
			if(me._node_cloner.ggInstances) {
				var i;
				for(i = 0; i < me._node_cloner.ggInstances.length; i++) {
					if (me._node_cloner.ggInstances[i]._node_title && me._node_cloner.ggInstances[i]._node_title.logicBlock_visible) {
						me._node_cloner.ggInstances[i]._node_title.logicBlock_visible();
					}
				}
			}
		}
		el.ggUpdate = function(filter) {
			if(me._node_cloner.ggUpdating == true) return;
			me._node_cloner.ggUpdating = true;
			var el=me._node_cloner;
			var curNumCols = 0;
			curNumCols = me._node_cloner.ggNumRepeat;
			if (curNumCols < 1) curNumCols = 1;
			if (typeof filter=='object') {
				el.ggFilter = filter;
			} else {
				filter = el.ggFilter;
			};
			if (me.ggTag) filter.push(me.ggTag);
			filter=filter.sort();
			if ((el.ggNumCols == curNumCols) && (el.ggInstances.length > 0) && (filter.length === el.ggCurrentFilter.length) && (filter.every(function(value, index) { return value === el.ggCurrentFilter[index] }) )) {
				me._node_cloner.ggUpdating = false;
				return;
			} else {
				el.ggNumRows = 1;
				el.ggNumCols = curNumCols;
			}
			el.ggCurrentFilter = filter;
			el.ggInstances = [];
			if (el.hasChildNodes() == true) {
				while (el.firstChild) {
					el.removeChild(el.firstChild);
				}
			}
			var tourNodes = player.getNodeIds();
			var row = 0;
			var column = 0;
			var currentIndex = 0;
			for (var i=0; i < tourNodes.length; i++) {
				var nodeId = tourNodes[i];
				var passed = true;
				var nodeData = player.getNodeUserdata(nodeId);
				if (filter.length > 0) {
					for (var j=0; j < filter.length; j++) {
						if (nodeData['tags'].indexOf(filter[j]) == -1) passed = false;
					}
				}
				if (passed) {
				var parameter={};
				parameter.top=(row * me._node_cloner.ggHeight) + 'px';
				parameter.left=(column * me._node_cloner.ggWidth) + 'px';
				parameter.width=me._node_cloner.ggWidth + 'px';
				parameter.height=me._node_cloner.ggHeight + 'px';
				parameter.index=currentIndex;
				parameter.title=nodeData['title'];
				var inst = new SkinCloner_node_cloner_Class(nodeId, me, el, parameter);
				currentIndex++;
				el.ggInstances.push(inst);
				el.appendChild(inst.__div);
				inst.__div.ggObj=inst;
				skin.updateSize(inst.__div);
				column++;
				if (column >= el.ggNumCols) {
					column = 0;
					row++;
					el.ggNumRows++;
				}
				}
			}
			me._node_cloner.callChildLogicBlocks_changenode();
			me._node_cloner.callChildLogicBlocks_mouseover();
			me._node_cloner.callChildLogicBlocks_active();
			me._node_cloner.callChildLogicBlocks_changevisitednodes();
			me._node_cloner.callChildLogicBlocks_activehotspotchanged();
			me._node_cloner.ggUpdating = false;
			player.triggerEvent('clonerchanged');
			if (me._node_cloner.parentNode.classList.contains('ggskin_subelement') && me._node_cloner.parentNode.parentNode.classList.contains('ggskin_scrollarea')) me._node_cloner.parentNode.parentNode.ggUpdatePosition();
		}
		el.ggFilter = [];
		el.ggFilter[0] = "自然史教育館";
		el.ggId="node_cloner";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_cloner ";
		el.ggType='cloner';
		hs ='';
		hs+='height : 89px;';
		hs+='left : 1px;';
		hs+='overflow : visible;';
		hs+='position : absolute;';
		hs+='top : -1px;';
		hs+='visibility : inherit;';
		hs+='width : 235px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._node_cloner.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._node_cloner.onclick=function (e) {
			me._map_1.ggClearMap();
			me._map_1.style[domTransition]='none';
			me._map_1.style.visibility='hidden';
			me._map_1.ggVisible=false;
		}
		me._node_cloner.ggUpdateConditionNodeChange=function () {
			var cnode=player.getCurrentNode();
			for(var i=0; i<me._node_cloner.childNodes.length; i++) {
				var child=me._node_cloner.childNodes[i];
				if (child.ggObj && child.ggObj.ggNodeId==cnode) {
			        var childOffX = child.offsetLeft;
			        var childOffY = child.offsetTop;
					var p = child.parentElement;
			        while (p != null && p!==this.divSkin) {
						if (p.ggType && p.ggType == 'scrollarea') {
							p.ggScrollIntoView(childOffX, childOffY, child.clientWidth, child.clientHeight);
						}
						childOffX += p.offsetLeft;
						childOffY += p.offsetTop;
						p = p.parentElement;
					}
				}
			}
		}
		me._node_cloner.ggUpdatePosition=function (useTransition) {
				me._node_cloner.ggUpdate();
		}
		me._node_cloner.ggNodeChange=function () {
			me._node_cloner.ggUpdateConditionNodeChange();
		}
		me._node_scroller__content.appendChild(me._node_cloner);
		me._menu_background.appendChild(me._node_scroller);
		el=me._image_29=document.createElement('div');
		els=me._image_29__img=document.createElement('img');
		els.className='ggskin ggskin_image_29';
		hs=basePath + 'images/image_29.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 29";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='bottom : 73px;';
		hs+='cursor : pointer;';
		hs+='height : 97px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='right : 174px;';
		hs+='visibility : hidden;';
		hs+='width : 148px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_29.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._image_29.onclick=function (e) {
			if (player.transitionsDisabled) {
				me._image_29.style[domTransition]='none';
			} else {
				me._image_29.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_29.style.opacity='0';
			me._image_29.style.visibility='hidden';
			if (player.transitionsDisabled) {
				me._image_19.style[domTransition]='none';
			} else {
				me._image_19.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_19.style.opacity='0';
			me._image_19.style.visibility='hidden';
			if (player.transitionsDisabled) {
				me._image_200.style[domTransition]='none';
			} else {
				me._image_200.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_200.style.opacity='0';
			me._image_200.style.visibility='hidden';
			if (player.transitionsDisabled) {
				me._image_21.style[domTransition]='none';
			} else {
				me._image_21.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_21.style.opacity='0';
			me._image_21.style.visibility='hidden';
			if (player.transitionsDisabled) {
				me._image_25.style[domTransition]='none';
			} else {
				me._image_25.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_25.style.opacity='0';
			me._image_25.style.visibility='hidden';
			if (player.transitionsDisabled) {
				me._image_27.style[domTransition]='none';
			} else {
				me._image_27.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_27.style.opacity='0';
			me._image_27.style.visibility='hidden';
			if (player.transitionsDisabled) {
				me._image_31.style[domTransition]='none';
			} else {
				me._image_31.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_31.style.opacity='1';
			me._image_31.style.visibility=me._image_31.ggVisible?'inherit':'hidden';
			if (player.transitionsDisabled) {
				me._image_18.style[domTransition]='none';
			} else {
				me._image_18.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_18.style.opacity='1';
			me._image_18.style.visibility=me._image_18.ggVisible?'inherit':'hidden';
			if (player.transitionsDisabled) {
				me._image_30.style[domTransition]='none';
			} else {
				me._image_30.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_30.style.opacity='1';
			me._image_30.style.visibility=me._image_30.ggVisible?'inherit':'hidden';
		}
		me._image_29.ggUpdatePosition=function (useTransition) {
		}
		me._menu_background.appendChild(me._image_29);
		el=me._image_28=document.createElement('div');
		els=me._image_28__img=document.createElement('img');
		els.className='ggskin ggskin_image_28';
		hs=basePath + 'images/image_28.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 28";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='bottom : 73px;';
		hs+='cursor : pointer;';
		hs+='height : 97px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='right : 174px;';
		hs+='visibility : hidden;';
		hs+='width : 148px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_28.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._image_28.onclick=function (e) {
			if (player.transitionsDisabled) {
				me._node_scroller_5.style[domTransition]='none';
			} else {
				me._node_scroller_5.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._node_scroller_5.style.opacity='0';
			me._node_scroller_5.style.visibility='hidden';
			if (player.transitionsDisabled) {
				me._image_28.style[domTransition]='none';
			} else {
				me._image_28.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_28.style.opacity='0';
			me._image_28.style.visibility='hidden';
			if (player.transitionsDisabled) {
				me._image_19.style[domTransition]='none';
			} else {
				me._image_19.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_19.style.opacity='1';
			me._image_19.style.visibility=me._image_19.ggVisible?'inherit':'hidden';
			if (player.transitionsDisabled) {
				me._image_200.style[domTransition]='none';
			} else {
				me._image_200.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_200.style.opacity='1';
			me._image_200.style.visibility=me._image_200.ggVisible?'inherit':'hidden';
			if (player.transitionsDisabled) {
				me._image_21.style[domTransition]='none';
			} else {
				me._image_21.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_21.style.opacity='1';
			me._image_21.style.visibility=me._image_21.ggVisible?'inherit':'hidden';
			if (player.transitionsDisabled) {
				me._image_25.style[domTransition]='none';
			} else {
				me._image_25.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_25.style.opacity='1';
			me._image_25.style.visibility=me._image_25.ggVisible?'inherit':'hidden';
			if (player.transitionsDisabled) {
				me._image_27.style[domTransition]='none';
			} else {
				me._image_27.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_27.style.opacity='1';
			me._image_27.style.visibility=me._image_27.ggVisible?'inherit':'hidden';
		}
		me._image_28.ggUpdatePosition=function (useTransition) {
		}
		me._menu_background.appendChild(me._image_28);
		el=me._image_26=document.createElement('div');
		els=me._image_26__img=document.createElement('img');
		els.className='ggskin ggskin_image_26';
		hs=basePath + 'images/image_26.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 26";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='bottom : 73px;';
		hs+='cursor : pointer;';
		hs+='height : 97px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='right : 174px;';
		hs+='visibility : hidden;';
		hs+='width : 148px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_26.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._image_26.onclick=function (e) {
			if (player.transitionsDisabled) {
				me._node_scroller_4.style[domTransition]='none';
			} else {
				me._node_scroller_4.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._node_scroller_4.style.opacity='0';
			me._node_scroller_4.style.visibility='hidden';
			if (player.transitionsDisabled) {
				me._image_26.style[domTransition]='none';
			} else {
				me._image_26.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_26.style.opacity='0';
			me._image_26.style.visibility='hidden';
			if (player.transitionsDisabled) {
				me._image_19.style[domTransition]='none';
			} else {
				me._image_19.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_19.style.opacity='1';
			me._image_19.style.visibility=me._image_19.ggVisible?'inherit':'hidden';
			if (player.transitionsDisabled) {
				me._image_200.style[domTransition]='none';
			} else {
				me._image_200.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_200.style.opacity='1';
			me._image_200.style.visibility=me._image_200.ggVisible?'inherit':'hidden';
			if (player.transitionsDisabled) {
				me._image_21.style[domTransition]='none';
			} else {
				me._image_21.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_21.style.opacity='1';
			me._image_21.style.visibility=me._image_21.ggVisible?'inherit':'hidden';
			if (player.transitionsDisabled) {
				me._image_25.style[domTransition]='none';
			} else {
				me._image_25.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_25.style.opacity='1';
			me._image_25.style.visibility=me._image_25.ggVisible?'inherit':'hidden';
			if (player.transitionsDisabled) {
				me._image_27.style[domTransition]='none';
			} else {
				me._image_27.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_27.style.opacity='1';
			me._image_27.style.visibility=me._image_27.ggVisible?'inherit':'hidden';
		}
		me._image_26.ggUpdatePosition=function (useTransition) {
		}
		me._menu_background.appendChild(me._image_26);
		el=me._image_24=document.createElement('div');
		els=me._image_24__img=document.createElement('img');
		els.className='ggskin ggskin_image_24';
		hs=basePath + 'images/image_24.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 24";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='bottom : 73px;';
		hs+='cursor : pointer;';
		hs+='height : 97px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='right : 174px;';
		hs+='visibility : hidden;';
		hs+='width : 148px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_24.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._image_24.onclick=function (e) {
			if (player.transitionsDisabled) {
				me._node_scroller_3.style[domTransition]='none';
			} else {
				me._node_scroller_3.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._node_scroller_3.style.opacity='0';
			me._node_scroller_3.style.visibility='hidden';
			if (player.transitionsDisabled) {
				me._image_24.style[domTransition]='none';
			} else {
				me._image_24.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_24.style.opacity='0';
			me._image_24.style.visibility='hidden';
			if (player.transitionsDisabled) {
				me._image_19.style[domTransition]='none';
			} else {
				me._image_19.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_19.style.opacity='1';
			me._image_19.style.visibility=me._image_19.ggVisible?'inherit':'hidden';
			if (player.transitionsDisabled) {
				me._image_200.style[domTransition]='none';
			} else {
				me._image_200.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_200.style.opacity='1';
			me._image_200.style.visibility=me._image_200.ggVisible?'inherit':'hidden';
			if (player.transitionsDisabled) {
				me._image_21.style[domTransition]='none';
			} else {
				me._image_21.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_21.style.opacity='1';
			me._image_21.style.visibility=me._image_21.ggVisible?'inherit':'hidden';
			if (player.transitionsDisabled) {
				me._image_25.style[domTransition]='none';
			} else {
				me._image_25.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_25.style.opacity='1';
			me._image_25.style.visibility=me._image_25.ggVisible?'inherit':'hidden';
			if (player.transitionsDisabled) {
				me._image_27.style[domTransition]='none';
			} else {
				me._image_27.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_27.style.opacity='1';
			me._image_27.style.visibility=me._image_27.ggVisible?'inherit':'hidden';
		}
		me._image_24.ggUpdatePosition=function (useTransition) {
		}
		me._menu_background.appendChild(me._image_24);
		el=me._image_23=document.createElement('div');
		els=me._image_23__img=document.createElement('img');
		els.className='ggskin ggskin_image_23';
		hs=basePath + 'images/image_23.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 23";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='bottom : 73px;';
		hs+='cursor : pointer;';
		hs+='height : 97px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='right : 174px;';
		hs+='visibility : hidden;';
		hs+='width : 148px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_23.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._image_23.onclick=function (e) {
			if (player.transitionsDisabled) {
				me._node_scroller_2.style[domTransition]='none';
			} else {
				me._node_scroller_2.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._node_scroller_2.style.opacity='0';
			me._node_scroller_2.style.visibility='hidden';
			if (player.transitionsDisabled) {
				me._image_23.style[domTransition]='none';
			} else {
				me._image_23.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_23.style.opacity='0';
			me._image_23.style.visibility='hidden';
			if (player.transitionsDisabled) {
				me._image_19.style[domTransition]='none';
			} else {
				me._image_19.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_19.style.opacity='1';
			me._image_19.style.visibility=me._image_19.ggVisible?'inherit':'hidden';
			if (player.transitionsDisabled) {
				me._image_200.style[domTransition]='none';
			} else {
				me._image_200.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_200.style.opacity='1';
			me._image_200.style.visibility=me._image_200.ggVisible?'inherit':'hidden';
			if (player.transitionsDisabled) {
				me._image_21.style[domTransition]='none';
			} else {
				me._image_21.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_21.style.opacity='1';
			me._image_21.style.visibility=me._image_21.ggVisible?'inherit':'hidden';
			if (player.transitionsDisabled) {
				me._image_25.style[domTransition]='none';
			} else {
				me._image_25.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_25.style.opacity='1';
			me._image_25.style.visibility=me._image_25.ggVisible?'inherit':'hidden';
			if (player.transitionsDisabled) {
				me._image_27.style[domTransition]='none';
			} else {
				me._image_27.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_27.style.opacity='1';
			me._image_27.style.visibility=me._image_27.ggVisible?'inherit':'hidden';
		}
		me._image_23.ggUpdatePosition=function (useTransition) {
		}
		me._menu_background.appendChild(me._image_23);
		el=me._image_22=document.createElement('div');
		els=me._image_22__img=document.createElement('img');
		els.className='ggskin ggskin_image_22';
		hs=basePath + 'images/image_22.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 22";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='bottom : 73px;';
		hs+='cursor : pointer;';
		hs+='height : 97px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='right : 174px;';
		hs+='visibility : hidden;';
		hs+='width : 148px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_22.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._image_22.onclick=function (e) {
			if (player.transitionsDisabled) {
				me._node_scroller.style[domTransition]='none';
			} else {
				me._node_scroller.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._node_scroller.style.opacity='0';
			me._node_scroller.style.visibility='hidden';
			if (player.transitionsDisabled) {
				me._image_22.style[domTransition]='none';
			} else {
				me._image_22.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_22.style.opacity='0';
			me._image_22.style.visibility='hidden';
			if (player.transitionsDisabled) {
				me._image_19.style[domTransition]='none';
			} else {
				me._image_19.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_19.style.opacity='1';
			me._image_19.style.visibility=me._image_19.ggVisible?'inherit':'hidden';
			if (player.transitionsDisabled) {
				me._image_200.style[domTransition]='none';
			} else {
				me._image_200.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_200.style.opacity='1';
			me._image_200.style.visibility=me._image_200.ggVisible?'inherit':'hidden';
			if (player.transitionsDisabled) {
				me._image_21.style[domTransition]='none';
			} else {
				me._image_21.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_21.style.opacity='1';
			me._image_21.style.visibility=me._image_21.ggVisible?'inherit':'hidden';
			if (player.transitionsDisabled) {
				me._image_25.style[domTransition]='none';
			} else {
				me._image_25.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_25.style.opacity='1';
			me._image_25.style.visibility=me._image_25.ggVisible?'inherit':'hidden';
			if (player.transitionsDisabled) {
				me._image_27.style[domTransition]='none';
			} else {
				me._image_27.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_27.style.opacity='1';
			me._image_27.style.visibility=me._image_27.ggVisible?'inherit':'hidden';
		}
		me._image_22.ggUpdatePosition=function (useTransition) {
		}
		me._menu_background.appendChild(me._image_22);
		el=me._image_31=document.createElement('div');
		els=me._image_31__img=document.createElement('img');
		els.className='ggskin ggskin_image_31';
		hs=basePath + 'images/image_31.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 31";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 141px;';
		hs+='left : 67px;';
		hs+='position : absolute;';
		hs+='top : -3px;';
		hs+='visibility : inherit;';
		hs+='width : 252px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_31.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._image_31.onclick=function (e) {
			player.openUrl("https:\/\/fossil.tnc.gov.tw\/latestevent\/index.php?m2=18","");
		}
		me._image_31.ggUpdatePosition=function (useTransition) {
		}
		me._menu_background.appendChild(me._image_31);
		el=me._image_30=document.createElement('div');
		els=me._image_30__img=document.createElement('img');
		els.className='ggskin ggskin_image_30';
		hs=basePath + 'images/image_30.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 30";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 139px;';
		hs+='position : absolute;';
		hs+='right : -32px;';
		hs+='top : 278px;';
		hs+='visibility : inherit;';
		hs+='width : 254px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_30.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._image_30.onclick=function (e) {
			player.openUrl("https:\/\/fossil.tnc.gov.tw\/content\/index.php?m2=96","");
		}
		me._image_30.ggUpdatePosition=function (useTransition) {
		}
		me._menu_background.appendChild(me._image_30);
		el=me._image_18=document.createElement('div');
		els=me._image_18__img=document.createElement('img');
		els.className='ggskin ggskin_image_18';
		hs=basePath + 'images/image_18.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 18";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 152px;';
		hs+='position : absolute;';
		hs+='right : -40px;';
		hs+='top : 128px;';
		hs+='visibility : inherit;';
		hs+='width : 267px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='100% 50%';
		me._image_18.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._image_18.onclick=function (e) {
			if (player.transitionsDisabled) {
				me._image_31.style[domTransition]='none';
			} else {
				me._image_31.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_31.style.opacity='0';
			me._image_31.style.visibility='hidden';
			if (player.transitionsDisabled) {
				me._image_18.style[domTransition]='none';
			} else {
				me._image_18.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_18.style.opacity='0';
			me._image_18.style.visibility='hidden';
			if (player.transitionsDisabled) {
				me._image_30.style[domTransition]='none';
			} else {
				me._image_30.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_30.style.opacity='0';
			me._image_30.style.visibility='hidden';
			if (player.transitionsDisabled) {
				me._image_19.style[domTransition]='none';
			} else {
				me._image_19.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_19.style.opacity='1';
			me._image_19.style.visibility=me._image_19.ggVisible?'inherit':'hidden';
			if (player.transitionsDisabled) {
				me._image_200.style[domTransition]='none';
			} else {
				me._image_200.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_200.style.opacity='1';
			me._image_200.style.visibility=me._image_200.ggVisible?'inherit':'hidden';
			if (player.transitionsDisabled) {
				me._image_21.style[domTransition]='none';
			} else {
				me._image_21.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_21.style.opacity='1';
			me._image_21.style.visibility=me._image_21.ggVisible?'inherit':'hidden';
			if (player.transitionsDisabled) {
				me._image_25.style[domTransition]='none';
			} else {
				me._image_25.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_25.style.opacity='1';
			me._image_25.style.visibility=me._image_25.ggVisible?'inherit':'hidden';
			if (player.transitionsDisabled) {
				me._image_27.style[domTransition]='none';
			} else {
				me._image_27.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_27.style.opacity='1';
			me._image_27.style.visibility=me._image_27.ggVisible?'inherit':'hidden';
			if (player.transitionsDisabled) {
				me._image_29.style[domTransition]='none';
			} else {
				me._image_29.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_29.style.opacity='1';
			me._image_29.style.visibility=me._image_29.ggVisible?'inherit':'hidden';
		}
		me._image_18.ggUpdatePosition=function (useTransition) {
		}
		me._menu_background.appendChild(me._image_18);
		me.divSkin.appendChild(me._menu_background);
		el=me._menu_open=document.createElement('div');
		els=me._menu_open__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJz8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICctLy9XM0MvL0RURCBTVkcgMS4xLy9FTicgJ2h0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCc+Cjxzdmcgd2lkdGg9IjMycHgiIGZpbGw9IiNmZmZmZmYiIGhlaWdodD0iMzJweCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBpZD0iTGF5ZXJfMSIgdmVyc2lvbj0iMS4xIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMiAzMjsiIGZpbGwtb3BhY2l0eT0iMSIgdmlld0JveD0iMCAwIDMyIDMyIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcm'+
			'cvMTk5OS94bGluayIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8cGF0aCBkPSJNNCwxMGgyNGMxLjEwNCwwLDItMC44OTYsMi0ycy0wLjg5Ni0yLTItMkg0QzIuODk2LDYsMiw2Ljg5NiwyLDhTMi44OTYsMTAsNCwxMHogTTI4LDE0SDRjLTEuMTA0LDAtMiwwLjg5Ni0yLDIgIHMwLjg5NiwyLDIsMmgyNGMxLjEwNCwwLDItMC44OTYsMi0yUzI5LjEwNCwxNCwyOCwxNHogTTI4LDIySDRjLTEuMTA0LDAtMiwwLjg5Ni0yLDJzMC44OTYsMiwyLDJoMjRjMS4xMDQsMCwyLTAuODk2LDItMiAgUzI5LjEwNCwyMiwyOCwyMnoiLz4KPC9zdmc+Cg==';
		me._menu_open__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="menu_open";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 46px;';
		hs+='position : absolute;';
		hs+='right : 244px;';
		hs+='top : -2px;';
		hs+='visibility : inherit;';
		hs+='width : 43px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._menu_open.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._menu_open.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getVariableValue('category_visible') == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._menu_open.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._menu_open.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._menu_open.style[domTransition]='right 1000ms ease 0ms, top 1000ms ease 0ms, opacity 500ms ease 0ms';
				if (me._menu_open.ggCurrentLogicStatePosition == 0) {
					me._menu_open.style.right='5px';
					me._menu_open.style.top='5px';
				}
				else {
					me._menu_open.style.right='244px';
					me._menu_open.style.top='-2px';
				}
			}
		}
		me._menu_open.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['menu_open'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else if (
				((player.getVariableValue('category_visible') == false))
			)
			{
				newLogicStateAlpha = 1;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._menu_open.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._menu_open.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._menu_open.style[domTransition]='right 1000ms ease 0ms, top 1000ms ease 0ms, opacity 500ms ease 0ms';
				if (me._menu_open.ggCurrentLogicStateAlpha == 0) {
					me._menu_open.style.visibility=me._menu_open.ggVisible?'inherit':'hidden';
					me._menu_open.style.opacity=1;
				}
				else if (me._menu_open.ggCurrentLogicStateAlpha == 1) {
					me._menu_open.style.visibility=me._menu_open.ggVisible?'inherit':'hidden';
					me._menu_open.style.opacity=0.6;
				}
				else {
					me._menu_open.style.visibility=me._menu_open.ggVisible?'inherit':'hidden';
					me._menu_open.style.opacity=1;
				}
			}
		}
		me._menu_open.onclick=function (e) {
			if (
				(
					((player.getVariableValue('node_visible') == false))
				)
			) {
				player.setVariableValue('category_visible', !player.getVariableValue('category_visible'));
			}
			player.setVariableValue('node_visible', false);
			var flag=me._menu_background.ggOpacitiyActive;
			if (player.transitionsDisabled) {
				me._menu_background.style[domTransition]='none';
			} else {
				me._menu_background.style[domTransition]='all 500ms ease-out 0ms';
			}
			if (flag) {
				me._menu_background.style.opacity='1';
				me._menu_background.style.visibility=me._menu_background.ggVisible?'inherit':'hidden';
			} else {
				me._menu_background.style.opacity='0';
				me._menu_background.style.visibility='hidden';
			}
			me._menu_background.ggOpacitiyActive=!flag;
		}
		me._menu_open.onmouseover=function (e) {
			me.elementMouseOver['menu_open']=true;
			me._menu_open.logicBlock_alpha();
		}
		me._menu_open.onmouseout=function (e) {
			me.elementMouseOver['menu_open']=false;
			me._menu_open.logicBlock_alpha();
		}
		me._menu_open.ontouchend=function (e) {
			me.elementMouseOver['menu_open']=false;
			me._menu_open.logicBlock_alpha();
		}
		me._menu_open.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._menu_open);
		el=me._screentint_image=document.createElement('div');
		el.ggId="screentint_image";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : rgba(0,0,0,0.392157);';
		hs+='border : 0px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 100%;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._screentint_image.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._screentint_image.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_image_popup') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._screentint_image.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._screentint_image.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._screentint_image.style[domTransition]='';
				if (me._screentint_image.ggCurrentLogicStateVisible == 0) {
					me._screentint_image.style.visibility=(Number(me._screentint_image.style.opacity)>0||!me._screentint_image.style.opacity)?'inherit':'hidden';
					me._screentint_image.ggVisible=true;
				}
				else {
					me._screentint_image.style.visibility="hidden";
					me._screentint_image.ggVisible=false;
				}
			}
		}
		me._screentint_image.onclick=function (e) {
			player.setVariableValue('vis_image_popup', false);
		}
		me._screentint_image.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=((this.ggDx * pw)/100.0 + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=((this.ggDy * ph)/100.0 + ph/2 - h/2) + 'px';
			}
		}
		el=me._image_13=document.createElement('div');
		els=me._image_13__img=document.createElement('img');
		els.className='ggskin ggskin_image_13';
		hs=basePath + 'images/image_13.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 13";
		el.ggDx=-1;
		el.ggDy=-1;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='height : 100%;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_13.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._image_13.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._screentint_image.appendChild(me._image_13);
		me.divSkin.appendChild(me._screentint_image);
		el=me._image_popup=document.createElement('div');
		el.ggId="image_popup";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 80%;';
		hs+='left : 10%;';
		hs+='position : absolute;';
		hs+='top : 10%;';
		hs+='visibility : hidden;';
		hs+='width : 80%;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_popup.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._image_popup.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_image_popup') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._image_popup.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._image_popup.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._image_popup.style[domTransition]='';
				if (me._image_popup.ggCurrentLogicStateVisible == 0) {
					me._image_popup.style.visibility=(Number(me._image_popup.style.opacity)>0||!me._image_popup.style.opacity)?'inherit':'hidden';
					me._image_popup.ggVisible=true;
				}
				else {
					me._image_popup.style.visibility="hidden";
					me._image_popup.ggVisible=false;
				}
			}
		}
		me._image_popup.ggUpdatePosition=function (useTransition) {
		}
		el=me._popup_image=document.createElement('div');
		els=me._popup_image__img=document.createElement('img');
		els.className='ggskin ggskin_external';
		els.setAttribute('style','position: absolute;-webkit-user-drag:none;pointer-events:none;;');
		els.onload=function() {me._popup_image.ggUpdatePosition();}
		el.ggText=basePath + "";
		els.setAttribute('src', el.ggText);
		els['ondragstart']=function() { return false; };
		hs ='';
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="popup_image";
		el.ggDx=6.09;
		el.ggDy=0.15;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_external ";
		el.ggType='external';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 98.0556%;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 900px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._popup_image.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._popup_image.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_image_popup') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._popup_image.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._popup_image.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._popup_image.style[domTransition]='';
				if (me._popup_image.ggCurrentLogicStateVisible == 0) {
					me._popup_image.style.visibility=(Number(me._popup_image.style.opacity)>0||!me._popup_image.style.opacity)?'inherit':'hidden';
					me._popup_image.ggSubElement.src=me._popup_image.ggText;
					me._popup_image.ggVisible=true;
				}
				else {
					me._popup_image.style.visibility="hidden";
					me._popup_image__img.src = '';
					me._popup_image.ggVisible=false;
				}
			}
		}
		me._popup_image.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=((this.ggDx * pw)/100.0 + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=((this.ggDy * ph)/100.0 + ph/2 - h/2) + 'px';
			}
			var parentWidth = me._popup_image.clientWidth;
			var parentHeight = me._popup_image.clientHeight;
			var img = me._popup_image__img;
			var aspectRatioDiv = me._popup_image.clientWidth / me._popup_image.clientHeight;
			var aspectRatioImg = img.naturalWidth / img.naturalHeight;
			if (img.naturalWidth < parentWidth) parentWidth = img.naturalWidth;
			if (img.naturalHeight < parentHeight) parentHeight = img.naturalHeight;
			var currentWidth,currentHeight;
			if (aspectRatioDiv > aspectRatioImg) {
				currentHeight = parentHeight;
				currentWidth = parentHeight * aspectRatioImg;
				img.style.width='';
				img.style.height=parentHeight + 'px';
			} else {
				currentWidth = parentWidth;
				currentHeight = parentWidth / aspectRatioImg;
				img.style.width=parentWidth + 'px';
				img.style.height='';
			};
			img.style.left='50%';
			img.style.marginLeft='-' + currentWidth/2 + 'px';
			img.style.top='50%';
			img.style.marginTop='-' + currentHeight/2 + 'px';
		}
		me._image_popup.appendChild(me._popup_image);
		me.divSkin.appendChild(me._image_popup);
		el=me._image_popup_close=document.createElement('div');
		els=me._image_popup_close__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE1LjAuMiwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHdpZHRoPSIzMnB4IiB4PSIwcHgiIGhlaWdodD0iMzJweCIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBlbm'+
			'FibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAzMiAzMiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAzMiAzMiIgeT0iMHB4IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KIDxnIG9wYWNpdHk9IjAuNCI+CiAgPHBhdGggZD0iTTIxLjEzMiwxOS40MzlMMTcuNjkyLDE2bDMuNDQtMy40NGMwLjQ2OC0wLjQ2NywwLjQ2OC0xLjIyNSwwLTEuNjkzJiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuNDY3LTAuNDY3LTEuMjI1LTAuNDY3LTEuNjkxLDAuMDAxTDE2LDE0LjMwOGwtMy40NDEtMy40NDFjLTAuNDY3LTAuNDY3LTEuMjI0LTAuNDY3LTEuNjkxLDAuMDAx'+
			'JiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuNDY3LDAuNDY3LTAuNDY3LDEuMjI0LDAsMS42OUwxNC4zMDksMTZsLTMuNDQsMy40NGMtMC40NjcsMC40NjctMC40NjcsMS4yMjYsMCwxLjY5MmMwLjQ2NywwLjQ2NywxLjIyNiwwLjQ2NywxLjY5MiwwJiN4ZDsmI3hhOyYjeDk7JiN4OTtsMy40NC0zLjQ0bDMuNDM5LDMuNDM5YzAuNDY4LDAuNDY4LDEuMjI1LDAuNDY4LDEuNjkxLDAuMDAxQzIxLjU5OSwyMC42NjQsMjEuNiwxOS45MDcsMjEuMTMyLDE5LjQzOXogTTI0LjgzOSw3LjE2MSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy00Ljg4Mi00Ljg4Mi0xMi43OTYtNC44ODItMTcuNjc4LDBjLTQuODgxLDQuOD'+
			'gxLTQuODgxLDEyLjc5NSwwLDE3LjY3OGM0Ljg4MSw0Ljg4LDEyLjc5Niw0Ljg4LDE3LjY3OCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTtDMjkuNzIsMTkuOTU2LDI5LjcyLDEyLjA0MiwyNC44MzksNy4xNjF6IE0xNiwyNi4xMDZjLTIuNTg5LTAuMDAxLTUuMTctMC45ODUtNy4xNDYtMi45NjFTNS44OTUsMTguNTksNS44OTQsMTYmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLTIuNTkxLDAuOTg0LTUuMTcsMi45Ni03LjE0N0MxMC44Myw2Ljg3OCwxMy40MDksNS44OTQsMTYsNS44OTRjMi41OTEsMC4wMDEsNS4xNywwLjk4NCw3LjE0NywyLjk1OSYjeGQ7JiN4YTsmI3g5OyYjeDk7YzEuOTc2LDEuOTc3LDIu'+
			'OTU3LDQuNTU2LDIuOTYsNy4xNDdjLTAuMDAxLDIuNTkxLTAuOTg1LDUuMTY5LTIuOTYsNy4xNDhDMjEuMTY5LDI1LjEyMiwxOC41OTEsMjYuMTA2LDE2LDI2LjEwNnoiIHN0cm9rZT0iIzNDM0MzQyIgc3Ryb2tlLXdpZHRoPSIxLjUiLz4KIDwvZz4KIDxnPgogIDxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0yMS4xMzIsMTkuNDM5TDE3LjY5MiwxNmwzLjQ0LTMuNDRjMC40NjgtMC40NjcsMC40NjgtMS4yMjUsMC0xLjY5MyYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjQ2Ny0wLjQ2Ny0xLjIyNS0wLjQ2Ny0xLjY5MSwwLjAwMUwxNiwxNC4zMDhsLTMuNDQxLTMuNDQxYy0wLjQ2Ny0wLjQ2Ny0xLjIyNC'+
			'0wLjQ2Ny0xLjY5MSwwLjAwMSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjQ2NywwLjQ2Ny0wLjQ2NywxLjIyNCwwLDEuNjlMMTQuMzA5LDE2bC0zLjQ0LDMuNDRjLTAuNDY3LDAuNDY3LTAuNDY3LDEuMjI2LDAsMS42OTJjMC40NjcsMC40NjcsMS4yMjYsMC40NjcsMS42OTIsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7bDMuNDQtMy40NGwzLjQzOSwzLjQzOWMwLjQ2OCwwLjQ2OCwxLjIyNSwwLjQ2OCwxLjY5MSwwLjAwMUMyMS41OTksMjAuNjY0LDIxLjYsMTkuOTA3LDIxLjEzMiwxOS40Mzl6IE0yNC44MzksNy4xNjEmI3hkOyYjeGE7JiN4OTsmI3g5O2MtNC44ODItNC44ODItMTIuNzk2LTQuODgyLTE3'+
			'LjY3OCwwYy00Ljg4MSw0Ljg4MS00Ljg4MSwxMi43OTUsMCwxNy42NzhjNC44ODEsNC44OCwxMi43OTYsNC44OCwxNy42NzgsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7QzI5LjcyLDE5Ljk1NiwyOS43MiwxMi4wNDIsMjQuODM5LDcuMTYxeiBNMTYsMjYuMTA2Yy0yLjU4OS0wLjAwMS01LjE3LTAuOTg1LTcuMTQ2LTIuOTYxUzUuODk1LDE4LjU5LDUuODk0LDE2JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC0yLjU5MSwwLjk4NC01LjE3LDIuOTYtNy4xNDdDMTAuODMsNi44NzgsMTMuNDA5LDUuODk0LDE2LDUuODk0YzIuNTkxLDAuMDAxLDUuMTcsMC45ODQsNy4xNDcsMi45NTkmI3hkOyYjeGE7JiN4OTsmI3'+
			'g5O2MxLjk3NiwxLjk3NywyLjk1Nyw0LjU1NiwyLjk2LDcuMTQ3Yy0wLjAwMSwyLjU5MS0wLjk4NSw1LjE2OS0yLjk2LDcuMTQ4QzIxLjE2OSwyNS4xMjIsMTguNTkxLDI2LjEwNiwxNiwyNi4xMDZ6IiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMC4yIi8+CiA8L2c+Cjwvc3ZnPgo=';
		me._image_popup_close__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._image_popup_close__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE1LjAuMiwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHdpZHRoPSIzMnB4IiB4PSIwcHgiIGhlaWdodD0iMzJweCIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBlbm'+
			'FibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAzMiAzMiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAzMiAzMiIgeT0iMHB4IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KIDxnIG9wYWNpdHk9IjAuNCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIj4KICA8cGF0aCBkPSJNMjEuMTMyLDE5LjQzOUwxNy42OTMsMTZsMy40MzktMy40NGMwLjQ2OC0wLjQ2NywwLjQ2OC0xLjIyNiwwLjAwMS0xLjY5MyYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjQ2Ny0wLjQ2Ny0xLjIyNS0wLjQ2Ny0xLjY5Miww'+
			'LjAwMWwtMy40NCwzLjQ0bC0zLjQ0MS0zLjQ0MWMtMC40NjgtMC40NjgtMS4yMjUtMC40NjctMS42OTMsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjQ2NywwLjQ2Ny0wLjQ2NywxLjIyNSwwLDEuNjkyTDE0LjMwOSwxNmwtMy40NCwzLjQ0Yy0wLjQ2NywwLjQ2Ni0wLjQ2NywxLjIyNCwwLDEuNjkxYzAuNDY3LDAuNDY3LDEuMjI2LDAuNDY3LDEuNjkyLDAuMDAxJiN4ZDsmI3hhOyYjeDk7JiN4OTtsMy40NC0zLjQ0bDMuNDQsMy40MzljMC40NjgsMC40NjgsMS4yMjQsMC40NjcsMS42OTEsMEMyMS41OTgsMjAuNjY0LDIxLjYsMTkuOTA3LDIxLjEzMiwxOS40Mzl6IE0yNC44MzksNy4xNjEmI3hkOy'+
			'YjeGE7JiN4OTsmI3g5O2MtNC44ODItNC44ODItMTIuNzk2LTQuODgyLTE3LjY3OCwwYy00Ljg4MSw0Ljg4MS00Ljg4MSwxMi43OTYsMCwxNy42NzhjNC44ODIsNC44ODEsMTIuNzk2LDQuODgxLDE3LjY3OCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTtDMjkuNzIsMTkuOTU3LDI5LjcyMSwxMi4wNDMsMjQuODM5LDcuMTYxeiBNMTYsMjYuMTA2Yy0yLjU5LDAtNS4xNzEtMC45ODQtNy4xNDYtMi45NTlDNi44NzgsMjEuMTcsNS44OTUsMTguNTkxLDUuODk0LDE2JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC0yLjU5MSwwLjk4My01LjE3LDIuOTU5LTcuMTQ3YzEuOTc3LTEuOTc2LDQuNTU2LTIuOTU5LDcuMTQ4'+
			'LTIuOTZjMi41OTEsMC4wMDEsNS4xNywwLjk4NCw3LjE0NywyLjk1OSYjeGQ7JiN4YTsmI3g5OyYjeDk7YzEuOTc1LDEuOTc3LDIuOTU3LDQuNTU2LDIuOTU5LDcuMTQ3Yy0wLjAwMSwyLjU5Mi0wLjk4NCw1LjE3LTIuOTYsNy4xNDhDMjEuMTcsMjUuMTIzLDE4LjU5MSwyNi4xMDcsMTYsMjYuMTA2eiIgc3Ryb2tlPSIjM0MzQzNDIiBzdHJva2Utd2lkdGg9IjEuNSIvPgogPC9nPgogPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIj4KICA8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNMjEuMTMyLDE5LjQzOUwxNy42OTMsMTZsMy40MzktMy'+
			'40NCYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAuNDY4LTAuNDY3LDAuNDY4LTEuMjI2LDAuMDAxLTEuNjkzYy0wLjQ2Ny0wLjQ2Ny0xLjIyNS0wLjQ2Ny0xLjY5MiwwLjAwMWwtMy40NCwzLjQ0bC0zLjQ0MS0zLjQ0MSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjQ2OC0wLjQ2OC0xLjIyNS0wLjQ2Ny0xLjY5MywwYy0wLjQ2NywwLjQ2Ny0wLjQ2NywxLjIyNSwwLDEuNjkyTDE0LjMwOSwxNmwtMy40NCwzLjQ0Yy0wLjQ2NywwLjQ2Ni0wLjQ2NywxLjIyNCwwLDEuNjkxJiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC40NjcsMC40NjcsMS4yMjYsMC40NjcsMS42OTIsMC4wMDFsMy40NC0zLjQ0bDMuNDQsMy40Mzlj'+
			'MC40NjgsMC40NjgsMS4yMjQsMC40NjcsMS42OTEsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7QzIxLjU5OCwyMC42NjQsMjEuNiwxOS45MDcsMjEuMTMyLDE5LjQzOXogTTI0LjgzOSw3LjE2MWMtNC44ODItNC44ODItMTIuNzk2LTQuODgyLTE3LjY3OCwwYy00Ljg4MSw0Ljg4MS00Ljg4MSwxMi43OTYsMCwxNy42NzgmI3hkOyYjeGE7JiN4OTsmI3g5O2M0Ljg4Miw0Ljg4MSwxMi43OTYsNC44ODEsMTcuNjc4LDBDMjkuNzIsMTkuOTU3LDI5LjcyMSwxMi4wNDMsMjQuODM5LDcuMTYxeiBNMTYsMjYuMTA2Yy0yLjU5LDAtNS4xNzEtMC45ODQtNy4xNDYtMi45NTkmI3hkOyYjeGE7JiN4OTsmI3g5O0M2Lj'+
			'g3OCwyMS4xNyw1Ljg5NSwxOC41OTEsNS44OTQsMTZjMC0yLjU5MSwwLjk4My01LjE3LDIuOTU5LTcuMTQ3YzEuOTc3LTEuOTc2LDQuNTU2LTIuOTU5LDcuMTQ4LTIuOTYmI3hkOyYjeGE7JiN4OTsmI3g5O2MyLjU5MSwwLjAwMSw1LjE3LDAuOTg0LDcuMTQ3LDIuOTU5YzEuOTc1LDEuOTc3LDIuOTU3LDQuNTU2LDIuOTU5LDcuMTQ3Yy0wLjAwMSwyLjU5Mi0wLjk4NCw1LjE3LTIuOTYsNy4xNDgmI3hkOyYjeGE7JiN4OTsmI3g5O0MyMS4xNywyNS4xMjMsMTguNTkxLDI2LjEwNywxNiwyNi4xMDZ6IiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMC4yIi8+CiA8L2c+Cjwvc3ZnPgo=';
		me._image_popup_close__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="image_popup_close";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='position : absolute;';
		hs+='right : -3px;';
		hs+='top : -6px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_popup_close.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._image_popup_close.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_image_popup') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._image_popup_close.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._image_popup_close.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._image_popup_close.style[domTransition]='';
				if (me._image_popup_close.ggCurrentLogicStateVisible == 0) {
					me._image_popup_close.style.visibility=(Number(me._image_popup_close.style.opacity)>0||!me._image_popup_close.style.opacity)?'inherit':'hidden';
					me._image_popup_close.ggVisible=true;
				}
				else {
					me._image_popup_close.style.visibility="hidden";
					me._image_popup_close.ggVisible=false;
				}
			}
		}
		me._image_popup_close.onclick=function (e) {
			player.setVariableValue('vis_image_popup', false);
			if (player.transitionsDisabled) {
				me._image_33.style[domTransition]='none';
			} else {
				me._image_33.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_33.style.opacity='1';
			me._image_33.style.visibility=me._image_33.ggVisible?'inherit':'hidden';
			if (player.transitionsDisabled) {
				me._image_32.style[domTransition]='none';
			} else {
				me._image_32.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_32.style.opacity='1';
			me._image_32.style.visibility=me._image_32.ggVisible?'inherit':'hidden';
			if (player.transitionsDisabled) {
				me._image_17.style[domTransition]='none';
			} else {
				me._image_17.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_17.style.opacity='1';
			me._image_17.style.visibility=me._image_17.ggVisible?'inherit':'hidden';
			if (player.transitionsDisabled) {
				me._image_35.style[domTransition]='none';
			} else {
				me._image_35.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_35.style.opacity='1';
			me._image_35.style.visibility=me._image_35.ggVisible?'inherit':'hidden';
			if (player.transitionsDisabled) {
				me._image_34.style[domTransition]='none';
			} else {
				me._image_34.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_34.style.opacity='1';
			me._image_34.style.visibility=me._image_34.ggVisible?'inherit':'hidden';
		}
		me._image_popup_close.onmouseover=function (e) {
			me._image_popup_close__img.style.visibility='hidden';
			me._image_popup_close__imgo.style.visibility='inherit';
		}
		me._image_popup_close.onmouseout=function (e) {
			me._image_popup_close__img.style.visibility='inherit';
			me._image_popup_close__imgo.style.visibility='hidden';
		}
		me._image_popup_close.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._image_popup_close);
		el=me._information=document.createElement('div');
		el.ggId="information";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 250px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 300px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._information.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._information.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_info_popup') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._information.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._information.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._information.style[domTransition]='';
				if (me._information.ggCurrentLogicStateVisible == 0) {
					me._information.style.visibility=(Number(me._information.style.opacity)>0||!me._information.style.opacity)?'inherit':'hidden';
					me._information.ggVisible=true;
				}
				else {
					me._information.style.visibility="hidden";
					me._information.ggVisible=false;
				}
			}
		}
		me._information.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=((this.ggDx * pw)/100.0 + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=((this.ggDy * ph)/100.0 + ph/2 - h/2) + 'px';
			}
		}
		el=me._information_bg=document.createElement('div');
		el.ggId="information_bg";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : rgba(0,0,0,0.666667);';
		hs+='border : 0px solid #ffffff;';
		hs+='cursor : default;';
		hs+='height : 322px;';
		hs+='left : -142px;';
		hs+='position : absolute;';
		hs+='top : 35px;';
		hs+='visibility : inherit;';
		hs+='width : 447px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._information_bg.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._information_bg.ggUpdatePosition=function (useTransition) {
		}
		el=me._image_12=document.createElement('div');
		els=me._image_12__img=document.createElement('img');
		els.className='ggskin ggskin_image_12';
		hs=basePath + 'images/image_12.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 12";
		el.ggDx=5;
		el.ggDy=-6;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='height : 395px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 620px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_12.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._image_12.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._information_bg.appendChild(me._image_12);
		me._information.appendChild(me._information_bg);
		el=me._info_text_body=document.createElement('div');
		els=me._info_text_body__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="info_text_body";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 252px;';
		hs+='left : -123px;';
		hs+='position : absolute;';
		hs+='top : 92px;';
		hs+='visibility : inherit;';
		hs+='width : 413px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 413px;';
		hs+='height: 252px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(0,0,0,1);';
		hs+='font-size: 17px;';
		hs+='font-weight: inherit;';
		hs+='text-align: left;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		hs+='overflow-y: auto;';
		els.setAttribute('style',hs);
		els.innerHTML="";
		el.appendChild(els);
		me._info_text_body.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._info_text_body.ggUpdatePosition=function (useTransition) {
		}
		me._information.appendChild(me._info_text_body);
		el=me._info_title=document.createElement('div');
		els=me._info_title__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="info_title";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 29px;';
		hs+='left : -41px;';
		hs+='position : absolute;';
		hs+='top : 46px;';
		hs+='visibility : inherit;';
		hs+='width : 245px;';
		hs+='pointer-events:auto;';
		hs+='font-weight: bold;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 245px;';
		hs+='height: 29px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(0,0,0,1);';
		hs+='font-size: 20px;';
		hs+='font-weight: inherit;';
		hs+='text-align: left;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="";
		el.appendChild(els);
		me._info_title.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._info_title.ggUpdatePosition=function (useTransition) {
		}
		me._information.appendChild(me._info_title);
		el=me._info_popup_close=document.createElement('div');
		els=me._info_popup_close__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHg9IjBweCIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBiYXNlUHJvZmlsZT0idGlueSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTS0xMzUuMywzNTcuM2MtMjEuOS0yMS45LTU3LjUtMjEuOS03OS40LDBjLTIxLjksMjEuOS0yMS45LDU3LjUsMCw3OS40YzIxLjksMjEuOSw1Ny41LDIxLjksNzkuNCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTtTLTExMy40LDM3OS4yLTEzNS4zLDM1Ny4zeiBNLTE0NS44LDQxMi43YzAuOCwwLjgsMC44LDEuNS0wLjEsMi40bC0xMC45LDEwLjljLTAuNCwwLjQtMC44LDAuNS0xLjMsMC41Yy0wLjUsMC0wLjktMC4xLTEuMS0wLjQmI3hkOyYjeGE7JiN4OTsmI3g5O2wtMTUuOC0xNS44bC0xNS43LDE1LjdjLTAuNCwwLjQtMC44LDAuNS0x'+
			'LjMsMC41cy0wLjktMC4xLTEuMS0wLjRsLTExLjEtMTEuMWMtMC4zLTAuMy0wLjQtMC42LTAuNC0xLjFjMC0wLjUsMC4xLTAuOSwwLjUtMS4zJiN4ZDsmI3hhOyYjeDk7JiN4OTtsMTUuNy0xNS43bC0xNS44LTE1LjhjLTAuMy0wLjMtMC40LTAuNi0wLjQtMS4xYzAtMC41LDAuMS0wLjksMC41LTEuM2wxMC45LTEwLjljMC45LTAuOSwxLjctMC45LDIuNC0wLjFsMTUuOCwxNS44bDE1LjctMTUuNyYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAuOS0wLjksMS43LTAuOSwyLjQtMC4xbDExLjEsMTEuMWMwLjgsMC44LDAuOCwxLjUtMC4xLDIuNGwtMTUuNywxNS43TC0xNDUuOCw0MTIuN3oiLz4KIDwvZz4KID'+
			'xnIGlkPSJMYXllcl8yIj4KICA8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNLTE2MS42LDM5Ni45bDE1LjgsMTUuOGMwLjgsMC44LDAuOCwxLjUtMC4xLDIuNGwtMTAuOSwxMC45Yy0wLjQsMC40LTAuOCwwLjUtMS4zLDAuNSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjUsMC0wLjktMC4xLTEuMS0wLjRsLTE1LjgtMTUuOGwtMTUuNywxNS43Yy0wLjQsMC40LTAuOCwwLjUtMS4zLDAuNXMtMC45LTAuMS0xLjEtMC40bC0xMS4xLTExLjFjLTAuMy0wLjMtMC40LTAuNi0wLjQtMS4xJiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC0wLjUsMC4xLTAuOSwwLjUtMS4zbDE1LjctMTUuN2wtMTUuOC0xNS44Yy0wLjMt'+
			'MC4zLTAuNC0wLjYtMC40LTEuMWMwLTAuNSwwLjEtMC45LDAuNS0xLjNsMTAuOS0xMC45YzAuOS0wLjksMS43LTAuOSwyLjQtMC4xJiN4ZDsmI3hhOyYjeDk7JiN4OTtsMTUuOCwxNS44bDE1LjctMTUuN2MwLjktMC45LDEuNy0wLjksMi40LTAuMWwxMS4xLDExLjFjMC44LDAuOCwwLjgsMS41LTAuMSwyLjRMLTE2MS42LDM5Ni45eiIvPgogPC9nPgo8L3N2Zz4K';
		me._info_popup_close__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._info_popup_close__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHg9IjBweCIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBiYXNlUHJvZmlsZT0idGlueSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTS0xMzAuOSwzNTIuOWMtMjQuNC0yNC40LTYzLjgtMjQuNC04OC4yLDBjLTI0LjQsMjQuNC0yNC40LDYzLjgsMCw4OC4yYzI0LjQsMjQuNCw2My44LDI0LjQsODguMiwwJiN4ZDsmI3hhOyYjeDk7JiN4OTtTLTEwNi41LDM3Ny4zLTEzMC45LDM1Mi45eiBNLTE0Mi41LDQxNC41YzAuOCwwLjgsMC44LDEuNy0wLjEsMi43bC0xMi4yLDEyLjJjLTAuNCwwLjQtMC44LDAuNi0xLjQsMC42Yy0wLjYsMC0xLTAuMS0xLjMtMC40JiN4ZDsmI3hhOyYjeDk7JiN4OTtsLTE3LjUtMTcuNWwtMTcuNCwxNy40Yy0wLjQsMC40LTAuOCwwLjYtMS40'+
			'LDAuNmMtMC42LDAtMS0wLjEtMS4zLTAuNGwtMTIuMy0xMi4zYy0wLjMtMC4zLTAuNC0wLjctMC40LTEuM2MwLTAuNiwwLjEtMSwwLjYtMS40JiN4ZDsmI3hhOyYjeDk7JiN4OTtsMTcuNC0xNy40bC0xNy41LTE3LjVjLTAuMy0wLjMtMC40LTAuNy0wLjQtMS4zYzAtMC42LDAuMS0xLDAuNi0xLjRsMTIuMi0xMi4yYzEtMSwxLjgtMSwyLjctMC4xbDE3LjUsMTcuNWwxNy40LTE3LjQmI3hkOyYjeGE7JiN4OTsmI3g5O2MxLTEsMS44LTEsMi43LTAuMWwxMi4zLDEyLjNjMC44LDAuOCwwLjgsMS43LTAuMSwyLjdsLTE3LjQsMTcuNEwtMTQyLjUsNDE0LjV6Ii8+CiA8L2c+CiA8ZyBpZD0iTGF5ZXJfMi'+
			'I+CiAgPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTS0xNjAuMSwzOTYuOWwxNy41LDE3LjVjMC44LDAuOCwwLjgsMS43LTAuMSwyLjdsLTEyLjIsMTIuMmMtMC40LDAuNC0wLjgsMC42LTEuNCwwLjYmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC42LDAtMS0wLjEtMS4zLTAuNGwtMTcuNS0xNy41bC0xNy40LDE3LjRjLTAuNCwwLjQtMC44LDAuNi0xLjQsMC42Yy0wLjYsMC0xLTAuMS0xLjMtMC40bC0xMi4zLTEyLjNjLTAuMy0wLjMtMC40LTAuNy0wLjQtMS4zJiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC0wLjYsMC4xLTEsMC42LTEuNGwxNy40LTE3LjRsLTE3LjUtMTcuNWMtMC4zLTAuMy0wLjQtMC43LTAu'+
			'NC0xLjNjMC0wLjYsMC4xLTEsMC42LTEuNGwxMi4yLTEyLjJjMS0xLDEuOC0xLDIuNy0wLjFsMTcuNSwxNy41JiN4ZDsmI3hhOyYjeDk7JiN4OTtsMTcuNC0xNy40YzEtMSwxLjgtMSwyLjctMC4xbDEyLjMsMTIuM2MwLjgsMC44LDAuOCwxLjctMC4xLDIuN0wtMTYwLjEsMzk2Ljl6Ii8+CiA8L2c+Cjwvc3ZnPgo=';
		me._info_popup_close__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="info_popup_close";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='position : absolute;';
		hs+='right : -71px;';
		hs+='top : 5px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._info_popup_close.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._info_popup_close.onclick=function (e) {
			player.setVariableValue('vis_info_popup', false);
			me._info_title.ggText="";
			me._info_title.ggTextDiv.innerHTML=me._info_title.ggText;
			if (me._info_title.ggUpdateText) {
				me._info_title.ggUpdateText=function() {
					var hs="";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (me._info_title.ggUpdatePosition) {
				me._info_title.ggUpdatePosition();
			}
			me._info_title.ggTextDiv.scrollTop = 0;
			me._info_text_body.ggText="";
			me._info_text_body.ggTextDiv.innerHTML=me._info_text_body.ggText;
			if (me._info_text_body.ggUpdateText) {
				me._info_text_body.ggUpdateText=function() {
					var hs="";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (me._info_text_body.ggUpdatePosition) {
				me._info_text_body.ggUpdatePosition();
			}
			me._info_text_body.ggTextDiv.scrollTop = 0;
		}
		me._info_popup_close.onmouseover=function (e) {
			me._info_popup_close__img.style.visibility='hidden';
			me._info_popup_close__imgo.style.visibility='inherit';
		}
		me._info_popup_close.onmouseout=function (e) {
			me._info_popup_close__img.style.visibility='inherit';
			me._info_popup_close__imgo.style.visibility='hidden';
		}
		me._info_popup_close.ggUpdatePosition=function (useTransition) {
		}
		me._information.appendChild(me._info_popup_close);
		me.divSkin.appendChild(me._information);
		el=me._map_1=document.createElement('div');
		el.ggFilter = '';
		el.ggFilteredIds = [];
		el.ggMapNotLoaded = true;
		el.ggId="Map 1";
		el.ggDy=3;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_map ";
		el.ggType='map';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 288px;';
		hs+='left : 1px;';
		hs+='overflow : hidden;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 370px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._map_1.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._map_1.ggUpdateConditionTimer=function () {
			me._map_1.ggRadar.update();
		}
		me._map_1.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._map_1.ggNodeChange=function () {
			if (me._map_1.ggLastActivMarker) {
				if (me._map_1.ggLastActivMarker._div.ggDeactivate) me._map_1.ggLastActivMarker._div.ggDeactivate();
			}
			var id=player.getCurrentNode();
			if (me.ggMarkerArray) {
			var marker=me._map_1.ggMarkerArray[id];
			if (marker) {
				if (marker._div.ggActivate) marker._div.ggActivate();
			}
			me._map_1.ggLastActivMarker=marker;
			}
			if (!me._map_1.ggMapNotLoaded) {
				me._map_1.ggCenterNode();
			}
			if (player.getMapType(me._map_1.ggMapId) == 'file') {
				var coords = player.getNodeMapCoords(id, me._map_1.ggMapId);
				if (coords.length < 2) {
					var mapId = player.getMapContainingNode(id);
					if (mapId != '') {
							me._map_1.ggChangeMap(mapId);
					}
				}
			}
			me._map_1.ggLastNodeId = id;
		}
		me.divSkin.appendChild(me._map_1);
		el=me._image_34=document.createElement('div');
		els=me._image_34__img=document.createElement('img');
		els.className='ggskin ggskin_image_34';
		hs=basePath + 'images/image_34.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 34";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='bottom : 76px;';
		hs+='cursor : pointer;';
		hs+='height : 68px;';
		hs+='left : -3px;';
		hs+='position : absolute;';
		hs+='visibility : hidden;';
		hs+='width : 103px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_34.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._image_34.onclick=function (e) {
			player.startAutorotate("0.1","0");
			me._image_34.style[domTransition]='none';
			me._image_34.style.visibility='hidden';
			me._image_34.ggVisible=false;
			me._image_35.style[domTransition]='none';
			me._image_35.style.visibility=(Number(me._image_35.style.opacity)>0||!me._image_35.style.opacity)?'inherit':'hidden';
			me._image_35.ggVisible=true;
		}
		me._image_34.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._image_34);
		el=me._image_35=document.createElement('div');
		els=me._image_35__img=document.createElement('img');
		els.className='ggskin ggskin_image_35';
		hs=basePath + 'images/image_35.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 35";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='bottom : 78px;';
		hs+='cursor : pointer;';
		hs+='height : 68px;';
		hs+='left : -3px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 103px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_35.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._image_35.onclick=function (e) {
			player.stopAutorotate();
			me._image_35.style[domTransition]='none';
			me._image_35.style.visibility='hidden';
			me._image_35.ggVisible=false;
			me._image_34.style[domTransition]='none';
			me._image_34.style.visibility=(Number(me._image_34.style.opacity)>0||!me._image_34.style.opacity)?'inherit':'hidden';
			me._image_34.ggVisible=true;
		}
		me._image_35.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._image_35);
		el=me._image_33=document.createElement('div');
		els=me._image_33__img=document.createElement('img');
		els.className='ggskin ggskin_image_33';
		hs=basePath + 'images/image_33.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 33";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='bottom : 6px;';
		hs+='cursor : pointer;';
		hs+='height : 68px;';
		hs+='left : -2px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 103px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_33.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._image_33.onclick=function (e) {
			player.setVolume("Dinosaur - Neera Rescues the Orphans",1);
			me._image_33.style[domTransition]='none';
			me._image_33.style.visibility='hidden';
			me._image_33.ggVisible=false;
			me._image_32.style[domTransition]='none';
			me._image_32.style.visibility=(Number(me._image_32.style.opacity)>0||!me._image_32.style.opacity)?'inherit':'hidden';
			me._image_32.ggVisible=true;
		}
		me._image_33.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._image_33);
		el=me._image_32=document.createElement('div');
		els=me._image_32__img=document.createElement('img');
		els.className='ggskin ggskin_image_32';
		hs=basePath + 'images/image_32.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 32";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='bottom : 6px;';
		hs+='cursor : pointer;';
		hs+='height : 68px;';
		hs+='left : -2px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 103px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_32.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._image_32.onclick=function (e) {
			player.setVolume("Dinosaur - Neera Rescues the Orphans",0);
			me._image_32.style[domTransition]='none';
			me._image_32.style.visibility='hidden';
			me._image_32.ggVisible=false;
			me._image_33.style[domTransition]='none';
			me._image_33.style.visibility=(Number(me._image_33.style.opacity)>0||!me._image_33.style.opacity)?'inherit':'hidden';
			me._image_33.ggVisible=true;
		}
		me._image_32.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._image_32);
		el=me._image_17=document.createElement('div');
		els=me._image_17__img=document.createElement('img');
		els.className='ggskin ggskin_image_17';
		hs=basePath + 'images/image_17.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 17";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 147px;';
		hs+='left : -12px;';
		hs+='position : absolute;';
		hs+='top : -20px;';
		hs+='visibility : inherit;';
		hs+='width : 139px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_17.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._image_17.onclick=function (e) {
			player.openUrl("https:\/\/fossil.tnc.gov.tw\/index.php","");
		}
		me._image_17.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._image_17);
		el=me._timer_1=document.createElement('div');
		el.ggTimestamp=this.ggCurrentTime;
		el.ggLastIsActive=true;
		el.ggTimeout=500;
		el.ggId="Timer 1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_timer ";
		el.ggType='timer';
		hs ='';
		hs+='height : 20px;';
		hs+='left : 1px;';
		hs+='position : absolute;';
		hs+='top : 4px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._timer_1.ggIsActive=function() {
			return (me._timer_1.ggTimestamp==0 ? false : (Math.floor((me.ggCurrentTime - me._timer_1.ggTimestamp) / me._timer_1.ggTimeout) % 2 == 0));
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._timer_1.ggActivate=function () {
			player.setVariableValue('dthotsopt', true);
		}
		me._timer_1.ggDeactivate=function () {
			player.setVariableValue('dthotsopt', false);
		}
		me._timer_1.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._timer_1);
		el=me._timer_3=document.createElement('div');
		el.ggTimestamp=this.ggCurrentTime;
		el.ggLastIsActive=true;
		el.ggTimeout=3600000;
		el.ggId="Timer 3";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_timer ";
		el.ggType='timer';
		hs ='';
		hs+='height : 20px;';
		hs+='left : 666px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._timer_3.ggIsActive=function() {
			return (me._timer_3.ggTimestamp + me._timer_3.ggTimeout) >= me.ggCurrentTime;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._timer_3.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me._timer_3.ggIsActive() == false))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._timer_3.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._timer_3.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._timer_3.style[domTransition]='';
				if (me._timer_3.ggCurrentLogicStateVisible == 0) {
					me._timer_3.style.visibility="hidden";
					me._timer_3.ggVisible=false;
				}
				else {
					me._timer_3.style.visibility="hidden";
					me._timer_3.ggVisible=false;
				}
			}
		}
		me._timer_3.ggDeactivate=function () {
			if (player.transitionsDisabled) {
				me._image_4.style[domTransition]='none';
			} else {
				me._image_4.style[domTransition]='all 500ms ease-out 0ms';
			}
			me._image_4.style.opacity='1';
			me._image_4.style.visibility=me._image_4.ggVisible?'inherit':'hidden';
		}
		me._timer_3.ggCurrentLogicStateVisible = -1;
		me._timer_3.ggUpdateConditionTimer=function () {
			me._timer_3.logicBlock_visible();
		}
		me._timer_3.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._timer_3);
		el=me._timer_2=document.createElement('div');
		el.ggTimestamp=this.ggCurrentTime;
		el.ggLastIsActive=true;
		el.ggTimeout=3600000;
		el.ggId="Timer 2";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_timer ";
		el.ggType='timer';
		hs ='';
		hs+='height : 20px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 142px;';
		hs+='visibility : inherit;';
		hs+='width : 100px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._timer_2.ggIsActive=function() {
			return (me._timer_2.ggTimestamp + me._timer_2.ggTimeout) >= me.ggCurrentTime;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._timer_2.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me._timer_2.ggIsActive() == false))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._timer_2.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._timer_2.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._timer_2.style[domTransition]='';
				if (me._timer_2.ggCurrentLogicStateVisible == 0) {
					me._timer_2.style.visibility="hidden";
					me._timer_2.ggVisible=false;
				}
				else {
					me._timer_2.style.visibility=(Number(me._timer_2.style.opacity)>0||!me._timer_2.style.opacity)?'inherit':'hidden';
					me._timer_2.ggVisible=true;
				}
			}
		}
		me._timer_2.ggDeactivate=function () {
			if (player.transitionsDisabled) {
				me._image_3.style[domTransition]='none';
			} else {
				me._image_3.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_3.style.opacity='1';
			me._image_3.style.visibility=me._image_3.ggVisible?'inherit':'hidden';
		}
		me._timer_2.ggCurrentLogicStateVisible = -1;
		me._timer_2.ggUpdateConditionTimer=function () {
			me._timer_2.logicBlock_visible();
		}
		me._timer_2.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._timer_2);
		el=me._timer_4=document.createElement('div');
		el.ggTimestamp=this.ggCurrentTime;
		el.ggLastIsActive=true;
		el.ggTimeout=3600000;
		el.ggId="Timer 4";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_timer ";
		el.ggType='timer';
		hs ='';
		hs+='height : 20px;';
		hs+='left : 7px;';
		hs+='position : absolute;';
		hs+='top : 175px;';
		hs+='visibility : inherit;';
		hs+='width : 100px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._timer_4.ggIsActive=function() {
			return (me._timer_4.ggTimestamp + me._timer_4.ggTimeout) >= me.ggCurrentTime;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._timer_4.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me._timer_4.ggIsActive() == false))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._timer_4.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._timer_4.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._timer_4.style[domTransition]='';
				if (me._timer_4.ggCurrentLogicStateVisible == 0) {
					me._timer_4.style.visibility="hidden";
					me._timer_4.ggVisible=false;
				}
				else {
					me._timer_4.style.visibility=(Number(me._timer_4.style.opacity)>0||!me._timer_4.style.opacity)?'inherit':'hidden';
					me._timer_4.ggVisible=true;
				}
			}
		}
		me._timer_4.ggDeactivate=function () {
			if (player.transitionsDisabled) {
				me._image_5.style[domTransition]='none';
			} else {
				me._image_5.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_5.style.opacity='1';
			me._image_5.style.visibility=me._image_5.ggVisible?'inherit':'hidden';
		}
		me._timer_4.ggCurrentLogicStateVisible = -1;
		me._timer_4.ggUpdateConditionTimer=function () {
			me._timer_4.logicBlock_visible();
		}
		me._timer_4.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._timer_4);
		el=me._timer_5=document.createElement('div');
		el.ggTimestamp=this.ggCurrentTime;
		el.ggLastIsActive=true;
		el.ggTimeout=3600000;
		el.ggId="Timer 5";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_timer ";
		el.ggType='timer';
		hs ='';
		hs+='height : 20px;';
		hs+='left : 6px;';
		hs+='position : absolute;';
		hs+='top : 207px;';
		hs+='visibility : inherit;';
		hs+='width : 100px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._timer_5.ggIsActive=function() {
			return (me._timer_5.ggTimestamp + me._timer_5.ggTimeout) >= me.ggCurrentTime;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._timer_5.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me._timer_5.ggIsActive() == false))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._timer_5.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._timer_5.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._timer_5.style[domTransition]='';
				if (me._timer_5.ggCurrentLogicStateVisible == 0) {
					me._timer_5.style.visibility="hidden";
					me._timer_5.ggVisible=false;
				}
				else {
					me._timer_5.style.visibility=(Number(me._timer_5.style.opacity)>0||!me._timer_5.style.opacity)?'inherit':'hidden';
					me._timer_5.ggVisible=true;
				}
			}
		}
		me._timer_5.ggDeactivate=function () {
			if (player.transitionsDisabled) {
				me._image_6.style[domTransition]='none';
			} else {
				me._image_6.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_6.style.opacity='1';
			me._image_6.style.visibility=me._image_6.ggVisible?'inherit':'hidden';
		}
		me._timer_5.ggCurrentLogicStateVisible = -1;
		me._timer_5.ggUpdateConditionTimer=function () {
			me._timer_5.logicBlock_visible();
		}
		me._timer_5.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._timer_5);
		el=me._timer_6=document.createElement('div');
		el.ggTimestamp=this.ggCurrentTime;
		el.ggLastIsActive=true;
		el.ggTimeout=3600000;
		el.ggId="Timer 6";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_timer ";
		el.ggType='timer';
		hs ='';
		hs+='height : 20px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 250px;';
		hs+='visibility : inherit;';
		hs+='width : 100px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._timer_6.ggIsActive=function() {
			return (me._timer_6.ggTimestamp + me._timer_6.ggTimeout) >= me.ggCurrentTime;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._timer_6.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me._timer_6.ggIsActive() == false))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._timer_6.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._timer_6.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._timer_6.style[domTransition]='';
				if (me._timer_6.ggCurrentLogicStateVisible == 0) {
					me._timer_6.style.visibility="hidden";
					me._timer_6.ggVisible=false;
				}
				else {
					me._timer_6.style.visibility=(Number(me._timer_6.style.opacity)>0||!me._timer_6.style.opacity)?'inherit':'hidden';
					me._timer_6.ggVisible=true;
				}
			}
		}
		me._timer_6.ggDeactivate=function () {
			if (player.transitionsDisabled) {
				me._image_7.style[domTransition]='none';
			} else {
				me._image_7.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_7.style.opacity='1';
			me._image_7.style.visibility=me._image_7.ggVisible?'inherit':'hidden';
		}
		me._timer_6.ggCurrentLogicStateVisible = -1;
		me._timer_6.ggUpdateConditionTimer=function () {
			me._timer_6.logicBlock_visible();
		}
		me._timer_6.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._timer_6);
		el=me._timer_7=document.createElement('div');
		el.ggTimestamp=this.ggCurrentTime;
		el.ggLastIsActive=true;
		el.ggTimeout=3600000;
		el.ggId="Timer 7";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_timer ";
		el.ggType='timer';
		hs ='';
		hs+='height : 20px;';
		hs+='left : 8px;';
		hs+='position : absolute;';
		hs+='top : 288px;';
		hs+='visibility : inherit;';
		hs+='width : 100px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._timer_7.ggIsActive=function() {
			return (me._timer_7.ggTimestamp + me._timer_7.ggTimeout) >= me.ggCurrentTime;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._timer_7.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me._timer_7.ggIsActive() == false))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._timer_7.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._timer_7.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._timer_7.style[domTransition]='';
				if (me._timer_7.ggCurrentLogicStateVisible == 0) {
					me._timer_7.style.visibility="hidden";
					me._timer_7.ggVisible=false;
				}
				else {
					me._timer_7.style.visibility=(Number(me._timer_7.style.opacity)>0||!me._timer_7.style.opacity)?'inherit':'hidden';
					me._timer_7.ggVisible=true;
				}
			}
		}
		me._timer_7.ggDeactivate=function () {
			if (player.transitionsDisabled) {
				me._image_8.style[domTransition]='none';
			} else {
				me._image_8.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_8.style.opacity='1';
			me._image_8.style.visibility=me._image_8.ggVisible?'inherit':'hidden';
		}
		me._timer_7.ggCurrentLogicStateVisible = -1;
		me._timer_7.ggUpdateConditionTimer=function () {
			me._timer_7.logicBlock_visible();
		}
		me._timer_7.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._timer_7);
		el=me._timer_8=document.createElement('div');
		el.ggTimestamp=this.ggCurrentTime;
		el.ggLastIsActive=true;
		el.ggTimeout=3600000;
		el.ggId="Timer 8";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_timer ";
		el.ggType='timer';
		hs ='';
		hs+='height : 20px;';
		hs+='left : 9px;';
		hs+='position : absolute;';
		hs+='top : 322px;';
		hs+='visibility : inherit;';
		hs+='width : 100px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._timer_8.ggIsActive=function() {
			return (me._timer_8.ggTimestamp + me._timer_8.ggTimeout) >= me.ggCurrentTime;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._timer_8.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me._timer_8.ggIsActive() == false))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._timer_8.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._timer_8.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._timer_8.style[domTransition]='';
				if (me._timer_8.ggCurrentLogicStateVisible == 0) {
					me._timer_8.style.visibility="hidden";
					me._timer_8.ggVisible=false;
				}
				else {
					me._timer_8.style.visibility=(Number(me._timer_8.style.opacity)>0||!me._timer_8.style.opacity)?'inherit':'hidden';
					me._timer_8.ggVisible=true;
				}
			}
		}
		me._timer_8.ggDeactivate=function () {
			if (player.transitionsDisabled) {
				me._image_9.style[domTransition]='none';
			} else {
				me._image_9.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_9.style.opacity='1';
			me._image_9.style.visibility=me._image_9.ggVisible?'inherit':'hidden';
		}
		me._timer_8.ggCurrentLogicStateVisible = -1;
		me._timer_8.ggUpdateConditionTimer=function () {
			me._timer_8.logicBlock_visible();
		}
		me._timer_8.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._timer_8);
		el=me._timer_9=document.createElement('div');
		el.ggTimestamp=this.ggCurrentTime;
		el.ggLastIsActive=true;
		el.ggTimeout=3600000;
		el.ggId="Timer 9";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_timer ";
		el.ggType='timer';
		hs ='';
		hs+='height : 20px;';
		hs+='left : 8px;';
		hs+='position : absolute;';
		hs+='top : 357px;';
		hs+='visibility : inherit;';
		hs+='width : 100px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._timer_9.ggIsActive=function() {
			return (me._timer_9.ggTimestamp + me._timer_9.ggTimeout) >= me.ggCurrentTime;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._timer_9.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me._timer_9.ggIsActive() == false))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._timer_9.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._timer_9.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._timer_9.style[domTransition]='';
				if (me._timer_9.ggCurrentLogicStateVisible == 0) {
					me._timer_9.style.visibility="hidden";
					me._timer_9.ggVisible=false;
				}
				else {
					me._timer_9.style.visibility=(Number(me._timer_9.style.opacity)>0||!me._timer_9.style.opacity)?'inherit':'hidden';
					me._timer_9.ggVisible=true;
				}
			}
		}
		me._timer_9.ggDeactivate=function () {
			if (player.transitionsDisabled) {
				me._image_10.style[domTransition]='none';
			} else {
				me._image_10.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_10.style.opacity='1';
			me._image_10.style.visibility=me._image_10.ggVisible?'inherit':'hidden';
		}
		me._timer_9.ggCurrentLogicStateVisible = -1;
		me._timer_9.ggUpdateConditionTimer=function () {
			me._timer_9.logicBlock_visible();
		}
		me._timer_9.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._timer_9);
		el=me._timer_10=document.createElement('div');
		el.ggTimestamp=this.ggCurrentTime;
		el.ggLastIsActive=true;
		el.ggTimeout=3600000;
		el.ggId="Timer 10";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_timer ";
		el.ggType='timer';
		hs ='';
		hs+='height : 20px;';
		hs+='left : 8px;';
		hs+='position : absolute;';
		hs+='top : 388px;';
		hs+='visibility : inherit;';
		hs+='width : 100px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._timer_10.ggIsActive=function() {
			return (me._timer_10.ggTimestamp + me._timer_10.ggTimeout) >= me.ggCurrentTime;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._timer_10.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me._timer_10.ggIsActive() == false))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._timer_10.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._timer_10.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._timer_10.style[domTransition]='';
				if (me._timer_10.ggCurrentLogicStateVisible == 0) {
					me._timer_10.style.visibility="hidden";
					me._timer_10.ggVisible=false;
				}
				else {
					me._timer_10.style.visibility=(Number(me._timer_10.style.opacity)>0||!me._timer_10.style.opacity)?'inherit':'hidden';
					me._timer_10.ggVisible=true;
				}
			}
		}
		me._timer_10.ggDeactivate=function () {
			if (player.transitionsDisabled) {
				me._image_11.style[domTransition]='none';
			} else {
				me._image_11.style[domTransition]='all 0ms ease-out 0ms';
			}
			me._image_11.style.opacity='1';
			me._image_11.style.visibility=me._image_11.ggVisible?'inherit':'hidden';
		}
		me._timer_10.ggCurrentLogicStateVisible = -1;
		me._timer_10.ggUpdateConditionTimer=function () {
			me._timer_10.logicBlock_visible();
		}
		me._timer_10.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._timer_10);
		el=me._timer_11=document.createElement('div');
		el.ggTimestamp=this.ggCurrentTime;
		el.ggLastIsActive=true;
		el.ggTimeout=3600000;
		el.ggId="Timer 11";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_timer ";
		el.ggType='timer';
		hs ='';
		hs+='height : 20px;';
		hs+='left : 4px;';
		hs+='position : absolute;';
		hs+='top : 429px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._timer_11.ggIsActive=function() {
			return (me._timer_11.ggTimestamp==0 ? false : (Math.floor((me.ggCurrentTime - me._timer_11.ggTimestamp) / me._timer_11.ggTimeout) % 2 == 0));
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._timer_11.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me._timer_11.ggIsActive() == false))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._timer_11.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._timer_11.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._timer_11.style[domTransition]='';
				if (me._timer_11.ggCurrentLogicStateVisible == 0) {
					me._timer_11.style.visibility="hidden";
					me._timer_11.ggVisible=false;
				}
				else {
					me._timer_11.style.visibility="hidden";
					me._timer_11.ggVisible=false;
				}
			}
		}
		me._timer_11.ggDeactivate=function () {
				player.stopSound("_background");
		}
		me._timer_11.ggCurrentLogicStateVisible = -1;
		me._timer_11.ggUpdateConditionTimer=function () {
			me._timer_11.logicBlock_visible();
		}
		me._timer_11.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._timer_11);
		el=me._video_1=document.createElement('div');
		me._video_1.seekbars = [];
		me._video_1.ggInitMedia = function(media) {
			var notifySeekbars = function() {
				for (var i = 0; i < me._video_1.seekbars.length; i++) {
					var seekbar = me.findElements(me._video_1.seekbars[i]);
					if (seekbar.length > 0) seekbar[0].connectToMediaEl();
				}
			}
			while (me._video_1.hasChildNodes()) {
				me._video_1.removeChild(me._video_1.lastChild);
			}
			if (me._video_1__vid) {
				me._video_1__vid.pause();
			}
			if(media == '') {
				notifySeekbars();
			if (me._video_1.ggVideoNotLoaded ==false && me._video_1.ggDeactivate) { me._video_1.ggDeactivate(); }
				me._video_1.ggVideoNotLoaded = true;
			var mediaObj = player.getMediaObject('video_1');
			if (mediaObj) {
				mediaObj.autoplay = false;
			}
				return;
			}
			me._video_1.ggVideoNotLoaded = false;
			me._video_1__vid=document.createElement('video');
			me._video_1__vid.className='ggskin ggskin_video';
			me._video_1__vid.setAttribute('width', '100%');
			me._video_1__vid.setAttribute('height', '100%');
			me._video_1__vid.setAttribute('controlsList', 'nodownload');
			me._video_1__vid.setAttribute('oncontextmenu', 'return false;');
			me._video_1__vid.setAttribute('autoplay', '');
			me._video_1__source=document.createElement('source');
			me._video_1__source.setAttribute('src', media);
			me._video_1__vid.setAttribute('playsinline', 'playsinline');
			me._video_1__vid.setAttribute('style', ';');
			me._video_1__vid.style.outline = 'none';
			me._video_1__vid.appendChild(me._video_1__source);
			me._video_1.appendChild(me._video_1__vid);
			var videoEl = player.registerVideoElement('Video 1', me._video_1__vid);
			videoEl.autoplay = true;
			notifySeekbars();
			me._video_1.ggVideoSource = media;
		}
		el.ggId="Video 1";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_video ";
		el.ggType='video';
		hs ='';
		hs+='height : 900px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 1600px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._video_1.ggIsActive=function() {
			if (me._video_1__vid != null) {
				return (me._video_1__vid.paused == false && me._video_1__vid.ended == false);
			} else {
				return false;
			}
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._video_1.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me.divSkin.appendChild(me._video_1);
		el=me._image_4=document.createElement('div');
		els=me._image_4__img=document.createElement('img');
		els.className='ggskin ggskin_image_4';
		hs=basePath + 'images/image_4.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 4";
		el.ggDx=-3;
		el.ggDy=81;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 107px;';
		hs+='left : -10000px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 206px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_4.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._image_4.onclick=function (e) {
			me._video_1.ggInitMedia('');
			me._video_1.style[domTransition]='none';
			me._video_1.style.visibility='hidden';
			me._video_1.ggVisible=false;
			me._image_5.style[domTransition]='none';
			me._image_5.style.visibility='hidden';
			me._image_5.ggVisible=false;
			me._image_3.style[domTransition]='none';
			me._image_3.style.visibility='hidden';
			me._image_3.ggVisible=false;
			me._image_6.style[domTransition]='none';
			me._image_6.style.visibility='hidden';
			me._image_6.ggVisible=false;
			me._image_7.style[domTransition]='none';
			me._image_7.style.visibility='hidden';
			me._image_7.ggVisible=false;
			me._image_8.style[domTransition]='none';
			me._image_8.style.visibility='hidden';
			me._image_8.ggVisible=false;
			me._image_9.style[domTransition]='none';
			me._image_9.style.visibility='hidden';
			me._image_9.ggVisible=false;
			me._image_10.style[domTransition]='none';
			me._image_10.style.visibility='hidden';
			me._image_10.ggVisible=false;
			me._image_11.style[domTransition]='none';
			me._image_11.style.visibility='hidden';
			me._image_11.ggVisible=false;
			me._image_4.style[domTransition]='none';
			me._image_4.style.visibility='hidden';
			me._image_4.ggVisible=false;
				player.playSound("_background","0");
			var params = {
						   pan: 167.25,
						   tilt: -0.09,
						   fov: 81.79,
						   projection: 4,
						   timingFunction: 3,
						   speed: 3
			};
			player.moveToEx(params);
				player.playSound("Dinosaur - Neera Rescues the Orphans","0");
			if (me._map_1.ggMapNotLoaded) {
				me._map_1.ggInitMap(false);
				me._map_1.ggInitMapMarkers(true);
			}
			me._map_1.style[domTransition]='none';
			me._map_1.style.visibility=(Number(me._map_1.style.opacity)>0||!me._map_1.style.opacity)?'inherit':'hidden';
			me._map_1.ggVisible=true;
		}
		me._image_4.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me.divSkin.appendChild(me._image_4);
		el=me._image_3=document.createElement('div');
		els=me._image_3__img=document.createElement('img');
		els.className='ggskin ggskin_image_3';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 3";
		el.ggDx=-710;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='height : 148px;';
		hs+='left : -10000px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 4px;';
		hs+='visibility : hidden;';
		hs+='width : 139px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_3.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._image_3.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me.divSkin.appendChild(me._image_3);
		el=me._image_5=document.createElement('div');
		els=me._image_5__img=document.createElement('img');
		els.className='ggskin ggskin_image_5';
		hs='data:image/png;base64,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'+
			'lkTfsAAAAABJRU5ErkJggg==';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 5";
		el.ggDx=-530;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='height : 148px;';
		hs+='left : -10000px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 4px;';
		hs+='visibility : hidden;';
		hs+='width : 139px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_5.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._image_5.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me.divSkin.appendChild(me._image_5);
		el=me._image_6=document.createElement('div');
		els=me._image_6__img=document.createElement('img');
		els.className='ggskin ggskin_image_6';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 6";
		el.ggDx=-330;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='height : 148px;';
		hs+='left : -10000px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 4px;';
		hs+='visibility : hidden;';
		hs+='width : 139px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_6.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._image_6.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me.divSkin.appendChild(me._image_6);
		el=me._image_7=document.createElement('div');
		els=me._image_7__img=document.createElement('img');
		els.className='ggskin ggskin_image_7';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 7";
		el.ggDx=-130;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='height : 148px;';
		hs+='left : -10000px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 4px;';
		hs+='visibility : hidden;';
		hs+='width : 139px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_7.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._image_7.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me.divSkin.appendChild(me._image_7);
		el=me._image_8=document.createElement('div');
		els=me._image_8__img=document.createElement('img');
		els.className='ggskin ggskin_image_8';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 8";
		el.ggDx=70;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='height : 148px;';
		hs+='left : -10000px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 4px;';
		hs+='visibility : hidden;';
		hs+='width : 139px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_8.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._image_8.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me.divSkin.appendChild(me._image_8);
		el=me._image_9=document.createElement('div');
		els=me._image_9__img=document.createElement('img');
		els.className='ggskin ggskin_image_9';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 9";
		el.ggDx=270;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='height : 148px;';
		hs+='left : -10000px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 4px;';
		hs+='visibility : hidden;';
		hs+='width : 139px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_9.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._image_9.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me.divSkin.appendChild(me._image_9);
		el=me._image_10=document.createElement('div');
		els=me._image_10__img=document.createElement('img');
		els.className='ggskin ggskin_image_10';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 10";
		el.ggDx=472;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='height : 148px;';
		hs+='left : -10000px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 4px;';
		hs+='visibility : hidden;';
		hs+='width : 139px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_10.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._image_10.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me.divSkin.appendChild(me._image_10);
		el=me._image_11=document.createElement('div');
		els=me._image_11__img=document.createElement('img');
		els.className='ggskin ggskin_image_11';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 11";
		el.ggDx=670;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='height : 148px;';
		hs+='left : -10000px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 4px;';
		hs+='visibility : hidden;';
		hs+='width : 139px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_11.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._image_11.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me.divSkin.appendChild(me._image_11);
		me._map_1.ggMarkerInstances=[];
		me._map_1.ggMapId = 'Map01';
		me._map_1.ggLastNodeId=null;
		me._map_1.ggMarkerArray=[];
		me._map_1.ggGoogleMarkerArray=[];
		me._map_1.ggLastZoom = -1;
		me._map_1.ggRadar={ lastFov : -1, lastPan : -1, lastZoom : -1,activeNodeLatLng : null, poly : null }
		me._map_1.ggRadar.update=function() {
			if ((typeof google !== 'object') || (typeof google.maps !== 'object')) return;
			var radar=me._map_1.ggRadar;
			var map=me._map_1.ggMap;
			if (!map) return;
			var d2r = Math.PI/180 ;
			var r2d = 180/Math.PI ;
			var fov = player.getFov();
			var pan = player.getPanNorth();
			var zoom = map.getZoom();
			var gps;
			if (player.getMapType(me._map_1.ggMapId) == 'web') {
				gps=player.getNodeLatLng();
			} else {
				gps=player.getNodeMapCoords(null, me._map_1.ggMapId);
				pan -= me._map_1.ggFloorplanNorth;
			}
			var filterpassed = true;
			var currentId = player.getCurrentNode();
			if (me._map_1.ggFilteredIds.length > 0 && me._map_1.ggFilteredIds.indexOf(currentId) == -1) filterpassed = false;
			if ((gps.length>=2) && ((gps[0]!=0) || (gps[1]!=0)) && filterpassed) {
				if (zoom<6) zoom = 6; // avoid large radar beams on world map
				if ((radar.poly) && (fov==radar.lastFov) && (pan==radar.lastPan) && (zoom==radar.lastZoom) && (gps[0]==radar.activeNodeLatLng.lat()) && (gps[1]==radar.activeNodeLatLng.lng())) return; 
				radar.lastPan=pan;radar.lastFov=fov;radar.lastZoom=zoom;
				radar.activeNodeLatLng = new google.maps.LatLng(gps[0], gps[1]);
				var tileDeg = 360.0 / Math.pow(2, zoom);
				var rLng = tileDeg * 0.976563;
				var rLat = rLng * Math.cos(radar.activeNodeLatLng.lat() * d2r);
				var radar_path = [];
				radar_path.push(radar.activeNodeLatLng);
				var segments=5;
				for (i=-segments; i<=segments; i++) {
					var angle = (fov / (2*segments)) * i;
					var x = -rLng * Math.sin((pan+angle)*d2r) + radar.activeNodeLatLng.lng();
					var y =  rLat * Math.cos((pan+angle)*d2r) + radar.activeNodeLatLng.lat();
					radar_path.push(new google.maps.LatLng(y, x));
				}
				if (radar.poly) {
					radar.poly.setMap(null);
					radar.poly = null;
				}
				radar.poly = new google.maps.Polygon({
					paths: radar_path,
					strokeColor: '#ff0000',
					strokeOpacity: 0.8,
					strokeWeight: 1,
					fillColor: '#ff0000',
					fillOpacity: 0.35
				});
				radar.poly.setMap(map);
			} else {
				if (radar) {
					activeNodeLatLng = new google.maps.LatLng(0,0);
					if (radar.poly) {
						radar.poly.setMap(null);
						radar.poly = null;
					}
				}
			}
		}
		me._map_1.ggTileAvailable=function(x, y, z) {
			var mapDetails = player.getMapDetails(me._map_1.ggMapId);
			if (z < 7 || z > 7 + (mapDetails['zoomlevels'] - 1)) return false;
			var mapAR = mapDetails['width'] / mapDetails['height'];
			if (mapDetails['width'] >= mapDetails['height']) {
			var tilesInX = Math.pow(2, z - 7);
			var tilesInY = Math.ceil(tilesInX / mapAR);
			} else {
				var tilesInY = Math.pow(2, z - 7);
				var tilesInX = Math.ceil(tilesInY * mapAR);
			}
			var tilesXStart = Math.pow(2, z - 1);
			var tilesYStart = tilesXStart;
			var tilesXEnd = tilesXStart + tilesInX - 1;
			var tilesYEnd = tilesYStart + tilesInY - 1;
			if (x < tilesXStart || x > tilesXEnd || y < tilesYStart || y > tilesYEnd) return false;
			return true;
		}
		me._map_1.ggInitMap=function(keepZoom) {
			me._map_1.ggMapNotLoaded = false;
			var mapType = player.getMapType(me._map_1.ggMapId);
			var mapDetails = player.getMapDetails(me._map_1.ggMapId);
			if (mapType == 'file') {
				me._map_1.style.backgroundColor = mapDetails['bgcolor'];
				me._map_1.ggFloorplanNorth = mapDetails['floorplannorth'];
			} else {
				me._map_1.style.backgroundColor = '#fff';
			}
			var gps;
			if (player.getMapType(me._map_1.ggMapId) == 'web') {
				gps=player.getNodeLatLng();
			} else {
				gps=player.getNodeMapCoords(null, me._map_1.ggMapId);
			}
			if ((typeof google !== 'object') || (typeof google.maps !== 'object')) return;
			if ((gps.length>=2) && ((gps[0]!=0) || (gps[1]!=0))) {
				activeNodeLatLng = new google.maps.LatLng(gps[0], gps[1]);
			} else {
				activeNodeLatLng = new google.maps.LatLng(0,0);
			}
			if (mapType == 'web') {
				var mapTypeId;
				if (me._map_1.ggMapId == 'googleroadmap') {
					mapTypeId = google.maps.MapTypeId.ROADMAP;
				} else if (me._map_1.ggMapId == 'googlehybrid') {
					mapTypeId = google.maps.MapTypeId.HYBRID;
				} else if (me._map_1.ggMapId == 'googlesatellite') {
					mapTypeId = google.maps.MapTypeId.SATELLITE;
				} else if (me._map_1.ggMapId == 'googleterrain') {
					mapTypeId = google.maps.MapTypeId.TERRAIN;
				} else {
					mapTypeId = mapDetails['mapprovider'];
				}
				if (me._map_1.ggLastZoom == -1) me._map_1.ggLastZoom = 14;
				var initZoom = keepZoom ? me._map_1.ggLastZoom : 14;
				var mapOptions = {
					zoom: initZoom,
					center: activeNodeLatLng,
					mapTypeId: mapTypeId,
					fullscreenControl: false,
					mapTypeControl: false,
					streetViewControl: false
				};
				me._map_1.ggMap = new google.maps.Map(me._map_1, mapOptions);
				if (mapTypeId == 'googlecustomstyle') {
					var styledMapType = new google.maps.StyledMapType(JSON.parse(mapDetails['googlecustomstylecode']), {name: 'Styled Map'});
					me._map_1.ggMap.mapTypes.set('styled_map', styledMapType);
					me._map_1.ggMap.setMapTypeId('styled_map');
				}
				if (mapTypeId == 'openstreetmap') {
					me._map_1.ggMap.mapTypes.set('openstreetmap', new google.maps.ImageMapType({
						getTileUrl: function(coord, zoom) {
							if (mapDetails['mapstyle'] == 'streets') {
								return 'https://tile.openstreetmap.org/' + zoom + '/' + coord.x + '/' + coord.y + '.png';
							} else if (mapDetails['mapstyle'] == 'outdoors') {
								return 'https://a.tile.opentopomap.org/' + zoom + '/' + coord.x + '/' + coord.y + '.png';
							}
						},
						tileSize: new google.maps.Size(256, 256),
						name: mapDetails['title'],
						maxZoom: mapDetails['mapstyle'] == 'outdoors' ? 17 : 18
					}));
				}
				if (mapTypeId == 'mapbox') {
					me._map_1.ggMap.mapTypes.set('mapbox', new google.maps.ImageMapType({
						getTileUrl: function(coord, zoom) {
							if (mapDetails['styleurl'] == '') {
								return 'https://api.mapbox.com/v4/mapbox.' + mapDetails['mapstyle'] + '/' + zoom + '/' + coord.x + '/' + coord.y + '@2x.png?access_token=' + mapDetails['mapkey'];
							} else {
								var styleurlstring = mapDetails['styleurl'];
								styleurlstring = styleurlstring.slice(styleurlstring.indexOf('styles/') + 7);
								return 'https://api.mapbox.com/styles/v1/' + styleurlstring + '/tiles/256/' + zoom + '/' + coord.x + '/' + coord.y + '@2x?access_token=' + mapDetails['mapkey'];
							}
						},
						tileSize: new google.maps.Size(256, 256),
						name: mapDetails['title'],
						maxZoom: 18
					}));
				}
				if (mapTypeId == 'custom') {
					me._map_1.ggMap.mapTypes.set('custom', new google.maps.ImageMapType({
						getTileUrl: function(coord, zoom) {
							var urlString = mapDetails['mapurltemplate'];
							urlString = urlString.replace('{s}', 'a');
							urlString = urlString.replace('{z}', zoom);
							urlString = urlString.replace('{x}', coord.x);
							urlString = urlString.replace('{y}', coord.y);
							return urlString;
						},
						tileSize: new google.maps.Size(256, 256),
						name: mapDetails['title'],
						maxZoom: mapDetails['mapmaxzoom']
					}));
				}
			} else if (mapType == 'file') {
				if (me._map_1.ggLastZoom == -1) me._map_1.ggLastZoom = 7;
				var initZoom = keepZoom ? me._map_1.ggLastZoom : 7;
				var mapOptions = {
				  backgroundColor: mapDetails['bgcolor'],
					zoom: initZoom,
					minZoom: 7,
					maxZoom: 7 + (mapDetails['zoomlevels'] - 1) + 0,
					center: activeNodeLatLng,
					fullscreenControl: false,
					mapTypeControl: false,
					streetViewControl: false
				};
				me._map_1.ggMap = new google.maps.Map(me._map_1, mapOptions);
				var customMapType = new google.maps.ImageMapType({
					getTileUrl: function(coord, zoom) {
						if (me._map_1.ggTileAvailable(coord.x, coord.y, zoom)) {
							return basePath + 'images/maptiles/' + me._map_1.ggMapId + '/' + zoom + '/' + coord.x + '_' + coord.y + '.' + mapDetails['tileformat'];
						} else {
							return null;
						}
					},
					tileSize: new google.maps.Size(256, 256),
					minZoom: 7,
					maxZoom: 7 + mapDetails['zoomlevels'],
					name: mapDetails['title'],
				});
				me._map_1.ggMap.mapTypes.set(me._map_1.ggMapId, customMapType);
				me._map_1.ggMap.setMapTypeId(me._map_1.ggMapId);
				google.maps.event.addListener(me._map_1.ggMap, 'center_changed', function() {
					me._map_1.ggCheckBounds(mapDetails);
				});
				google.maps.event.addListener(me._map_1.ggMap, 'zoom_changed', function() {
					me._map_1.ggCheckBounds(mapDetails);
				});
			}
		}
		me._map_1.ggClearMap=function() {
		me._map_1.ggMap = null;
		me._map_1.ggClearMapMarkers();
		me._map_1.ggMapNotLoaded = true;
		}
		me._map_1.ggClearMapMarkers=function() {
			me._map_1.ggLastActivMarker = null;
			var id,marker;
			var markers=me._map_1.ggGoogleMarkerArray;
			for (id in markers) {
				if (markers.hasOwnProperty(id)) {
					marker=markers[id];
					marker.setMap(null);
				}
			}
			me._map_1.ggGoogleMarkerArray=[];
		}
		me._map_1.ggCenterNode=function() {
			if (!me._map_1.ggMap) return;
			var gps;
			if (player.getMapType(me._map_1.ggMapId) == 'web') {
				gps=player.getNodeLatLng();
			} else {
				gps=player.getNodeMapCoords(null, me._map_1.ggMapId);
			}
			if ((gps.length>=2) && ((gps[0]!=0) || (gps[1]!=0))) {
				var markerLocation = new google.maps.LatLng(gps[0], gps[1]);
				me._map_1.ggMap.panTo(markerLocation);
			}
		}
		me._map_1.ggFitBounds=function(force) {
			if (!me._map_1.ggMarkerBounds.isEmpty()) {
				if (me._map_1.ggMarkerInstances.length > 1 || Object.getOwnPropertyNames(me._map_1.ggGoogleMarkerArray).length > 1) {
					me._map_1.ggMap.fitBounds(me._map_1.ggMarkerBounds, 30);
				} else {
					me._map_1.ggMap.setCenter(me._map_1.ggMarkerBounds.getCenter());
					if (player.getMapType(me._map_1.ggMapId) == 'web') {
						me._map_1.ggMap.setZoom(18);
					} else {
						me._map_1.ggMap.setZoom(7);
					}
				}
			}
		}
		me._map_1.ggInitMapMarkers=function(updateMapBounds) {
			me._map_1.ggClearMapMarkers();
			var ids=player.getNodeIds();
			me._map_1.ggFilteredIds = [];
			if (me._map_1.ggFilter != '') {
				var filter = me._map_1.ggFilter.split(',');
				for (i=0; i < ids.length; i++) {
					var nodeId = ids[i];
					var nodeData = player.getNodeUserdata(nodeId);
					for (var j=0; j < filter.length; j++) {
						if (nodeData['tags'].indexOf(filter[j].trim()) != -1) me._map_1.ggFilteredIds.push(nodeId);
					}
				}
				if (me._map_1.ggFilteredIds.length > 0) ids = me._map_1.ggFilteredIds;
			}
			var marker;
			var markerLocation;
			me._map_1.ggMarkerBounds = new google.maps.LatLngBounds();
			var currentId = player.getCurrentNode();
			for(var i=0;i<ids.length;i++) {
				var id=ids[i];
				var gps;
				if (player.getMapType(me._map_1.ggMapId) == 'web') {
					gps=player.getNodeLatLng(id);
				} else {
					gps=player.getNodeMapCoords(id, me._map_1.ggMapId);
				}
				if ((gps.length>=2) && ((gps[0]!=0) || (gps[1]!=0))) {
					markerLocation = new google.maps.LatLng(gps[0], gps[1]);
					marker = new google.maps.Marker({position: markerLocation,map: me._map_1.ggMap});
					marker.setTitle(player.getNodeTitle(id));
					marker.setClickable(true);
					marker.ggId=id;
					google.maps.event.addListener(marker, 'click', function() {
						player.openNext('{' + this.ggId + '}');
						activeNodeLatLng=me.position;
						lastFov=-1; // force radar update
					});
					me._map_1.ggGoogleMarkerArray[id] = marker;
					me._map_1.ggMarkerBounds.extend(markerLocation);
				}
			}
			if (ids.length > 1 && !me._map_1.ggMarkerBounds.isEmpty() && updateMapBounds) {
				me._map_1.ggFitBounds(false);
			}
			skin.updateSize(me._map_1);
			this.ggLastActivMarker = null;
			if (this.ggUpdateConditionNodeChange) this.ggUpdateConditionNodeChange();
			this.ggRadar.lastFov = -1;
		}
		me._map_1.ggChangeMap=function(mapId) {
			var newMapType = player.getMapType(mapId)
			if (newMapType == 'file') {
				return;
			}
			if (me._map_1.ggMap) {
				me._map_1.ggLastZoom = me._map_1.ggMap.getZoom();
			}
			me._map_1.ggMapId = mapId;
			me._map_1.ggClearMap();
			me._map_1.ggInitMap(true);
			me._map_1.ggInitMapMarkers(false);
		}
		me._map_1.ggInCheckBounds=false;
		me._map_1.ggCheckBounds=function(mapDetails) {
			var mapAR = mapDetails['width'] / mapDetails['height'];
			var tileInDeg = 360.0 / Math.pow(2, 7);
			if (mapDetails['width'] >= mapDetails['height']) {
				var tmpWidth = mapDetails['width'];
				while (tmpWidth > 256) {
					tmpWidth /= 2;
				}
				var mapWidthInDeg = tileInDeg * (tmpWidth / 256);
			var mapHeightInDeg = mapWidthInDeg / mapAR;
			} else {
				var tmpHeight = mapDetails['height'];
				while (tmpHeight > 256) {
					tmpHeight /= 2;
				}
				var mapHeightInDeg = tileInDeg * (tmpHeight / 256);
				var mapWidthInDeg = mapHeightInDeg * mapAR;
			}
			if (me._map_1.ggInCheckBounds) return;
			me._map_1.ggInCheckBounds = true;
			var mapCenter = me._map_1.ggMap.getCenter();
			var currentZoom = me._map_1.ggMap.getZoom();
			var pixelInDeg = 360.0 / (Math.pow(2, currentZoom) * 256)
			var xOffset = (me._map_1.clientWidth / 2.0) * pixelInDeg;
			var yOffset = (me._map_1.clientHeight / 2.0) * pixelInDeg;
			var x = mapCenter.lng();
			var y = mapCenter.lat();
			if (mapWidthInDeg < me._map_1.clientWidth * pixelInDeg) {
				x = mapWidthInDeg / 2;
			} else {
			if (x > mapWidthInDeg - xOffset) x = mapWidthInDeg - xOffset;
			if (x < xOffset) x = xOffset;
			}
			if (mapHeightInDeg < me._map_1.clientHeight * pixelInDeg) {
				y = -mapHeightInDeg / 2;
			} else {
			if (y < -mapHeightInDeg + yOffset) y = -mapHeightInDeg + yOffset;
			if (y > -yOffset) y = -yOffset;
			}
			me._map_1.ggMap.setCenter(new google.maps.LatLng(y, x));
			me._map_1.ggInCheckBounds = false;
		}
		me._video_1.ggInitMedia('media/111111.mp4');
		player.addListener('sizechanged', function() {
			me.updateSize(me.divSkin);
		});
		player.addListener('configloaded', function() {
			me._node_cloner3.ggUpdate();
			me._node_cloner2.ggUpdate();
			me._node_cloner1.ggUpdate();
			me._node_cloner0.ggUpdate();
			me._node_cloner.ggUpdate();
			me._map_1.ggClearMap();
			me._map_1.ggInitMap(false);
			me._map_1.ggInitMapMarkers(true);
		});
		player.addListener('imagesready', function() {
			me._node_scroller_5.ggUpdatePosition();
			me._node_scroller_4.ggUpdatePosition();
			me._node_scroller_3.ggUpdatePosition();
			me._node_scroller_2.ggUpdatePosition();
			me._node_scroller.ggUpdatePosition();
			me._timer_3.ggTimestamp=me.ggCurrentTime;
			me._timer_3.ggTimeout=9000;
			me._timer_2.ggTimestamp=me.ggCurrentTime;
			me._timer_2.ggTimeout=7000;
			me._timer_4.ggTimestamp=me.ggCurrentTime;
			me._timer_4.ggTimeout=7250;
			me._timer_5.ggTimestamp=me.ggCurrentTime;
			me._timer_5.ggTimeout=7500;
			me._timer_6.ggTimestamp=me.ggCurrentTime;
			me._timer_6.ggTimeout=7750;
			me._timer_7.ggTimestamp=me.ggCurrentTime;
			me._timer_7.ggTimeout=8000;
			me._timer_8.ggTimestamp=me.ggCurrentTime;
			me._timer_8.ggTimeout=8250;
			me._timer_9.ggTimestamp=me.ggCurrentTime;
			me._timer_9.ggTimeout=8500;
			me._timer_10.ggTimestamp=me.ggCurrentTime;
			me._timer_10.ggTimeout=8750;
			me._timer_11.ggTimestamp=me.ggCurrentTime;
			me._timer_11.ggTimeout=0;
		});
	};
	this.hotspotProxyClick=function(id, url) {
	}
	this.hotspotProxyDoubleClick=function(id, url) {
	}
	me.hotspotProxyOver=function(id, url) {
	}
	me.hotspotProxyOut=function(id, url) {
	}
	me.callChildLogicBlocksHotspot_hotspot_2_changenode = function(){
		if(hotspotTemplates['Hotspot 2']) {
			var i;
			for(i = 0; i < hotspotTemplates['Hotspot 2'].length; i++) {
				if (hotspotTemplates['Hotspot 2'][i]._image_14 && hotspotTemplates['Hotspot 2'][i]._image_14.logicBlock_scaling) {
					hotspotTemplates['Hotspot 2'][i]._image_14.logicBlock_scaling();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_hotspot_2_varchanged_dthotsopt = function(){
		if(hotspotTemplates['Hotspot 2']) {
			var i;
			for(i = 0; i < hotspotTemplates['Hotspot 2'].length; i++) {
				if (hotspotTemplates['Hotspot 2'][i]._image_14 && hotspotTemplates['Hotspot 2'][i]._image_14.logicBlock_scaling) {
					hotspotTemplates['Hotspot 2'][i]._image_14.logicBlock_scaling();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_hotspot_1_changenode = function(){
		if(hotspotTemplates['Hotspot 1']) {
			var i;
			for(i = 0; i < hotspotTemplates['Hotspot 1'].length; i++) {
				if (hotspotTemplates['Hotspot 1'][i]._image_1 && hotspotTemplates['Hotspot 1'][i]._image_1.logicBlock_scaling) {
					hotspotTemplates['Hotspot 1'][i]._image_1.logicBlock_scaling();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_hotspot_1_varchanged_dthotsopt = function(){
		if(hotspotTemplates['Hotspot 1']) {
			var i;
			for(i = 0; i < hotspotTemplates['Hotspot 1'].length; i++) {
				if (hotspotTemplates['Hotspot 1'][i]._image_1 && hotspotTemplates['Hotspot 1'][i]._image_1.logicBlock_scaling) {
					hotspotTemplates['Hotspot 1'][i]._image_1.logicBlock_scaling();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_image_changenode = function(){
		if(hotspotTemplates['ht_image']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_image'].length; i++) {
				if (hotspotTemplates['ht_image'][i]._ht_image_customimage && hotspotTemplates['ht_image'][i]._ht_image_customimage.logicBlock_visible) {
					hotspotTemplates['ht_image'][i]._ht_image_customimage.logicBlock_visible();
				}
				if (hotspotTemplates['ht_image'][i]._image_20 && hotspotTemplates['ht_image'][i]._image_20.logicBlock_scaling) {
					hotspotTemplates['ht_image'][i]._image_20.logicBlock_scaling();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_image_activehotspotchanged = function(){
		if(hotspotTemplates['ht_image']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_image'].length; i++) {
				if (hotspotTemplates['ht_image'][i]._ht_image_customimage && hotspotTemplates['ht_image'][i]._ht_image_customimage.logicBlock_visible) {
					hotspotTemplates['ht_image'][i]._ht_image_customimage.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_image_varchanged_dthotsopt = function(){
		if(hotspotTemplates['ht_image']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_image'].length; i++) {
				if (hotspotTemplates['ht_image'][i]._image_20 && hotspotTemplates['ht_image'][i]._image_20.logicBlock_scaling) {
					hotspotTemplates['ht_image'][i]._image_20.logicBlock_scaling();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_changenode = function(){
		if(hotspotTemplates['ht_info']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info'].length; i++) {
				if (hotspotTemplates['ht_info'][i]._tt_information && hotspotTemplates['ht_info'][i]._tt_information.logicBlock_visible) {
					hotspotTemplates['ht_info'][i]._tt_information.logicBlock_visible();
				}
				if (hotspotTemplates['ht_info'][i]._ht_info_customimage && hotspotTemplates['ht_info'][i]._ht_info_customimage.logicBlock_visible) {
					hotspotTemplates['ht_info'][i]._ht_info_customimage.logicBlock_visible();
				}
				if (hotspotTemplates['ht_info'][i]._image_2 && hotspotTemplates['ht_info'][i]._image_2.logicBlock_scaling) {
					hotspotTemplates['ht_info'][i]._image_2.logicBlock_scaling();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_configloaded = function(){
		if(hotspotTemplates['ht_info']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info'].length; i++) {
				if (hotspotTemplates['ht_info'][i]._tt_information && hotspotTemplates['ht_info'][i]._tt_information.logicBlock_position) {
					hotspotTemplates['ht_info'][i]._tt_information.logicBlock_position();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_mouseover = function(){
		if(hotspotTemplates['ht_info']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info'].length; i++) {
				if (hotspotTemplates['ht_info'][i]._tt_information && hotspotTemplates['ht_info'][i]._tt_information.logicBlock_visible) {
					hotspotTemplates['ht_info'][i]._tt_information.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_hastouch = function(){
		if(hotspotTemplates['ht_info']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info'].length; i++) {
				if (hotspotTemplates['ht_info'][i]._tt_information && hotspotTemplates['ht_info'][i]._tt_information.logicBlock_position) {
					hotspotTemplates['ht_info'][i]._tt_information.logicBlock_position();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_activehotspotchanged = function(){
		if(hotspotTemplates['ht_info']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info'].length; i++) {
				if (hotspotTemplates['ht_info'][i]._tt_information && hotspotTemplates['ht_info'][i]._tt_information.logicBlock_visible) {
					hotspotTemplates['ht_info'][i]._tt_information.logicBlock_visible();
				}
				if (hotspotTemplates['ht_info'][i]._ht_info_customimage && hotspotTemplates['ht_info'][i]._ht_info_customimage.logicBlock_visible) {
					hotspotTemplates['ht_info'][i]._ht_info_customimage.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_varchanged_dthotsopt = function(){
		if(hotspotTemplates['ht_info']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info'].length; i++) {
				if (hotspotTemplates['ht_info'][i]._image_2 && hotspotTemplates['ht_info'][i]._image_2.logicBlock_scaling) {
					hotspotTemplates['ht_info'][i]._image_2.logicBlock_scaling();
				}
			}
		}
	}
	player.addListener('changenode', function() {
		me.ggUserdata=player.userdata;
	});
	me.skinTimerEvent=function() {
		me.ggCurrentTime=new Date().getTime();
		me._map_1.ggUpdateConditionTimer();
		if (me._timer_1.ggLastIsActive!=me._timer_1.ggIsActive()) {
			me._timer_1.ggLastIsActive=me._timer_1.ggIsActive();
			if (me._timer_1.ggLastIsActive) {
				player.setVariableValue('dthotsopt', true);
			} else {
				player.setVariableValue('dthotsopt', false);
			}
		}
		if (me._timer_3.ggLastIsActive!=me._timer_3.ggIsActive()) {
			me._timer_3.ggLastIsActive=me._timer_3.ggIsActive();
			if (me._timer_3.ggLastIsActive) {
			} else {
				if (player.transitionsDisabled) {
					me._image_4.style[domTransition]='none';
				} else {
					me._image_4.style[domTransition]='all 500ms ease-out 0ms';
				}
				me._image_4.style.opacity='1';
				me._image_4.style.visibility=me._image_4.ggVisible?'inherit':'hidden';
			}
		}
		me._timer_3.ggUpdateConditionTimer();
		if (me._timer_2.ggLastIsActive!=me._timer_2.ggIsActive()) {
			me._timer_2.ggLastIsActive=me._timer_2.ggIsActive();
			if (me._timer_2.ggLastIsActive) {
			} else {
				if (player.transitionsDisabled) {
					me._image_3.style[domTransition]='none';
				} else {
					me._image_3.style[domTransition]='all 0ms ease-out 0ms';
				}
				me._image_3.style.opacity='1';
				me._image_3.style.visibility=me._image_3.ggVisible?'inherit':'hidden';
			}
		}
		me._timer_2.ggUpdateConditionTimer();
		if (me._timer_4.ggLastIsActive!=me._timer_4.ggIsActive()) {
			me._timer_4.ggLastIsActive=me._timer_4.ggIsActive();
			if (me._timer_4.ggLastIsActive) {
			} else {
				if (player.transitionsDisabled) {
					me._image_5.style[domTransition]='none';
				} else {
					me._image_5.style[domTransition]='all 0ms ease-out 0ms';
				}
				me._image_5.style.opacity='1';
				me._image_5.style.visibility=me._image_5.ggVisible?'inherit':'hidden';
			}
		}
		me._timer_4.ggUpdateConditionTimer();
		if (me._timer_5.ggLastIsActive!=me._timer_5.ggIsActive()) {
			me._timer_5.ggLastIsActive=me._timer_5.ggIsActive();
			if (me._timer_5.ggLastIsActive) {
			} else {
				if (player.transitionsDisabled) {
					me._image_6.style[domTransition]='none';
				} else {
					me._image_6.style[domTransition]='all 0ms ease-out 0ms';
				}
				me._image_6.style.opacity='1';
				me._image_6.style.visibility=me._image_6.ggVisible?'inherit':'hidden';
			}
		}
		me._timer_5.ggUpdateConditionTimer();
		if (me._timer_6.ggLastIsActive!=me._timer_6.ggIsActive()) {
			me._timer_6.ggLastIsActive=me._timer_6.ggIsActive();
			if (me._timer_6.ggLastIsActive) {
			} else {
				if (player.transitionsDisabled) {
					me._image_7.style[domTransition]='none';
				} else {
					me._image_7.style[domTransition]='all 0ms ease-out 0ms';
				}
				me._image_7.style.opacity='1';
				me._image_7.style.visibility=me._image_7.ggVisible?'inherit':'hidden';
			}
		}
		me._timer_6.ggUpdateConditionTimer();
		if (me._timer_7.ggLastIsActive!=me._timer_7.ggIsActive()) {
			me._timer_7.ggLastIsActive=me._timer_7.ggIsActive();
			if (me._timer_7.ggLastIsActive) {
			} else {
				if (player.transitionsDisabled) {
					me._image_8.style[domTransition]='none';
				} else {
					me._image_8.style[domTransition]='all 0ms ease-out 0ms';
				}
				me._image_8.style.opacity='1';
				me._image_8.style.visibility=me._image_8.ggVisible?'inherit':'hidden';
			}
		}
		me._timer_7.ggUpdateConditionTimer();
		if (me._timer_8.ggLastIsActive!=me._timer_8.ggIsActive()) {
			me._timer_8.ggLastIsActive=me._timer_8.ggIsActive();
			if (me._timer_8.ggLastIsActive) {
			} else {
				if (player.transitionsDisabled) {
					me._image_9.style[domTransition]='none';
				} else {
					me._image_9.style[domTransition]='all 0ms ease-out 0ms';
				}
				me._image_9.style.opacity='1';
				me._image_9.style.visibility=me._image_9.ggVisible?'inherit':'hidden';
			}
		}
		me._timer_8.ggUpdateConditionTimer();
		if (me._timer_9.ggLastIsActive!=me._timer_9.ggIsActive()) {
			me._timer_9.ggLastIsActive=me._timer_9.ggIsActive();
			if (me._timer_9.ggLastIsActive) {
			} else {
				if (player.transitionsDisabled) {
					me._image_10.style[domTransition]='none';
				} else {
					me._image_10.style[domTransition]='all 0ms ease-out 0ms';
				}
				me._image_10.style.opacity='1';
				me._image_10.style.visibility=me._image_10.ggVisible?'inherit':'hidden';
			}
		}
		me._timer_9.ggUpdateConditionTimer();
		if (me._timer_10.ggLastIsActive!=me._timer_10.ggIsActive()) {
			me._timer_10.ggLastIsActive=me._timer_10.ggIsActive();
			if (me._timer_10.ggLastIsActive) {
			} else {
				if (player.transitionsDisabled) {
					me._image_11.style[domTransition]='none';
				} else {
					me._image_11.style[domTransition]='all 0ms ease-out 0ms';
				}
				me._image_11.style.opacity='1';
				me._image_11.style.visibility=me._image_11.ggVisible?'inherit':'hidden';
			}
		}
		me._timer_10.ggUpdateConditionTimer();
		if (me._timer_11.ggLastIsActive!=me._timer_11.ggIsActive()) {
			me._timer_11.ggLastIsActive=me._timer_11.ggIsActive();
			if (me._timer_11.ggLastIsActive) {
			} else {
					player.stopSound("_background");
			}
		}
		me._timer_11.ggUpdateConditionTimer();
	};
	player.addListener('timer', me.skinTimerEvent);
	function SkinHotspotClass_hotspot_2(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._hotspot_2=document.createElement('div');
		el.ggId="Hotspot 2";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 85px;';
		hs+='position : absolute;';
		hs+='top : 85px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hotspot_2.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._hotspot_2.onclick=function (e) {
			player.openNext(me.hotspot.url,me.hotspot.target);
			if (skin._map_1.ggMapNotLoaded) {
				skin._map_1.ggInitMap(false);
				skin._map_1.ggInitMapMarkers(true);
			}
			skin._map_1.style[domTransition]='none';
			skin._map_1.style.visibility=(Number(skin._map_1.style.opacity)>0||!skin._map_1.style.opacity)?'inherit':'hidden';
			skin._map_1.ggVisible=true;
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._hotspot_2.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._hotspot_2.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._hotspot_2.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._hotspot_2.ggUpdatePosition=function (useTransition) {
		}
		el=me._image_14=document.createElement('div');
		els=me._image_14__img=document.createElement('img');
		els.className='ggskin ggskin_image_14';
		hs=basePath + 'images/image_14.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 70px;';
		hs+='left : -31px;';
		hs+='position : absolute;';
		hs+='top : -6px;';
		hs+='visibility : inherit;';
		hs+='width : 64px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_14.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._image_14.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((player.getVariableValue('dthotsopt') == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._image_14.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._image_14.ggCurrentLogicStateScaling = newLogicStateScaling;
				me._image_14.style[domTransition]='' + cssPrefix + 'transform 800ms ease 0ms';
				if (me._image_14.ggCurrentLogicStateScaling == 0) {
					me._image_14.ggParameter.sx = 0.8;
					me._image_14.ggParameter.sy = 0.8;
					me._image_14.style[domTransform]=parameterToTransform(me._image_14.ggParameter);
				}
				else {
					me._image_14.ggParameter.sx = 1;
					me._image_14.ggParameter.sy = 1;
					me._image_14.style[domTransform]=parameterToTransform(me._image_14.ggParameter);
				}
			}
		}
		me._image_14.onmouseover=function (e) {
			me._text_10.style[domTransition]='none';
			me._text_10.style.visibility=(Number(me._text_10.style.opacity)>0||!me._text_10.style.opacity)?'inherit':'hidden';
			me._text_10.ggVisible=true;
		}
		me._image_14.onmouseout=function (e) {
			me._text_10.style[domTransition]='none';
			me._text_10.style.visibility='hidden';
			me._text_10.ggVisible=false;
		}
		me._image_14.ggUpdatePosition=function (useTransition) {
		}
		el=me._text_10=document.createElement('div');
		els=me._text_10__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="Text 1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 19px;';
		hs+='left : -14px;';
		hs+='position : absolute;';
		hs+='top : -13px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #000000;';
		hs+='border: 3px solid #ffffff;';
		hs+='border-radius: 2px;';
		hs+=cssPrefix + 'border-radius: 2px;';
		hs+='color: rgba(255,0,4,1);';
		hs+='font-size: 18px;';
		hs+='font-weight: bold;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._text_10.ggUpdateText=function() {
			var hs=me.ggUserdata.title;
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._text_10.ggUpdateText();
		player.addListener('changenode', function() {
			me._text_10.ggUpdateText();
		});
		el.appendChild(els);
		me._text_10.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._text_10.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((110-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._image_14.appendChild(me._text_10);
		me._hotspot_2.appendChild(me._image_14);
		me.__div = me._hotspot_2;
	};
	function SkinHotspotClass_hotspot_1(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._hotspot_1=document.createElement('div');
		el.ggId="Hotspot 1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 85px;';
		hs+='position : absolute;';
		hs+='top : 85px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hotspot_1.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._hotspot_1.onclick=function (e) {
			player.openNext(me.hotspot.url,me.hotspot.target);
			skin._map_1.ggClearMap();
			skin._map_1.style[domTransition]='none';
			skin._map_1.style.visibility='hidden';
			skin._map_1.ggVisible=false;
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._hotspot_1.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._hotspot_1.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._hotspot_1.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._hotspot_1.ggUpdatePosition=function (useTransition) {
		}
		el=me._image_1=document.createElement('div');
		els=me._image_1__img=document.createElement('img');
		els.className='ggskin ggskin_image_1';
		hs=basePath + 'images/image_1.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 70px;';
		hs+='left : -31px;';
		hs+='position : absolute;';
		hs+='top : -6px;';
		hs+='visibility : inherit;';
		hs+='width : 64px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._image_1.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((player.getVariableValue('dthotsopt') == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._image_1.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._image_1.ggCurrentLogicStateScaling = newLogicStateScaling;
				me._image_1.style[domTransition]='' + cssPrefix + 'transform 800ms ease 0ms';
				if (me._image_1.ggCurrentLogicStateScaling == 0) {
					me._image_1.ggParameter.sx = 0.8;
					me._image_1.ggParameter.sy = 0.8;
					me._image_1.style[domTransform]=parameterToTransform(me._image_1.ggParameter);
				}
				else {
					me._image_1.ggParameter.sx = 1;
					me._image_1.ggParameter.sy = 1;
					me._image_1.style[domTransform]=parameterToTransform(me._image_1.ggParameter);
				}
			}
		}
		me._image_1.onmouseover=function (e) {
			me._text_1.style[domTransition]='none';
			me._text_1.style.visibility=(Number(me._text_1.style.opacity)>0||!me._text_1.style.opacity)?'inherit':'hidden';
			me._text_1.ggVisible=true;
		}
		me._image_1.onmouseout=function (e) {
			me._text_1.style[domTransition]='none';
			me._text_1.style.visibility='hidden';
			me._text_1.ggVisible=false;
		}
		me._image_1.ggUpdatePosition=function (useTransition) {
		}
		el=me._text_1=document.createElement('div');
		els=me._text_1__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="Text 1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 19px;';
		hs+='left : -14px;';
		hs+='position : absolute;';
		hs+='top : -13px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #000000;';
		hs+='border: 3px solid #ffffff;';
		hs+='border-radius: 2px;';
		hs+=cssPrefix + 'border-radius: 2px;';
		hs+='color: rgba(255,0,4,1);';
		hs+='font-size: 18px;';
		hs+='font-weight: bold;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._text_1.ggUpdateText=function() {
			var hs=me.ggUserdata.title;
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._text_1.ggUpdateText();
		player.addListener('changenode', function() {
			me._text_1.ggUpdateText();
		});
		el.appendChild(els);
		me._text_1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._text_1.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((110-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._image_1.appendChild(me._text_1);
		me._hotspot_1.appendChild(me._image_1);
		me.__div = me._hotspot_1;
	};
	function SkinHotspotClass_ht_image(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_image=document.createElement('div');
		el.ggId="ht_image";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 200px;';
		hs+='position : absolute;';
		hs+='top : 200px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_image.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_image.onclick=function (e) {
			skin._popup_image.ggText=player.getBasePath()+""+me.hotspot.url;
			skin._popup_image.ggSubElement.style.width = '0px';
			skin._popup_image.ggSubElement.style.height = '0px';
			skin._popup_image.ggSubElement.src='';
			skin._popup_image.ggSubElement.src=skin._popup_image.ggText;
			player.setVariableValue('vis_image_popup', true);
			if (player.transitionsDisabled) {
				skin._image_17.style[domTransition]='none';
			} else {
				skin._image_17.style[domTransition]='all 0ms ease-out 0ms';
			}
			skin._image_17.style.opacity='0';
			skin._image_17.style.visibility='hidden';
			if (player.transitionsDisabled) {
				skin._image_33.style[domTransition]='none';
			} else {
				skin._image_33.style[domTransition]='all 0ms ease-out 0ms';
			}
			skin._image_33.style.opacity='0';
			skin._image_33.style.visibility='hidden';
			if (player.transitionsDisabled) {
				skin._image_32.style[domTransition]='none';
			} else {
				skin._image_32.style[domTransition]='all 0ms ease-out 0ms';
			}
			skin._image_32.style.opacity='0';
			skin._image_32.style.visibility='hidden';
			if (player.transitionsDisabled) {
				skin._image_35.style[domTransition]='none';
			} else {
				skin._image_35.style[domTransition]='all 0ms ease-out 0ms';
			}
			skin._image_35.style.opacity='0';
			skin._image_35.style.visibility='hidden';
			if (player.transitionsDisabled) {
				skin._image_34.style[domTransition]='none';
			} else {
				skin._image_34.style[domTransition]='all 0ms ease-out 0ms';
			}
			skin._image_34.style.opacity='0';
			skin._image_34.style.visibility='hidden';
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_image.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_image.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_image.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_image.ggUpdatePosition=function (useTransition) {
		}
		el=me._ht_image_customimage=document.createElement('div');
		els=me._ht_image_customimage__img=document.createElement('img');
		els.className='ggskin ggskin_external';
		els.setAttribute('style','position: absolute;-webkit-user-drag:none;pointer-events:none;;');
		els.onload=function() {me._ht_image_customimage.ggUpdatePosition();}
		if ((hotspot) && (hotspot.customimage)) {
			el.ggText=hotspot.customimage;
			els.setAttribute('src', hotspot.customimage);
			els.style.width=hotspot.customimagewidth + 'px';
			els.style.height=hotspot.customimageheight + 'px';
			me.ggUse3d = hotspot.use3D;
			me.gg3dDistance = hotspot.distance3D;
		}
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		hs ='';
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="ht_image_CustomImage";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_external ";
		el.ggType='external';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 50px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 50px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_image_customimage.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_image_customimage.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_image_customimage.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_image_customimage.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_image_customimage.style[domTransition]='';
				if (me._ht_image_customimage.ggCurrentLogicStateVisible == 0) {
					me._ht_image_customimage.style.visibility="hidden";
					me._ht_image_customimage__img.src = '';
					me._ht_image_customimage.ggVisible=false;
				}
				else {
					me._ht_image_customimage.style.visibility=(Number(me._ht_image_customimage.style.opacity)>0||!me._ht_image_customimage.style.opacity)?'inherit':'hidden';
					me._ht_image_customimage.ggSubElement.src=me._ht_image_customimage.ggText;
					me._ht_image_customimage.ggVisible=true;
				}
			}
		}
		me._ht_image_customimage.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			var parentWidth = me._ht_image_customimage.clientWidth;
			var parentHeight = me._ht_image_customimage.clientHeight;
			var img = me._ht_image_customimage__img;
			var aspectRatioDiv = me._ht_image_customimage.clientWidth / me._ht_image_customimage.clientHeight;
			var aspectRatioImg = img.naturalWidth / img.naturalHeight;
			if (img.naturalWidth < parentWidth) parentWidth = img.naturalWidth;
			if (img.naturalHeight < parentHeight) parentHeight = img.naturalHeight;
			var currentWidth,currentHeight;
			if ((hotspot) && (hotspot.customimage)) {
				currentWidth  = hotspot.customimagewidth;
				currentHeight = hotspot.customimageheight;
			}
			img.style.left='50%';
			img.style.marginLeft='-' + currentWidth/2 + 'px';
			img.style.top='50%';
			img.style.marginTop='-' + currentHeight/2 + 'px';
		}
		me._ht_image.appendChild(me._ht_image_customimage);
		el=me._image_20=document.createElement('div');
		els=me._image_20__img=document.createElement('img');
		els.className='ggskin ggskin_image_20';
		hs=basePath + 'images/image_20.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 2";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 64px;';
		hs+='left : -21px;';
		hs+='position : absolute;';
		hs+='top : -33px;';
		hs+='visibility : inherit;';
		hs+='width : 47px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_20.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._image_20.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((player.getVariableValue('dthotsopt') == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._image_20.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._image_20.ggCurrentLogicStateScaling = newLogicStateScaling;
				me._image_20.style[domTransition]='' + cssPrefix + 'transform 700ms ease 0ms';
				if (me._image_20.ggCurrentLogicStateScaling == 0) {
					me._image_20.ggParameter.sx = 0.7;
					me._image_20.ggParameter.sy = 0.7;
					me._image_20.style[domTransform]=parameterToTransform(me._image_20.ggParameter);
				}
				else {
					me._image_20.ggParameter.sx = 1;
					me._image_20.ggParameter.sy = 1;
					me._image_20.style[domTransform]=parameterToTransform(me._image_20.ggParameter);
				}
			}
		}
		me._image_20.ggUpdatePosition=function (useTransition) {
		}
		me._ht_image.appendChild(me._image_20);
		if ((hotspot) && (hotspot.customimage)) {
			el.style.width=hotspot.customimagewidth + 'px';
			el.style.height=hotspot.customimageheight + 'px';
		}
		me.__div = me._ht_image;
	};
	function SkinHotspotClass_ht_info(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_info=document.createElement('div');
		el.ggId="ht_info";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 0px;';
		hs+='left : 247px;';
		hs+='position : absolute;';
		hs+='top : 314px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_info.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_info.onclick=function (e) {
			skin._info_title.ggText=me.hotspot.title;
			skin._info_title.ggTextDiv.innerHTML=skin._info_title.ggText;
			if (skin._info_title.ggUpdateText) {
				skin._info_title.ggUpdateText=function() {
					var hs=me.hotspot.title;
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (skin._info_title.ggUpdatePosition) {
				skin._info_title.ggUpdatePosition();
			}
			skin._info_title.ggTextDiv.scrollTop = 0;
			skin._info_text_body.ggText=me.hotspot.description;
			skin._info_text_body.ggTextDiv.innerHTML=skin._info_text_body.ggText;
			if (skin._info_text_body.ggUpdateText) {
				skin._info_text_body.ggUpdateText=function() {
					var hs=me.hotspot.description;
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (skin._info_text_body.ggUpdatePosition) {
				skin._info_text_body.ggUpdatePosition();
			}
			skin._info_text_body.ggTextDiv.scrollTop = 0;
			player.setVariableValue('vis_info_popup', true);
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_info']=true;
			me._tt_information.logicBlock_visible();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_info']=false;
			me._tt_information.logicBlock_visible();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info.ontouchend=function (e) {
			me.elementMouseOver['ht_info']=false;
			me._tt_information.logicBlock_visible();
		}
		me._ht_info.ggUpdatePosition=function (useTransition) {
		}
		el=me._tt_information=document.createElement('div');
		els=me._tt_information__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_information";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : 24px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='pointer-events: none;';
		hs+='background: #000000;';
		hs+='background: rgba(0,0,0,0.666667);';
		hs+='border: 2px solid #ffffff;';
		hs+='border-radius: 2px;';
		hs+=cssPrefix + 'border-radius: 2px;';
		hs+='color: rgba(255,0,0,1);';
		hs+='font-size: 18px;';
		hs+='font-weight: bold;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 2px 5px 2px 5px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.hotspot.title;
		el.appendChild(els);
		me._tt_information.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tt_information.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getHasTouch() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._tt_information.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._tt_information.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._tt_information.style[domTransition]='left 0s, top 0s';
				if (me._tt_information.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					me._tt_information.style.top='-47px';
					me._tt_information.ggUpdatePosition(true);
				}
				else {
					me._tt_information.ggDx=0;
					me._tt_information.style.top='24px';
					me._tt_information.ggUpdatePosition(true);
				}
			}
		}
		me._tt_information.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_info'] == true)) && 
				((me.hotspot.title != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_information.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_information.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_information.style[domTransition]='left 0s, top 0s';
				if (me._tt_information.ggCurrentLogicStateVisible == 0) {
					me._tt_information.style.visibility=(Number(me._tt_information.style.opacity)>0||!me._tt_information.style.opacity)?'inherit':'hidden';
					me._tt_information.ggVisible=true;
				}
				else {
					me._tt_information.style.visibility="hidden";
					me._tt_information.ggVisible=false;
				}
			}
		}
		me._tt_information.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 4;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((106-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._ht_info.appendChild(me._tt_information);
		el=me._ht_info_customimage=document.createElement('div');
		els=me._ht_info_customimage__img=document.createElement('img');
		els.className='ggskin ggskin_external';
		els.setAttribute('style','position: absolute;-webkit-user-drag:none;pointer-events:none;;');
		els.onload=function() {me._ht_info_customimage.ggUpdatePosition();}
		if ((hotspot) && (hotspot.customimage)) {
			el.ggText=hotspot.customimage;
			els.setAttribute('src', hotspot.customimage);
			els.style.width=hotspot.customimagewidth + 'px';
			els.style.height=hotspot.customimageheight + 'px';
			me.ggUse3d = hotspot.use3D;
			me.gg3dDistance = hotspot.distance3D;
		}
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		hs ='';
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="ht_info_CustomImage";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_external ";
		el.ggType='external';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 50px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 50px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_info_customimage.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_info_customimage.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_info_customimage.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_info_customimage.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_info_customimage.style[domTransition]='';
				if (me._ht_info_customimage.ggCurrentLogicStateVisible == 0) {
					me._ht_info_customimage.style.visibility="hidden";
					me._ht_info_customimage__img.src = '';
					me._ht_info_customimage.ggVisible=false;
				}
				else {
					me._ht_info_customimage.style.visibility=(Number(me._ht_info_customimage.style.opacity)>0||!me._ht_info_customimage.style.opacity)?'inherit':'hidden';
					me._ht_info_customimage.ggSubElement.src=me._ht_info_customimage.ggText;
					me._ht_info_customimage.ggVisible=true;
				}
			}
		}
		me._ht_info_customimage.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			var parentWidth = me._ht_info_customimage.clientWidth;
			var parentHeight = me._ht_info_customimage.clientHeight;
			var img = me._ht_info_customimage__img;
			var aspectRatioDiv = me._ht_info_customimage.clientWidth / me._ht_info_customimage.clientHeight;
			var aspectRatioImg = img.naturalWidth / img.naturalHeight;
			if (img.naturalWidth < parentWidth) parentWidth = img.naturalWidth;
			if (img.naturalHeight < parentHeight) parentHeight = img.naturalHeight;
			var currentWidth,currentHeight;
			if ((hotspot) && (hotspot.customimage)) {
				currentWidth  = hotspot.customimagewidth;
				currentHeight = hotspot.customimageheight;
			}
			img.style.left='50%';
			img.style.marginLeft='-' + currentWidth/2 + 'px';
			img.style.top='50%';
			img.style.marginTop='-' + currentHeight/2 + 'px';
		}
		me._ht_info.appendChild(me._ht_info_customimage);
		el=me._image_2=document.createElement('div');
		els=me._image_2__img=document.createElement('img');
		els.className='ggskin ggskin_image_2';
		hs=basePath + 'images/image_2.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 2";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='height : 64px;';
		hs+='left : -21px;';
		hs+='position : absolute;';
		hs+='top : -31px;';
		hs+='visibility : inherit;';
		hs+='width : 47px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_2.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._image_2.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((player.getVariableValue('dthotsopt') == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._image_2.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._image_2.ggCurrentLogicStateScaling = newLogicStateScaling;
				me._image_2.style[domTransition]='' + cssPrefix + 'transform 700ms ease 0ms';
				if (me._image_2.ggCurrentLogicStateScaling == 0) {
					me._image_2.ggParameter.sx = 0.7;
					me._image_2.ggParameter.sy = 0.7;
					me._image_2.style[domTransform]=parameterToTransform(me._image_2.ggParameter);
				}
				else {
					me._image_2.ggParameter.sx = 1;
					me._image_2.ggParameter.sy = 1;
					me._image_2.style[domTransform]=parameterToTransform(me._image_2.ggParameter);
				}
			}
		}
		me._image_2.ggUpdatePosition=function (useTransition) {
		}
		me._ht_info.appendChild(me._image_2);
		if ((hotspot) && (hotspot.customimage)) {
			el.style.width=hotspot.customimagewidth + 'px';
			el.style.height=hotspot.customimageheight + 'px';
		}
		me.__div = me._ht_info;
	};
	me.addSkinHotspot=function(hotspot) {
		var hsinst = null;
		if (hotspot.skinid=='Hotspot 2') {
			hotspot.skinid = 'Hotspot 2';
			hsinst = new SkinHotspotClass_hotspot_2(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_hotspot_2_changenode();;
			me.callChildLogicBlocksHotspot_hotspot_2_varchanged_dthotsopt();;
		} else
		if (hotspot.skinid=='Hotspot 1') {
			hotspot.skinid = 'Hotspot 1';
			hsinst = new SkinHotspotClass_hotspot_1(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_hotspot_1_changenode();;
			me.callChildLogicBlocksHotspot_hotspot_1_varchanged_dthotsopt();;
		} else
		if (hotspot.skinid=='ht_image') {
			hotspot.skinid = 'ht_image';
			hsinst = new SkinHotspotClass_ht_image(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_image_changenode();;
			me.callChildLogicBlocksHotspot_ht_image_activehotspotchanged();;
			me.callChildLogicBlocksHotspot_ht_image_varchanged_dthotsopt();;
		} else
		{
			hotspot.skinid = 'ht_info';
			hsinst = new SkinHotspotClass_ht_info(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_info_changenode();;
			me.callChildLogicBlocksHotspot_ht_info_configloaded();;
			me.callChildLogicBlocksHotspot_ht_info_mouseover();;
			me.callChildLogicBlocksHotspot_ht_info_hastouch();;
			me.callChildLogicBlocksHotspot_ht_info_activehotspotchanged();;
			me.callChildLogicBlocksHotspot_ht_info_varchanged_dthotsopt();;
		}
		return hsinst;
	}
	me.removeSkinHotspots=function() {
		if(hotspotTemplates['Hotspot 2']) {
			var i;
			for(i = 0; i < hotspotTemplates['Hotspot 2'].length; i++) {
				hotspotTemplates['Hotspot 2'][i] = null;
			}
		}
		if(hotspotTemplates['Hotspot 1']) {
			var i;
			for(i = 0; i < hotspotTemplates['Hotspot 1'].length; i++) {
				hotspotTemplates['Hotspot 1'][i] = null;
			}
		}
		if(hotspotTemplates['ht_image']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_image'].length; i++) {
				hotspotTemplates['ht_image'][i] = null;
			}
		}
		if(hotspotTemplates['ht_info']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info'].length; i++) {
				hotspotTemplates['ht_info'][i] = null;
			}
		}
		hotspotTemplates = [];
	}
	function SkinCloner_node_cloner3_Class(nodeId, parentScope,ggParent,parameter) {
		var me=this;
		var hs='';
		me.parentScope=parentScope;
		me.ggParent=ggParent;
		me.findElements=skin.findElements;
		me.ggIndex=parameter.index;
		me.ggNodeId=nodeId;
		me.ggTitle=parameter.title;
		me.ggUserdata=skin.player.getNodeUserdata(me.ggNodeId);
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.__div=document.createElement('div');
		me.__div.setAttribute('style','position: absolute;width: 235px; height: 88px; visibility: inherit; overflow: visible;');
		me.__div.style.left=parameter.left;
		me.__div.style.top=parameter.top;
		me.__div.style.width=parameter.width;
		me.__div.style.height=parameter.height;
		me.__div.ggIsActive = function() {
			return player.getCurrentNode()==me.ggNodeId;
		}
		me.__div.ggElementNodeId=function() {
			return me.ggNodeId;
		}
		el=me._node_image_cloner3=document.createElement('div');
		els=me._node_image_cloner3__img=document.createElement('img');
		els.className='ggskin ggskin_nodeimage';
		els.setAttribute('src',basePath + "images/node_image_cloner_" + nodeId + ".jpg");
		el.ggNodeId=nodeId;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_nodeimage';
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="node_Image_cloner";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_nodeimage ";
		el.ggType='nodeimage';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 90px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 228px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._node_image_cloner3.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return this.ggNodeId;
		}
		me._node_image_cloner3.onclick=function (e) {
			if (
				(
					((me._node_image_cloner3.ggIsActive() == false))
				)
			) {
				player.openNext("{"+me.ggNodeId+"}","");
			}
		}
		me._node_image_cloner3.onmouseover=function (e) {
			me.elementMouseOver['node_image_cloner3']=true;
			me._node_visited3.logicBlock_bordercolor();
		}
		me._node_image_cloner3.onmouseout=function (e) {
			me.elementMouseOver['node_image_cloner3']=false;
			me._node_visited3.logicBlock_bordercolor();
		}
		me._node_image_cloner3.ontouchend=function (e) {
			me.elementMouseOver['node_image_cloner3']=false;
			me._node_visited3.logicBlock_bordercolor();
		}
		me._node_image_cloner3.ggUpdatePosition=function (useTransition) {
		}
		el=me._node_title3=document.createElement('div');
		els=me._node_title3__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="node_title";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='bottom : 1px;';
		hs+='cursor : pointer;';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 136px;';
		hs+='pointer-events:none;';
		hs+='text-shadow: 1px 1px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 100%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='left: 0px;';
		hs+='bottom:  0px;';
		hs+='width: 136px;';
		hs+='height: auto;';
		hs+='pointer-events: none;';
		hs+='background: #000000;';
		hs+='background: rgba(0,0,0,0.392157);';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 12px;';
		hs+='font-weight: normal;';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 2px 1px 2px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.ggUserdata.title;
		el.appendChild(els);
		me._node_title3.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._node_title3.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.ggUserdata.title == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._node_title3.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._node_title3.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._node_title3.style[domTransition]='';
				if (me._node_title3.ggCurrentLogicStateVisible == 0) {
					me._node_title3.style.visibility="hidden";
					me._node_title3.ggVisible=false;
				}
				else {
					me._node_title3.style.visibility=(Number(me._node_title3.style.opacity)>0||!me._node_title3.style.opacity)?'inherit':'hidden';
					me._node_title3.ggVisible=true;
				}
			}
		}
		me._node_title3.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._node_image_cloner3.appendChild(me._node_title3);
		el=me._node_visited3=document.createElement('div');
		el.ggId="node_visited";
		el.ggDx=1;
		el.ggDy=-1;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='border : 3px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 83px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.8;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 230px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._node_visited3.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._node_visited3.logicBlock_bordercolor = function() {
			var newLogicStateBorderColor;
			if (
				((me.elementMouseOver['node_image_cloner3'] == true))
			)
			{
				newLogicStateBorderColor = 0;
			}
			else if (
				((me._node_visited3.ggIsActive() == true))
			)
			{
				newLogicStateBorderColor = 1;
			}
			else if (
				((player.nodeVisited(me._node_visited3.ggElementNodeId()) == true))
			)
			{
				newLogicStateBorderColor = 2;
			}
			else {
				newLogicStateBorderColor = -1;
			}
			if (me._node_visited3.ggCurrentLogicStateBorderColor != newLogicStateBorderColor) {
				me._node_visited3.ggCurrentLogicStateBorderColor = newLogicStateBorderColor;
				me._node_visited3.style[domTransition]='border-color 0s';
				if (me._node_visited3.ggCurrentLogicStateBorderColor == 0) {
					me._node_visited3.style.borderColor="rgba(255,255,255,1)";
				}
				else if (me._node_visited3.ggCurrentLogicStateBorderColor == 1) {
					me._node_visited3.style.borderColor="rgba(255,255,255,1)";
				}
				else if (me._node_visited3.ggCurrentLogicStateBorderColor == 2) {
					me._node_visited3.style.borderColor="rgba(209,209,209,1)";
				}
				else {
					me._node_visited3.style.borderColor="rgba(0,0,0,1)";
				}
			}
		}
		me._node_visited3.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._node_image_cloner3.appendChild(me._node_visited3);
		me.__div.appendChild(me._node_image_cloner3);
	};
	function SkinCloner_node_cloner2_Class(nodeId, parentScope,ggParent,parameter) {
		var me=this;
		var hs='';
		me.parentScope=parentScope;
		me.ggParent=ggParent;
		me.findElements=skin.findElements;
		me.ggIndex=parameter.index;
		me.ggNodeId=nodeId;
		me.ggTitle=parameter.title;
		me.ggUserdata=skin.player.getNodeUserdata(me.ggNodeId);
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.__div=document.createElement('div');
		me.__div.setAttribute('style','position: absolute;width: 235px; height: 88px; visibility: inherit; overflow: visible;');
		me.__div.style.left=parameter.left;
		me.__div.style.top=parameter.top;
		me.__div.style.width=parameter.width;
		me.__div.style.height=parameter.height;
		me.__div.ggIsActive = function() {
			return player.getCurrentNode()==me.ggNodeId;
		}
		me.__div.ggElementNodeId=function() {
			return me.ggNodeId;
		}
		el=me._node_image_cloner2=document.createElement('div');
		els=me._node_image_cloner2__img=document.createElement('img');
		els.className='ggskin ggskin_nodeimage';
		els.setAttribute('src',basePath + "images/node_image_cloner_" + nodeId + ".jpg");
		el.ggNodeId=nodeId;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_nodeimage';
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="node_Image_cloner";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_nodeimage ";
		el.ggType='nodeimage';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 90px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 228px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._node_image_cloner2.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return this.ggNodeId;
		}
		me._node_image_cloner2.onclick=function (e) {
			if (
				(
					((me._node_image_cloner2.ggIsActive() == false))
				)
			) {
				player.openNext("{"+me.ggNodeId+"}","");
			}
		}
		me._node_image_cloner2.onmouseover=function (e) {
			me.elementMouseOver['node_image_cloner2']=true;
			me._node_visited2.logicBlock_bordercolor();
		}
		me._node_image_cloner2.onmouseout=function (e) {
			me.elementMouseOver['node_image_cloner2']=false;
			me._node_visited2.logicBlock_bordercolor();
		}
		me._node_image_cloner2.ontouchend=function (e) {
			me.elementMouseOver['node_image_cloner2']=false;
			me._node_visited2.logicBlock_bordercolor();
		}
		me._node_image_cloner2.ggUpdatePosition=function (useTransition) {
		}
		el=me._node_title2=document.createElement('div');
		els=me._node_title2__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="node_title";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='bottom : 1px;';
		hs+='cursor : pointer;';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 136px;';
		hs+='pointer-events:none;';
		hs+='text-shadow: 1px 1px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 100%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='left: 0px;';
		hs+='bottom:  0px;';
		hs+='width: 136px;';
		hs+='height: auto;';
		hs+='pointer-events: none;';
		hs+='background: #000000;';
		hs+='background: rgba(0,0,0,0.392157);';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 12px;';
		hs+='font-weight: normal;';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 2px 1px 2px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.ggUserdata.title;
		el.appendChild(els);
		me._node_title2.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._node_title2.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.ggUserdata.title == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._node_title2.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._node_title2.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._node_title2.style[domTransition]='';
				if (me._node_title2.ggCurrentLogicStateVisible == 0) {
					me._node_title2.style.visibility="hidden";
					me._node_title2.ggVisible=false;
				}
				else {
					me._node_title2.style.visibility=(Number(me._node_title2.style.opacity)>0||!me._node_title2.style.opacity)?'inherit':'hidden';
					me._node_title2.ggVisible=true;
				}
			}
		}
		me._node_title2.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._node_image_cloner2.appendChild(me._node_title2);
		el=me._node_visited2=document.createElement('div');
		el.ggId="node_visited";
		el.ggDx=1;
		el.ggDy=-1;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='border : 3px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 83px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.8;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 230px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._node_visited2.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._node_visited2.logicBlock_bordercolor = function() {
			var newLogicStateBorderColor;
			if (
				((me.elementMouseOver['node_image_cloner2'] == true))
			)
			{
				newLogicStateBorderColor = 0;
			}
			else if (
				((me._node_visited2.ggIsActive() == true))
			)
			{
				newLogicStateBorderColor = 1;
			}
			else if (
				((player.nodeVisited(me._node_visited2.ggElementNodeId()) == true))
			)
			{
				newLogicStateBorderColor = 2;
			}
			else {
				newLogicStateBorderColor = -1;
			}
			if (me._node_visited2.ggCurrentLogicStateBorderColor != newLogicStateBorderColor) {
				me._node_visited2.ggCurrentLogicStateBorderColor = newLogicStateBorderColor;
				me._node_visited2.style[domTransition]='border-color 0s';
				if (me._node_visited2.ggCurrentLogicStateBorderColor == 0) {
					me._node_visited2.style.borderColor="rgba(255,255,255,1)";
				}
				else if (me._node_visited2.ggCurrentLogicStateBorderColor == 1) {
					me._node_visited2.style.borderColor="rgba(255,255,255,1)";
				}
				else if (me._node_visited2.ggCurrentLogicStateBorderColor == 2) {
					me._node_visited2.style.borderColor="rgba(209,209,209,1)";
				}
				else {
					me._node_visited2.style.borderColor="rgba(0,0,0,1)";
				}
			}
		}
		me._node_visited2.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._node_image_cloner2.appendChild(me._node_visited2);
		me.__div.appendChild(me._node_image_cloner2);
	};
	function SkinCloner_node_cloner1_Class(nodeId, parentScope,ggParent,parameter) {
		var me=this;
		var hs='';
		me.parentScope=parentScope;
		me.ggParent=ggParent;
		me.findElements=skin.findElements;
		me.ggIndex=parameter.index;
		me.ggNodeId=nodeId;
		me.ggTitle=parameter.title;
		me.ggUserdata=skin.player.getNodeUserdata(me.ggNodeId);
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.__div=document.createElement('div');
		me.__div.setAttribute('style','position: absolute;width: 235px; height: 88px; visibility: inherit; overflow: visible;');
		me.__div.style.left=parameter.left;
		me.__div.style.top=parameter.top;
		me.__div.style.width=parameter.width;
		me.__div.style.height=parameter.height;
		me.__div.ggIsActive = function() {
			return player.getCurrentNode()==me.ggNodeId;
		}
		me.__div.ggElementNodeId=function() {
			return me.ggNodeId;
		}
		el=me._node_image_cloner1=document.createElement('div');
		els=me._node_image_cloner1__img=document.createElement('img');
		els.className='ggskin ggskin_nodeimage';
		els.setAttribute('src',basePath + "images/node_image_cloner_" + nodeId + ".jpg");
		el.ggNodeId=nodeId;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_nodeimage';
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="node_Image_cloner";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_nodeimage ";
		el.ggType='nodeimage';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 90px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 228px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._node_image_cloner1.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return this.ggNodeId;
		}
		me._node_image_cloner1.onclick=function (e) {
			if (
				(
					((me._node_image_cloner1.ggIsActive() == false))
				)
			) {
				player.openNext("{"+me.ggNodeId+"}","");
			}
		}
		me._node_image_cloner1.onmouseover=function (e) {
			me.elementMouseOver['node_image_cloner1']=true;
			me._node_visited1.logicBlock_bordercolor();
		}
		me._node_image_cloner1.onmouseout=function (e) {
			me.elementMouseOver['node_image_cloner1']=false;
			me._node_visited1.logicBlock_bordercolor();
		}
		me._node_image_cloner1.ontouchend=function (e) {
			me.elementMouseOver['node_image_cloner1']=false;
			me._node_visited1.logicBlock_bordercolor();
		}
		me._node_image_cloner1.ggUpdatePosition=function (useTransition) {
		}
		el=me._node_title1=document.createElement('div');
		els=me._node_title1__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="node_title";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='bottom : 1px;';
		hs+='cursor : pointer;';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 136px;';
		hs+='pointer-events:none;';
		hs+='text-shadow: 1px 1px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 100%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='left: 0px;';
		hs+='bottom:  0px;';
		hs+='width: 136px;';
		hs+='height: auto;';
		hs+='pointer-events: none;';
		hs+='background: #000000;';
		hs+='background: rgba(0,0,0,0.392157);';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 12px;';
		hs+='font-weight: normal;';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 2px 1px 2px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.ggUserdata.title;
		el.appendChild(els);
		me._node_title1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._node_title1.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.ggUserdata.title == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._node_title1.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._node_title1.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._node_title1.style[domTransition]='';
				if (me._node_title1.ggCurrentLogicStateVisible == 0) {
					me._node_title1.style.visibility="hidden";
					me._node_title1.ggVisible=false;
				}
				else {
					me._node_title1.style.visibility=(Number(me._node_title1.style.opacity)>0||!me._node_title1.style.opacity)?'inherit':'hidden';
					me._node_title1.ggVisible=true;
				}
			}
		}
		me._node_title1.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._node_image_cloner1.appendChild(me._node_title1);
		el=me._node_visited1=document.createElement('div');
		el.ggId="node_visited";
		el.ggDx=1;
		el.ggDy=-1;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='border : 3px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 83px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.8;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 230px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._node_visited1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._node_visited1.logicBlock_bordercolor = function() {
			var newLogicStateBorderColor;
			if (
				((me.elementMouseOver['node_image_cloner1'] == true))
			)
			{
				newLogicStateBorderColor = 0;
			}
			else if (
				((me._node_visited1.ggIsActive() == true))
			)
			{
				newLogicStateBorderColor = 1;
			}
			else if (
				((player.nodeVisited(me._node_visited1.ggElementNodeId()) == true))
			)
			{
				newLogicStateBorderColor = 2;
			}
			else {
				newLogicStateBorderColor = -1;
			}
			if (me._node_visited1.ggCurrentLogicStateBorderColor != newLogicStateBorderColor) {
				me._node_visited1.ggCurrentLogicStateBorderColor = newLogicStateBorderColor;
				me._node_visited1.style[domTransition]='border-color 0s';
				if (me._node_visited1.ggCurrentLogicStateBorderColor == 0) {
					me._node_visited1.style.borderColor="rgba(255,255,255,1)";
				}
				else if (me._node_visited1.ggCurrentLogicStateBorderColor == 1) {
					me._node_visited1.style.borderColor="rgba(255,255,255,1)";
				}
				else if (me._node_visited1.ggCurrentLogicStateBorderColor == 2) {
					me._node_visited1.style.borderColor="rgba(209,209,209,1)";
				}
				else {
					me._node_visited1.style.borderColor="rgba(0,0,0,1)";
				}
			}
		}
		me._node_visited1.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._node_image_cloner1.appendChild(me._node_visited1);
		me.__div.appendChild(me._node_image_cloner1);
	};
	function SkinCloner_node_cloner0_Class(nodeId, parentScope,ggParent,parameter) {
		var me=this;
		var hs='';
		me.parentScope=parentScope;
		me.ggParent=ggParent;
		me.findElements=skin.findElements;
		me.ggIndex=parameter.index;
		me.ggNodeId=nodeId;
		me.ggTitle=parameter.title;
		me.ggUserdata=skin.player.getNodeUserdata(me.ggNodeId);
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.__div=document.createElement('div');
		me.__div.setAttribute('style','position: absolute;width: 235px; height: 88px; visibility: inherit; overflow: visible;');
		me.__div.style.left=parameter.left;
		me.__div.style.top=parameter.top;
		me.__div.style.width=parameter.width;
		me.__div.style.height=parameter.height;
		me.__div.ggIsActive = function() {
			return player.getCurrentNode()==me.ggNodeId;
		}
		me.__div.ggElementNodeId=function() {
			return me.ggNodeId;
		}
		el=me._node_image_cloner0=document.createElement('div');
		els=me._node_image_cloner0__img=document.createElement('img');
		els.className='ggskin ggskin_nodeimage';
		els.setAttribute('src',basePath + "images/node_image_cloner_" + nodeId + ".jpg");
		el.ggNodeId=nodeId;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_nodeimage';
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="node_Image_cloner";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_nodeimage ";
		el.ggType='nodeimage';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 90px;';
		hs+='left : 2px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 228px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._node_image_cloner0.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return this.ggNodeId;
		}
		me._node_image_cloner0.onclick=function (e) {
			if (
				(
					((me._node_image_cloner0.ggIsActive() == false))
				)
			) {
				player.openNext("{"+me.ggNodeId+"}","");
			}
		}
		me._node_image_cloner0.onmouseover=function (e) {
			me.elementMouseOver['node_image_cloner0']=true;
			me._node_visited0.logicBlock_bordercolor();
		}
		me._node_image_cloner0.onmouseout=function (e) {
			me.elementMouseOver['node_image_cloner0']=false;
			me._node_visited0.logicBlock_bordercolor();
		}
		me._node_image_cloner0.ontouchend=function (e) {
			me.elementMouseOver['node_image_cloner0']=false;
			me._node_visited0.logicBlock_bordercolor();
		}
		me._node_image_cloner0.ggUpdatePosition=function (useTransition) {
		}
		el=me._node_title0=document.createElement('div');
		els=me._node_title0__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="node_title";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='bottom : 1px;';
		hs+='cursor : pointer;';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 136px;';
		hs+='pointer-events:none;';
		hs+='text-shadow: 1px 1px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 100%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='left: 0px;';
		hs+='bottom:  0px;';
		hs+='width: 136px;';
		hs+='height: auto;';
		hs+='pointer-events: none;';
		hs+='background: #000000;';
		hs+='background: rgba(0,0,0,0.392157);';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 12px;';
		hs+='font-weight: normal;';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 2px 1px 2px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.ggUserdata.title;
		el.appendChild(els);
		me._node_title0.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._node_title0.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.ggUserdata.title == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._node_title0.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._node_title0.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._node_title0.style[domTransition]='';
				if (me._node_title0.ggCurrentLogicStateVisible == 0) {
					me._node_title0.style.visibility="hidden";
					me._node_title0.ggVisible=false;
				}
				else {
					me._node_title0.style.visibility=(Number(me._node_title0.style.opacity)>0||!me._node_title0.style.opacity)?'inherit':'hidden';
					me._node_title0.ggVisible=true;
				}
			}
		}
		me._node_title0.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._node_image_cloner0.appendChild(me._node_title0);
		el=me._node_visited0=document.createElement('div');
		el.ggId="node_visited";
		el.ggDx=3;
		el.ggDy=-1;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='border : 3px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 83px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.8;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 230px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._node_visited0.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._node_visited0.logicBlock_bordercolor = function() {
			var newLogicStateBorderColor;
			if (
				((me.elementMouseOver['node_image_cloner0'] == true))
			)
			{
				newLogicStateBorderColor = 0;
			}
			else if (
				((me._node_visited0.ggIsActive() == true))
			)
			{
				newLogicStateBorderColor = 1;
			}
			else if (
				((player.nodeVisited(me._node_visited0.ggElementNodeId()) == true))
			)
			{
				newLogicStateBorderColor = 2;
			}
			else {
				newLogicStateBorderColor = -1;
			}
			if (me._node_visited0.ggCurrentLogicStateBorderColor != newLogicStateBorderColor) {
				me._node_visited0.ggCurrentLogicStateBorderColor = newLogicStateBorderColor;
				me._node_visited0.style[domTransition]='border-color 0s';
				if (me._node_visited0.ggCurrentLogicStateBorderColor == 0) {
					me._node_visited0.style.borderColor="rgba(255,255,255,1)";
				}
				else if (me._node_visited0.ggCurrentLogicStateBorderColor == 1) {
					me._node_visited0.style.borderColor="rgba(255,255,255,1)";
				}
				else if (me._node_visited0.ggCurrentLogicStateBorderColor == 2) {
					me._node_visited0.style.borderColor="rgba(209,209,209,1)";
				}
				else {
					me._node_visited0.style.borderColor="rgba(0,0,0,1)";
				}
			}
		}
		me._node_visited0.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._node_image_cloner0.appendChild(me._node_visited0);
		me.__div.appendChild(me._node_image_cloner0);
	};
	function SkinCloner_node_cloner_Class(nodeId, parentScope,ggParent,parameter) {
		var me=this;
		var hs='';
		me.parentScope=parentScope;
		me.ggParent=ggParent;
		me.findElements=skin.findElements;
		me.ggIndex=parameter.index;
		me.ggNodeId=nodeId;
		me.ggTitle=parameter.title;
		me.ggUserdata=skin.player.getNodeUserdata(me.ggNodeId);
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.__div=document.createElement('div');
		me.__div.setAttribute('style','position: absolute;width: 235px; height: 89px; visibility: inherit; overflow: visible;');
		me.__div.style.left=parameter.left;
		me.__div.style.top=parameter.top;
		me.__div.style.width=parameter.width;
		me.__div.style.height=parameter.height;
		me.__div.ggIsActive = function() {
			return player.getCurrentNode()==me.ggNodeId;
		}
		me.__div.ggElementNodeId=function() {
			return me.ggNodeId;
		}
		el=me._node_image_cloner=document.createElement('div');
		els=me._node_image_cloner__img=document.createElement('img');
		els.className='ggskin ggskin_nodeimage';
		els.setAttribute('src',basePath + "images/node_image_cloner_" + nodeId + ".jpg");
		el.ggNodeId=nodeId;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_nodeimage';
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="node_Image_cloner";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_nodeimage ";
		el.ggType='nodeimage';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 90px;';
		hs+='left : 2px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 228px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._node_image_cloner.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return this.ggNodeId;
		}
		me._node_image_cloner.onclick=function (e) {
			if (
				(
					((me._node_image_cloner.ggIsActive() == false))
				)
			) {
				player.openNext("{"+me.ggNodeId+"}","");
			}
		}
		me._node_image_cloner.onmouseover=function (e) {
			me.elementMouseOver['node_image_cloner']=true;
			me._node_visited.logicBlock_bordercolor();
		}
		me._node_image_cloner.onmouseout=function (e) {
			me.elementMouseOver['node_image_cloner']=false;
			me._node_visited.logicBlock_bordercolor();
		}
		me._node_image_cloner.ontouchend=function (e) {
			me.elementMouseOver['node_image_cloner']=false;
			me._node_visited.logicBlock_bordercolor();
		}
		me._node_image_cloner.ggUpdatePosition=function (useTransition) {
		}
		el=me._node_title=document.createElement('div');
		els=me._node_title__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="node_title";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='bottom : 1px;';
		hs+='cursor : pointer;';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 136px;';
		hs+='pointer-events:none;';
		hs+='text-shadow: 1px 1px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 100%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='left: 0px;';
		hs+='bottom:  0px;';
		hs+='width: 136px;';
		hs+='height: auto;';
		hs+='pointer-events: none;';
		hs+='background: #000000;';
		hs+='background: rgba(0,0,0,0.392157);';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 12px;';
		hs+='font-weight: normal;';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 2px 1px 2px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.ggUserdata.title;
		el.appendChild(els);
		me._node_title.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._node_title.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.ggUserdata.title == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._node_title.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._node_title.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._node_title.style[domTransition]='';
				if (me._node_title.ggCurrentLogicStateVisible == 0) {
					me._node_title.style.visibility="hidden";
					me._node_title.ggVisible=false;
				}
				else {
					me._node_title.style.visibility=(Number(me._node_title.style.opacity)>0||!me._node_title.style.opacity)?'inherit':'hidden';
					me._node_title.ggVisible=true;
				}
			}
		}
		me._node_title.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._node_image_cloner.appendChild(me._node_title);
		el=me._node_visited=document.createElement('div');
		el.ggId="node_visited";
		el.ggDx=3;
		el.ggDy=-1;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='border : 3px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 83px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.8;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 230px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._node_visited.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._node_visited.logicBlock_bordercolor = function() {
			var newLogicStateBorderColor;
			if (
				((me.elementMouseOver['node_image_cloner'] == true))
			)
			{
				newLogicStateBorderColor = 0;
			}
			else if (
				((me._node_visited.ggIsActive() == true))
			)
			{
				newLogicStateBorderColor = 1;
			}
			else if (
				((player.nodeVisited(me._node_visited.ggElementNodeId()) == true))
			)
			{
				newLogicStateBorderColor = 2;
			}
			else {
				newLogicStateBorderColor = -1;
			}
			if (me._node_visited.ggCurrentLogicStateBorderColor != newLogicStateBorderColor) {
				me._node_visited.ggCurrentLogicStateBorderColor = newLogicStateBorderColor;
				me._node_visited.style[domTransition]='border-color 0s';
				if (me._node_visited.ggCurrentLogicStateBorderColor == 0) {
					me._node_visited.style.borderColor="rgba(255,255,255,1)";
				}
				else if (me._node_visited.ggCurrentLogicStateBorderColor == 1) {
					me._node_visited.style.borderColor="rgba(255,255,255,1)";
				}
				else if (me._node_visited.ggCurrentLogicStateBorderColor == 2) {
					me._node_visited.style.borderColor="rgba(209,209,209,1)";
				}
				else {
					me._node_visited.style.borderColor="rgba(0,0,0,1)";
				}
			}
		}
		me._node_visited.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._node_image_cloner.appendChild(me._node_visited);
		me.__div.appendChild(me._node_image_cloner);
	};
	me.addSkin();
	var style = document.createElement('style');
	style.type = 'text/css';
	style.appendChild(document.createTextNode('.ggskin { font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 14px;}'));
	document.head.appendChild(style);
	me._menu_background.logicBlock_alpha();
	me._node_scroller_5.logicBlock_alpha();
	me._node_scroller_4.logicBlock_alpha();
	me._node_scroller_3.logicBlock_alpha();
	me._node_scroller_2.logicBlock_alpha();
	me._menu_open.logicBlock_position();
	me._menu_open.logicBlock_alpha();
	me._screentint_image.logicBlock_visible();
	me._image_popup.logicBlock_visible();
	me._popup_image.logicBlock_visible();
	me._image_popup_close.logicBlock_visible();
	me._information.logicBlock_visible();
	player.addListener('changenode', function(args) { me._menu_background.logicBlock_alpha();me._node_scroller_5.logicBlock_alpha();me._node_scroller_4.logicBlock_alpha();me._node_scroller_3.logicBlock_alpha();me._node_scroller_2.logicBlock_alpha();me._menu_open.logicBlock_position();me._menu_open.logicBlock_alpha();me._screentint_image.logicBlock_visible();me._image_popup.logicBlock_visible();me._popup_image.logicBlock_visible();me._image_popup_close.logicBlock_visible();me._information.logicBlock_visible(); });
	player.addListener('varchanged_category_visible', function(args) { me._menu_background.logicBlock_alpha();me._node_scroller_5.logicBlock_alpha();me._node_scroller_4.logicBlock_alpha();me._node_scroller_3.logicBlock_alpha();me._node_scroller_2.logicBlock_alpha();me._menu_open.logicBlock_position();me._menu_open.logicBlock_alpha(); });
	player.addListener('varchanged_vis_image_popup', function(args) { me._screentint_image.logicBlock_visible();me._image_popup.logicBlock_visible();me._popup_image.logicBlock_visible();me._image_popup_close.logicBlock_visible(); });
	player.addListener('varchanged_vis_info_popup', function(args) { me._information.logicBlock_visible(); });
	player.addListener('varchanged_node_visible', function(args) { me._node_scroller_5.logicBlock_alpha();me._node_scroller_4.logicBlock_alpha();me._node_scroller_3.logicBlock_alpha();me._node_scroller_2.logicBlock_alpha(); });
	player.addListener('changenode', function(args) { me._node_cloner3.callChildLogicBlocks_changenode();me._node_cloner2.callChildLogicBlocks_changenode();me._node_cloner1.callChildLogicBlocks_changenode();me._node_cloner0.callChildLogicBlocks_changenode();me._node_cloner.callChildLogicBlocks_changenode(); });
	player.addListener('mouseover', function(args) { me._node_cloner3.callChildLogicBlocks_mouseover();me._node_cloner2.callChildLogicBlocks_mouseover();me._node_cloner1.callChildLogicBlocks_mouseover();me._node_cloner0.callChildLogicBlocks_mouseover();me._node_cloner.callChildLogicBlocks_mouseover(); });
	player.addListener('changenode', function(args) { me._node_cloner3.callChildLogicBlocks_active();me._node_cloner2.callChildLogicBlocks_active();me._node_cloner1.callChildLogicBlocks_active();me._node_cloner0.callChildLogicBlocks_active();me._node_cloner.callChildLogicBlocks_active(); });
	player.addListener('changevisitednodes', function(args) { me._node_cloner3.callChildLogicBlocks_changevisitednodes();me._node_cloner2.callChildLogicBlocks_changevisitednodes();me._node_cloner1.callChildLogicBlocks_changevisitednodes();me._node_cloner0.callChildLogicBlocks_changevisitednodes();me._node_cloner.callChildLogicBlocks_changevisitednodes(); });
	player.addListener('activehotspotchanged', function(args) { me._node_cloner3.callChildLogicBlocks_activehotspotchanged();me._node_cloner2.callChildLogicBlocks_activehotspotchanged();me._node_cloner1.callChildLogicBlocks_activehotspotchanged();me._node_cloner0.callChildLogicBlocks_activehotspotchanged();me._node_cloner.callChildLogicBlocks_activehotspotchanged(); });
	player.addListener('changenode', function(args) { me.callChildLogicBlocksHotspot_hotspot_2_changenode();me.callChildLogicBlocksHotspot_hotspot_1_changenode();me.callChildLogicBlocksHotspot_ht_image_changenode();me.callChildLogicBlocksHotspot_ht_info_changenode(); });
	player.addListener('configloaded', function(args) { me.callChildLogicBlocksHotspot_ht_info_configloaded(); });
	player.addListener('mouseover', function(args) { me.callChildLogicBlocksHotspot_ht_info_mouseover(); });
	player.addListener('hastouch', function(args) { me.callChildLogicBlocksHotspot_ht_info_hastouch(); });
	player.addListener('activehotspotchanged', function(args) { me.callChildLogicBlocksHotspot_ht_image_activehotspotchanged();me.callChildLogicBlocksHotspot_ht_info_activehotspotchanged(); });
	player.addListener('varchanged_dthotsopt', function(args) { me.callChildLogicBlocksHotspot_hotspot_2_varchanged_dthotsopt();me.callChildLogicBlocksHotspot_hotspot_1_varchanged_dthotsopt();me.callChildLogicBlocksHotspot_ht_image_varchanged_dthotsopt();me.callChildLogicBlocksHotspot_ht_info_varchanged_dthotsopt(); });
	player.addListener('hotspotsremoved', function(args) { me.removeSkinHotspots(); });
	me.skinTimerEvent();
};