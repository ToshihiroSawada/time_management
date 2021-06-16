export default function timeTextCreate(date, textLine) {
    let time = '';
    let dateString = new Date(date);
    const year = dateString.getFullYear();
    const month = parseInt(dateString.getMonth(), 10) + 1;
    const day = dateString.getDate();
    time = date.toLocaleTimeString('ja');
    switch (textLine) {
        case 0:
            dateString = `${year}/${month}/${day} ${time}`;
            break;
        case 1:
            dateString = `${year}/${month}/${day}\n${time}`;
            break;
        default:
            dateString = `${year}/${month}/${day} ${time}`;
            break;
    }

    return dateString;
}
