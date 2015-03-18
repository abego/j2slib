$_J("net.sf.j2s.ajax");
$_L(["java.lang.ClassLoader","java.util.HashMap"],"net.sf.j2s.ajax.SimpleClassLoader",["java.io.DataInputStream","$.File","$.FileInputStream","java.util.HashSet","net.sf.j2s.ajax.SimpleSerializable"],function(){
c$=$_C(function(){
this.classpath=null;
this.targetClasses=null;
this.loadedClasses=null;
this.loadingMutex=null;
$_Z(this,arguments);
},net.sf.j2s.ajax,"SimpleClassLoader",ClassLoader);
$_K(c$,
function(parent,path){
$_R(this,net.sf.j2s.ajax.SimpleClassLoader,[parent]);
this.targetClasses=new java.util.HashSet();
this.loadedClasses=new java.util.HashMap();
this.loadingMutex=new JavaObject();
this.classpath=path;
},"ClassLoader,~S");
$_M(c$,"loadClass",
function(clazzName){
if(this.targetClasses.contains(clazzName)){
var clazz=this.loadedClasses.get(clazzName);
if(clazz!=null){
return clazz;
}try{
{
clazz=this.loadedClasses.get(clazzName);
if(clazz==null){
var bytes=this.loadClassData(clazzName);
clazz=this.defineClass(clazzName,bytes,0,bytes.length);
{
this.loadedClasses.put(clazzName,clazz);
}}}return clazz;
}catch(e){
e.printStackTrace();
}
}return this.getParent().loadClass(clazzName);
},"~S");
$_M(c$,"loadClassData",
($fz=function(className){
var cp=this.classpath;
if(cp==null){
cp="./";
}var length=cp.length;
if(length>0){
var c=cp.charAt(length-1);
if(c!='/' && c != '\\'){
cp=cp+"/";
}}var f=new java.io.File(cp+className.replaceAll("\\.","/")+".class");
var size=f.length();
var buff=$_AB(size,0);
var fis=new java.io.FileInputStream(f);
var dis=new java.io.DataInputStream(fis);
dis.readFully(buff);
dis.close();
return buff;
},$fz.isPrivate=true,$fz),"~S");
c$.loadSimpleInstance=$_M(c$,"loadSimpleInstance",
function(clazzName){
try{
var runnableClass=null;
var classLoader=net.sf.j2s.ajax.SimpleClassLoader.hasClassReloaded?net.sf.j2s.ajax.SimpleClassLoader.allLoaders.get(clazzName):null;
if(classLoader!=null){
runnableClass=classLoader.loadClass(clazzName);
}else{
runnableClass=Class.forName(clazzName);
}if(runnableClass!=null){
return runnableClass.newInstance();
}}catch(e){
if($_e(e,Exception)){
e.printStackTrace();
}else{
throw e;
}
}
return null;
},"~S");
c$.reloadSimpleClass=$_M(c$,"reloadSimpleClass",
function(clazzName,path){
($t$=net.sf.j2s.ajax.SimpleClassLoader.hasClassReloaded=true,net.sf.j2s.ajax.SimpleClassLoader.prototype.hasClassReloaded=net.sf.j2s.ajax.SimpleClassLoader.hasClassReloaded,$t$);
var loader=null;
{
for(var itr=net.sf.j2s.ajax.SimpleClassLoader.allLoaders.values().iterator();itr.hasNext();){
loader=itr.next();
if(!loader.loadedClasses.containsKey(clazzName)&&((loader.classpath==null&&path==null)||loader.classpath.equals(path))){
break;
}loader=null;
}
}if(loader==null){
loader=new net.sf.j2s.ajax.SimpleClassLoader(net.sf.j2s.ajax.SimpleClassLoader.defaultLoader,path);
}{
loader.targetClasses.add(clazzName);
}{
net.sf.j2s.ajax.SimpleClassLoader.allLoaders.put(clazzName,loader);
}net.sf.j2s.ajax.SimpleSerializable.removeCachedClassFields(clazzName);
},"~S,~S");
$_S(c$,
"hasClassReloaded",false);
c$.defaultLoader=c$.prototype.defaultLoader=net.sf.j2s.ajax.SimpleClassLoader.getClassLoader();
c$.allLoaders=c$.prototype.allLoaders=new java.util.HashMap();
});
