// Params for login
let options = {
  uid: "",
  token: "",
};

// Your app ID
const appID = "6714b60932fb4ace8abedfb32cbf2bd0";
// Your token
options.token =
  "0066714b60932fb4ace8abedfb32cbf2bd0IAAvQbCn8Uc8IVJllPXEqgVqIRr0M+urrfLCJ12XCayJPaPg45sAAAAAEABpoAhfqcesYAEA6AOpx6xg";

const clientRTM = AgoraRTM.createInstance(appID);

clientRTM.on("MessageFromPeer", function (message, peerId) {
  console.log("Message from: " + peerId + " Message: " + message);
});
// Display connection state changes
clientRTM.on("ConnectionStateChanged", function (state, reason) {
  console.log("State changed To: " + state + " Reason: " + reason);
});

let channel = clientRTM.createChannel("testing");

channel.on("ChannelMessage", function (message, memberId) {
  console.log("Message received from: " + memberId + " Message: " + message);
});
// Display channel member stats
channel.on("MemberJoined", function (memberId) {
  console.log(memberId + " joined the channel");
});
// Display channel member stats
channel.on("MemberLeft", function (memberId) {
  console.log(memberId + " left the channel");
});

async function joinRTMChannel(uid) {
  console.log(uid);
  options.uid = uid.toString();
  await clientRTM.login(options);
  console.log("Client LOG IN with this ID");
  await channel.join().then(() => {
    console.log("You have successfully joined channel hjjjjjjjjjjjjjjjjjjjjjjjjjjj " + channel.channelId);
  });
}

async function sendMessage(peerMessage, peerId) {
  await clientRTM
    .sendMessageToPeer({ text: peerMessage }, "12345")
    .then((sendResult) => {
      console.log(sendResult);;
      if (sendResult.hasPeerReceived) {
        console.log(
          `Message has been received by: ${peerId} and Message is ${peerMessage}`
        );
      } else {
        console.log(`Message sent to 12345`);
      }
    });
    var localStream = AgoraRTC.createStream({
      streamID: 12345,
      audio: true,
      video: true,
      screen: false,
    });
    toggleBtn($("#mic-btn"));
    $("#mic-icon")
      .toggleClass("fa-microphone")
      .toggleClass("fa-microphone-slash"); // toggle the mic icon
    if ($("#mic-icon").hasClass("fa-microphone")) {
      localStream.unmuteAudio(); // enable the local mic
      toggleVisibility("#mute-overlay", false); // hide the muted mic icon
    } else {
      localStream.muteAudio(); // mute the local mic
      toggleVisibility("#mute-overlay", true); // show the muted mic icon
    }
}
