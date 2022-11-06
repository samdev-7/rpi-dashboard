import * as light from '$lib/api/light.js';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
    let name = url.searchParams.get("name");
    
    if (name == null) {
        return json({
            error: true,
            message: "No name provided."
        })
    }

    let resp = await light.getState(name);

    return json({
        error: false,
        name: name,
        state: resp
    })
}

export async function POST({ request }) {
    let body = await request.json();

    if (body.name == null) {
        return json({
            error: true,
            message: "No name provided."
        })
    }

    if (!body.state == null) {
        return json({
            error: true,
            message: "No state provided."
        });
    }

    let resp = await light.setState(body.name, body.state);

    return json({
        error: !resp,
        name: body.name
    })
}