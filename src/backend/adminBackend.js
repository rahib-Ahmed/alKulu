async function fetchs(endpoint, req) {
    var end;
    await fetch(`http://localhost:3001/${endpoint}`, req)
    .then(async (result) => end = result)
    return end
}

export async function fetchAdmins(obj, type ) {

    var params = new URLSearchParams();
    params.append("email", obj.email);
    params.append("password", obj.password);
    params.append("name", obj.name);
    var header = new Headers()
    header.append("Content-Type", "application/x-www-form-urlencoded")
    
    const req = {
        method: 'POST',
        header: header,
        body: params
    }
    
    if(type === 0) {
        var x = await fetchs('users/loginUser', req)
        return x.json()
    }
    else if(type === 1) {
        var x = await fetchs('users/signup', req)
        return x.json()
    }

}
