import { Gpio } from 'onoff';
import { json } from '@sveltejs/kit';

const power = new Gpio(20, 'out');
power.writeSync(1);

const button = new Gpio(21, 'in', 'both');

export function watchButton(callback) {
    button.watch((err, value) => {    
        callback(err, value);
    });
}

export async function GET({ url }) {
    let state = button.readSync();

    return json({
        error: false,
        state: state
    });
}
