$("#Hb_exchange").bind("click", function() {
  show("Hb_loading");
  if(hb<hb_max&&hp>0)
    update_scoresP1(1,0,0,-1); //update_scoresP1(new_hb,new_wt,new_mo,new_hp)
});
$("#Wt_exchange").bind("click", function() {
  show("Wt_loading");
  if(wt<wt_max&&hp>0)
    update_scoresP1(0,1,0,-1); //update_scoresP1(new_hb,new_wt,new_mo,new_hp)
});
$("#Mo_exchange").bind("click", function() {
  show("Mo_loading");
  if(mo<mo_max&&hp>0)
    update_scoresP1(0,0,100,-1); //update_scoresP1(new_hb,new_wt,new_mo,new_hp)
});

var spin;
function show(a) {
    spin=document.getElementById(a);
    spin.style.display="inline-block";
    setTimeout('hide()', 1000);  // 5 seconds
}
function hide() {
    spin.style.display="none";
}
