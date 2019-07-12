# hpp-skeleton
## Features

Automatic creation of class skeletons at _.hpp_ files creation.

## Extension Settings

### Configurations
You can configure your .hpp skeleton by specifying in the extension settings:
  * any **include directives**
  * any **_public methods_**
  * any **_private methods_**
  * any **_functions_** out of the class
  * one **_vscode command ID_** to execute first thing in the skeleton creation (_for headers_)
  * one **string** to look for and select at the end of the skeleton creation

#### Specify these configurations in *User Settings* :

```ts
{
  "hpp-skeleton.includes": array,
  "hpp-skeleton.publicMethods": array,
  "hpp-skeleton.privateMethods": array,
  "hpp-skeleton.functions": array,
  "hpp-skeleton.headerCommandId": string,
  "hpp-skeleton.replacementPlaceHolder": string,
}
```
#### Special strings:
You should use these 2 special strings when editing these properties:
* **$CLASSNAME** : resolves into the _.hpp_ class name (Sample for Sample.hpp)
* **$PLACEHOLDER** : resolves into the value of _hpp-skeleton.ReplacementPlaceHolder_

#### example
The init configuration will provide these public methods:
```ts
"hpp-skeleton.publicMethods": [
    "$CLASSNAME(void)",
    "$CLASSNAME($PLACEHOLDER)",
    "$CLASSNAME($CLASSNAME const &instance)",
    "$CLASSNAME &operator=($CLASSNAME const &rhs)",
    "~$CLASSNAME(void)"
]
"hpp-replacementPlaceHolder": "** replace parameters **"
```

License
----
MIT