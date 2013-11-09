"use strict";

var CookieMock = function () {

    var value = "", // storing cookies here
        reservedKeys = [
            "expires",
            "path",
            "domain",
            "secure"
        ],
        cookieKeys = [];

    /**
     * @param {string} key
     * @returns {string} Returns a full cookie string, e.g.: "foo=bar; expires=Fri, 08 Nov 2999 11:25:13 GMT; path=/; domain=127.0.0.1"
     */
    function getCookieStringByKey(key) {
        var parts = value.split(";"), i, part,
            cookieString = "";

        for (i = 0; i < parts.length; i += 1) {
            part = parts[i];

            if (-1 !== part.indexOf(key + "=")) {
                cookieString += part + ";";
                continue;
            }

            if (-1 === reservedKeys.indexOf(part.trim().split("=").shift())) {
                break;
            }

            cookieString += part + (i + 1 < parts.length ? ";" : "");
        }

        return cookieString;
    }

    /**
     * @param {string} key
     * @returns {object} Returns an object literal representation of a cookie
     */
    function getCookieObjectByKey(key) {
        var cookieString = getCookieStringByKey(key),
            cookieObject = {};

        if ("" === cookieString) {
            return;
        }

        cookieString.split(";").forEach(function (item) {
            var parts = item.trim().split("=");
            cookieObject[parts[0]] = parts[1];
        });

        return cookieObject;
    }

    /**
     * @param {string} key
     * @returns {boolean} True if the cookies expire date is in the past, otherwise false
     */
    function shouldExpireCookie(key) {
        var cookieObject = getCookieObjectByKey(key),
            now = new Date();
        if (cookieObject && cookieObject.expires && new Date(cookieObject.expires) < now) {
            return true;
        }
        return false;
    }

    /**
     * @param {string} key
     * @returns {void}
     */
    function replaceCookie(key, newCookieString) {
        if (cookieKeys.indexOf(key) === cookieKeys.length - 1) {
            value = value.replace(getCookieStringByKey(key), newCookieString);
        } else {
            value = value.replace(getCookieStringByKey(key) , newCookieString + ";");
        }
    }

    /**
     * @param {string} key
     * @returns {void}
     */
    function expireCookie(key) {
        value = value.replace(getCookieStringByKey(key), "");
        delete cookieKeys[cookieKeys.indexOf(key)];
    }

    /**
     * @returns {void}
     */
    function expireCookies() {
        var i, cookieKey;
        for (i = 0; i < cookieKeys.length; i += 1) {
            cookieKey = cookieKeys[i];
            if (shouldExpireCookie(cookieKey)) {
                expireCookie(cookieKey);
            }
        }
    }

    /**
     * Getter, this.cookie will return value
     */
    this.__defineGetter__("cookie", function () {
        expireCookies();
        return value;
    });

    /**
     * Setter. If a cookie with the same key already exists, it replaces it.
     * If the expiry date of the cookie is set in the past, it removes the cookie.
     * Otherwise it adds a brand new cookie.
     */
    this.__defineSetter__("cookie", function (newCookieString) {
        var params = newCookieString.split(";"),
            newCookieKey = params[0].trim().split("=").shift();
        if (-1 !== cookieKeys.indexOf(newCookieKey)) {
            // Cookie already exists, let's replace it
            replaceCookie(newCookieKey, newCookieString);
            return value;
        }
        // It's a new cookie, yay
        value += (value ? ";" : "") + newCookieString;
        cookieKeys.push(newCookieKey);
        return value;
    });

};