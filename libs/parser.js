import * as d3 from 'd3';

// From RAW 1.0.0 by http://raw.densitydesign.org
// licensed LGPL, Version 3.0
// https://github.com/densitydesign/raw/blob/cc379fad326b3e5997db1b2ef5753a64d17892ea/lib/raw.js

const timeFormat =
    '([\\sT]?(0?[0-9]|1[0-9]|2[0-4]):(0?[1-9]|[012345][0-9])(\\:(0?[1-9]|[012345][0-9])(\\.[0-9]{1,3})?)?((\\s*[\\+\\-](0?[0-9]|1[0-9]|2[0-4])(\\:)?(0?[1-9]|[012345][0-9]))|(\\s*[A-z]{1,3}))*?)?';

const dateFormats = [
    new RegExp(
        '^([\\+-]?\\d{4}(?!\\d{2}\\b))((-?)((0[1-9]|1[0-2])(\\3([12]\\d|0[1-9]|3[01]))?|W([0-4]\\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\\d|[12]\\d{2}|3([0-5]\\d|6[1-6])))([T\\s]((([01]\\d|2[0-3])((:?)[0-5]\\d)?|24\\:?00)([\\.,]\\d+(?!:))?)?(\\17[0-5]\\d([.,]\\d+)?)?([zZ]|([\\+-])([01]\\d|2[0-3]):?([0-5]\\d)?)?)?)?$'
    ),
    new RegExp(
        `^(0?[1-9]|1[012])[\\-\\_\\.\\/\\s]+(0?[1-9]|[12][0-9]|3[01])[\\-\\_\\.\\/\\s]+([0-9]{2,4})${timeFormat}$`
    ),
    //  new RegExp('^([0-9]{2,4})[\\-\\_\\.\\/\\s]+(0?[1-9]|1[012])[\\-\\_\\.\\/\\s]+(0?[1-9]|[12][0-9]|3[01])' + timeFormat + '$'),
    //  new RegExp('^([0-9]{2,4})[\\-\\_\\.\\/\\s]+(0?[1-9]|1[012])[\\-\\_\\.\\/\\s]*(0?[1-9]|[12][0-9]|3[01])?$'),
    new RegExp(
        `^[A-z]{3,}(\\,)?[\\-\\_\\.\\/\\s]*([A-z]{3,}(\\,)?[\\-\\_\\.\\/\\s]+)?(0?[1-9]|[12][0-9]|3[01])([A-z]{2})?(\\,)?[\\-\\_\\.\\/\\s]*([0-9]{2,4})${timeFormat}$`
    ),
    new RegExp(
        `^([A-z]{3,}(\\,)?[\\-\\_\\.\\/\\s]*)?((0?[1-9]|[12][0-9]|3[01])([A-z]{2})?(\\,)?[\\-\\_\\.\\/\\s]*)?[A-z]{3,}(\\,)?[\\-\\_\\.\\/\\s]*([0-9]{2,4})${timeFormat}$`
    ),
    //  new RegExp('^([A-z]{3,}(\\,)?\\s+)?(0?[1-9]|[12][0-9]|3[01])([A-z]{2})?[\\-\\_\\.\\/\\s]*(0?[1-9]|1[012])[\\-\\_\\.\\/\\s]*([0-9]{2,4})' + timeFormat + '$'),
    new RegExp(
        `^[A-z]{3,}(\\,)?\\s+([A-z]{3,}(\\,)?\\s+)?(0?[1-9]|[12][0-9]|3[01])?\\s*${timeFormat}\\s+([0-9]{2,4})$`
    )
];

function isString(value) {
    return typeof value === 'string';
}

function isNumber(value) {
    return !isNaN(value);
}

function isDate(value) {
    let isDate = false;
    for (const format in dateFormats) {
        if (value.trim().match(dateFormats[format])) {
            isDate = !isNaN(Date.parse(value)) && value.length !== 4;
            if (isDate) {
                break;
            }
        }
    }
    return isDate;
}

