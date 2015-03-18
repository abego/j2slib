$_L(["$wt.widgets.Dialog"],"$wt.widgets.DirectoryDialog",["$wt.events.SelectionAdapter","$wt.internal.ResizeSystem","$wt.layout.GridData","$.GridLayout","$wt.widgets.Button","$.Composite","$.Label","$.Listener","$.Shell"],function(){
c$=$_C(function(){
this.message="";
this.filterPath="";
this.directoryPath=null;
$_Z(this,arguments);
},$wt.widgets,"DirectoryDialog",$wt.widgets.Dialog);
$_K(c$,
function(parent){
this.construct(parent,32768);
},"$wt.widgets.Shell");
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.DirectoryDialog,[parent,style]);
},"$wt.widgets.Shell,~N");
$_M(c$,"getFilterPath",
function(){
return this.filterPath;
});
$_M(c$,"getMessage",
function(){
return this.message;
});
$_M(c$,"open",
function(){
this.dialogShell=new $wt.widgets.Shell(this.parent.display,this.style|64|65536);
this.dialogShell.addListener(21,(($_D("$wt.widgets.DirectoryDialog$1")?0:org.eclipse.swt.widgets.DirectoryDialog.$DirectoryDialog$1$()),$_N($wt.widgets.DirectoryDialog$1,this,null)));
this.dialogShell.setText(this.title);
this.dialogShell.setLayout(new $wt.layout.GridLayout(2,false));
var icon=new $wt.widgets.Label(this.dialogShell,0);
icon.setImage(this.parent.display.getSystemImage(8));
var gridData=new $wt.layout.GridData(32,32);
icon.setLayoutData(gridData);
var label=new $wt.widgets.Label(this.dialogShell,0);
label.setText("Not implemented yet.");
var buttonPanel=new $wt.widgets.Composite(this.dialogShell,0);
var gd=new $wt.layout.GridData(3,2,false,false);
gd.horizontalSpan=2;
buttonPanel.setLayoutData(gd);
buttonPanel.setLayout(new $wt.layout.GridLayout());
var btn=new $wt.widgets.Button(buttonPanel,8);
btn.setText("&OK");
btn.setLayoutData(new $wt.layout.GridData(75,24));
btn.addSelectionListener((($_D("$wt.widgets.DirectoryDialog$2")?0:org.eclipse.swt.widgets.DirectoryDialog.$DirectoryDialog$2$()),$_N($wt.widgets.DirectoryDialog$2,this,null)));
this.dialogShell.pack();
this.dialogShell.open();
var size=this.dialogShell.getSize();
var y=$_dI((this.dialogShell.getMonitor().clientHeight-size.y)/2)-20;
if(y<0){
y=0;
}this.dialogShell.setLocation($_dI((this.dialogShell.getMonitor().clientWidth-size.x)/2),y);
$wt.internal.ResizeSystem.register(this.dialogShell,16777216);
return this.directoryPath;
});
$_M(c$,"setFilterPath",
function(string){
this.filterPath=string;
},"~S");
$_M(c$,"setMessage",
function(string){
if(string==null)this.error(4);
this.message=string;
},"~S");
c$.$DirectoryDialog$1$=function(){
$_H();
c$=$_W($wt.widgets,"DirectoryDialog$1",null,$wt.widgets.Listener);
$_V(c$,"handleEvent",
function(event){
},"$wt.widgets.Event");
c$=$_P();
};
c$.$DirectoryDialog$2$=function(){
$_H();
c$=$_W($wt.widgets,"DirectoryDialog$2",$wt.events.SelectionAdapter);
$_V(c$,"widgetSelected",
function(e){
this.b$["$wt.widgets.DirectoryDialog"].dialogShell.close();
},"$wt.events.SelectionEvent");
c$=$_P();
};
});
