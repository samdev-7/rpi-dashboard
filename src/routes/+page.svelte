<script>
    let time, apm, day;

    function getTime() {
        let date = new Date();
        time = (date.getHours() > 12 ? date.getHours() - 12 : date.getHours())  + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes());
        apm = date.getHours() >= 12 ? "PM" : "AM";
        day = date.toLocaleDateString(undefined, {
            weekday: "long",
            month: "long",
            day: "numeric",
        });
    }

    setInterval(getTime, 1000);

    getTime();
</script>

<div class="text-center my-20">
    <h1 class="text-9xl font-semibold tracking-wide">{time}<span class="text-5xl text-blue-300">{apm}</span></h1>
    <h2 class="text-blue-300 uppercase text-3xl font-semibold tracking-wide">{day}</h2>
</div>
