function WebSocketTest()
         {
			document.getElementById("LiveStock").style.background = "transparent";
            if ("WebSocket" in window)
            /* Connecting the Socket */
             {              
               var ws = new WebSocket("ws://stocks.mnet.website");
				
				
               ws.onmessage = function (evt) 
               { 	
                  var tobegin = evt.data;     
					JSON.parse(tobegin).forEach(function(str){				
						var Name = str[0];
						var Price = str[1];
						var Change; 
						var arrow = "";
						if($($('#LiveStock tr > td:contains("' +Name+ '") + td:contains("")')[0]).html() !=null){
							Change =  Price - $($('#LiveStock tr > td:contains("' + Name  + '") + td:contains("")')[0]).html();
							if (Change > 0){
								arrow = "green";
							}else{
								arrow = "red";
							}
						}else{
							Change= 0;
							arrow = "new";
						}
						var dt = new Date();
						var monthNames = [
						"Jan", "Feb", "March","April", "May", "June", "July","Aug", "Sept", "Oct","Nove", "Dec"
						                 ];
                        
						var day = dt.getDate();
						var monthIndex = dt.getMonth();
						var year = dt.getFullYear();
						var time = day + ' ' + monthNames[monthIndex] + ' ' + year + " " + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();	
						var arrowString = "<img class='arrow' src='" + arrow + ".ico'/>"
						$('#LiveStock tr:first').after('<tr><td>'+ Name + '</td><td>'+Price+ '</td><td>' + arrowString + ' &nbsp; <span class='+ arrow +'>(' + Change +')</span></td><td>'+ time +'</td></tr>').animate({padding: '0px'}, {duration: 200});;
					});									  	 
               };							
               ws.onclose = function()
               { 
                  console.log("End"); 
               };
            }
            
            else
            {
               alert("Try with different Browser");
            }
         }
		 
      jQuery(document).ready(function() {
			WebSocketTest();
			$(".Preloader").fadeOut( 3500, function() {
						$(".Begin").fadeIn( 1000);					
					});
					
	  });
