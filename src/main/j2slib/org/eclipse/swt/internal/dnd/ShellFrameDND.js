$_L(["$wt.internal.dnd.DragListener"],"$wt.internal.dnd.ShellFrameDND",["$wt.internal.browser.OS","$wt.widgets.QuickLaunch"],function(){
c$=$_C(function(){
this.sourceX=0;
this.sourceY=0;
this.sourceWidth=0;
this.sourceHeight=0;
this.resize=0;
this.frame=null;
this.overFrameHandle=null;
$_Z(this,arguments);
},$wt.internal.dnd,"ShellFrameDND",null,$wt.internal.dnd.DragListener);
$_V(c$,"isDraggable",
function(e){
var cssName=e.target.className;
if(cssName!=null){
if((cssName.indexOf("shell")==0||cssName.indexOf("shadow")==0)&&(cssName.indexOf("top")!=-1||cssName.indexOf("middle")!=-1||cssName.indexOf("bottom")!=-1)){
var resizeStr=cssName.substring(cssName.indexOf("shell")==0?6:7);
if(resizeStr==="left-top"){
this.resize=1;
}else if(resizeStr==="center-top"){
this.resize=2;
if(O$.isMobile){
this.resize=-1;
}}else if(resizeStr==="right-top"){
this.resize=3;
}else if(resizeStr==="left-middle"){
this.resize=4;
}else if(resizeStr==="right-middle"){
this.resize=5;
}else if(resizeStr==="left-bottom"){
this.resize=6;
}else if(resizeStr==="center-bottom"){
this.resize=7;
}else if(resizeStr==="right-bottom"){
this.resize=8;
}else{
this.resize=-1;
}return true;
}else if(cssName.indexOf("shell-title-text")!=-1||cssName.indexOf("shell-title-bar")!=-1){
return true;
}}return false;
},"$wt.internal.dnd.HTMLEventWrapper");
$_V(c$,"dragBegan",
function(e){
var firstTime=false;
if(this.frame==null){
this.frame=d$.createElement("DIV");
this.frame.className="shell-handle shell-opacity";
this.frame.style.backgroundColor="gray";
this.frame.style.left=this.sourceX+"px";
this.frame.style.top=this.sourceY+"px";
this.frame.style.zIndex=w$.currentTopZIndex+100;
d$.body.appendChild(this.frame);
var existedTitleBar=false;
var els=e.sourceElement.getElementsByTagName("DIV");
for(var i=0;i<els.length;i++){
if(els[i].className.indexOf("shell-title-bar")!=-1){
existedTitleBar=true;
break;
}}
if(existedTitleBar){
var titleBar=d$.createElement("DIV");
titleBar.className="shell-title-bar";
titleBar.style.margin="4px 0";
titleBar.style.width="100%";
this.frame.appendChild(titleBar);
}firstTime=true;
}else{
this.frame.style.left=this.sourceX+"px";
this.frame.style.top=this.sourceY+"px";
this.frame.style.display="block";
}var style=e.sourceElement.style;
this.sourceX=style.left.length>0?Integer.parseInt(style.left):0;
this.sourceY=style.top.length>0?Integer.parseInt(style.top):0;
this.sourceWidth=style.width.length>0?Integer.parseInt(style.width):0;
this.sourceHeight=style.height.length>0?Integer.parseInt(style.height):0;
e.startX=e.currentX;
e.startY=e.currentY;
if(firstTime){
this.initFrameBounds(this.sourceX,this.sourceY,this.sourceWidth,this.sourceHeight);
}this.frame.style.width=this.sourceWidth+"px";
this.frame.style.height=this.sourceHeight+"px";
var frames=d$.getElementsByTagName("IFRAME");
var needOverIFrameLayer=false;
for(var i=0;i<frames.length;i++){
if(frames[i].style.display!=="none"){
needOverIFrameLayer=true;
break;
}}
if(needOverIFrameLayer){
this.overFrameHandle=d$.createElement("DIV");
this.overFrameHandle.className="over-iframe-layer";
this.overFrameHandle.style.zIndex=w$.currentTopZIndex;
d$.body.appendChild(this.overFrameHandle);
}return true;
},"$wt.internal.dnd.DragEvent");
$_V(c$,"dragging",
function(e){
var xOffset=0;
var yOffset=0;
var gHeight=O$.getFixedBodyClientHeight();
var gWidth=O$.getFixedBodyClientWidth();
var gOutside=true;
var orientation=16384;
{
var display=null;
display=$wt.widgets.Display.Default;
if(display!=null&&display.taskBar!=null){
orientation=display.taskBar.orientation;
}
if(window["swt.strict.window.inside"]==true){
gOutside=false;
}
}if(orientation==1024){
yOffset=$wt.widgets.QuickLaunch.BAR_HEIGHT;
gHeight=gHeight-$wt.widgets.QuickLaunch.BAR_HEIGHT-36;
}else if(orientation==128){
yOffset=36;
gHeight=gHeight-36;
}var noScroll=(d$.body.style.overflow==="hidden");
{
noScroll=noScroll||document.body.style.overflowX=="hidden";
}if(noScroll){
gWidth=d$.body.parentNode.clientWidth;
}var style=e.sourceElement.style;
var dWidth=style.width.length>0?Integer.parseInt(style.width):0;
var dHeight=style.height.length>0?Integer.parseInt(style.height):0;
if(this.resize>0){
var xx=this.sourceX;
var yy=this.sourceY;
var ww=this.sourceWidth;
var hh=this.sourceHeight;
if(this.resize==1){
xx+=e.deltaX();
yy+=e.deltaY();
ww-=e.deltaX();
hh-=e.deltaY();
d$.body.style.cursor="nw-resize";
}else if(this.resize==2){
yy+=e.deltaY();
hh-=e.deltaY();
d$.body.style.cursor="n-resize";
}else if(this.resize==3){
yy+=e.deltaY();
ww+=e.deltaX();
hh-=e.deltaY();
d$.body.style.cursor="ne-resize";
}else if(this.resize==4){
xx+=e.deltaX();
ww-=e.deltaX();
d$.body.style.cursor="w-resize";
}else if(this.resize==5){
ww+=e.deltaX();
d$.body.style.cursor="e-resize";
}else if(this.resize==6){
xx+=e.deltaX();
ww-=e.deltaX();
hh+=e.deltaY();
d$.body.style.cursor="sw-resize";
}else if(this.resize==7){
hh+=e.deltaY();
d$.body.style.cursor="s-resize";
}else if(this.resize==8){
ww+=e.deltaX();
hh+=e.deltaY();
d$.body.style.cursor="se-resize";
}var xx2=this.adjustX(e,xx,xOffset,gWidth,ww,gOutside);
var yy2=this.adjustY(e,yy,yOffset,gHeight,hh,gOutside);
if(xx2==xx){
ww=this.adjustW(e,ww,xOffset,gWidth,xx,gOutside);
}if(yy2==yy){
hh=this.adjustH(e,hh,yOffset,gHeight,yy,gOutside);
}this.frame.style.left=xx2+"px";
this.frame.style.top=yy2+"px";
this.frame.style.width=((ww>16)?ww:16)+"px";
this.frame.style.height=((hh>16)?hh:16)+"px";
return true;
}var xx=this.sourceX+e.deltaX();
var yy=this.sourceY+e.deltaY();
xx=this.adjustX(e,xx,xOffset,gWidth,dWidth,gOutside);
yy=this.adjustY(e,yy,yOffset,gHeight,dHeight,gOutside);
this.frame.style.left=xx+"px";
this.frame.style.top=yy+"px";
return true;
},"$wt.internal.dnd.DragEvent");
$_M(c$,"adjustY",
($fz=function(e,yy,yOffset,gHeight,dHeight,gOutside){
if(yy<yOffset){
yy=yOffset;
}if(!(e.event.event).ctrlKey){
var dTop=Math.abs(yy-yOffset);
var dBottom=Math.abs(yy-yOffset-gHeight+dHeight+2);
if(dBottom<10){
if(dBottom<dTop){
yy=yOffset+gHeight-dHeight-2;
}else{
yy=yOffset;
}}else if(dTop<10){
yy=yOffset;
}}if(!gOutside){
if(yy+dHeight+2>yOffset+gHeight){
yy=yOffset+gHeight-dHeight-2;
}if(yy<yOffset){
yy=yOffset;
}}return yy;
},$fz.isPrivate=true,$fz),"$wt.internal.dnd.DragEvent,~N,~N,~N,~N,~B");
$_M(c$,"adjustX",
($fz=function(e,xx,xOffset,gWidth,dWidth,gOutside){
if(xx<xOffset-dWidth){
xx=xOffset-dWidth;
}if(!(e.event.event).ctrlKey){
var dLeft=Math.abs(xx-xOffset);
var dRight=Math.abs(xx-xOffset-gWidth+dWidth+2);
if(dRight<10){
if(dRight<dLeft){
xx=xOffset+gWidth-dWidth-2;
}else{
xx=xOffset;
}}else if(dLeft<10){
xx=xOffset;
}}if(!gOutside){
if(xx<xOffset){
xx=xOffset;
}else if(xx+dWidth+2>xOffset+gWidth){
xx=xOffset+gWidth-dWidth-2;
if(xx<xOffset){
xx=xOffset;
}}}return xx;
},$fz.isPrivate=true,$fz),"$wt.internal.dnd.DragEvent,~N,~N,~N,~N,~B");
$_M(c$,"adjustH",
($fz=function(e,hh,yOffset,gHeight,dY,gOutside){
if(hh<0){
hh=16;
}if(!(e.event.event).ctrlKey){
var dBottom=Math.abs(dY+hh-yOffset-gHeight+2);
if(dBottom<10){
hh=yOffset+gHeight-dY-2;
}}return hh;
},$fz.isPrivate=true,$fz),"$wt.internal.dnd.DragEvent,~N,~N,~N,~N,~B");
$_M(c$,"adjustW",
($fz=function(e,ww,xOffset,gWidth,dX,gOutside){
if(ww<16){
ww=16;
}if(!(e.event.event).ctrlKey){
var dRight=Math.abs(dX+ww-xOffset-gWidth+2);
if(dRight<10){
ww=xOffset+gWidth-dX-2;
}}return ww;
},$fz.isPrivate=true,$fz),"$wt.internal.dnd.DragEvent,~N,~N,~N,~N,~B");
$_V(c$,"dragEnded",
function(e){
var style=this.frame.style;
var x=Integer.parseInt(style.left);
var y=Integer.parseInt(style.top);
var width=Integer.parseInt(style.width);
var height=Integer.parseInt(style.height);
var shell=e.sourceElement;
shell.style.zIndex=w$.currentTopZIndex=w$.currentTopZIndex+2;
this.updateShellBounds(x,y,width,height);
this.clean();
return true;
},"$wt.internal.dnd.DragEvent");
$_M(c$,"clean",
($fz=function(){
if(this.frame!=null){
this.frame.style.display="none";
}d$.body.style.cursor="auto";
this.resize=-1;
if(this.overFrameHandle!=null){
O$.destroyHandle(this.overFrameHandle);
this.overFrameHandle=null;
}},$fz.isPrivate=true,$fz));
$_M(c$,"dispose",
function(){
this.clean();
if(this.frame!=null){
O$.destroyHandle(this.frame);
this.frame=null;
}});
$_M(c$,"initFrameBounds",
function(x,y,width,height){
return true;
},"~N,~N,~N,~N");
$_M(c$,"updateShellBounds",
function(x,y,width,height){
return true;
},"~N,~N,~N,~N");
$_V(c$,"dragCanceled",
function(e){
this.clean();
return true;
},"$wt.internal.dnd.DragEvent");
c$.fixShellHeight=$_M(c$,"fixShellHeight",
function(shell){
var style=(shell).style;
var height=style.height.length>0?Integer.parseInt(style.height):0;
var divs=(shell).getElementsByTagName("DIV");
for(var i=0;i<divs.length;i++){
var div=divs[i];
if(div.className!=null){
if(div.className.indexOf("middle")!=-1){
if(height-40>=0){
div.style.height=(height-40)+"px";
}else{
div.style.height="0px";
}}else if(div.className.indexOf("shell-content")!=-1){
div.style.height=((height-30>=0)?height-30:0)+"px";
}}}
},"~O");
c$.fixShellWidth=$_M(c$,"fixShellWidth",
function(shell){
var needToFixedWidth=true;
var style=(shell).style;
var width=style.width.length>0?Integer.parseInt(style.width)-6:0;
var divs=(shell).getElementsByTagName("DIV");
for(var i=0;i<divs.length;i++){
var div=divs[i];
var cssName=div.className;
if(cssName!=null){
if(cssName.indexOf("shell-center-")!=-1){
if(needToFixedWidth){
div.style.width=(width-46)+"px";
}}else if(cssName.indexOf("shell-content")!=-1){
div.style.width=width+"px";
}else if(cssName.indexOf("shell-title-bar")!=-1){
div.style.width=width+"px";
}}}
},"~O");
$_S(c$,
"RESIZE_LEFT_TOP",1,
"RESIZE_CENTER_TOP",2,
"RESIZE_RIGHT_TOP",3,
"RESIZE_LEFT_MIDDLE",4,
"RESIZE_RIGHT_MIDDLE",5,
"RESIZE_LEFT_BOTTOM",6,
"RESIZE_CENTER_BOTTOM",7,
"RESIZE_RIGHT_BOTTOM",8);
});
