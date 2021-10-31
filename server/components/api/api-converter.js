"use strict";
exports.__esModule = true;
var fs = require("fs");
try {
    // get metadata on the file (we need the file size)
    var fileData = fs.statSync(__dirname + '/dummy.properties');
    // create ArrayBuffer to hold the file contents
    var dataBuffer = new ArrayBuffer(fileData["size"]);
    var dataBufferVerified = new Uint8Array(dataBuffer);
    // read the contents of the file into the ArrayBuffer
    fs.readSync(fs.openSync(__dirname + '/dummy.properties', 'r'), dataBufferVerified, 0, fileData["size"], 0);
    // convert the ArrayBuffer into a string
    var data = String.fromCharCode.apply(null, new Uint16Array(dataBufferVerified));
    // split the contents into lines
    var dataLines = data.split(/\r?\n/);
    // filter out lines with specific word
    var dataLinesFilteredArray = dataLines.filter(function (arr) { return arr.includes('apiendpoint'); });
    console.log('dataLinesFilteredArray: ', dataLinesFilteredArray);
    fs.createWriteStream(__dirname + 'dummy-2.properties', JSON.parse(JSON.stringify(dataLinesFilteredArray)));
    var propertiesToJSON = function (str) {
        return (str
            // Concat lines that end with '\'.
            .replace(/\\\n( )*/g, '')
            // Split by line breaks.
            .split('\n')
            // Remove commented lines:
            .filter(function (line) {
            return /(\#|\!)/.test(line.replace(/\s/g, '').slice(0, 1))
                ? false
                : line;
        })
            // Create the JSON:
            .reduce(function (obj, line) {
            // Replace only '=' that are not escaped with '\' to handle separator inside key
            var colonifiedLine = line.replace(/(?<!\\)=/, ':');
            var key = colonifiedLine
                // Extract key from index 0 to first not escaped colon index
                .substring(0, colonifiedLine.search(/(?<!\\):/))
                // Remove not needed backslash from key
                .replace(/\\/g, '')
                .trim();
            var value = colonifiedLine
                .substring(colonifiedLine.search(/(?<!\\):/) + 1)
                .trim();
            obj[key] = value;
            return obj;
        }, {}));
    };
}
catch (err) {
    console.error(JSON.stringify(err));
}
