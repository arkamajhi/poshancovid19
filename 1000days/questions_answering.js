var selected_option=0;
function optionclick(option_number)
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
  option_update(selected_option)
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

var timeLeft = 30;
var timerId = setInterval(countdown, 1000);
function countdown()
{
  if (timeLeft == -1)
  {
    clearTimeout(timerId);
    //doSomething();
  }
  else
  {
    document.getElementById('Waiting_Time_Left').innerHTML = timeLeft + ' seconds remaining';
    timeLeft--;
  }
}



function ok_after_option()
{
  if(selected_option==0)
  {
    //Please select
  }
  else
  {

  }
}
