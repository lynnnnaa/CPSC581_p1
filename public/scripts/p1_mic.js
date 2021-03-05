var audio = {
  volume: null,
  volume2: null,
  freqBin: null
}

var tempVol = 10;
let CHANGE_PADDLE_COLOR = false;
let CHANGE_PADDLE_COLOR_2 = false;
let TEMP_CPC = false;

function init() {
    var audioContext = new(window.AudioContext || window.webkitAudioContext)();
    var microphone;

    var analyser = audioContext.createAnalyser();

    if (navigator.mediaDevices.getUserMedia) {
        console.log('getUserMedia supported.');
        var constraints = { audio: true }
        navigator.mediaDevices.getUserMedia(constraints)
            .then(function(stream) {
                microphone = audioContext.createMediaStreamSource(stream);
                microphone.connect(analyser);
                //analyser.connect(audioContext.destination);
                beginRecording();
            })
            .catch(function(err) {
                console.error('error: ' + err);
            })
    } else {
        console.error('getUserMedia unsupported by browser');
    }

    function beginRecording() {
        analyser.fftSize = 1024; // power of 2, between 32 and max unsigned integer
        var bufferLength = analyser.fftSize;

        var freqBinDataArray = new Uint8Array(bufferLength);

        var checkAudio = function() {
            analyser.getByteFrequencyData(freqBinDataArray);

            console.log('Volume: ' + getRMS(freqBinDataArray));
            console.log('Freq Bin: ' + getIndexOfMax(freqBinDataArray));

            audio.volume = getRMS(freqBinDataArray);
            audio.freqBin = getIndexOfMax(freqBinDataArray);

            if((audio.volume - tempVol) > 20){
              CHANGE_PADDLE_COLOR = true;
              // console.log("CHANGE_PADDLE_COLOR: TRUE");
              // console.log("*************VOLUME_DIFFERENCE: " + (audio.volume - tempVol));
            }else{
              CHANGE_PADDLE_COLOR = false;
            };

            if(CHANGE_PADDLE_COLOR !== TEMP_CPC){
              CHANGE_PADDLE_COLOR_2 = true;
            }else{
              CHANGE_PADDLE_COLOR_2 == false;
            };
            tempVol = getRMS(freqBinDataArray);
            TEMP_CPC = CHANGE_PADDLE_COLOR;

        }
        setInterval(checkAudio, 32);
    }
}

// get Volume
function getRMS(spectrum) {
    var rms = 0;
    for (var i = 0; i < spectrum.length; i++) {
        rms += spectrum[i] * spectrum[i];
    }
    rms /= spectrum.length;
    rms = Math.sqrt(rms);
    return rms;
}

// get domainant frequency been
function getIndexOfMax(array) {
    return array.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
}
