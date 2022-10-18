export const Functions = {
  getDate: () => {
    let d = new Date();
    // convert to msec since Jan 1 1970
    let localTime = d.getTime();
    // obtain local UTC offset and convert to msec
    let localOffset = d.getTimezoneOffset() * 60000;
    // obtain UTC time in msec
    let utc = localTime + localOffset;
    // obtain and add destination’s UTC time offset
    // for example, Bombay
    // which is UTC + 5.5 hours
    let offset = -4;
    let est = utc + 3600000 * offset;
    // convert msec value to date string
    let nd = new Date(est);

    return nd.getFullYear() + "-" + (nd.getMonth() + 1) + "-" + nd.getDate();
  },
};
