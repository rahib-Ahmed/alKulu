async function fetchs(endpoint, req) {
    var end;
    await fetch(`http://localhost:3001/${endpoint}`, req)
    .then(async (result) => end = result)
    return end
}

export async function fetchAdmins(obj, type ) {
    console.log(obj.file[0])
    var formData = new FormData()
    for (let i = 0; i < obj.file.length; i++) {
        formData.append(`imageData`, obj.file[i])
    }
    console.log(obj.file)
    var params = new URLSearchParams();
    params.append("email", obj.email);
    params.append("password", obj.password);
    params.append("name", obj.name);

    formData.append("title", obj.data.title)
    formData.append("author", obj.data.author)
    formData.append("categories", obj.data.categories)
    formData.append("coAuthor", obj.data.coAuthor)
    formData.append("language", obj.data.language)
    formData.append("pages", obj.data.pages)
    formData.append("volume", obj.data.volume)
    formData.append("keywords", obj.data.keywords)
    
    formData.append("imageName", "cover-" + Date.now())
    formData.append("bookid", 9)

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
    }

}
