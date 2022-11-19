import { python } from 'pythonia';
import { json } from '@sveltejs/kit';

if (!process.env.NON_RPI) {
    const gpio = await python('RPi.GPIO');

    await gpio.setmode(await gpio.BCM);;

    await gpio.setup$(20, await gpio.OUT, {initial: await gpio.HIGH});
    await gpio.setup(21, await gpio.IN);
}

async function GET({ url }) {

    if (!process.env.NON_RPI) {
        let state = await gpio.input(21);

        return json({
            error: false,
            state: state
        });
    } else {
        return json({
            error: true,
            state: false,
            message: 'Not running on Raspberry Pi'
        });
    };
}


export { GET };