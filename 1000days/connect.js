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
