function appendData(data)
{
  let stateCount=document.getElementById("stateCount");
  let totalCases=document.getElementById("totalCases");
  let activeCases=document.getElementById("activeCases");
  let recovered=document.getElementById("recovered");
  let migrated=document.getElementById("migrated");
  let death=document.getElementById("death");
  totalCases.innerHTML=data.totalConfirmed?data.totalConfirmed:'-';
  activeCases.innerHTML=data.totalActive?data.totalActive:'-';
  recovered.innerHTML=data.totalRecovered?data.totalRecovered:'-';
  migrated.innerHTML=data.totalMigrated?data.totalMigrated:'-';
  death.innerHTML=data.totalDeaths?data.totalDeaths:'-';
  var marquee=document.createElement("marquee");
  marquee.setAttribute("onmouseover", "this.stop();");
  marquee.setAttribute("onmouseout", "this.start();");
  marquee.setAttribute("behavior", "scroll");
  marquee.setAttribute("direction", "left");
  marquee.setAttribute("scrollamount", "10");
  var marqueeInner=document.createElement("div");
  marqueeInner.setAttribute("class", "marqueeInner");
  for (var i=0; i < data.statewise.length; i++)
  {
    var stateInner=document.createElement("div");
    stateInner.innerHTML='<span class="name">' + data.statewise[i].state + '</span>' + '<span class="number">' + data.statewise[i].confirmed + '</span>';
    marqueeInner.appendChild(stateInner);
  }
  marquee.appendChild(marqueeInner);
  stateCount.appendChild(marquee);
  let update=document.getElementById("lastUpdated");
  function formatAMPM()
  {
    var d=new Date(), minutes=d.getMinutes().toString().length==1 ? '0' + d.getMinutes() :d.getMinutes(),
    hours=d.getHours().toString().length==1 ? '0' + d.getHours() :d.getHours(), ampm=d.getHours() >=12 ? 'pm' :'am',
    months=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    days=['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']; return days[d.getDay()] + ' ' + months[d.getMonth()] + ' ' + d.getDate() + ' ' + d.getFullYear() + ' ' + hours + ':' + minutes + ampm;
  }
  update.innerHTML=formatAMPM();
}
function getCoronaData()
{
  var ts=new Date;
  ts=ts.getTime();
  let url='https://raw.githubusercontent.com/arkamajhi/covid/master/coronadata.json';
  fetch(url)
  .then(function (response){ return response.json();})
  .then(function (data){ appendData(data);})
  .catch(function (err){ console.log(err);});
}
function lockDown()
{
  let date1=new Date("03/24/2020");
  let today=new Date();
  var dd=today.getDate();
  var mm=today.getMonth() + 1;
  var yyyy=today.getFullYear();
  if (dd < 10){ dd='0' + dd;}
  if (mm < 10){ mm='0' + mm;}
  today=mm + '/' + dd + '/' + yyyy;
  let date2=new Date(today);
  let Difference_In_Time=date2.getTime() - date1.getTime();
  let Difference_In_Days=Difference_In_Time / (1000 * 3600 * 24);
  let differenceDigit=Difference_In_Days.toString().split('').slice(-1)[0];
  if (differenceDigit==1){ sup='<sup>st</sup>'}
  else if (differenceDigit==2){ sup='<sup>nd</sup>'}
  else if (differenceDigit==3){ sup='<sup>rd</sup>'}
  else{ sup='<sup>th</sup>'}
  let lockdays=document.getElementById("lockdown-day");
  lockdays.innerHTML=Difference_In_Days + sup;
}
function init()
{
  getCoronaData(); lockDown();
}
init();
