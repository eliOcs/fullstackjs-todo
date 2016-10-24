"use strict";

exports.removePrivateKeys = function (doc, ret, options) {
    const privateKeys = Object.keys(ret).filter((key) => key.startsWith("_"));
    privateKeys.forEach((key) => delete ret[key]);
    return ret;
};
