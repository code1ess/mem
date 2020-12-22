const JavaScriptObfuscator = require('webpack-obfuscator');

const jsObfuscatorOptions = {
  rotateUnicodeArray: true, // must be true
  compact: true, // Compact Remove newline characters from the output obfuscation code.
  controlFlowFlattening: false, // This option greatly affects the performance of a 1.5x speed reduction. Enable code control flow flattening. Control flow flattening is the structural transformation of source code, which hinders program understanding.
  controlFlowFlatteningThreshold: 0.75,
  deadCodeInjection: true, // This option greatly increases the size of obfuscated code (up to 200%) This feature adds random dead code blocks (ie: code that will not be executed) to the obfuscated output, making it more difficult to reverse engineer.
  deadCodeInjectionThreshold: 0.4,
  debugProtection: true, // Debugging protection If you open the developer tools, you can freeze your browser. 
  debugProtectionInterval: true, // If checked, the interval forced debugging mode is used on the "Console" tab, which makes it more difficult to use other functions of "Developer Tools". How does it work? A special code that calls the debugger; inserted repeatedly throughout the obfuscated source code.
  disableConsoleOutput: true, // Disable console.log, console.info, console.error and console.warn by replacing them with empty functions. This makes the use of the debugger more difficult.
  domainLock: [], // Lock the obfuscated source code so that it only runs on specific domains and / or subdomains. This makes it very difficult for someone to simply copy and paste the source code and run it elsewhere. Multiple domains and subdomains can lock the code to multiple domains or subdomains. For example, to lock it so that the code only runs on www.example.com Add www.example.com so that it runs on any subdomain of example.com, use .example.com.
  identifierNamesGenerator: 'hexadecimal', // Use this option to control the obfuscation of identifiers (variable names, function names, etc.).
  identifiersPrefix: '', // This option makes all global identifiers have a specific prefix.
  inputFileName: '',
  log: false,
  renameGlobals: false, // Don't start Enable global variable and function name confusion by declaration. 
  reservedNames: [], // Disable obfuscation and generate identifiers that match the passed RegExp pattern. For example, if you add ^ someName, the obfuscator will ensure that all variables beginning with someName, the function name and function parameters will not be destroyed.
  reservedStrings: [], // Disable the conversion of string literals, which match the RegExp pattern passed. For example, if you add ^ some * string, the obfuscator will ensure that all strings beginning with certain strings are not moved to `stringArray`.
  rotateStringArray: true, // 
  seed: 0, // By default (seed = 0), you will get a new result every time you obfuscate the code (ie: different variable names, different variables inserted into stringArray, etc.). If repeatable results are required, set the seed to a specific integer.
  selfDefending: true, // This option makes the output code resistant to formatting and variable renaming. If you try to use a JavaScript beautifier on obfuscated code, the code will no longer work, making it more difficult to understand and modify it. Compact code setup is required.
  stringArray: true, // Shift the stringArray array to a fixed and random (generated when code is confused) position. This makes it more difficult to match the order of deleted strings with their original positions. If the original source code is not small, it is recommended to use this option, because helper functions can attract attention.
  stringArrayEncoding: ['base64'], // This option may slightly reduce the script speed. Use Base64 or RC4 to encode all string literals of stringArray and insert a special function to decode it back at runtime.
  stringArrayIndexShift: true,
  stringArrayWrappersCount: 2,
  stringArrayWrappersChainedCalls: true,
  stringArrayWrappersParametersMaxCount: 4,
  stringArrayWrappersType: 'function',
  stringArrayThreshold: 0.75, // You can use this setting to adjust the probability that string literals will be inserted into stringArray (from 0 to 1). This setting is useful in large code bases, because repeated calls to the stringArray function will reduce the speed of the code.
  target: 'browser', // You can set the target environment of the obfuscated code to one of the following: Browser, Browser No Eval, Node The current browser and node output are the same.
  transformObjectKeys: true, // Convert (obfuscate) object keys. For example, this code var a = {enabled: true}; when using this option for obfuscation, the enabled object key will be hidden: var a = {}; a [_0x2ae0 [('0x0')] = true ;. Ideally used with String Array settings.
  unicodeEscapeSequence: true, // Convert all strings to their unicode representation. For example, the string "Hello World!" Will be converted to "'\ x48 \ x65 \ x6c \ x6c \ x6f \ x20 \ x57 \ x6f \ x72 \ x6c \ x64 \ x21".
};

let webpackPlugins = [];
if (process.env.NODE_ENV === 'production') {
  webpackPlugins = [
    new JavaScriptObfuscator(jsObfuscatorOptions, [
      // '**/index.js',
      '**/chunk-vendors.js',
    ])
  ];
} else {
  // 为开发环境修改配置...
}

module.exports = {
  publicPath: './',

  // 正在环境取消 source map
  productionSourceMap: false,

  // 取消文件名哈希
  filenameHashing: false,

  configureWebpack: {
    plugins: webpackPlugins,
  },
}