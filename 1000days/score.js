var init=0;
function start_quiz()
{
  console.log("Score initialized");
  init=1;
  myref.update({P1_Score:{hb:0,wt:0,mo:0,hp:0},P2_Score:{hb:0,wt:0,mo:0,hp:0}});
  myref.update({P1_Score:{hb:10,wt:40,mo:1000,hp:5},P2_Score:{hb:10,wt:40,mo:1000,hp:5}});
  //update_scoresP1(10,40,1000,5); //update_scoresP1(new_hb,new_wt,new_mo,new_hp)
}

var hb_min=5;var hb_max=13;
var wt_min=0;var wt_max=100;
var mo_min=0;var mo_max=6000;
var hp_min=0;var hp_max=10;

firebase.database().ref().on('value',UpdateScoreDashboard);
function UpdateScoreDashboard()
{
  try {
    P1ref.on('value',function(snapshot)
    {
      var P1Score=snapshot.val();
      $("#hb-barP1").css("width", ((((P1Score.hb-hb_min)*100)/(hb_max-hb_min)).toString()+"%"));
      $("#wt-barP1").css("width", ((((P1Score.wt-wt_min)*100)/(wt_max-wt_min)).toString()+"%"));
      $("#mo-barP1").css("width", ((((P1Score.mo-mo_min)*100)/(mo_max-mo_min)).toString()+"%"));
      $("#hp-barP1").css("width", ((((P1Score.hp-hp_min)*100)/(hp_max-hp_min)).toString()+"%"));
      $("#hb-barP1").html(P1Score.hb);
      $("#wt-barP1").html(P1Score.wt);
      $("#mo-barP1").html(P1Score.mo);
      $("#hp-barP1").html(P1Score.hp);

      //$("#HP_left").html(P1Score.hp + " Health Points Left");
    });

    P2ref.on('value',function(snapshot)
    {
      var P2Score=snapshot.val();
      $("#hb-barP2").css("width", ((((P2Score.hb-hb_min)*100)/(hb_max-hb_min)).toString()+"%"));
      $("#wt-barP2").css("width", ((((P2Score.wt-wt_min)*100)/(wt_max-wt_min)).toString()+"%"));
      $("#mo-barP2").css("width", ((((P2Score.mo-mo_min)*100)/(mo_max-mo_min)).toString()+"%"));
      $("#hp-barP2").css("width", ((((P2Score.hp-hp_min)*100)/(hp_max-hp_min)).toString()+"%"));
      $("#hb-barP2").html(P2Score.hb);
      $("#wt-barP2").html(P2Score.wt);
      $("#mo-barP2").html(P2Score.mo);
      $("#hp-barP2").html(P2Score.hp);

      //$("#HP_left").html(P1Score.hp + " Health Points Left");
    });
  } catch (e) {console.log("Cannot initialize score");}
}
