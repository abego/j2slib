$_L(null,"$wt.internal.ResizeHandler",["$wt.graphics.Rectangle","$wt.internal.browser.OS","$wt.widgets.QuickLaunch"],function(){
c$=$_C(function(){
this.monitor=null;
this.shell=null;
this.status=0;
$_Z(this,arguments);
},$wt.internal,"ResizeHandler");
$_K(c$,
function(monitor){
this.monitor=monitor;
},"$wt.widgets.Monitor");
$_K(c$,
function(shell,status){
this.shell=shell;
this.status=status;
},"$wt.widgets.Decorations,~N");
$_M(c$,"getClientArea",
($fz=function(){
var orientation=16384;
var clientWidth=0;
var clientHeight=0;
var offsetX=0;
var offsetY=0;
{
clientWidth=document.body.parentNode.clientWidth;
clientHeight=O$.getFixedBodyClientHeight();
var display=null;
if(this.shell!=null){
display=this.shell.display;
}
if(display==null){
display=$wt.widgets.Display.Default;
}
if(display!=null&&display.taskBar!=null){
orientation=display.taskBar.orientation;
}
}if(orientation==1024){
offsetY=$wt.widgets.QuickLaunch.BAR_HEIGHT;
clientHeight=clientHeight-$wt.widgets.QuickLaunch.BAR_HEIGHT-36;
}else if(orientation==128){
offsetY=36;
clientHeight=clientHeight-36;
}return new $wt.graphics.Rectangle(offsetX,offsetY,clientWidth,clientHeight);
},$fz.isPrivate=true,$fz));
$_M(c$,"updateMinimized",
function(){
var clientArea=this.getClientArea();
var tb=null;
{
tb=this.shell.titleBar;
}var h=((this.shell.getStyle()&32)!=0)?O$.getContainerHeight(tb):0;
this.shell.setLocation(clientArea.x-1,clientArea.y+clientArea.height-h-6);
});
$_M(c$,"updateMaximized",
function(){
var clientArea=this.getClientArea();
var tb=null;
{
tb=this.shell.titleBar;
}var titleHeight=((this.shell.getStyle()&32)!=0)?O$.getContainerHeight(tb):0;
var disablingMaxBar=false;
{
disablingMaxBar=window["swt.maximized.bar"]==false;
}if(disablingMaxBar){
if(this.status==1024){
this.shell.setBounds(this.shell.computeTrim(clientArea.x,clientArea.y,clientArea.width,clientArea.height-titleHeight));
}else if((this.status&128)!=0&&(this.status&1024)!=0){
var bounds=this.shell.getBounds();
var shellWidth=this.shell.getSize().x;
if((this.status&16384)!=0){
this.shell.setBounds(clientArea.x,clientArea.y,shellWidth,clientArea.height+2);
}else if((this.status&131072)!=0){
this.shell.setBounds(clientArea.x+clientArea.width-shellWidth,clientArea.y,shellWidth,clientArea.height+2);
}else{
this.shell.setBounds(bounds.x,clientArea.y,shellWidth,clientArea.height+2);
}}else if((this.status&16384)!=0&&(this.status&131072)!=0){
var bounds=this.shell.getBounds();
var shellHeight=this.shell.getSize().y;
if((this.status&128)!=0){
this.shell.setBounds(clientArea.x,clientArea.y,clientArea.width+2,shellHeight);
}else if((this.status&1024)!=0){
this.shell.setBounds(clientArea.x,clientArea.y+clientArea.height-2-shellHeight,clientArea.width+2,shellHeight);
}else{
this.shell.setBounds(clientArea.x,bounds.y,clientArea.width+2,shellHeight);
}}}else{
if(this.status==1024){
this.shell.setBounds(this.shell.computeTrim(clientArea.x,clientArea.y-titleHeight,clientArea.width,clientArea.height));
}else if((this.status&128)!=0&&(this.status&1024)!=0){
var bounds=this.shell.getBounds();
var shellWidth=this.shell.getSize().x;
if((this.status&16384)!=0){
this.shell.setBounds(clientArea.x,clientArea.y,shellWidth,clientArea.height+2);
}else if((this.status&131072)!=0){
this.shell.setBounds(clientArea.x+clientArea.width-shellWidth+2,clientArea.y,shellWidth,clientArea.height+2);
}else{
this.shell.setBounds(bounds.x,clientArea.y,shellWidth,clientArea.height+2);
}}else if((this.status&16384)!=0&&(this.status&131072)!=0){
var bounds=this.shell.getBounds();
var shellHeight=this.shell.getSize().y;
if((this.status&128)!=0){
this.shell.setBounds(clientArea.x,clientArea.y,clientArea.width+2,shellHeight);
}else if((this.status&1024)!=0){
this.shell.setBounds(clientArea.x,clientArea.y+clientArea.height-2-shellHeight,clientArea.width+2,shellHeight);
}else{
this.shell.setBounds(clientArea.x,bounds.y,clientArea.width+2,shellHeight);
}}}});
$_M(c$,"updateCentered",
function(){
var clientArea=this.getClientArea();
var size=this.shell.getSize();
var y=$_dI((clientArea.height-size.y)/2);
if(y<0){
y=0;
}if(this.status==16777216){
if(y>0){
y=Math.round((clientArea.height-size.y)*0.618/1.618);
}this.shell.setLocation($_dI((clientArea.width-size.x)/2)+clientArea.x,y+clientArea.y);
}else if((this.status&128)!=0){
this.shell.setLocation($_dI((clientArea.width-size.x)/2)+clientArea.x,clientArea.y);
}else if((this.status&1024)!=0){
var trimWidth=(this.shell.getStyle()&8)!=0?0:4;
this.shell.setLocation($_dI((clientArea.width-size.x)/2)+clientArea.x,clientArea.height-2-size.y+clientArea.y+trimWidth);
}else if((this.status&16384)!=0){
this.shell.setLocation(clientArea.x,y+clientArea.y);
}else if((this.status&131072)!=0){
var trimWidth=(this.shell.getStyle()&8)!=0?0:4;
this.shell.setLocation(clientArea.width-size.x+clientArea.x+trimWidth,y+clientArea.y);
}});
$_M(c$,"updateCornered",
function(){
var clientArea=this.getClientArea();
var size=this.shell.getSize();
var trimWidth=(this.shell.getStyle()&8)!=0?0:4;
if((this.status&128)!=0){
if((this.status&16384)!=0){
this.shell.setLocation(clientArea.x,clientArea.y);
}else if((this.status&131072)!=0){
this.shell.setLocation(clientArea.width-size.x+trimWidth,clientArea.y);
}}else if((this.status&1024)!=0){
if((this.status&16384)!=0){
this.shell.setLocation(clientArea.x,clientArea.height-2-size.y+clientArea.y+trimWidth);
}else if((this.status&131072)!=0){
this.shell.setLocation(clientArea.width-size.x+trimWidth,clientArea.height-2-size.y+clientArea.y+trimWidth);
}}});
$_M(c$,"updateMonitor",
function(){
if(this.monitor==null){
return;
}var clientArea=this.getClientArea();
{
this.monitor.clientX=clientArea.x;
this.monitor.clientY=clientArea.y;
this.monitor.clientWidth=clientArea.width;
this.monitor.clientHeight=clientArea.height;
}});
$_M(c$,"getStatus",
function(){
return this.status;
});
});
