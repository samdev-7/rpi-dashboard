<script>
    import Light from '$lib/components/Light.svelte';

    let time, apm;

    function getTime() {
        let date = new Date();
        time = (date.getHours() > 12 ? date.getHours() - 12 : date.getHours())  + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes());
        apm = date.getHours() >= 12 ? "PM" : "AM";
    }

    setInterval(getTime, 1000);

    getTime();
</script>

<div class="text-center my-24">
    <h1 class="text-9xl font-semibold tracking-wide">{time}<span class="text-5xl text-blue-300">{apm}</span></h1>
</div>

<div class="grid grid-cols-2 gap-6 px-10">
    <Light name="Workspace Main" />
    <Light name="Workspace Secondary" />
</div>
