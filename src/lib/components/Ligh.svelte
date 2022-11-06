<script>
    import "../../app.css";

    import { onMount } from "svelte";

    export let name = "Light";
    export let assistant_name = name; 

    export let iconOff = "https://api.iconify.design/material-symbols:light-outline-rounded.svg?color=%23ffffff";
    export let iconOn = "https://api.iconify.design/material-symbols:light-rounded.svg?color=%23fde68a";
    export let iconError = "https://api.iconify.design/material-symbols:light-outline-rounded.svg?color=%23f87171";

    let state = -1; // 0 = off, 1 = on, -1 = error
    let bg_color = "bg-red-400/25";
    let text_color = "text-red-100";

    $: if (state == 0) {
        bg_color = "bg-gray-400/25";
        text_color = "text-gray-100";
    } else if (state == 1) {
        bg_color = "bg-yellow-400/25";
        text_color = "text-yellow-100";
    } else {
        bg_color = "bg-red-400/25";
        text_color = "text-red-100";
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
    <div class="rounded-2xl p-6 flex {bg_color}">
        <div>
            <h3 class="font-medium text-xl {text_color}">{name}</h3>
        </div>
        <div class="ml-auto">
            {#if state == 1}
                <img src={iconOn} alt="{name} On" class="w-12 h-12" />
            {:else if state == 0}
                <img src={iconOff} alt="{name} Off" class="w-12 h-12" />
            {:else}
                <img src="{iconError}" alt="{name} Error" class="w-12 h-12" />
            {/if}
        </div>  
    </div>
</button>