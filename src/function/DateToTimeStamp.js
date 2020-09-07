/* eslint-disable import/prefer-default-export */
/* eslint-disable no-underscore-dangle */

const dateToTimestamp = (params) => {
    const conversionResults = Math.floor(new Date(params).getTime());
    return conversionResults;
  };

  const _dateToTimestamp = dateToTimestamp;
  export { _dateToTimestamp as dateToTimestamp };
