// FrameRateCounter.js

function FrameRateCounter(fps) {
    if (fps == undefined) {
        this.fps = 30
    } else {
        this.fps = fps
    }
    this.lastFrameCount = 0;
    var dateTemp = new Date();
    this.frameLast = dateTemp.getTime();
    delete dateTemp;
    this.frameCtr = 0;
    this.lastTime = dateTemp.getTime();
    this.step = 1;
}
FrameRateCounter.prototype.countFrames = function() {
    var dateTemp = new Date();
    var timeDifference = dateTemp.getTime() - this.lastTime;
    this.step = (timeDifference / 1000) * this.fps;
    this.lastTime = dateTemp.getTime();
    //console.log("step=",this.step)
    this.frameCtr++;
    if (dateTemp.getTime() >= this.frameLast + 1000) {
        ConsoleLog.log("frame event");
        this.lastFrameCount = this.frameCtr;
        this.frameCtr = 0;
        this.frameLast = dateTemp.getTime();
    }
    delete dateTemp;
}