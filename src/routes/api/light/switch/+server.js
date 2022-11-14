import gpio from 'rpi-gpio';

gpio.setup(21, gpio.DIR_IN);
gpio.setup(20, gpio.DIR_OUT, (err) => {
    gpio.write(20, true);
});

export async function GET({ url }) {
    let state = gpio.read(2, (err, value) => {
        return json({
            error: false,
            state: value
        });
    });
}
