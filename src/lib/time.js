var time;
var apm;

function getTime() {
    let date = new Date();
    time = (date.getHours() >= 12 ? date.getHours() - 12 : date.getHours())  + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes());
    apm = date.getHours() >= 12 ? "PM" : "AM";
}

setInterval(getTime, 60000);

getTime();

export {time, apm};