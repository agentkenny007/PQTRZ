import cookie from 'cookie';
import assign from 'object-assign';

class Cookies {
    get(name, options = {}) {
        const cookies = cookie.parse(document.cookie);
        return readCookie(cookies[name], options);
    }

    getAll(options = {}) {
        const cookies = cookie.parse(document.cookie);
        const result = {};
        for (let name in cookies) result[name] = readCookie(cookies[name], options);
        return result;
    }

    set(name, value, options) {
        if (typeof value === 'object') value = JSON.stringify(value);
        document.cookie = cookie.serialize(name, value, options);
    }

    remove(name, options) {
        const finalOptions = (options = assign({
            }, options, {
                expires: new Date(1970, 1, 1, 0, 0, 1),
                maxAge: 0
            })
        );
        document.cookie = cookie.serialize(name, '', finalOptions);
    }
}

function isParsingCookie(value, doNotParse) {
    if (typeof doNotParse === 'undefined')
        doNotParse = !value || (value[0] !== '{' && value[0] !== '[');
    return !doNotParse;
}

function readCookie(value, options) {
    if (isParsingCookie(value, options.doNotParse))
        try { return JSON.parse(value); } catch (e) {};
    return value;
}

export default new Cookies();
