noseX = 0
noseY = 0
difference = 0
rwX = 0
lwX = 0
//no Y position required because vertical position is not changing
function setup() {
  canvas = createCanvas(400, 350)
  canvas.position(800, 280)

  video = createCapture(VIDEO)
  video.position(300, 200)
  video.size(400, 500)
  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, 400, 320)
  pop()
  poseNet = ml5.poseNet(video, modelLoaded)
  poseNet.on("pose", gotPoses)
}

function modelLoaded() {
  console.log("Model has loaded")
}
//results is an array because stores more than one value
function gotPoses(results) {
  if (results.length > 0) {
    console.log(results)
    noseX = results[0].pose.nose.x;
    noseY = results[0].pose.nose.y;
    lwX = results[0].pose.leftWrist.x;
    rwX = results[0].pose.rightWrist.x;
    difference= floor(lwX-rwX)
  }
}
function draw(){
  background('#D6A2DB')
  fill('navy')
  stroke('yellow')
  circle(noseX, noseY, difference)
  document.getElementById("radius").innerHTML= difference+"px"
}