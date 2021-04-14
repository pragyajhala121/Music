song1 = "";
song2 = "";
song1_status = "";
song2_status = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
score_leftWrist = 0;
score_rightWrist = 0;
function preload(){
    song1 = loadSound("03. Bum Bum Bole.mp3");
    song2 = loadSound("03. Choti Si Aasha.mp3");
}
function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    
	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function draw(){
    image(video,0,0,600,500);
    fill("#ff0090");
	  stroke("#FF0000");
    if(score_leftWrist > 0.2)
	{
		circle(leftWristX,leftWristY,20);
        
		song1_status = song1.isPlaying();
			song2.stop();

		if(song1_status == false)
		{
			song1.play();
			document.getElementById("song").innerHTML = "Playing - Bum Bum Bole Song"
		}				
	}
	if(score_rightWrist > 0.2)
	{
		fill("#ff0090");
	  stroke("#FF0000");
		circle(rightWristX,rightWristY,20);
        
		song2_status = song2.isPlaying();
			song1.stop();

		if(song2_status == false)
		{
			song2.play();
			document.getElementById("song").innerHTML = "Playing - Choti Si Aasha"
		}				
	}
}
function modelLoaded(){
    console.log("Posenet is Inatalized");
}
function gotPoses(results)
{
  if(results.length > 0)
  {
	console.log(results);
  score_leftWrist = results[0].pose.keypoints[9].score;
  console.log("score is Left Wrist = " + score_leftWrist);
  score_leftWrist = results[0].pose.keypoints[10].score;
  console.log("score is Right Wrist = " + score_rightWrist);
	rightWristX = results[0].pose.rightWrist.x;
	rightWristY = results[0].pose.rightWrist.y;
	console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

	leftWristX = results[0].pose.leftWrist.x;
	leftWristY = results[0].pose.leftWrist.y;
	console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
		
  }
}