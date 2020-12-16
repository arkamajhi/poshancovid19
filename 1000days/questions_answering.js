var selected_option=0;
var Answered_OK=0;
function optionclick(option_number)
{
  if(Answered_OK==0)
  {
    if(document.getElementById("option"+option_number+"_text").className == "option-card option-card-clicked")
    {
      document.getElementById("option"+option_number+"_text").className = "option-card";
      selected_option=0;
    }
    else
    {
      for (var a=1;a<=3;a++)
      {
        if(a==option_number)
        {
          document.getElementById("option"+a+"_text").className = "option-card option-card-clicked";
          selected_option=option_number;
        }
        else
        {
          document.getElementById("option"+a+"_text").className = "option-card";
        }
      }
    }
    option_update(selected_option);
  }
}

function option_update(Option)
{
  if(Player_Number==1)
  {
    myref.update({P1_Select:Option});
  }
  else if(Player_Number==2)
  {
    myref.update({P2_Select:Option});
  }
}

firebase.database().ref().on('value',UpdateOptionPill);
function UpdateOptionPill()
{
  try
  {
    myref.on('value',function(snapshot)
    {
      if(snapshot.val().Connected==1)
      {
        var P1_Option_Select=snapshot.val().P1_Select;
        var P2_Option_Select=snapshot.val().P2_Select;
        if(P2_Option_Select>0&&Player_Number==1)
        {
          for(var a=1;a<=3;a++)
          {
            if(a==P2_Option_Select)
            {
              document.getElementById("option_pill"+a).style.visibility = "visible";
              $("#option_pill"+a).html(snapshot.val().P2_Name);
            }
            else
            {
              document.getElementById("option_pill"+a).style.visibility = "hidden";
            }
          }
        }
        else if(P1_Option_Select>0&&Player_Number==2)
        {
          for(var a=1;a<=3;a++)
          {
            if(a==P1_Option_Select)
            {
              document.getElementById("option_pill"+a).style.visibility = "visible";
              $("#option_pill"+a).html(snapshot.val().P1_Name);
            }
            else
            {
              document.getElementById("option_pill"+a).style.visibility = "hidden";
            }
          }
        }
        else
        {
          for(var a=1;a<=3;a++)
          {
            document.getElementById("option_pill"+a).style.visibility = "hidden";
          }
        }
      }
    });
  } catch (e) {}
}

/*function startcountdown(timeLeft)
{
  var timerId = setInterval(countdown, 1000);
  function countdown()
  {
    if (timeLeft == -1)
    {
      clearTimeout(timerId);
      CountDown_Over();
    }
    else
    {
      document.getElementById('Waiting_Time_Left').innerHTML = timeLeft + ' seconds remaining';
      timeLeft--;
    }
  }
}
var timeout=0;
function CountDown_Over()
{
  timeout=1;
  ok_after_option();
}*/

function ok_after_option()
{
  if(Player_Number==1)
  {
    myref.update({P1_Answer:selected_option});
    evaluate(selected_option);
  }
  else if(Player_Number==2)
  {
    /*if(timeout==1)
    {
        myref.update({TimeOut:1});
    }
    else
    {
        myref.update({TimeOut:0});
    }*/
    myref.update({P2_Answer:selected_option});
    evaluate(selected_option);
  }
  //selected_option=0;
}



function evaluate(option_number)
{
  Answered_OK=1;
  console.log("Question number : "+q_no);
  console.log("Option : "+option_number);
  $("#Result_modal_header").text(name);
  if(google_json[q_no].condition=="")
  {
    if(option_number==1)
    {
      $("#modal-body").html(google_json[q_no].result1body+"<br><br>"+google_json[q_no].result1scoretext);
    }
    else if(option_number==2)
    {
      $("#modal-body").html(google_json[q_no].result2body+"<br><br>"+google_json[q_no].result2scoretext);
    }
    else if(option_number==3)
    {
      $("#modal-body").html(google_json[q_no].result3body+"<br><br>"+google_json[q_no].result3scoretext);
    }
  }
  else if(google_json[q_no].condition=="hb")
  {
    var body="<table><thead><tr><td>Hemoglobin Level</td><td>Anemia Severity</td></tr></thead><tbody><tr><td>More than 12</td><td>Anemia free</td></tr><tr><td>11-12</td><td>Mild Anemia</td></tr><tr><td>10-11</td><td>Medium Anemia</td></tr><tr><td>9 and less</td><td>Severe Anemia</td></tr></tbody></table>";
    body+="Your current hemoglobin level is : "+hb+"<br>";
    if(option_number==1)
    {
      body+=(hb>=12?"Right Answer <br> 1 Health Point increased":"Wrong Answer <br> 1 Health Point decreased");
    }
    else if(option_number==2)
    {
      body+=(hb>=11&&hb<12?"Right Answer <br> 1 Health Point increased":"Wrong Answer <br> 1 Health Point decreased");
    }
    else if(option_number==3)
    {
      body+=(hb>=10&&hb<11?"Right Answer <br> 1 Health Point increased":"Wrong Answer <br> 1 Health Point decreased");
    }
    else if(option_number==4)
    {
      body+=(hb<10?"Right Answer <br> 1 Health Point increased":"Wrong Answer <br> 1 Health Point decreased");
    }
    $("#modal-body").html(body);
  }
}

try
{
  firebase.database().ref().on('value',ShowResultModal);
  function ShowResultModal()
  {
    try
    {
      myref.on('value',function(snapshot)
      {
        if(snapshot.val().P1_Answer>0&&snapshot.val().P2_Answer>0)
        {
          console.log("Attempt to show Results");
          $("#ResultModal").modal("show");
        }
      });
    } catch (e) {}
  }
} catch (e) {}

function Close_and_Open_NextQuestion()
{
  if(Player_Number==1)
  {
    myref.update({P1_Next:1});
  }
  else if(Player_Number==2)
  {
    myref.update({P2_Next:1});
  }
}

firebase.database().ref().on('value',HideResultModal);
function HideResultModal()
{
  //console.log("Attempt to hide Results");
  try
  {
    myref.on('value',function(snapshot)
    {
      if(snapshot.val().P1_Next==1&&snapshot.val().P2_Next==1)
      {
        //close ResultModal
        $("#ResultModal").modal("hide");
        if(Player_Number==1)
        {
          //Initialize the variables
          myref.update({P1_Answer:0,P2_Answer:0,P1_Next:0,P2_Next:0});
          //Load Next Question
          myref.update({QuestionNo:q_no+1});
          //myref.update({P1_Select:0,P2_Select:0});
        }
        DisplayCount=0; Answered_OK=0;
        console.log("DisplayCount updated at both = 1: "+DisplayCount);
        for (var a=1;a<=3;a++)
        {
          document.getElementById("option"+a+"_text").className = "option-card";
        }
        selected_option=0;
      }
    });
  } catch (e) {}
}
