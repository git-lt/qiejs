"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hexBytes = [];
var crypt0 = null;
var BUFFER_SIZE = 4096;
for (var i = 0; i < 256; i++) {
    hexBytes[i] = (i + 0x100).toString(16).substr(1);
}
if (typeof window.crypto !== "undefined") {
    crypt0 = window.crypto;
}
else if (typeof module !== "undefined" && typeof require === "function") {
    crypt0 = require("crypto");
}
var Uuid = /** @class */ (function () {
    function Uuid() {
        this.buf = null;
        this.bufIdx = 0;
    }
    Uuid.prototype.clear = function () {
        this.buf = null;
        this.bufIdx = 0;
    };
    Uuid.prototype.test = function (uuid) {
        return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid);
    };
    Uuid.prototype._randomBytes = function (n) {
        if (crypt0.getRandomValues) {
            var bytes = new Uint8Array(n);
            crypt0.getRandomValues(bytes);
            return bytes;
        }
        else {
            var r = [];
            for (var i = 0; i < n; i++) {
                r.push(Math.floor(Math.random() * 256));
            }
            return r;
        }
    };
    Uuid.prototype._randomBytesBuffered = function (n) {
        var _a = this, buf = _a.buf, bufIdx = _a.bufIdx;
        if (!buf || bufIdx + n > BUFFER_SIZE) {
            bufIdx = 0;
            buf = this._randomBytes(BUFFER_SIZE);
        }
        return buf.slice(bufIdx, (bufIdx += n));
    };
    Uuid.prototype._uuidBin = function () {
        var b = this._randomBytesBuffered(16);
        b[6] = (b[6] & 0x0f) | 0x40;
        b[8] = (b[8] & 0x3f) | 0x80;
        return b;
    };
    Uuid.prototype.uuid = function () {
        var b = this._uuidBin();
        var res = "";
        for (var i = 0; i < 16; i++) {
            res += hexBytes[b[i]];
            if ([3, 5, 7, 9].indexOf(i) > -1)
                res += "-";
        }
        return res.toUpperCase();
    };
    return Uuid;
}());
exports.default = new Uuid();
