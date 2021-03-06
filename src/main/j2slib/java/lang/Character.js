c$=$_C(function(){
this.value='\0';
$_Z(this,arguments);
},java.lang,"Character",null,[java.io.Serializable,Comparable]);
$_K(c$,
function(value){
this.value=value;
},"~S");
$_M(c$,"charValue",
function(){
return this.value;
});
$_V(c$,"hashCode",
function(){
return(this.value).charCodeAt(0);
});
$_V(c$,"equals",
function(obj){
if($_O(obj,Character)){
return this.value==(obj).charValue();
}return false;
},"~O");
$_V(c$,"compareTo",
function(c){
return this.value.charCodeAt(0)-c.value.charCodeAt(0);
},"Character");
c$.toLowerCase=$_M(c$,"toLowerCase",
function(c){
return(""+c).toLowerCase().charAt(0);
},"~S");
c$.toUpperCase=$_M(c$,"toUpperCase",
function(c){
return(""+c).toUpperCase().charAt(0);
},"~S");
c$.isDigit=$_M(c$,"isDigit",
function(c){
if('0' <= c && c <= '9')return true;
if(c.charCodeAt(0)<1632)return false;
return false;
},"~S");
c$.forDigit=$_M(c$,"forDigit",
function(digit,radix){
if((digit>=radix)||(digit<0)){
return'\0';
}if((radix<2)||(radix>36)){
return'\0';
}if(digit<10){
return String.fromCharCode(48+digit);
}return String.fromCharCode(87+digit);
},"~N,~N");
c$.isUpperCase=$_M(c$,"isUpperCase",
function(c){
if('A' <= c && c <= 'Z'){
return true;
}return false;
},"~S");
c$.isLowerCase=$_M(c$,"isLowerCase",
function(c){
if('a' <= c && c <= 'z'){
return true;
}return false;
},"~S");
c$.isWhitespace=$_M(c$,"isWhitespace",
function(c){
if((c.charCodeAt(0)>=0x1c&&c.charCodeAt(0)<=0x20)||(c.charCodeAt(0)>=0x9&&c.charCodeAt(0)<=0xd))return true;
if(c.charCodeAt(0)==0x1680)return true;
if(c.charCodeAt(0)<0x2000||c.charCodeAt(0)==0x2007)return false;
return c.charCodeAt(0)<=0x200b||c.charCodeAt(0)==0x2028||c.charCodeAt(0)==0x2029||c.charCodeAt(0)==0x3000;
},"~S");
c$.isLetter=$_M(c$,"isLetter",
function(c){
if(('A' <= c && c <= 'Z') || ('a' <= c && c <= 'z'))return true;
if(c.charCodeAt(0)<128)return false;
return false;
},"~S");
c$.isLetterOrDigit=$_M(c$,"isLetterOrDigit",
function(c){
return Character.isLetter(c)||Character.isDigit(c);
},"~S");
c$.isSpaceChar=$_M(c$,"isSpaceChar",
function(c){
if(c.charCodeAt(0)==0x20||c.charCodeAt(0)==0xa0||c.charCodeAt(0)==0x1680)return true;
if(c.charCodeAt(0)<0x2000)return false;
return c.charCodeAt(0)<=0x200b||c.charCodeAt(0)==0x2028||c.charCodeAt(0)==0x2029||c.charCodeAt(0)==0x202f||c.charCodeAt(0)==0x3000;
},"~S");
c$.digit=$_M(c$,"digit",
function(c,radix){
if(radix>=2&&radix<=36){
if(c.charCodeAt(0)<128){
var result=-1;
if('0' <= c && c <= '9'){
result=c.charCodeAt(0)-48;
}else if('a' <= c && c <= 'z'){
result=c.charCodeAt(0)-(87);
}else if('A' <= c && c <= 'Z'){
result=c.charCodeAt(0)-(55);
}return result<radix?result:-1;
}}return-1;
},"~S,~N");
$_M(c$,"toString",
function(){
var buf=[this.value];
return String.valueOf(buf);
});
c$.toString=$_M(c$,"toString",
function(c){
{
if(this===Charater){
return"class java.lang.Charater";
}
}return String.valueOf(c);
},"~S");
$_S(c$,
"MIN_VALUE",'\u0000',
"MAX_VALUE",'\uffff',
"MIN_RADIX",2,
"MAX_RADIX",36,
"TYPE",null);

java.lang.Character.TYPE=java.lang.Character.prototype.TYPE=java.lang.Character;
