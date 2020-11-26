var google_json=[];

function display(json)
{
  for (var i = 0; i < json.feed.entry.length; i++)
  {
    google_json.push
    ({
      question_number:i,
      monthsday:json.feed.entry[i].gsx$days.$t,
      situation:json.feed.entry[i].gsx$situation.$t,
      image:json.feed.entry[i].gsx$image.$t,
      option1:json.feed.entry[i].gsx$option1.$t,
      option2:json.feed.entry[i].gsx$option2.$t,
      option3:json.feed.entry[i].gsx$option3.$t,
      result1body:json.feed.entry[i].gsx$result1body.$t,
      result2body:json.feed.entry[i].gsx$result2body.$t,
      result3body:json.feed.entry[i].gsx$result3body.$t,
      result1scoretext:json.feed.entry[i].gsx$result1scoretext.$t,
      result2scoretext:json.feed.entry[i].gsx$result2scoretext.$t,
      result3scoretext:json.feed.entry[i].gsx$result3scoretext.$t,
      hb1:json.feed.entry[i].gsx$hb1.$t,
      hb2:json.feed.entry[i].gsx$hb2.$t,
      hb3:json.feed.entry[i].gsx$hb3.$t,
      wt1:json.feed.entry[i].gsx$wt1.$t,
      wt2:json.feed.entry[i].gsx$wt2.$t,
      wt3:json.feed.entry[i].gsx$wt3.$t,
      mo1:json.feed.entry[i].gsx$mo1.$t,
      mo2:json.feed.entry[i].gsx$mo2.$t,
      mo3:json.feed.entry[i].gsx$mo3.$t,
      hp1:json.feed.entry[i].gsx$hp1.$t,
      hp2:json.feed.entry[i].gsx$hp2.$t,
      hp3:json.feed.entry[i].gsx$hp3.$t,
      question_text:json.feed.entry[i].gsx$questiontext.$t,
      condition:json.feed.entry[i].gsx$condition.$t,
      skip:json.feed.entry[i].gsx$skip.$t
    });
  }
}
console.log(google_json);
