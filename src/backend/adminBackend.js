import Camera from '../images/camera.svg';
import Settings from '../images/settings.svg';
import Listicon from '../images/list.svg';
import Fileadd from '../images/file-plus.svg';
import QRSCAN from '../images/qr-scan.svg'

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

    if(type===2 || obj.type === "update"){
    var formData = new FormData()
    if(obj.file === undefined || obj.file.length === 0) {
      
    } else {
    for (let i = 0; i < obj.file.length; i++) {
        formData.append(`imageData`, obj.file[i])
    }}

    formData.append("type", obj.type)
    formData.append("title", obj.data.Title)
    formData.append("author", obj.data.Author)
    formData.append("categories", obj.data.Categories)
    formData.append("coAuthor", obj.data.CoAuthor)
    formData.append("language", obj.data.Language)
    formData.append("pages", obj.data.Pages)
    formData.append("volume", obj.data.Volumes)
    formData.append("keywords", obj.data.Keywords)
    formData.append("imageName", "cover-" + Date.now())
    formData.append("bookid", obj.bookid)
    formData.append("deleteid", obj.deleteid)
    formData.append("publisher", obj.data.Publisher)
}

    var params = new URLSearchParams();
    params.append("email", obj.email);
    params.append("password", obj.password);
    params.append("name", obj.name);
    params.append("bookid", obj.id)
    params.append("deleteid", obj.deleteid)
    params.append("type", obj.type)
    params.append("token", obj)
    params.append("qrbookid", obj)
    params.append("specbookid", obj)
    params.append("specbookid", obj)
    params.append("issueid", obj.issueid)
    params.append("isadmin", obj.admin)
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
    var x;
    if(type === 0) {
        x = await fetchs('users/loginUser', req)
        
    }
    else if(type === 1) {
        x = await fetchs('users/signup', req)
        
    }
    else if(type === 2) {
        x = await fetchs('book/uploadmulter', req1)
        
    }  else if(type === 3) {
         x = await fetchs('book/getQR', req)
        
    } else if(type === 4) {
         x = await fetchs('book/getBookdata', req)
        
    } else if(type === 5 && obj.type === "update") {
         x =  await fetchs('book/action', req1)
        
    }else if(type === 5 ) {
        x =  await fetchs('book/action', req)
       
   } 
    else if(type === 6) {
         x = await fetchs('users/checkAdmin', req2)
        
    } else if(type === 7) {
         x = await fetchs('users/refresh', req)
        
    } else if(type === 8) {
         x = await fetchs('book/getRegistration', req)     
    } else if(type === 9) {
        x = await fetchs('book/getspecbook', req)     
   } else if(type === 10) {
    x = await fetchs('book/issueBook', req)     
} 
    return x.json()

}

export function images() {
    var images = [ Fileadd, Camera, Listicon, Settings, QRSCAN]
    return images
}
export function title() {
    var title = ["Add Book", "Get QR", "Content", "Manager", "Scanner"]
    return title
}
export function add1() {
    var add1 = ["Title", "Author", "CoAuthor", "Pages", "Volumes", "Publisher", "Language", "Keywords"]
    return add1
}
export function plac1() {
    var plac1 = ["Book Title", "Name of the Author", "Name of the Co Author", "Pages", "Volume", "Name of the Publisher", "Language", "Keywords"]
    return plac1
}