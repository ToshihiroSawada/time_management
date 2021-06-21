import moment from 'moment';

export default function timestampToDate(timestampObject) {
    const dateTime = timestampObject.toDate();
    const dateTimeStringJP = moment(dateTime).format('YYYY/MM/DD HH:mm:ss');

    return dateTimeStringJP;
}
