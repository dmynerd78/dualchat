function iframeLoaded(frameID) {
    // Resize iframe to fit half the screen
    var iFrameID = document.getElementById(frameID);
    if (iFrameID) {
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
    // Get input values
    var twitchName = document.getElementById("twitchName").value.trim();
    var mixerName = document.getElementById("mixerName").value.trim();

    // Validate input values
    if (twitchName == "" || mixerName == "") {
        alert("Invalid username");
        return;
    }

    // Save input values
    localStorage.chats = JSON.stringify({"twitch": twitchName, "mixer": mixerName});

    // Create iframes
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

    // Remove input node and append chat iframes
    var initNode = document.getElementById("init");
    initNode.parentElement.removeChild(initNode);
    document.body.appendChild(twitchChat);
    document.body.appendChild(mixerChat);

    // Resize to fit window screen
    window.onresize = resizeChats;
    resizeChats();
}

function init() {
    // Check for saved usernames
    if(localStorage.chats) {
        var chats = JSON.parse(localStorage.chats);
        document.getElementById("twitchName").value = chats.twitch;
        document.getElementById("mixerName").value = chats.mixer;
    }
}

init();
