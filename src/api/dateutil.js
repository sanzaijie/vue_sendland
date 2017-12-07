//import "./moment.js"
import moment from './moment';
//时间格式化
export function dateFormat1(row, column) {
    var date = row[column.property];
    if (date == undefined) {
        return "";
    }
    return moment(date).format("YYYY-MM-DD HH:mm:ss");
}

//时间格式化
export function formatDate(date, fmt) {
    if (date == undefined) {
        return "";
    }
    return moment(date).format(fmt);
}

