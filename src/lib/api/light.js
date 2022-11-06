import {assist} from '$lib/api/assistant.js';

export async function getState(name) {
    let resp = await assist("Is " + name + " on?")

    if (resp.match(/ (on|off)( |\.)/)[1] == "on") {
        return true;
    } else {
        return false;
    }
}

export async function setState (name, on) {
    let resp;
    if (on) {
        resp = await assist("Turn on " + name + ".");
    } else {
        resp = await assist("Turn off " + name + ".");
    }

    if (resp.match(/ (on|off)( |\.)/)[1] == "on") {
        if (on) {
            return true;
        } else {
            return false;
        }
    } else {
        if (on) {
            return false;
        } else {
            return true;
        }
    }
    
}