function typeOf(value) {
    if (value === null || value.length === 0) {
        return null;
    }
    if (isDate(value)) {
        return Date.name;
    }
    if (isNumber(value)) {
        return Number.name;
    }
    if (isString(value)) {
        return String.name;
    }
    return null;
}

function parser(delimiter) {
    // Insiperd by Ben Nadel's algorithm
    // http://www.bennadel.com/blog/1504-ask-ben-parsing-csv-strings-with-javascript-exec-regular-expression-command.htm
    function parser(string) {
        if (!string || string.length === 0) return [];

        let delimiter = parser.delimiter || detectDelimiter(string);
        let rows = [[]];
        let match;
        let matches;
        let data = [];
        let re = new RegExp(
            `(\\${delimiter}|\\r?\\n|\\r|^)(?:"([^"]*(?:""[^"]*)*)"|([^"\\${delimiter}\\r\\n]*))`,
            'gi'
        );

        while ((matches = re.exec(string))) {
            match = (matches[2] || matches[2] === '')
                ? matches[2].replace(new RegExp('""', 'g'), '"')
                : matches[3];
            if (matches[1].length && matches[1] !== delimiter) {
                rows.push([]);
            }
            rows[rows.length - 1].push(match);
        }

        let header = rows[0];

        for (let i = 1; i < rows.length; i++) {
            if (
                rows[i].length === 1 &&
                rows[i][0].length === 0 &&
                rows[i].length !== header.length
            ) {
                continue;
            }
            if (rows[i].length === header.length) {
                let obj = {};
                for (let h in header) {
                    obj[header[h]] = rows[i][h];
                }
                data.push(obj);
            } else {
                throw new ParseError(i);
            }
        }
        return data;
    }

    function mode(array) {
        if (!arguments.length || array.length === 0) {
            return null;
        }

        let counter = {};
        let mode = array[0];
        let max = 1;

        for (let el of array) {
            if (counter[el] === null) counter[el] = 1;
            else counter[el]++;
            if (counter[el] > max) {
                mode = el;
                max = counter[el];
            }
        }

        return mode;
    }

    function sniff(objs) {
        let keys = {};
        d3.keys(objs[0]).forEach(d => {
            keys[d] = [];
        });
        objs.forEach(function(d) {
            for (let key in keys) {
                let type = typeOf(d[key]);
                if (type) keys[key].push(type);
            }
        });
        return keys;
    }

    function detectDelimiter(string) {
        if (!arguments.length) return;

        let delimiters = [',', ';', '\t', ':', '|'];
        let delimitersCount = delimiters.map(d => 0);
        let header = string.split('\n')[0];
        let character;
        let quoted = false;
        let firstChar = true;

        for (let i in header) {
            character = header[i];

            switch (character) {
            case '"':
                if (quoted) {
                    if (header[i + 1] !== '"') quoted = false;
                    else i++;
                } else if (firstChar) quoted = true;
                break;

            default:
                if (quoted) {
                    break;
                }
                let index = delimiters.indexOf(character);
                if (index !== -1) {
                    delimitersCount[index]++;
                    firstChar = true;
                    continue;
                }
                break;
            }
            if (firstChar) {
                firstChar = false;
            }
        }

        let maxCount = d3.max(delimitersCount);
        return maxCount === 0
            ? '\0'
            : delimiters[delimitersCount.indexOf(maxCount)];
    }

    function ParseError(message) {
        this.name = 'ParseError';
        this.message =
            message || 'Sorry something went wrong while parsing your data.';
    }
    ParseError.prototype = new Error();
    ParseError.prototype.constructor = ParseError;

    parser.metadata = function(string) {
        return d3.entries(sniff(parser(string))).map(d => ({
            key: d.key,
            type: mode(d.value)
        }));
    };

    parser.delimiter = delimiter;

    return parser;
}

export default parser;
