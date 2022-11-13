import * as light from '$lib/api/light.js';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
    let id = url.searchParams.get("id");
    
    if (id == null) {
        return json({
            error: true,
            message: "No id provided."
        })
    }

    let state;

    try {
        state = await light.getState(id);
    } catch (e) {
        // Return error
        return json({
            error: true,
            message: e.message,
            id: id,
            state: null
        })
    } 

    return json({
        error: false,
        id: id,
        state: state
    })
}

export async function POST({ request }) {
    let body = await request.json();

    if (body.id == null) {
        return json({
            error: true,
            message: "No id provided."
        })
    }

    if (body.state == null) {
        return json({
            error: true,
            message: "No state provided."
        });
    }

    if (body.domain == null) {
        body.domain = "light";
    }

    let resp;

    try {
        resp = await light.setState(body.id, body.state, body.domain);
    } catch (e) {
        // Return error
        return json({
            error: true,
            message: e.message,
            id: body.id,
        })
    } 

    return json({
        error: false,
        id: body.id
    })
}