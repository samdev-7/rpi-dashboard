import { Gpio } from 'onoff';

new Gpio(20, 'out');

const button = new Gpio(21, 'in', 'both');

export function watchButton(callback) {
    button.watch((err, value) => {    
        callback(err, value);
    });
}

