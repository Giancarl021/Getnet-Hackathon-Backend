module.exports = function (array, channelKey, deleteChannelKey = false, ...keysToDelete) {
    const r = {};
    for (const item of array) {
        const data = { ...item };
        const key = data[channelKey];

        if(deleteChannelKey) delete data[channelKey];

        if(keysToDelete) {
            keysToDelete.forEach(key => delete data[key]);
        }

        if(!r[key]) r[key] = [];

        r[key].push(data);
    }

    return r;
}