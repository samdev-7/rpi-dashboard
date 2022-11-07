<script>
    import "../../app.css";

    import { onMount } from "svelte";

    export let name = "Light";
    export let assistant_name = name; 

    export let iconOff = "https://api.iconify.design/material-symbols:light-outline-rounded.svg?color=%23ffffff";
    export let iconOn = "https://api.iconify.design/material-symbols:light-rounded.svg?color=%23fde68a";
    export let iconError = "https://api.iconify.design/material-symbols:light-outline-rounded.svg?color=%23f87171";
    export let iconLoading = "https://api.iconify.design/material-symbols:downloading-rounded.svg?color=%23ffffff";

    let state = -2; // 0 = off, 1 = on, -1 = error, -2 = loading
    let bg_color = "";
    let text_color = "text-white";
    let status_text = "Loading..."

    $: if (state == 0) {
        bg_color = "bg-gray-400/25";
        text_color = "text-gray-100";
        status_text = "Turned Off";
    } else if (state == 1) {
        bg_color = "bg-yellow-400/25";
        text_color = "text-yellow-100";
        status_text = "Turned On";
    } else if (state == -1) {
        bg_color = "bg-red-400/25";
        text_color = "text-red-100";
        status_text = "Error, click to refresh.";
    }

    async function getState() {
        let response = await fetch("api/light?name=" + encodeURIComponent(assistant_name));
        if (!response.ok) {
            return -1;
        }

        let data = await response.json();

        if (data.error == true) {
            return -1;
        }

        if (data.state == true) {
            return 1;
        } else {
            return 0;
        }
    }

    async function setState(s) {
        let response = await fetch("api/light", {
            method: 'POST',
            body: JSON.stringify({
                name: assistant_name,
                state: s
            })
        });

        if (!response.ok) {
            return -1;
        }

        let data = await response.json();

        if (data.error == true) {
            return -1;
        }

        return s;
    }

    
    onMount(() => {
		getState().then((result) => {
            state = result;
        });

        setInterval(() => {
            getState().then((result) => {
                state = result;
            });
        }, 60000);
	});

    function handleClick() {
        if (state == 1) {
            // Turn off

            setState(0).then((result) => {
                state = result;
            });
        } else if (state == 0){
            // Turn on

            setState(1).then((result) => {
                state = result;
            });
        } else {
            // Error

            getState().then((result) => {
                state = result;
            });
        }
    }


</script>

<button type="button" on:click={handleClick}>
    <div class="rounded-2xl p-10 flex {bg_color}">
        <div class="text-left {text_color}">
            <h3 class="font-medium text-3xl">{name}</h3>
            <p class="text-xl">{status_text}</p>
        </div>
        <div class="ml-auto">
            {#if state == 1}
                <img src={iconOn} alt="{name} On" class="w-16 h-16" />
            {:else if state == 0}
                <img src={iconOff} alt="{name} Off" class="w-16 h-16" />
            {:else if state == -2}
                <img src={iconLoading} alt="{name} Loading" class="w-16 h-16" />
            {:else}
                <img src="{iconError}" alt="{name} Error" class="w-16 h-16" />
            {/if}
        </div>  
    </div>
</button>