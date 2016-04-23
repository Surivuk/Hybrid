var compass = function()
{

    var self = this;
    var canvas = null;
    var ctx = null;
    var needle = null;
    var compassBody = null;
    var degrees = 0;
    var IntervalID = {};

    var CompassWatchID = {};

    var factorBW = 1;
    var factorBH = 1;
    var factorNW = 1;
    var factorNH = 1;
    this.clearCanvas = function(x,y)
    {
        ctx.clearRect(0,0,x,y);
    }
    this.draw = function() {
      var width = compassBody.width;
      var height = compassBody.height
      self.clearCanvas(width,height);

      // Draw the compass onto the canvas
      ctx.drawImage(compassBody, 0, 0);

      // Save the current drawing state
      ctx.save();

      // Now move across and down half the
      ctx.translate(100, 110);

      // Rotate around this point
      ctx.rotate(degrees * (Math.PI / 180));

      // Draw the image back and up
      ctx.drawImage(needle, -needle.width/2, -needle.height/2);

      // Restore the previous drawing state
      ctx.restore();

      // Increment the angle of the needle by 5 degrees
      //degrees += 5;
}
    this.show = function(jqueryElement)
    {
       jqueryElement.load('html/compass.html',function(){

          $("#closeCompass").click(function(){
            self.stopCompass();
          });
          self.compassInit();
          //IntervalID = setInterval(function(){ self.draw(); }, 100);
          var options = { frequency: 500 };  // Update every 3 seconds
          CompassWatchID = navigator.compass.watchHeading(self.onSuccess, self.onError, options);
       });
    }

    this.compassInit = function()
    {

        canvas = document.getElementById("canvas");
        ctx = canvas.getContext("2d");
        compassBody = new Image();
        compassBody.src = 'img/compass.png'//document.getElementById("compassBody");
        var bodyWidth = compassBody.width;
        var bodyHeight = compassBody.height;



        needle = new Image();//document.getElementById("compassNeedle");
        needle.src = 'img/needle.png';
        var needleWidth = needle.width;
        var needleHeight = needle.height;
/*
        var ratio = Math.min(200/bodyWidth,200/bodyHeight);
        bodyWidth = bodyWidth*ratio;
        bodyHeight = bodyHeight*ratio;

        canvas.width  = bodyWidth;
        canvas.height = bodyHeight;

        ratio = Math.min(200/needleWidth,200/needleHeight);
        needleWidth = needleWidth*ratio;
        needleHeight = needleHeight*ratio;*/
    }
    this.stopCompass = function()
    {
      navigator.compass.clearWatch(CompassWatchID);
    }


    this.onSuccess = function(heading) {
      degrees = heading.magneticHeading;
      console.log("Compass updated,object:");
      console.log(heading);
      self.draw();

    };

    this.onError = function(compassError) {
        alert('Compass error: ' + compassError.code);
    };

    function rotate(degrees,jqueryElement){
    jqueryElement.css({
    "webkitTransform":"rotate("+degrees+"deg)",
    "MozTransform":"rotate("+degrees+"deg)",
    "msTransform":"rotate("+degrees+"deg)",
    "OTransform":"rotate("+degrees+"deg)",
    "transform":"rotate("+degrees+"deg)"
  });
  }
    function scale(x,y,jqueryElement){
    jqueryElement.css({
    "webkitTransform":"scale("+x+","+y+")",
    "MozTransform":"scale("+x+","+y+")",
    "msTransform":"scale("+x+","+y+")",
    "OTransform":"scale("+x+","+y+")",
    "transform":"scale("+x+","+y+")"
  });
  }



}
