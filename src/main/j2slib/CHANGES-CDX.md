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
