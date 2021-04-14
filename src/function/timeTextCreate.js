export default function timeTextCreate(date) {
    console.log(date);
    let time = '';
    let dateString = date;
    const year = dateString.getFullYear();
    const month = parseInt(dateString.getMonth(), 10) + 1;
    const day = dateString.getDay();
    time = date.toLocaleTimeString('ja');
    dateString = `${year}/${month}/${day}\n${time}`;
    return dateString;
}
