import { python } from 'pythonia';
import { json } from '@sveltejs/kit';


const gpio = await python('RPi.GPIO');

await gpio.setmode(await gpio.BCM);;

await gpio.setup$(20, await gpio.OUT, {initial: await gpio.HIGH});
await gpio.setup(21, await gpio.IN);

export async function GET({ url }) {

    let state = await gpio.input(21);

    return json({
        error: false,
        state: state
    });
}