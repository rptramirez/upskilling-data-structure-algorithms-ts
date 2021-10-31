import * as fs from 'fs';

// encapsulate this code to a reusable function
try {
    // get metadata on the file (we need the file size)
    const fileData = fs.statSync(__dirname + '/dummy.properties');
    // create ArrayBuffer to hold the file contents
    const dataBuffer = new ArrayBuffer(fileData['size']);
    const dataBufferVerified = new Uint8Array(dataBuffer as ArrayBuffer);
    // read the contents of the file into the ArrayBuffer
    
    // Always use async version when reading files
    // Better to use read stream
    fs.readSync(
        fs.openSync(__dirname + '/dummy.properties', 'r'),
        dataBufferVerified,
        0,
        fileData['size'],
        0
    );
    // convert the ArrayBuffer into a string
    const data = String.fromCharCode.apply(
        null,
        new Uint16Array(dataBufferVerified)
    );
    // split the contents into lines
    const dataLines = data.split(/\r?\n/);
    // filter out lines with specific word
    const dataLinesFilteredArray = dataLines.filter((arr) =>
        arr.includes('apiendpoint')
    );

    fs.createWriteStream(
        __dirname + 'dummy-2.properties',
        JSON.parse(JSON.stringify(dataLinesFilteredArray))
    );
} catch (err) {
    console.error(JSON.stringify(err));
}
