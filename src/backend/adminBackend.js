async function fetchs(endpoint, req) {
    var end;
    // https://alkulu.herokuapp.com/
    // http://localhost:3001/
    await fetch(`http://localhost:3001/${endpoint}`, req)
    .then(async (result) => end = result)
    return end
}

export async function fetchAdmins(obj, type ) {
    var myHeader = new Headers()
    myHeader.append('authorization', `Bearer ${obj}`);

    if(type===2){
    var formData = new FormData()
    for (let i = 0; i < obj.file.length; i++) {
        formData.append(`imageData`, obj.file[i])
    }
    formData.append("title", obj.data.title)
    formData.append("author", obj.data.author)
    formData.append("categories", obj.data.Categories)
    formData.append("coAuthor", obj.data.coAuthor)
    formData.append("language", obj.data.language)
    formData.append("pages", obj.data.Pages)
    formData.append("volume", obj.data.Volumes)
    formData.append("keywords", obj.data.keywords)
    formData.append("imageName", "cover-" + Date.now())
    formData.append("bookid", obj.bookid)
    formData.append("publisher", obj.data.Publisher)
}
//    console.log(obj.email)
    var params = new URLSearchParams();
    params.append("email", obj.email);
    params.append("password", obj.password);
    params.append("name", obj.name);
    params.append("bookid", obj.id)
    params.append("deleteid", obj.deleteid)
    params.append("type", obj.type)
    params.append("token", obj)
    params.append("qrbookid", obj)
    var header = new Headers()
    header.append("Content-Type", "application/x-www-form-urlencoded")
    
    const req = {
        method: 'POST',
        header: header,
        body: params,
    }
    const req1 = {
        method: 'POST',
        header: header,
        body: formData,
    }
    const req2 = {
        method: 'POST',
        headers: myHeader,
        body: {}
    }
    
    if(type === 0) {
        var x = await fetchs('users/loginUser', req)
        return x.json()
    }
    else if(type === 1) {
        var x = await fetchs('users/signup', req)
        return x.json()
    }
    else if(type === 2) {
        var x = await fetchs('book/uploadmulter', req1)
        return x.json()
    }  else if(type === 3) {
        var x = await fetchs('book/getQR', req)
        return x.json()
    } else if(type === 4) {
        var x = await fetchs('book/getBookdata', req)
        return x.json()
    } else if(type === 5) {
        var x =  await fetchs('book/action', req)
        return x.json()
    } else if(type === 6) {
        var x = await fetchs('users/checkAdmin', req2)
        return x.json()
    } else if(type === 7) {
        var x = await fetchs('users/refresh', req)
        return x.json()
    } 

}
