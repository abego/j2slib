# j2slib - "Patched" version of "j2slib" (part of the [Java2Script](https://code.google.com/p/java2script/) runtime)


Based on: [j2s-2.0.0-20141012-eclipse-4.4.zip](http://dev.zhourenjian.com/j2s/j2s-2.0.0-20141012-eclipse-4.4.zip) (Sources: [j2s-eclipse-4.4-v20141012.zip](http://dev.zhourenjian.com/j2s/j2s-eclipse-4.4-v20141012.zip))

See also GoogleGroup posting "[Java2Script on Eclipse 3.x & 4.x](https://groups.google.com/forum/#!msg/java2script/g-S1HibShSA/aaz34BcLlZcJ)"

## Changes

The following changes are included in this "patched" version but not in the official version of Java2Script.

### Throw NoSuchMethodException when Constructor is missing

In the original code `Clazz.searchAndExecuteMethod` does not throw an exception when a constructor is not found, but silently does nothing.
 
Throwing an exception in case a constructor is missing is important as in our code reflection is used to tryout various constructors. With the original behaviour that reflection code was not working because it assumed the constructor was found and ran into an error.

A similar change is applied when calling super does not find the constructor (see `Clazz.superCall` in `j2slib.z.js`).

#### Fix (in `j2slib.src.z.js`)

	Clazz.searchAndExecuteMethod = function (objThis, claxxRef, fxName, funParams) {
		...	
		if ("construct" == fxName) {
			/*
			 * For non existed constructors, just return without throwing
			 * exceptions. In Java codes, extending Object can call super
			 * default Object#constructor, which is not defined in JS.
			 */
			// return; // ub: ignoring the above comment and throw an execption
			// when not found.  
			throw new NoSuchMethodException ();
		}
		// TODO: should be java.lang.NoSuchMethodException
		throw new Clazz.MethodNotFoundException (objThis, claxxRef, 
				fxName, params.typeString);
		};

#### Fix (in `j2slib.z.js`)

*(Beautified code)*

    Clazz.superCall = function(To, Tz, Nf, funParams) {
        ...
        if (fx != null) {
            ...
        } else if (Nf == "construct") {
            throw new NoSuchMethodException();
        }
        throw new Clazz.MethodNotFoundException(To, Tz, Nf, Clazz.getParamsType(funParams).typeString);
    };


### Add Class/Clazz.isInstance(object); Add Class/Clazz.getResource(name)


In the original code the methods `Class/Clazz.isInstance(object)` and `Class/Clazz.getResource(name)` are missing.

#### Fix (in `j2slib.src.z.js`)

Add `"isInstance"` and `"getResource"` to the array that initializes `Clazz.innerFunctionNames`:

	Clazz.innerFunctionNames = Clazz.innerFunctionNames.concat (["getSuperclass",
				"isAssignableFrom", "isInstance", "getResource", "getMethods", "getMethod", "getDeclaredMethods", 
				"getDeclaredMethod", "getConstructor", "getModifiers", "isArray", "newInstance"]);


For `Clazz.isInstance(object)` provide a simple implementation of that always returns true (sufficient for now).

Code:

	Clazz.innerFunctions.isInstance = function (obj) {
		return true;//FIXME: Class.isInstance always returns true
	};

For `Clazz.getResource(name)` implement a function that returns the URL to the resource with the given name.

The URL is concatenation of 

* document.URL,
* classpath for this class,
* name

Code:

	Clazz.innerFunctions.getResource = function (name) {
		// everything up to the last "/" (including the "/")
		function path(s) {
			return s.substring(0,s.lastIndexOf("/")+1);
		}
		var classpath = ClazzLoader.getClasspathFor (this.getName());
		return new java.net.URL(path(document.URL)+path(classpath)+name);
	};

Insert code (e.g.) behind `Clazz.innerFunctions.isAssignableFrom`.


### Fall into debugger when ClazzLoader.updateNode fails

Tracking down problems when a class cannot be loaded is quite difficult. In the original code this leads to a TypeError when `nn` was `null` because the class was not found.

#### Fix (in `j2slib.src.z.js`)

With this extra null check and debugger call it is now easier to track down what class was not found.


	var nn = ClazzLoader.findClass (list[j]);
	if (!nn) {
		debugger;
	}
	if (nn && nn.status != ClazzNode.STATUS_DECLARED
				&& nn !== node) {
		...


### Use native JavaScript Boolean class as java.lang.Boolean

In the original code `java.lang.Boolean` is implemented as a Java class, even when running in native mode. This leads to various problems. Just using the native JavaScript Boolean implementation fixes these issues.

#### Fix (in `core.z.js`)

	java.lang.Boolean=Boolean;/*=function(){
		Clazz.instantialize(this,arguments);
	};*/

*(Original code in comment)*
 

### Prevent Google's Closure compiler from removing code

The JavaScript implementation of String.prototype.$generateExpFunction (in `core.z.js`) was originally written in a way that made Google's Closure compiler remove some significant code.

Actually this seems to be a bug in Google's Closure compiler. As we have no way to enforce a fix we re-wrote the code to work around this issue.

#### Fix (in `core.z.js`)

	String.prototype.$generateExpFunction=function(str){
	var arr=[];
	var orders=[];
	var idx=0;
	//PM 3/4/2014 Moved up. See comment below.
	var funStr="f = function (";
	arr[0]="";
	var i=0;
	for(;i<str.length;i++){
	var ch=str.charAt(i);
	if(i!=str.length-1&&ch=='\\'){
	i++;
	var c=str.charAt(i);
	if(c=='\\'){
	arr[idx]+='\\';
	}
	arr[idx]+=c;
	}else if(i!=str.length-1&&ch=='$'){
	i++;
	orders[idx]=parseInt(str.charAt(i));
	idx++;
	arr[idx]="";
	}else if(ch=='\r'){
	arr[idx]+="\\r";
	}else if(ch=='\n'){
	arr[idx]+="\\n";
	}else if(ch=='\t'){
	arr[idx]+="\\t";
	}else if(ch=='\"'){
	arr[idx]+="\\\"";
	}else{
	arr[idx]+=ch;
	}
	}
	// PM 3/4/2014 Moved to line 1004 to prevent closure compiler from removing "var" keyword.
	//var funStr="f = function (";
	var max=Math.max.apply({},orders);
	for(i=0;i<=max;i++){
	funStr+="$"+i;
	if(i!=max){
	funStr+=", ";
	}
	}
	funStr+=") { return ";
	for(i=0;i<arr.length-1;i++){
	funStr+="\""+arr[i]+"\" + $"+orders[i]+" + ";
	}
	funStr+="\""+arr[i]+"\"; }";
	// PM 3/4/2014 Commented out to prevent closure compiler from reducing to "return null".
	//var f=null;
	eval(funStr);
	// PM 3/4/2014 Since f is no longer initialized to null instead check "undefined" to determine return value.
	//return f;
	return typeof f == "undefined" ? null : f;
	};


### Bug: Throwable.fillInStackTrace may throw a TypeError

Throwable.fillInStackTrace (in `core.z.js`) may run into a null pointer exception / TypeError because `superCaller` may be `null`.

Original code: 

	...
	if(superCaller!=null){
		callerList[callerList.length]=superCaller;
	}
	caller=superCaller.arguments.callee.caller;
	...

#### Fix (in `core.z.js`)

	$_M(c$,"fillInStackTrace",
	function(){
	this.stackTrace=new Array();
	var caller=arguments.callee.caller;
	var superCaller=null;
	...
	if(superCaller!=null){
		callerList[callerList.length]=superCaller;
	}
	caller=(superCaller && superCaller.arguments && superCaller.arguments.callee) ? superCaller.arguments.callee.caller : null;
	...

### Implement Thread.sleep

In the original code calling Thread.sleep opens up an alert, reporting the missing implementation:

	alert("Thread.sleep is not implemented in Java2Script!");

#### Fix (in `Thread.js`)

Thread.sleep(millis) is implement using "busy waiting". The function returns after millis milliseconds. 

	c$.sleep=$_M(c$,"sleep",
	function(millis){
		var now = function() {return (new Date()).getTime();}
		var start = now();
		while (now() < start+millis) {
			// busy waiting
		}
	},"~N");
 

