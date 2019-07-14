# hpp-skeleton
## Features

#### Automatic creation of class skeletons at _.hpp_ files creation.
**the file has to start with an upper-case letter, making it a class .hpp file**

![oops something went wrong, try to check on https://raw.githubusercontent.com/ldedier/hpp-skeleton/master/images/hppGif.gif](https://raw.githubusercontent.com/ldedier/hpp-skeleton/master/images/hppGif.gif)

## Extension Settings

### Configurations
You can configure your .hpp skeleton by specifying in the extension settings:
  * any **_include directives_**
  * any **_public methods_**
  * any **_private methods_**
  * any **_functions_** out of the class
  * one **_vscode command ID_** to execute first thing in the skeleton creation (_for headers_)
  * one **_string_** to look for and select at the end of the skeleton creation

#### Specify these configurations in *User Settings* :

```ts
{
  "hpp-skeleton.includes": array,
  "hpp-skeleton.publicMethods": array,
  "hpp-skeleton.privateMethods": array,
  "hpp-skeleton.functions": array,
  "hpp-skeleton.headerCommandId": string,
  "hpp-skeleton.placeHolder": string,
}
```
#### Special strings:
You should use these 2 special strings when editing these properties:
* **$CLASSNAME** : resolves into the _.hpp_ class name (Sample for Sample.hpp)
* **$PLACEHOLDER** : resolves into the value of _hpp-skeleton.placeHolder_

#### example:
```ts
"hpp-skeleton.includes": ["<iostream>", "\"example.hpp\""],
"hpp-skeleton.publicMethods": [
    "$CLASSNAME(void)",
    "$CLASSNAME($PLACEHOLDER)",
    "$CLASSNAME($CLASSNAME const &instance)",
    "$CLASSNAME &operator=($CLASSNAME const &rhs)",
    "~$CLASSNAME(void)"
],
"hpp-skeleton.placeHolder": "** replace parameters **"
```

License
----
MIT
