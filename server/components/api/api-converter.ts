import * as fs from 'fs';

try {
    // get metadata on the file (we need the file size)
    let fileData = fs.statSync(__dirname + '/dummy.properties');
    // create ArrayBuffer to hold the file contents
    let dataBuffer = new ArrayBuffer(fileData['size']);
    const dataBufferVerified = new Uint8Array(dataBuffer as ArrayBuffer);
    // read the contents of the file into the ArrayBuffer
    fs.readSync(
        fs.openSync(__dirname + '/dummy.properties', 'r'),
        dataBufferVerified,
        0,
        fileData['size'],
        0
    );
    // convert the ArrayBuffer into a string
    let data = String.fromCharCode.apply(
        null,
        new Uint16Array(dataBufferVerified)
    );
    // split the contents into lines
    let dataLines = data.split(/\r?\n/);
    // filter out lines with specific word
    var dataLinesFilteredArray = dataLines.filter((arr) =>
        arr.includes('apiendpoint')
    );
    console.log('dataLinesFilteredArray: ', dataLinesFilteredArray);
    fs.createWriteStream(
        __dirname + 'dummy-2.properties',
        JSON.parse(JSON.stringify(dataLinesFilteredArray))
    );
} catch (err) {
    console.error(JSON.stringify(err));
}
