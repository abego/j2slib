$_L(["$wt.events.TypedEvent"],"$wt.custom.LineBackgroundEvent",null,function(){
c$=$_C(function(){
this.lineOffset=0;
this.lineText=null;
this.lineBackground=null;
$_Z(this,arguments);
},$wt.custom,"LineBackgroundEvent",$wt.events.TypedEvent);
$_K(c$,
function(e){
$_R(this,$wt.custom.LineBackgroundEvent,[e]);
this.lineOffset=e.detail;
this.lineText=e.text;
},"$wt.custom.StyledTextEvent");
});
