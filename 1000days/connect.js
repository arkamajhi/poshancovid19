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
}

function OpenCreateRoom()//For server
{
  $("#CreateRoomModal").modal("show");
  myref.update({Source:1});
}

function OpenConnectRoom()//For client Side
{
  $("#ConnectRoomModal").modal("show");
  myref.update({Source:0});
  firebase.database().ref().on('value',SearchServers,ErrorData);
}

function SearchServers(data)//For client Side
{
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
  reqref=firebase.database().ref(Number)
  reqref.update({RequestNumber:number, RequestName:name, ConnectName:name});
  request.push(Number); //Add the server number to the array of requests
  //console.log(request);
   // There is a probability that this will be connected
  connectref=firebase.database().ref(Number);
}

function ConnectRoom(Number)//Server Side. Update server and client
{
  myref.update({ConnectNumber:Number, Searching:0, Connected:1, question_counter:0});
  connectref=firebase.database().ref(Number);
  connectref.update({ConnectNumber:number, ConnectName:name, Searching:0, Connected:1, question_counter:0});
  $('#CreateRoomModal').modal('hide');
}
function LeaveRoom()
{
  myref.update({RequestNumber:0, RequestName:"", ConnectName:""});
}
function ErrorData(err)
{
  console.log("Error");
  console.log(err);
}

//****************This acts both on server and client side************************
