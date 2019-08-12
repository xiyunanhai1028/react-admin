/**
 * Created by flyTigger on 2019/8/12.
 */
export default function date_format(time) {
    var date = new Date(time)
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDay() + " "
        + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
}