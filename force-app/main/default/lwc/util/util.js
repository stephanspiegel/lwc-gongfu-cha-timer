var formatTime = function(totalSeconds){
    let minutes = Math.floor(totalSeconds/60);
    let seconds = totalSeconds % 60; 
    if (minutes > 0){
        let displaySeconds = seconds < 10
            ? '0'+seconds
            : seconds;
        return minutes + ':' + displaySeconds;
    }
    return '' + seconds;
}

export {
    formatTime
}
