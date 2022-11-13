const HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + process.env.HOMEASSIST_TOKEN
}

export async function getState(id) {
    let resp = await fetch(`${process.env.HOMEASSIST_URL}/api/states/${id}`, {methos: 'GET', headers: HEADERS});
    let data = await resp.json();

    if (!resp.ok) {
        throw new Error(`Error trying to fetch state for ${id}: ${data.message}`);
    }

    return data.state;
}

export async function setState (id, state, domain = 'light') {

    if (state != "on" && state != "off") {
        throw new Error(`Invalid state for ${id}: ${state}`);
    }
    
    let resp = await fetch(`${process.env.HOMEASSIST_URL}/api/services/${domain}/${state == 'on' ? 'turn_on' : 'turn_off'}`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({
            entity_id: id
        })
    });

    let data = await resp.json();
    if (!resp.ok) {
        throw new Error(`Error trying to set state for ${id}: ${data.message}`);
    }
    
}