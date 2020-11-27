window.addEventListener('load', (event) =>
{
  $("#LoginModal").modal("show");
  document.getElementById("Main_Section").style.visibility = "hidden";
});

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
