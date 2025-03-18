function getIp(){
    let hostName = location.host;
    const apiUrl = "https://dns.google/resolve?name=" + hostName;
    return new Promise((resolve,reject) => {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if(xhttp.readyState === xhttp.DONE){
                if(xhttp.status === 200){
                    const ip = JSON.parse(xhttp.response).Answer[0].data;
                    resolve(ip);
                }else{
                    reject("could not retrieve")
                }
            }
        }
        xhttp.open("GET",apiUrl, true);
        xhttp.send();
    })
}

function getLocation(ip){
    const apiURL = "https://api.iplocation.net/?cmd=ip-country&ip=" + ip;
    return new Promise((resolve,reject) => {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if(xhttp.readyState === xhttp.DONE){
                if(xhttp.status === 200){
                    const data = JSON.parse(this.response)["country_name"];
                    resolve(data);
                }
            }
        }
        xhttp.open("GET", apiURL , true);
        xhttp.send();
    })
}

function getServerInfo() {
    return getIp()
        .then((ip) => getLocation(ip).then((location) => [ip, location]))
        .catch((error) => {
            console.error("Could not fetch the remote server information.\n" + error);
        });
}
