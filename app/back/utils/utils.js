const upper1st = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
}

const delStartsEndsWithExt = (str, ext) => {
    if(str === undefined || str === null) return str;
    var rStr = str;
    if(rStr.startsWith(ext)) rStr = rStr.substring(1);
    if(rStr.endsWith(ext)) rStr = rStr.substring(0, (rStr.length - 1));
    return rStr;
}

exports.upper1st = upper1st;
exports.delStartsEndsWithExt = delStartsEndsWithExt;
