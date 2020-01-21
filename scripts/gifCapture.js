const captureContainer = document.getElementById("capture_container");
const captureTimer = document.getElementById("capture_timer");
// const image = document.getElementById("preview_canvas");
const startBtn = document.getElementById("capture_start");
const stopBtn = document.getElementById("capture_stop");

var image = document.querySelector("#preview_canvas");

function captureCamera(callback) {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(function(camera) {
      callback(camera);
    })
    .catch(function(error) {
      alert("Unable to capture your camera. Please check console logs.");
      console.error(error);
    });
}

function stopRecordingCallback() {
  document.querySelector("#capture_timer").innerHTML =
    "Gif recording stopped: " + bytesToSize(recorder.getBlob().size);
  image.src = URL.createObjectURL(recorder.getBlob());
  recorder.camera.stop();
  recorder.destroy();
  recorder = null;
}

var recorder; // globally accessible

document.getElementById("capture_start").onclick = function() {
  this.disabled = true;
  captureCamera(function(camera) {
    document.querySelector("#capture_timer").innerHTML =
      "Waiting for Gif Recorder to start...";
    recorder = RecordRTC(camera, {
      type: "gif",
      frameRate: 1,
      quality: 10,
      width: 360,
      hidden: 240,
      onGifRecordingStarted: function() {
        document.querySelector("#capture_timer").innerHTML =
          "Gif recording started.";
      },
      onGifPreview: function(gifURL) {
        image.src = gifURL;
      }
    });

    recorder.startRecording();

    // release camera on stopRecording
    recorder.camera = camera;

    document.getElementById("capture_stop").disabled = false;
  });
};

document.getElementById("capture_stop").onclick = function() {
  this.disabled = true;
  recorder.stopRecording(stopRecordingCallback);
};
