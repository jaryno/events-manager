export function msToTime(time: number) {

    // Pad to 2 or 3 digits, default is 2
    function pad(n: number, z = 2) {
        z = z || 2;
        return ('00' + n).slice(-z);
    }

    const ms = time % 1000;
    time = (time - ms) / 1000;
    const secs = time % 60;
    time = (time - secs) / 60;
    const mins = time % 60;
    const hrs = (time - mins) / 60;

    return pad(hrs) + ':' + pad(mins) + ':' + pad(secs) + '.' + pad(ms, 3);
}