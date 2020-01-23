const captureContainer = document.getElementById("capture_container");
const confirmBtnsContainer = document.getElementById("confirm_btns__container");
const captureTimer = document.getElementById("capture_timer");
// const image = document.getElementById("preview_canvas");
const startBtn = document.getElementById("capture_start");
const stopBtn = document.getElementById("capture_stop");
const repeatBtn = document.getElementById("capture_repeat");

var image = document.querySelector("#preview_canvas");

startBtn.classList.add("d-none");
stopBtn.classList.add("d-none");

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

startBtn.onclick = function() {
  startBtn.classList.add("d-none");
  stopBtn.classList.remove("d-none");
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
  });
};

stopBtn.onclick = function() {
  stopBtn.classList.add("d-none");
  confirmBtnsContainer.classList.remove("d-none");
  recorder.stopRecording(stopRecordingCallback);
};

repeatBtn.addEventListener("click", e => {
  confirmBtnsContainer.classList.add("d-none");
  startBtn.classList.remove("d-none");
});
