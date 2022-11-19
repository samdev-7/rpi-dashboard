<script>
    import "../../app.css";


   import { browser } from "$app/environment";

    export const name = "Door";
    export const changeLights = () => {};

    export let iconOff = "https://api.iconify.design/material-symbols:door-front-outline-rounded.svg?color=%23ffffff";
    export let iconOn = "https://api.iconify.design/material-symbols:door-open-outline-rounded.svg?color=%23ffffff";
    export let iconError = "https://api.iconify.design/material-symbols:door-front-outline-rounded.svg?color=%23f87171";

    export let state = -1; // 0 = closed, 1 = open, -1 = error
    let bg_color, text_color, status_text;
    let doorOverride = false;

    $: if (state == 0) {
        bg_color = "bg-gray-400/25";
        text_color = "text-gray-100";
        status_text = "Closed";
    } else if (state == 1) {
        bg_color = "bg-gray-400/25";
        text_color = "text-gray-100";
        status_text = "Opened";
    }  else {
        bg_color = "bg-red-400/25";
        text_color = "text-red-100";
        status_text = "Error, refreshing...";
    }

    async function getDoor() {
        let response = fetch(`api/door`);
        if (!response.ok) {
            return -1;
        }

        let data = await response.json();

        if (data.error == true) {
            return -1;
        }

        if (data.state == 1 || data.state == 0) {
            return state;
        } else {
            return -1;
        }
    }


    if (browser) {
        setInterval(() => {
            state = getDoor();
            if (!doorOverride && state != -1) {
                changeLights(state);
            }
        }, 500);
    }

</script>

<div class="px-10 py-4 flex {bg_color}">
    <div class="px-6 flex items-center">
        <div>
            {#if state == 1}
                <img src={iconOn} alt="{name} On" class="w-16 h-16" />
            {:else if state == 0}
                <img src={iconOff} alt="{name} Off" class="w-16 h-16" />
            {:else}
                <img src="{iconError}" alt="{name} Error" class="w-16 h-16" />
            {/if}
        </div>
        <div class="text-left {text_color} ml-6">
            <p class="text-2xl font-medium ">{status_text}</p>
        </div>
    </div>
    <div class="ml-auto flex items-center mx-6 {text_color}">
        <input type=checkbox id="door-override" class="hidden" bind:checked={doorOverride}>
        <label for="door-override">
            <div class="flex items-center">
                <h class="text-xl">Override:</h>
                <div class="relative ml-3">
                    <div class="w-16 h-8 {doorOverride ? 'bg-red-500' : 'bg-gray-400'} rounded-full shadow-inner"></div>
                    <div class="absolute w-8 h-8 bg-gray-100 rounded-full shadow inset-y-0 {doorOverride ? 'right-0' : 'left-0'}"></div>
                </div>
            </div>
        </label>
        
        
    </div>  
</div>