<script>
    import Light from '$lib/components/Light.svelte';
    import Door from '$lib/components/Door.svelte';


    let time, apm;

    function getTime() {
        let date = new Date();
        time = (date.getHours() > 12 ? date.getHours() - 12 : date.getHours())  + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes());
        apm = date.getHours() >= 12 ? "PM" : "AM";
    }

    setInterval(getTime, 1000);

    getTime();

    let mainLight, secondaryLight;
    let mainState, secondaryState;
    let prevState;

    function onDoorOpen() {
        if (mainState == 0) {
            mainLight.setState('on');
        }
        if (secondaryState == 0) {
            secondaryLight.setState('on');
        }
    }

    function onDoorClose() {
        if (mainState == 1) {
            mainLight.setState('off');
        }
        if (secondaryState == 1) {
            secondaryLight.setState('off');
        }
    }

    function changeLights(state) {
        if (state != prevState) {
            if (state == 0) {
                onDoorClose();
            } else if (state == 1) {
                onDoorOpen();
            }
        }

        prevState = state;
    }

</script>

<div class="text-center my-24">
    <h1 class="text-9xl font-semibold tracking-wide">{time}<span class="text-5xl text-blue-300">{apm}</span></h1>
</div>

<div class="grid grid-cols-1 gap-6 px-10">
    <Light name="Workspace Main" entity_id="light.workspace_main" bind:light={mainLight} bind:state={mainState}/>
    <Light name="Workspace Secondary" entity_id="switch.workspace_secondary" domain="switch" bind:light={secondaryLight} bind:state={secondaryState}/>
</div>

<div class="w-screen absolute bottom-0">
    <Door changeLights={changeLights}/>
</div>
