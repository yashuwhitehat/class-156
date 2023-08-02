AFRAME.registerComponent("game-play", {
  schema: {
    elementId: { type: "string", default: "#ring1" },    
  },
  update: function () {
    this.isCollided(this.data.elementId);
  },

  init: function () {
    var duration = 120;
    const timerEl = document.querySelector("#timer");
    this.startTimer(duration, timerEl);
  },

  startTimer: function (duration, timerEl) {
    var minutes;
    var seconds;

    var timer = setInterval(countDown, 1000);

    function countDown() {
      if (duration >= 0) {
        minutes = parseInt(duration / 60);// 80/60 = 1.33
        seconds = parseInt(duration % 60); //80%60 = 2 1.2

        if (minutes < 10) {
          minutes = "0" + minutes; //09
        }
        if (seconds < 10) {
          seconds = "0" + seconds; //05
        }

        timerEl.setAttribute("text", {
          value: minutes + ":" + seconds,
        });

        duration -= 1;
      } 
      else {
       
        clearInterval(timer);        
      }
    }
  },
  updateTargets:function(){
    const element = document.querySelector("#targets")
    var count=element.getAttribute("text").value
    let currentTarget= parseInt(count)
    currentTarget-=1
    element.setAttribute("text",{
      value:currentTarget
    })

  },

  updateScore: function(){
    const element=document.querySelector("#score")
    var count=element.getAttribute("text").value
    let currentScore= parseInt(count)
    currentScore+=50
    element.setAttribute("text",{
      value:currentScore
    })
  },
  isCollided: function (elemntId) {
    const element = document.querySelector(elemntId);
    element.addEventListener("collide", (e) => {
      if (elemntId.includes("#ring")) {
        element.setAttribute("visible",false)
        this.updateScore()
        this.updateTargets()
      } else {
        this.gameOver()
        
      }
    });
  },
  gameOver: function(){
    var planeEL =document.querySelector("#plane_model")
    var element=document.querySelector("#game_over_text")
    element.setAttribute("visible", true)
    planeEL.setAttribute("dynamic-body",{
      mass:1
    })
  }
  
});
