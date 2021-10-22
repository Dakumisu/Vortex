var SC = require('soundcloud');

class SoundCloudAPI {
   constructor(opt) {
      console.log(SC);

      // SC.initialize({
      //    client_id: '2-293039-1043300014-O2uaFfnFcwLJW',
      //    redirect_url: null
      // })

      // SC.connect('2-293039-1043300014-O2uaFfnFcwLJW', 'https://google.com')
      // .then(function(){
      //    return SC.put('/me/followings/183');
      // }).then(function(user){
      //    alert('You are now following ' + user.username);
      // }).catch(function(error){
      //    alert('Error: ' + error.message);
      // });

      // const recorder = new SC.Recorder();
      // recorder.start();

      // setTimeout(function(){
      //    recorder.stop();
      //    // recorder.play();
      //    // recorder.getWAV()
      //    // recorder.getBuffer()
      //    recorder.saveAs('sheeeeesh')
      //    console.log(recorder);
      // }, 5000);
   }
}

export default SoundCloudAPI