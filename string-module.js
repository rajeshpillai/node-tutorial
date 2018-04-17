function pad(text, padChar='', len) {
    let result = padChar.repeat(len);
    result = result + text + result;
    return result;
}

function capitalizeFirstLetter(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

module.exports.pad = pad;
module.exports.capitalizeFirstLetter = capitalizeFirstLetter;

