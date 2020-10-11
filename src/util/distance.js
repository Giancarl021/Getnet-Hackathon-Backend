module.exports = function (coord1, coord2) {
    const { x: x1, y: y1,} = coord1;
    const { x: x2, y: y2,} = coord2;

    const delta1 = Math.abs(x1 - x2);
    const delta2 = Math.abs(y1 - y2);

    if (delta1 === 0 || delta2 === 0) {
        return delta1 || delta2;
    }

    const pow1 = Math.pow(delta1, 2);
    const pow2 = Math.pow(delta2, 2);

    return Math.sqrt(pow1 + pow2);
}