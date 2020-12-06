var name,number,myref,connectref,reqref;
var request=[];

function save_name_number()//Save name and number in firebase
{
  name=document.getElementById('InputName').value;
  number=document.getElementById('InputNumber').value;
  //alert(name+","+number);
  $("#ConnectModal").modal("show");
  myref=firebase.database().ref(number);
  myref.update({Name:name, Number:number, Searching:1, Connected:0, RequestName:"", RequestNumber:0, ConnectNumber:0});
  console.log("Name and Number saved");
}

function OpenCreateRoom()//For server
{
  $("#CreateRoomModal").modal("show");
  myref.update({Source:1});
  console.log("Room Created");
}

function OpenConnectRoom()//For client Side
{
  $("#ConnectRoomModal").modal("show");
  myref.update({Source:0});
  firebase.database().ref().on('value',SearchServers,ErrorData);
  console.log("Open to Connect Room");
}

function SearchServers(data)//For client Side
{
  console.log("Started searching for servers");
  var PlayersObject=data.val();
  var Players=Object.keys(PlayersObject);
  //console.log(Players);
  var AvailablePlayers="";
  for(var i = 0; i<Players.length; i++)
  {
    LoopPlayer=PlayersObject[Players[i]];
    if(LoopPlayer.Source==1&&LoopPlayer.Searching==1&&LoopPlayer.Connected==0)
    {
      AvailablePlayers+='<br><button onclick="RequestRoom('+LoopPlayer.Number+')" type="button" class="btn btn-danger">'+LoopPlayer.Name+'</button><br>';
      //console.log(LoopPlayer.Number);
    }
  }
  $("#Players_Join_Buttons").html(AvailablePlayers);
}

function RequestRoom(Number)//Client side. Poke server to join
{
  console.log("Requested");
  reqref=firebase.database().ref(Number)
  reqref.update({RequestNumber:number, RequestName:name, ConnectName:name});
  request.push(Number); //Add the server number to the array of requests
  //console.log(request);
   // There is a probability that this will be connected
  connectref=firebase.database().ref(Number);
}

function ConnectRoom(Number)//Server Side. Update server and client
{
  console.log("Connected");
  myref.update({ConnectNumber:Number, Searching:0, Connected:1, question_counter:0});
  connectref=firebase.database().ref(Number);
  connectref.update({ConnectNumber:number, ConnectName:name, Searching:0, Connected:1, question_counter:0});
  $('#CreateRoomModal').modal('hide');
}
function LeaveRoom()
{
  console.log("Room left");
  myref.update({RequestNumber:0, RequestName:"", ConnectName:""});
}
function ErrorData(err)
{
  console.log("Error");
  console.log(err);
}


//****************This acts both on server and client side************************
firebase.database().ref().on('value',UpdatedSomething);
var count=0;
function UpdatedSomething()
{
  console.log("Something Updated");
  myref.on('value',function(P1snapshot)
  {
    console.log("Update On "+P1snapshot.val().Name+" side");
    $("#Player1Name").html(P1snapshot.val().Name);
    var connected=P1snapshot.val().Connected;
    var source=P1snapshot.val().Source;
    var question_counter=P1snapshot.val().question_counter;
    if(connected==1&&source==0&&count==0) //Only for client
    {
      console.log(P1snapshot.val().Name +" side connected. "+"Update On "+P1snapshot.val().Name+" side");
      myref.update({RequestNumber:0, RequestName:""});
      $("#Accept_Player").html("");
      //alert("Request Length : "+request.length);
      for(var i=0;i<request.length;i++)
      {
        firebase.database().ref(request[i]).update({RequestNumber:0, RequestName:""});
        console.log("made request null for "+i);
      }
      request=[]; // Clear the array of server requests
      $('#ConnectRoomModal').modal('hide');
      //initialize_score();
      //question_counter++;
      //myref.update({question_counter:1});
      //alert("Connected");
      count++;
      //alert("Count : "+count);
      console.log("Count : "+count)
    }
    if(connected==1&&source==0&&count==5) //Only for client
    {
      console.log("Score initialized")
      initialize_score();
    }

    var reqno=P1snapshot.val().RequestNumber;
    var reqname=P1snapshot.val().RequestName;

    if(reqno>0)
    {
      $("#Accept_Player").html("<br>"+reqname+" sent you a play request <br><br>");
      $("#Accept_Player").append('<button onclick="ConnectRoom('+reqno+')" type="button" class="btn btn-danger">Join</button> &nbsp;&nbsp;&nbsp;&nbsp;');
      $("#Accept_Player").append('<button onclick="LeaveRoom()" type="button" class="btn btn-danger">Leave</button>');
    }
    else
    {
        $("#Accept_Player").html("");
    }
  },ErrorData);

  connectref.on('value',function(P2snapshot)
  {
    console.log("Update On "+P2snapshot.val().Name+" side");
    var connected=P2snapshot.val().Connected;
    if(connected==1)
    {
      console.log(P2snapshot.val().Name+" side connected. "+"Update On "+P2snapshot.val().Name+" side");
      $("#Player2Name").html(P2snapshot.val().Name);
      //update_scoresP2(P2snapshot.val().hb,P2snapshot.val().wt,P2snapshot.val().mo,P2snapshot.val().hp);
    }
  },ErrorData);
}
