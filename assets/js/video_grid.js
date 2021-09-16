var roomId = document.getElementById('user_id').innerText;
var caller_id = document.getElementById('caller_id').innerText;
alert("room id " + roomId + "  caller id  " + caller_id);


var video_grid = document.getElementById('video_grid');

const peer = new Peer(roomId, {
    host: "/",
    port: 4001
})

var mystream;
var navigator = (navigator.mediaDevices.getUserMedia || navigator.webKitGetUserMedia || navigator.mozGetUserMedia)

peer.on('open', (roomId) => {
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
    }).then((stream) => {

        mystream = stream;
        const video = document.createElement('video');
        video.setAttribute('height', '500px');
        video.setAttribute('width', '1000px');
        let user_info = document.createElement('div');
        user_info.classList.add('rows');
        const settings = `  <div class="col-md-4 col-sm-4 col-xl col-12 bg"   >
   <i class="fas fa-volume-up fa-2x"></i> 
     </div>

<div class="col-md-4 col-sm-4 col-xl col-12 bg" >
 <i class="fas fa-video fa-2x "></i>
     </div>

     <div class="col-md-4 col-sm-4 col-xl col-12 bg" >
 <i class="fas fa-phone-slash fa-2x"></i>
     </div>`;
        user_info.insertAdjacentHTML('afterbegin', settings);
        if ('srcObject' in video) {
            video.srcObject = stream;
            video_grid.insertAdjacentElement('afterbegin', video);
            video_grid.insertAdjacentElement('beforeend', user_info);
            video.play();
        } else {
            video.src = URl.createObjectURL(stream);
        }
    }).catch(err => {
        alert(err)
    })
})


if (caller_id) {
    peer.call(caller_id, mystream);

    peer.on("call", (call) => {
        console.log("call received");
    })

}