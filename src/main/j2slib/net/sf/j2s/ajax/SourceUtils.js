$_J("net.sf.j2s.ajax");
$_L(null,"net.sf.j2s.ajax.SourceUtils",["java.io.ByteArrayOutputStream","$.FileInputStream","$.FileOutputStream","java.util.ArrayList","$.HashMap","java.util.regex.Pattern"],function(){
c$=$_T(net.sf.j2s.ajax,"SourceUtils");
c$.insertLineComment=$_M(c$,"insertLineComment",
function(source,indent,index,blankLine){
source.append(indent);
source.append("//+$");
source.append(index);
source.append("+\r\n");
source.append(indent);
source.append("//-$");
source.append(index);
source.append("-\r\n");
if(blankLine){
source.append("\r\n");
}},"StringBuffer,~S,~N,~B");
c$.wrapALineWithLineComment=$_M(c$,"wrapALineWithLineComment",
function(source,indent,index,line,blankLine){
source.append(indent);
source.append("//+$");
source.append(index);
source.append("+\r\n");
source.append(indent);
source.append(line);
source.append("\r\n");
source.append(indent);
source.append("//-$");
source.append(index);
source.append("-\r\n");
if(blankLine){
source.append("\r\n");
}},"StringBuffer,~S,~N,~S,~B");
c$.openLineComment=$_M(c$,"openLineComment",
function(source,indent,index){
source.append(indent);
source.append("//+$");
source.append(index);
source.append("+\r\n");
},"StringBuffer,~S,~N");
c$.closeLineComment=$_M(c$,"closeLineComment",
function(source,indent,index,blankLine){
source.append(indent);
source.append("//-$");
source.append(index);
source.append("-\r\n");
if(blankLine){
source.append("\r\n");
}},"StringBuffer,~S,~N,~B");
c$.insertBlockComment=$_M(c$,"insertBlockComment",
function(source,index){
source.append(" /*+$");
source.append(index);
source.append("+*/  /*-$");
source.append(index);
source.append("-*/ ");
},"StringBuffer,~N");
c$.updateSourceContent=$_M(c$,"updateSourceContent",
function(file,source){
var fis=null;
var buffer=$_AB(8096,0);
var read=-1;
var baos=new java.io.ByteArrayOutputStream();
try{
fis=new java.io.FileInputStream(file);
while((read=fis.read(buffer))!=-1){
baos.write(buffer,0,read);
}
}catch(e1){
if($_e(e1,java.io.IOException)){
}else{
throw e1;
}
}finally{
if(fis!=null){
try{
fis.close();
}catch(e){
if($_e(e,java.io.IOException)){
}else{
throw e;
}
}
}}
var oldSource=baos.toString();
if(oldSource.length>0){
var regExp=java.util.regex.Pattern.compile("\\/[\\/|\\*]\\+\\$(\\d+)\\+");
var matcher=regExp.matcher(source);
var allIndexes=new java.util.ArrayList();
while(matcher.find()){
var indexStr=matcher.group(1);
allIndexes.add(indexStr);
}
var position=0;
var map=new java.util.HashMap();
for(var itr=allIndexes.iterator();itr.hasNext();){
var i=itr.next();
var got=false;
var key1="//+$"+i+"+";
var idx1=oldSource.indexOf(key1,position);
if(idx1!=-1){
var key2="//-$"+i+"-";
var idx2=oldSource.indexOf(key2,position+key1.length);
if(idx2!=-1){
var s=oldSource.substring(idx1+key1.length,idx2);
map.put(i,s);
got=true;
position=idx2+key2.length;
}}if(!got){
key1="/*+$"+i+"+*/";
idx1=oldSource.indexOf(key1,position);
if(idx1!=-1){
var key2="/*-$"+i+"-*/";
var idx2=oldSource.indexOf(key2,position+key1.length);
if(idx2!=-1){
var s=oldSource.substring(idx1+key1.length,idx2);
map.put(i,s);
got=true;
position=idx2+key2.length;
}}}}
position=0;
for(var itr=allIndexes.iterator();itr.hasNext();){
var i=itr.next();
var changed=false;
var key1="//+$"+i+"+";
var idx1=source.indexOf(key1,position);
if(idx1!=-1){
var key2="//-$"+i+"-";
var idx2=source.indexOf(key2,position+key1.length);
if(idx2!=-1){
var ss=source.substring(idx1+key1.length,idx2);
var s=map.get(i);
if(s!=null&&!s.equals(ss)&&!(s.trim().length==0&&ss.trim().length==0)){
source=source.substring(0,idx1+key1.length)+s+source.substring(idx2);
changed=true;
}position=idx2+key2.length;
}}if(!changed){
key1="/*+$"+i+"+*/";
idx1=source.indexOf(key1,position);
if(idx1!=-1){
var key2="/*-$"+i+"-*/";
var idx2=source.indexOf(key2,position+key1.length);
if(idx2!=-1){
var ss=source.substring(idx1+key1.length,idx2);
var s=map.get(i);
if(s!=null&&!s.equals(ss)&&!(s.trim().length==0&&ss.trim().length==0)){
source=source.substring(0,idx1+key1.length)+s+source.substring(idx2);
changed=true;
}}position=idx2+key2.length;
}}}
if(source.equals(oldSource)){
return;
}}var fos=null;
try{
fos=new java.io.FileOutputStream(file);
fos.write(source.getBytes("utf-8"));
}catch(e){
if($_e(e,java.io.IOException)){
e.printStackTrace();
}else{
throw e;
}
}finally{
if(fos!=null){
try{
fos.close();
}catch(e){
if($_e(e,java.io.IOException)){
e.printStackTrace();
}else{
throw e;
}
}
}}
},"java.io.File,~S");
});
