function iframeLoaded(frameID) {
    var iFrameID = document.getElementById(frameID);
    if (iFrameID) {
        // here you can make the height, I delete it first, then I make it again
        iFrameID.height = "";
        iFrameID.height = window.innerHeight + "px";

        iFrameID.width = "";
        iFrameID.width = window.innerWidth / 2 + "px";
    }
}

function resizeChats() {
    iframeLoaded('twitchChat');
    iframeLoaded('mixerChat');
}

function loadChannels() {
    var twitchName = document.getElementById("twitchName").value.trim();
    var mixerName = document.getElementById("mixerName").value.trim();

    if (twitchName == "" || mixerName == "") {
        alert("Invalid username");
        return;
    }

    localStorage.chats = JSON.stringify({"twitch": twitchName, "mixer": mixerName});

    var twitchChat = document.createElement("iframe");
    twitchChat.id = "twitchChat";
    twitchChat.scrolling = "yes";
    twitchChat.frameBorder = "0";
    twitchChat.src = "https://www.twitch.tv/embed/"+ twitchName + "/chat";

    var mixerChat = document.createElement("iframe");
    mixerChat.id = "mixerChat";
    mixerChat.scrolling = "yes";
    mixerChat.frameBorder = "0";
    mixerChat.src = "https://mixer.com/embed/chat/" + mixerName;

    var initNode = document.getElementById("init");
    initNode.parentElement.removeChild(initNode);
    document.body.appendChild(twitchChat);
    document.body.appendChild(mixerChat);

    window.onresize = resizeChats;
    resizeChats();
}

function init() {
    if(localStorage.chats) {
        var chats = JSON.parse(localStorage.chats);
        document.getElementById("twitchName").value = chats.twitch;
        document.getElementById("mixerName").value = chats.mixer;
    }
}

init();
