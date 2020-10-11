module.exports = function (array, channelKey) {
    const r = new Set();
    for (const item of array) {
        const key = item[channelKey];
        r.add(key);
    }

    return [ ...r ];
}