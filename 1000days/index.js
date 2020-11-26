function optionclick(option_number)
{
  for (var a=1;a<=3;a++)
  {
    if(a==option_number)
      document.getElementById("option"+a).className = "option-card option-card-clicked";
    else
      document.getElementById("option"+a).className = "option-card";
  }

}
