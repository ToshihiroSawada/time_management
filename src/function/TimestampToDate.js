/* eslint-disable import/prefer-default-export */
/* eslint-disable no-underscore-dangle */

//Arrayを渡して、一括でTimestamp型をDate型に変換する
const timestampToDate = (params) => {
  let returnParams;
  // eslint-disable-next-line prefer-const
  returnParams = params;
  for (let i = 0; i < params.length; i += 1) {
    //開始時間をTimestamp型からDate型へ変換
    let cache = new Date(Number(returnParams[i].startTime));
    returnParams[i].startTime = cache.toLocaleString({ timeZone: 'Asia/Tokyo' });

    //終了時間をTimestamp型からDate型へ変換
    cache = new Date(Number(returnParams[i].endTime));
    returnParams[i].endTime = cache.toLocaleString({ timeZone: 'Asia/Tokyo' });
  }
  return returnParams;
};

const _timestampToDate = timestampToDate;
export { _timestampToDate as timestampToDate };
