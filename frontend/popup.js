let ipViewer = document.getElementById("ip-viewer");
let locViewer = document.getElementById("location-viewer");
chrome.tabs.query({active:true, currentWindow:true}, function(activeTab){
    if(activeTab){
        let tabURL = activeTab[0].url;
        getIp(tabURL)
        .then(function(ip){
            ipViewer.innerHTML = ip;
            return getLocation(ip)
        })
        .then(function(location){
            locViewer.innerHTML = location;
        })
    }else{
        console.log("no tab")
    }
})