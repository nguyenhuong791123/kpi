const upper1st = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
}

const getTableNames = (s) => {
    if (typeof s !== 'string' || s.indexOf('_') == -1) return s;
    return s.split('_').map((o) => upper1st(o)).join('');
}

const delStartsEndsWithExt = (str, ext) => {
    if(str === undefined || str === null) return str;
    var rStr = str;
    if(rStr.startsWith(ext)) rStr = rStr.substring(1);
    if(rStr.endsWith(ext)) rStr = rStr.substring(0, (rStr.length - 1));
    return rStr;
}

exports.upper1st = upper1st;
exports.getTableNames = getTableNames;
exports.delStartsEndsWithExt = delStartsEndsWithExt;
