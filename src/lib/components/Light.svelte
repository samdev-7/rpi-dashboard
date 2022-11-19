<script>
    import "../../app.css";

    import { onMount } from "svelte";

    export let name = "Light";
    export let entity_id = name; 
    export let domain = "light";

    export let iconOff = "https://api.iconify.design/material-symbols:light-outline-rounded.svg?color=%23ffffff";
    export let iconOn = "https://api.iconify.design/material-symbols:light-rounded.svg?color=%23fde68a";
    export let iconError = "https://api.iconify.design/material-symbols:light-outline-rounded.svg?color=%23f87171";

    export let state = -1; // 0 = off, 1 = on, -1 = error
    let bg_color, text_color, status_text;
    let fetching = false;

    $: if (state == 0) {
        bg_color = "bg-gray-400/25";
        text_color = "text-gray-100";
        status_text = "Turned Off";
    } else if (state == 1) {
        bg_color = "bg-yellow-400/25";
        text_color = "text-yellow-100";
        status_text = "Turned On";
    }  else {
        bg_color = "bg-red-400/25";
        text_color = "text-red-100";
        status_text = "Error, click to refresh.";
    }

    async function getState() {
        if (fetching) {
            return state;
        }

        let response = await fetch("api/light?id=" + encodeURIComponent(entity_id));

        if (!response.ok) {
            return -1;
        }

        let data = await response.json();

        if (data.error == true) {
            return -1;
        }

        if (data.state == "on") {
            return 1;
        } else if (data.state == "off") {
            return 0;
        } else {
            return -1;
        }
    }

    async function setState(s) {
        fetching = true;

        let response = await fetch("api/light", {
            method: 'POST',
            body: JSON.stringify({
                id: entity_id,
                state: s,
                domain: domain
            })
        });
        

        if (!response.ok) {
            fetching = false;
            return -1;
        }

        let data = await response.json();

        if (data.error == true) {
            fetching = false;
            return null;
        }

        fetching = false;
        return s;
    }

    export const light = {
        setState
    }
    
    onMount(() => {
		getState().then((result) => {
            state = result;
        });

        setInterval(() => {
            getState().then((result) => {
                state = result;
            });
        }, 500);
	});

    function handleClick() {

        if (state == 1) {
            // Turn off

            setState('off').then((result) => {
                // if (result == "on") {
                //     state = 1;
                // } else if (result == "off") {
                //     state = 0;
                // } else {
                //     state = -1;
                // }
            });
        } else if (state == 0){
            // Turn on

            setState('on').then((result) => {
                // if (result == "on") {
                //     state = 1;
                // } else if (result == "off") {
                //     state = 0;
                // } else {
                //     state = -1;
                // }
            });
        } else if (state == -1){
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
            {:else}
                <img src="{iconError}" alt="{name} Error" class="w-16 h-16" />
            {/if}
        </div>  
    </div>
</button>