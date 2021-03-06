$_J("net.sf.j2s.ajax");
$_L(["javax.servlet.http.HttpServlet"],"net.sf.j2s.ajax.SimplePipeHttpServlet",["java.lang.Long","$.StringBuffer","$.Thread","net.sf.j2s.ajax.SimplePipeHelper"],function(){
c$=$_C(function(){
this.pipeQueryTimeout=5000;
this.pipeScriptBreakout=1200000;
this.pipeMaxItemsPerQuery=-1;
$_Z(this,arguments);
},net.sf.j2s.ajax,"SimplePipeHttpServlet",javax.servlet.http.HttpServlet);
$_M(c$,"init",
function(){
var timeoutStr=this.getInitParameter("simple.pipe.query.timeout");
if(timeoutStr!=null){
try{
this.pipeQueryTimeout=Long.parseLong(timeoutStr);
if(this.pipeQueryTimeout<0||this.pipeQueryTimeout>20000){
this.pipeQueryTimeout=20000;
}}catch(e){
if($_e(e,NumberFormatException)){
e.printStackTrace();
}else{
throw e;
}
}
}var breakoutStr=this.getInitParameter("simple.pipe.script.breakout");
if(breakoutStr!=null){
try{
this.pipeScriptBreakout=Long.parseLong(breakoutStr);
if(this.pipeScriptBreakout<=0||this.pipeScriptBreakout>1200000){
this.pipeScriptBreakout=1200000;
}else if(this.pipeScriptBreakout<=60000){
this.pipeScriptBreakout=60000;
}}catch(e){
if($_e(e,NumberFormatException)){
e.printStackTrace();
}else{
throw e;
}
}
}var perQueryStr=this.getInitParameter("simple.pipe.max.items.per.query");
if(perQueryStr!=null){
try{
this.pipeMaxItemsPerQuery=Integer.parseInt(perQueryStr);
if(this.pipeMaxItemsPerQuery<=0){
this.pipeMaxItemsPerQuery=-1;
}else if(this.pipeMaxItemsPerQuery<5){
this.pipeMaxItemsPerQuery=5;
}}catch(e){
if($_e(e,NumberFormatException)){
e.printStackTrace();
}else{
throw e;
}
}
}$_U(this,net.sf.j2s.ajax.SimplePipeHttpServlet,"init",[]);
});
$_V(c$,"doGet",
function(req,resp){
var key=req.getParameter("k");
if(key==null){
resp.sendError(400);
return;
}var type=req.getParameter("t");
if(type==null){
type="c";
}var domain=req.getParameter("d");
this.doPipe(resp,key,type,domain);
},"javax.servlet.http.HttpServletRequest,javax.servlet.http.HttpServletResponse");
$_M(c$,"doPipe",
function(resp,key,type,domain){
var writer=null;
resp.setHeader("Pragma","no-cache");
resp.setHeader("Cache-Control","no-cache");
resp.setDateHeader("Expires",0);
if("n".equals(type)){
var updated=net.sf.j2s.ajax.SimplePipeHelper.notifyPipeStatus(key,true);
resp.setContentType("text/javascript; charset=utf-8");
writer=resp.getWriter();
writer.write("$p1p3b$ (\"");
writer.write(key);
writer.write("\", \"");
writer.write(updated?"o":"l");
writer.write("\");");
return;
}if("u".equals(type)){
resp.setContentType("text/html; charset=utf-8");
writer=resp.getWriter();
var buffer=new StringBuffer();
buffer.append("<html><head><title></title></head><body>\r\n");
buffer.append("<script type=\"text/javascript\">");
buffer.append("p = new Object ();\r\n");
buffer.append("p.key = \""+key+"\";\r\n");
buffer.append("p.originalDomain = document.domain;\r\n");
buffer.append("document.domain = \""+domain+"\";\r\n");
buffer.append("var securityErrors = 0\r\n");
buffer.append("var lazyOnload = function () {\r\n");
buffer.append("try {\r\n");
buffer.append("var spr = window.parent.net.sf.j2s.ajax.SimplePipeRequest;\r\n");
buffer.append("eval (\"(\" + spr.subdomainInit + \") (p);\");\r\n");
buffer.append("eval (\"((\" + spr.subdomainLoopQuery + \") (p)) ();\");\r\n");
buffer.append("} catch (e) {\r\n");
buffer.append("securityErrors++;\r\n");
buffer.append("if (securityErrors < 100) {\r\n");
buffer.append("window.setTimeout (lazyOnload, 100);\r\n");
buffer.append("};\r\n");
buffer.append("};\r\n");
buffer.append("};\r\n");
buffer.append("window.onload = lazyOnload;\r\n");
buffer.append("</script>\r\n");
buffer.append("</body></html>\r\n");
writer.write(buffer.toString());
return;
}var isContinuum="c".equals(type);
if(isContinuum){
resp.setHeader("Transfer-Encoding","chunked");
}var isScripting="s".equals(type);
if(isScripting){
resp.setContentType("text/html; charset=utf-8");
writer=resp.getWriter();
var buffer=new StringBuffer();
buffer.append("<html><head><title></title></head><body>\r\n");
buffer.append("<script type=\"text/javascript\">");
if(domain!=null){
buffer.append("document.domain = \""+domain+"\";\r\n");
}else{
buffer.append("document.domain = document.domain;\r\n");
}buffer.append("function $ (s) { if (window.parent) window.parent.net.sf.j2s.ajax.SimplePipeRequest.parseReceived (s); }");
buffer.append("if (window.parent) eval (\"(\" + window.parent.net.sf.j2s.ajax.SimplePipeRequest.checkIFrameSrc + \") ();\");\r\n");
buffer.append("</script>\r\n");
writer.write(buffer.toString());
writer.flush();
}else{
if("q".equals(type)||isContinuum){
resp.setContentType("text/plain; charset=utf-8");
}else{
resp.setContentType("text/javascript; charset=utf-8");
}writer=resp.getWriter();
}var lastPipeDataWritten=-1;
var beforeLoop=System.currentTimeMillis();
var items=0;
if(net.sf.j2s.ajax.SimplePipeHelper.notifyPipeStatus(key,true)){
var list=null;
var priority=0;
var lastLiveDetected=System.currentTimeMillis();
var pipe=null;
while((pipe=net.sf.j2s.ajax.SimplePipeHelper.getPipe(key))!=null&&(list=pipe.getPipeData())!=null&&!writer.checkError()){
var buffer=new StringBuffer();
{
var size=list.size();
if(size>0){
var live=net.sf.j2s.ajax.SimplePipeHelper.isPipeLive(key);
for(var i=0;i<size;i++){
var ss=null;
ss=list.remove(0);
if(ss==null)break;
if($_O(ss,net.sf.j2s.ajax.ISimpleCacheable)){
var sc=ss;
sc.setCached(false);
}buffer.append(net.sf.j2s.ajax.SimplePipeHttpServlet.output(type,key,ss.serialize()));
items++;
if(live&&this.pipeMaxItemsPerQuery>0&&items>=this.pipeMaxItemsPerQuery&&!isContinuum){
break;
}lastPipeDataWritten=System.currentTimeMillis();
if($_O(ss,net.sf.j2s.ajax.ISimplePipePriority)){
var spp=ss;
var p=spp.getPriority();
if(p<=0){
p=32;
}priority+=p;
}else{
priority+=32;
}}
}}if(buffer.length()>0){
writer.write(buffer.toString());
}writer.flush();
if(!net.sf.j2s.ajax.SimplePipeHelper.isPipeLive(key)){
var waitClosingInterval=pipe==null?5000:pipe.pipeWaitClosingInterval();
if(System.currentTimeMillis()-lastLiveDetected>waitClosingInterval){
break;
}else{
try{
Thread.sleep(1000);
}catch(e){
if($_e(e,InterruptedException)){
}else{
throw e;
}
}
continue;
}}else{
lastLiveDetected=System.currentTimeMillis();
}var now=System.currentTimeMillis();
if((lastPipeDataWritten==-1&&now-beforeLoop>=this.pipeQueryTimeout)||(lastPipeDataWritten>0&&now-lastPipeDataWritten>=this.pipeQueryTimeout&&(isContinuum||isScripting))){
writer.write(net.sf.j2s.ajax.SimplePipeHttpServlet.output(type,key,"o"));
lastPipeDataWritten=System.currentTimeMillis();
}now=System.currentTimeMillis();
if(pipe!=null&&pipe.getPipeData()!=null&&(this.pipeMaxItemsPerQuery<=0||items<this.pipeMaxItemsPerQuery||isContinuum)&&(isContinuum||(isScripting&&now-beforeLoop<this.pipeScriptBreakout)||(priority<32&&now-beforeLoop<this.pipeQueryTimeout))){
{
try{
pipe.wait(1000);
}catch(e){
if($_e(e,InterruptedException)){
e.printStackTrace();
}else{
throw e;
}
}
}}else{
break;
}}
}var pipe=net.sf.j2s.ajax.SimplePipeHelper.getPipe(key);
if(pipe==null||pipe.getPipeData()==null||!pipe.isPipeLive()){
net.sf.j2s.ajax.SimplePipeHelper.removePipe(key);
try{
writer.write(net.sf.j2s.ajax.SimplePipeHttpServlet.output(type,key,"d"));
lastPipeDataWritten=System.currentTimeMillis();
}catch(e){
if($_e(e,Exception)){
}else{
throw e;
}
}
}else if(isScripting&&(System.currentTimeMillis()-beforeLoop>=this.pipeScriptBreakout||(this.pipeMaxItemsPerQuery>0&&items>=this.pipeMaxItemsPerQuery))){
try{
writer.write(net.sf.j2s.ajax.SimplePipeHttpServlet.output(type,key,"e"));
lastPipeDataWritten=System.currentTimeMillis();
}catch(e){
if($_e(e,Exception)){
}else{
throw e;
}
}
}if(lastPipeDataWritten==-1){
writer.write(net.sf.j2s.ajax.SimplePipeHttpServlet.output(type,key,"o"));
}if(isScripting){
try{
writer.write("</body></html>\r\n");
}catch(e){
if($_e(e,Exception)){
}else{
throw e;
}
}
}},"javax.servlet.http.HttpServletResponse,~S,~S,~S");
c$.output=$_M(c$,"output",
function(type,key,str){
var buffer=new StringBuffer();
if("s".equals(type)){
buffer.append("<script type=\"text/javascript\">$ (\"");
}else if("x".equals(type)){
buffer.append("$p1p3p$ (\"");
}buffer.append(key);
if("s".equals(type)||"x".equals(type)){
str=str.replaceAll("\\\\", "\\\\\\\\").replaceAll ("\r", "\\\\r").replaceAll ("\n", "\\\\n").replaceAll ("\"","\\\\\"");
if("s".equals(type)){
str=str.replaceAll("<\\/script>","<\\/scr\" + \"ipt>");
}}buffer.append(str);
if("s".equals(type)){
buffer.append("\");</script>\r\n");
}else if("x".equals(type)){
buffer.append("\");\r\n");
}return buffer.toString();
},"~S,~S,~S");
$_V(c$,"doPost",
function(req,resp){
this.doGet(req,resp);
},"javax.servlet.http.HttpServletRequest,javax.servlet.http.HttpServletResponse");
});
