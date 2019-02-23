const URLS = {
    videoStarted: "http://www.mocky.io/v2/5be098b232000072006496f5",
    videoEnded: "http://www.mocky.io/v2/5be098d03200004d006496f6",
    androidUrl: "https://play.google.com/store/apps/details?id=com.pnixgames.minigolfking&hl=en",
    iOSUrl: "https://itunes.apple.com/us/app/mini-golf-king-multiplayer/id1262262200?mt=8"
}

const HTMLIDS = {
    botton1: "btn-1",
    botton2: "btn-2",    
}

const isMobile = {
    Android: () => navigator.userAgent.match(/Android/i),
    iOS: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),
    other: () => !isMobile.Android() && !isMobile.iOS()
};

const getInteractiveVideo = () => {
    let button1Presented;
    let button2Presented;
    const video = document.getElementById("video");

    const fireTrackingPixel = (url) => {
        const pixel = document.createElement("IMG");
        pixel.setAttribute("src", url);
        pixel.setAttribute("height", "1");
        pixel.setAttribute("width", "1");    
        document.body.appendChild(pixel);
    } 

    const addVideoButton = (buttonId, text, onClick) => {
        const container = document.getElementById("container");
        const button = document.createElement("BUTTON");
        button.setAttribute("id", buttonId);
        button.setAttribute("class", "button");
        onClick && button.addEventListener("click", onClick);
        button.innerHTML = text;
        container.appendChild(button);
    }

    const removeVideoButton = (buttonId) => {
        const button = document.getElementById(buttonId);
        button.parentNode.removeChild(button);
    }

    const addFirstButton = () => {
        video.pause();
        const onBottonClick = () => {
            removeVideoButton(HTMLIDS.botton1);
            video.play();
        }
        addVideoButton(HTMLIDS.botton1, "Tap To Hit", onBottonClick);
        setTimeout(() => {
            const button1 = document.getElementById(HTMLIDS.botton1);
            if (button1) {
                video.currentTime = 13;
                removeVideoButton(HTMLIDS.botton1);
                video.play();
            }    
        }, 10000);
    }

    const openInNewTab = (url) => {
        const win = window.open(url, '_blank');
        win.focus();
    }

    const addSecondButton = () => {
        const onBottonClick = () => {
            if (isMobile.Android()) {
                openInNewTab(URLS.androidUrl);
            } else if (isMobile.Android()) {
                openInNewTab(URLS.iOSUrl);
            } else {
                console.log("This device is not Android or iOS");
            }
        }
        addVideoButton(HTMLIDS.button2, "Download now", onBottonClick);
    }

    const onVideoPlay = () => {
        if (video.hasAttribute("controls")) {
            video.removeAttribute("controls");
        }   
        const { currentTime } = video;
        if (!currentTime) {
            fireTrackingPixel(URLS.videoStarted);
        }
    }

    const onVideoEnded = () => {
        fireTrackingPixel(URLS.videoEnded)
    } 

    const onTimeUpdate = () => {
        const { currentTime } = video;
        if (currentTime >= 3 && !button1Presented) {
            button1Presented = true;
            addFirstButton();
        }
        if (currentTime >= 13 && !button2Presented) {
            button2Presented = true;
            addSecondButton();
        }
    }

    const run = () => {
        video.addEventListener("play", onVideoPlay);
        video.addEventListener("ended", onVideoEnded);
        video.addEventListener("timeupdate", onTimeUpdate);
    }

    return {
        run
    }
}

const interactiveVideo = getInteractiveVideo();
interactiveVideo.run();
