camera = document.getElementById("camera");
img = document.getElementById("img");
const capt = document.getElementById("capt");
switch_check = document.getElementById("switch");
victory = document.getElementById("victory");
thumbs_up = document.getElementById("thumbs_up");
amazing = document.getElementById("amazing");
v = document.getElementById("v");
t = document.getElementById("t");
a = document.getElementById("a");
var freezed = false;

function switchonoff(){
    if (switch_check.checked){
        camera.style.paddingTop = "";
        degrayscale();
        img.style.marginTop = "";
        Webcam.set({
          width:340,
          height:255,
          image_format:'png',
          png_quality:90
        });
        Webcam.unfreeze();
        capt.style.cursor = "pointer";
        freezed = false;
    }
    else{
        camera.style.paddingTop = "18px";
        grayscale();
        img.style.marginTop = "-18px";
        Webcam.set({
          width:340,
          height:255,
          image_format:'png',
          png_quality:90
        });
        Webcam.freeze();
        capt.style.cursor = "not-allowed";
        freezed = true;
    }
}

console.log("ml5 version: " + ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/j3VQn3830/model.json',modelLoaded);

function modelLoaded(){
  console.log('Model loaded!');
}

function capture(){
  if (freezed == false){
    Webcam.snap(function(data_uri){
      img.src = data_uri;
      classifier.classify(img, gotResult);
    });
  }
}

function gotResult(error, results){
  if (error){
      console.error(error);
  }
  else{
      console.log(results);
      check1();
      check2();
      check3();
  }

  function check1(){
    if (results[0].label == "Victory"){
      v.innerHTML = Math.round(results[0].confidence*100) +"%";
      victory.style.width = v.innerHTML;
    }
    else if (results[0].label == "Thumbs_Up"){
      t.innerHTML = Math.round(results[0].confidence*100) +"%";
      thumbs_up.style.width = t.innerHTML;
    }
    else if (results[0].label == "Amazing"){
      a.innerHTML = Math.round(results[0].confidence*100) +"%";
      amazing.style.width = a.innerHTML;
    }
  }
  
  function check2(){
    if (results[1].label == "Victory"){
      v.innerHTML = Math.round(results[1].confidence*100) +"%";
      victory.style.width = v.innerHTML;
    }
    else if (results[1].label == "Thumbs_Up"){
      t.innerHTML = Math.round(results[1].confidence*100) +"%";
      thumbs_up.style.width = t.innerHTML;
    }
    else if (results[1].label == "Amazing"){
      a.innerHTML = Math.round(results[1].confidence*100) +"%";
      amazing.style.width = a.innerHTML;
    }
  }
  
  function check3(){
    if (results[2].label == "Victory"){
      v.innerHTML = Math.round(results[2].confidence*100) +"%";
      victory.style.width = v.innerHTML;
    }
    else if (results[2].label == "Thumbs_Up"){
      t.innerHTML = Math.round(results[2].confidence*100) +"%";
      thumbs_up.style.width = t.innerHTML;
    }
    else if (results[2].label == "Amazing"){
      a.innerHTML = Math.round(results[2].confidence*100) +"%";
      amazing.style.width = a.innerHTML;
    }
  }
}

Webcam.set({
  width:340,
  height:290,
  image_format:'png',
  png_quality:90,
  flip_horiz:true
});

Webcam.attach(camera);

setTimeout(function() {
  switchonoff();
}, 150);

function grayscale(){
    camera.style.animation = "grayscale 0.5s";
    setTimeout(function (){
      camera.style.filter = "grayscale(90%)";
    }, 300);
}

function degrayscale(){
    camera.style.animation = "degrayscale 0.5s";
    setTimeout(function (){
      camera.style.filter = "grayscale(0%)";
    }, 300);
}

document.addEventListener('contextmenu', event => event.preventDefault());