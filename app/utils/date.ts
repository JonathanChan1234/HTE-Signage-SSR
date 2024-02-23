export function getMonthShortForm(month: number) {
    switch (month) {
        case 0:
            return 'Jan';
        case 1:
            return 'Feb';
        case 2:
            return 'Mar';
        case 3:
            return 'Apr';
        case 4:
            return 'May';
        case 5:
            return 'Jun';
        case 6:
            return 'Jul';
        case 7:
            return 'Aug';
        case 8:
            return 'Sep';
        case 9:
            return 'Oct';
        case 10:
            return 'Nov';
        case 11:
            return 'Dec';
        default:
            return '';
    }
}

export function getDateFormattedText(date: Date) {
    if (!(date instanceof Date)) throw new Error('not a date object');
    return `${date.getDate()} ${getMonthShortForm(date.getMonth())}, ${date.getFullYear()}`;
}

export function getTimeFormattedText(date: Date) {
    if (!(date instanceof Date)) throw new Error('not a date object');
    return `${date.getHours().toString().padStart(2, '0')}:${date
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;
}
