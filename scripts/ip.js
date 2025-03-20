function getIp(webpageURL){
    const url = new URL(webpageURL); 
    const host = url.host;
    const apiUrl = "https://dns.google/resolve?name=" + host; //webpageURL should be without hypertext based info 
    return new Promise((resolve,reject) => {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if(xhttp.readyState === xhttp.DONE){
                if(xhttp.status === 200){
                    const response = JSON.parse(xhttp.response);
                    let status = response["Status"];
                    if(status === 0 && response.hasOwnProperty("Answer")){ //Means we got the data from the API
                        //Ip can have multiple IPs so take one => take the first one
                        let ip = response["Answer"][0]["data"];
                        //Make sure the IP is iPv4
                        const ipv4regexp = /^(\d{1,3}\.){3}\d{1,3}$/
                        if(ipv4regexp.test(ip)){
                            resolve(ip);
                        }else{
                            reject("not_a_valid_ipv4_address");
                        }
                    }
                    else{
                        reject("other_dns_status_code");
                    }
                }else{
                    reject("other_response_code")
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
