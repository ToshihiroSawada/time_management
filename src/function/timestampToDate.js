import moment from 'moment';

export default function timestampToDate(timestampObject) {
    const dateTime = new Date(timestampObject);
    const dateTimeStringJP = moment(dateTime).format('YYYY/MM/DD HH:mm:ss');
    return dateTimeStringJP;
}
