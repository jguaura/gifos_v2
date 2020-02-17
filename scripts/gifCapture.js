// const captureContainer = document.getElementById("capture_container");
const confirmBtnsContainer = document.getElementById("confirm_btns__container");
const captureTimer = document.getElementById("capture_timer");
// const image = document.getElementById("preview_canvas");
const startBtn = document.getElementById("capture_start");
const stopBtn = document.getElementById("capture_stop");
const repeatBtn = document.getElementById("capture_repeat");
const uploadBtn = document.getElementById('upload_btn')
const gifPreviewContainer = document.getElementById('gif_preview__container')
const uploadURL = `https://upload.giphy.com/v1/gifs?api_key=${API_KEY}`
const previewer = document.querySelector('.previewer')
const loader = `./assets/loader.png`

let storage = [1,2,3]

localStorage.setItem('storage', JSON.stringify(storage))
storage = JSON.parse(localStorage.getItem('storage'))
console.log(storage)
console.log('typeof', typeof storage)

var image = document.querySelector("#preview_canvas");

var blobHolder;
let uploadData = new FormData()
// innerContainer.innerHTML = ""
// startBtn.classList.add("d-none");
// stopBtn.classList.add("d-none");

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
  blobHolder = recorder.getBlob()
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

uploadBtn.addEventListener('click', e => {
  image.src = '';
  image.setAttribute('src', `${loader}`)
  uploader()
})

const uploader = () => {
  uploadData.append('file', blobHolder, 'asd.gif')
  fetch(`${uploadURL}`,
    { method: 'POST',
      body: uploadData,

    }
    )
    .then(response => response.json())
    .then(data => {
      const { data: gifData } = data;
      console.log(gifData.id)
      captureContainer.classList.add('d-none')
     
      gifPreviewContainer.classList.remove('d-none')
      misGifosSection.classList.remove('d-none')
      previewer.src = URL.createObjectURL(blobHolder)
    })
  }