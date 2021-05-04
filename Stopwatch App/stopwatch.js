$(function(){
   //variables
        var mode=false; //Application mode
        var timeCounter=0; //time counter
        var lapCounter=0; //lap counter
        var action; //variable for setInteval
        var lapNumber=0; //Number of Laps
        var timeMinutes, timeSeconds, timeCentiseconds, lapMinutes, lapSeconds, lapCentiseconds; // minutes, seconds, centiseconds for time and lap
    
    //On App load show start and lap buttons
        hideshowButtons("#startButton", "#lapButton");
    
    //click on the start button
        $("#startButton").click(function(){
           //mode on
            mode=true;
            //show stop and lap buttons
            hideshowButtons("#stopButton", "#lapButton");
            //start counter
            startAction();
        });
    
    //click on the stop button
        $("#stopButton").click(function(){
           //show resume and reset buttons
            hideshowButtons("#resumeButton", "#resetButton");
            //stop counter
            clearInterval(action);
        });
    
    //click on the resume button
        $("#resumeButton").click(function(){
           //show stop and lap buttons
            hideshowButtons("#stopButton", "#lapButton");
            //start counter
            startAction();
        });
    
    //click on reset button
        $("#resetButton").click(function(){
           location.reload(); 
        });
    
    //click on lapButton
        $("#lapButton").click(function(){
            //if mode is ON
            if(mode){
                //stop action
                clearInterval(action);
                //reset and print lap details
                lapCounter=0;
                addLap();
                //start action
                startAction();
            }
        });
    
    //functions
    
        //hideshowButtons function shows two buttons
        function hideshowButtons(x,y){
            $(".control").hide();
            $(x).show();
            $(y).show();
    }
    
    //start the counter
        function startAction(){
            action= setInterval(function(){
                timeCounter++;
                if(timeCounter == 100*60*100){
                    timeCounter = 0;
                }
                lapCounter++;
                if(lapCounter == 100*6000){
                    lapCounter = 0;
                }
                updateTime();
            },10)
        }
    
    //updateTime: converts counters to min, sec, centisec
        function updateTime(){
            //1min=60sec 1sec=100centisec => 1min=60*100centisec=6000centisec
            timeMinutes= Math.floor(timeCounter/6000);

            //1sec=100centisec
            timeSeconds=Math.floor((timeCounter%6000)/100);

            timeCentiseconds=((timeCounter%6000)%100);

            $("#timeminute").text(format(timeMinutes));
            $("#timesecond").text(format(timeSeconds));
            $("#timecentisecond").text(format(timeCentiseconds));


            //1min=60sec 1sec=100centisec 1min=60*100centisec 1min=6000centisec
            lapMinutes=Math.floor(lapCounter/6000);

            //1sec=100centisec
            lapSeconds=Math.floor((lapCounter%6000)/100);

            lapCentiseconds=Math.floor((lapCounter%6000)%100);

            $("#lapminute").text(format(lapMinutes));
            $("#lapsecond").text(format(lapSeconds));
            $("#lapcentisecond").text(format(lapCentiseconds));
        }
    
    //format number
        function format(number){
            if(number<10){
                return '0'+number;
            }
            else{
                return number;
            }
        }
    
    //addLap function: print lap details inside the lap box
        function addLap(){
            lapNumber++;
            var myLapDetails=
                '<div class="lap">'+
                    '<div class="laptimetitle">'+
                        'Lap' + lapNumber +
                    '</div>'+
                    '<div class="laptime">'+
                        '<span>'+format(lapMinutes) + '</span>'+ 
                        ':<span>'+format(lapSeconds) + '</span>'+ 
                        ':<span>'+format(lapCentiseconds) + '</span>'+
                    '</div>'+
                '</div>';
            $(myLapDetails).prependTo("#laps");
        }
});