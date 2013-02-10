/*
 * HTML5Video
 * a jQuery plugin to easily control & customize your HTML5 video player
 * version: 1.0   
 * Author: zied.hosni.mail@gmail.com 
 * 2013 © html5-ninja.com
 * 2013-02-10
 */
(function( $ ){
   
    var methods = {
        init : function( options ) { 
            return this.each(function(){
     
                var settings = $.extend( {
                    'controls'  : false,
                    'autoplay' : false,
                    'playSelector' : null,
                    'pauseSelector' : null,
                    'stopSelector' : null,
                    'fullSelector' : null,
                    'timerSelector': null,
                    'durationSelector' : null,
                    'barSelector' : null,
                    'volume':0.5
                }, options);
                                            
                // video target           
                var video = document.getElementById($(this)[0].id);
                var timer;
                video.volume = settings.volume;
                video.addEventListener("loadeddata", function(){
                    if (video.readyState) {                              
                        // show controls
                        if (settings.controls){
                            video.setAttribute("controls","controls");
                        }

                        // autoplay
                        if (settings.autoplay){
                            video.setAttribute("autoplay","autoplay");
                        }
        
                        // play control 
                        if (settings.playSelector){
                            settings.playSelector.click(function(){
                                video.play();
                                return false;
                            });
                        }
        
                        // pause control 
                        if (settings.pauseSelector){
                            settings.pauseSelector.click(function(){
                                video.pause();
                                return false;
                            });
                        }

                        // stop control 
                        if (settings.stopSelector){
                            settings.stopSelector.click(function(){
                                video.currentTime = 0;
                                video.pause();
                                return false;
                            });
                        }

                        // fullscreen control 
                        if(settings.fullSelector) {
                            settings.fullSelector.click(function(){
                                var el = video , rfs = el.requestFullScreen|| el.webkitRequestFullScreen || el.mozRequestFullScreen || alert("your browser doesn't support Fullscreen");
                                rfs.call(el);
                                return false;
                            }); 
                        }
                        
                        // timer
                        if(settings.timerSelector){
      
                            settings.timerSelector.html('0:00');
                            video.addEventListener('play',function(){
                                timer = setInterval(function(){
                                    settings.timerSelector.html(secondsToHms(video.currentTime));
                                },10);
                            })
                        }
                        
                        // duration 
                        if(settings.durationSelector){
                            settings.durationSelector.html(secondsToHms(video.duration));
                        }
                        
                        // progress bar 
                        if(settings.barSelector){
                            settings.barSelector.html('<div class="progressbar" style="height:6px; background:#000"></div>');
                            timer = setInterval(function(){
                                settings.barSelector.find('.progressbar').css('width',percent(video.currentTime,video.duration)+'%')
                            },10);
                        }
                         
                         
                        video.addEventListener('pause',function(){
                            clearInterval(timer);
                        })
                    }
                });
            });
            
            function percent(timer,duration){
                return timer/duration*100;
            }
            
            function secondsToHms(d) {
                d = Number(d);
                var h = Math.floor(d / 3600);
                var m = Math.floor(d % 3600 / 60);
                var s = Math.floor(d % 3600 % 60);
                return ((h > 0 ? h + ":" : "") + (m > 0 ? (h > 0 && m < 10 ? "0" : "") + m + ":" : "0:") + (s < 10 ? "0" : "") + s);
            }
        },
        gotoAndPlay : function(time) {
            return this.each(function(){
                var video = document.getElementById($(this)[0].id);   
                
                try
                {
                    video.currentTime = time;
                    video.play();
                }
                catch(err)
                {
                    video.addEventListener("loadeddata", function(){
                        if (video.readyState) {
                            video.currentTime = time;
                            video.play(); 
                        }
                    });
                }
                
            })
        },
        gotoAndStop : function(time) {
            return this.each(function(){
                var video = document.getElementById($(this)[0].id);                    
                try
                {
                    video.currentTime = time;
                    video.pause();
                }
                catch(err)
                {
                    video.addEventListener("loadeddata", function(){
                        if (video.readyState) {
                            video.currentTime = time;
                            video.pause(); 
                        }
                    });
                }
                
            })
        },
        setVolume : function(value){
            return this.each(function(){
                var video = document.getElementById($(this)[0].id); 
                video.volume= value;
            });
        }
    };
    
    $.fn.html5video = function(method) {  
        // Method calling logic
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist' );
        }  
    };
       
})( jQuery );