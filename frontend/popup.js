let ipViewer = document.querySelector(".ip-viewer-label");
let locViewer = document.querySelector(".ip-location-label");

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

document.getElementById("developer").addEventListener("click", function(){
    chrome.tabs.create({url:"https://github.com/Raffabello"})
})