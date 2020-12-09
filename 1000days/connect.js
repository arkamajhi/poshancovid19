var name,number,myref,connectref,reqref,P1ref,P2ref,Player_Number;
var request=[];

function save_name_number()//Save name and number in firebase
{
  name=document.getElementById('InputName').value;
  number=document.getElementById('InputNumber').value;
  //alert(name+","+number);
  $("#ConnectModal").modal("show");
  myref=firebase.database().ref(number);
}

function OpenCreateRoom()//For server
{
  $("#CreateRoomModal").modal("show");
  myref.update({P1_Name:name, P1_Number:number, Connected:0, QuestionNo:-1 ,P2_Name:"", P2_Number:0});
  myref.update({P1_Select:0, P2_Select:0});
  console.log("Room Created");
  firebase.database().ref().on('value',UpdatedSomething);
  function UpdatedSomething()
  {
    myref.on('value',function(snapshot)
    {
      var reqno=snapshot.val().P2_Number;
      var reqname=snapshot.val().P2_Name;
      var connected=snapshot.val().Connected;

      if(reqno>0&&connected==0)
      {
        $("#Accept_Player").html("<br>"+reqname+" sent you a play request <br><br>");
        $("#Accept_Player").append('<button onclick="ConnectRoom('+reqno+')" type="button" class="btn btn-danger">Join</button> &nbsp;&nbsp;&nbsp;&nbsp;');
        $("#Accept_Player").append('<button onclick="LeaveRoom()" type="button" class="btn btn-danger">Leave</button>');
      }
      else
      {
          $("#Accept_Player").html("");
      }
    });
  }
}
var connect_check=0;
function OpenConnectRoom()//For client Side
{
  $("#ConnectRoomModal").modal("show");
  firebase.database().ref().on('value',SearchServers,ErrorData);
}
function SearchServers(data)//For client Side
{
  if(connect_check==0)
  {
    console.log("Started searching for servers");
    var PlayersObject=data.val();
    var Players=Object.keys(PlayersObject);
    //console.log(Players);
    var AvailablePlayers="";
    for(var i = 0; i<Players.length; i++)
    {
      LoopPlayer=PlayersObject[Players[i]];
      if(LoopPlayer.Connected==0)
      {
        AvailablePlayers+='<br><button onclick="RequestRoom('+LoopPlayer.P1_Number+')" type="button" class="btn btn-danger">'+LoopPlayer.P1_Name+'</button><br>';
        //console.log(LoopPlayer.Number);
      }
      if(LoopPlayer.Connected==1&&LoopPlayer.P2_Number==number&&connect_check==0)
      {
        connect_check=1;
        Player_Number=2;
        $("#Player1Name").html(LoopPlayer.P1_Name);
        $("#Player2Name").html(LoopPlayer.P2_Name);
        $('#ConnectRoomModal').modal('hide');
        console.log("Connected to "+LoopPlayer.P1_Name);
        myref=firebase.database().ref(LoopPlayer.P1_Number);
        P1ref=firebase.database().ref(LoopPlayer.P1_Number+'/P1_Score');
        P2ref=firebase.database().ref(LoopPlayer.P1_Number+'/P2_Score');
      }
    }
    $("#Players_Join_Buttons").html(AvailablePlayers);
  }
}

function RequestRoom(Number)//Client side. Poke server to join
{
  console.log("Requested");
  reqref=firebase.database().ref(Number);
  reqref.update({P2_Number:number, P2_Name:name});
}

//Now go to the general function 2 function below
//firebase.database().ref().on('value',UpdatedSomething);

function ConnectRoom(Number)//Server Side. Update server and client
{
  myref.update({Connected:1});
  firebase.database().ref().on('value',UpdatedSomething);
  function UpdatedSomething()
  {
    myref.on('value',function(snapshot)
    {
      var connected=snapshot.val().Connected;
      if(connected==1&&init==0)
      {
        Player_Number=1;
        $("#Player1Name").html(snapshot.val().P1_Name);
        $("#Player2Name").html(snapshot.val().P2_Name);
        $('#CreateRoomModal').modal('hide');
        console.log("Connected to "+snapshot.val().P2_Name);
        P1ref=firebase.database().ref(snapshot.val().P1_Number+'/P1_Score');
        P2ref=firebase.database().ref(snapshot.val().P1_Number+'/P2_Score');
        start_quiz();
      }
    });
  }
}
function LeaveRoom()
{
  console.log("Room left");
  myref.update({P2_Number:0, P2_Name:""});
}




function ErrorData(err)
{
  console.log("Error");
  console.log(err);
}
