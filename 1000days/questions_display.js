var q_no=-1;
var DisplayCount=0;
firebase.database().ref().on('value',UpdateQuestion);
function UpdateQuestion()
{
  console.log("Attempt to check next question update");
  console.log("DisplayCount : "+DisplayCount);
  try
  {
    myref.on('value',function(snapshot)
    {
      if(snapshot.val().QuestionNo>q_no&&DisplayCount==0)
      {
        console.log("Attempt to display next question");
        DisplayCount++;
        q_no=snapshot.val().QuestionNo;
        if(q_no<google_json.length&&q_no>=0)
        {
          console.log(q_no+" Question Displayed");
          $("#monthsday").html(google_json[q_no].monthsday);
          $("#situation").html(google_json[q_no].situation);
          $("#question_text").html(google_json[q_no].question_text);
          $("#image").html(google_json[q_no].image);
          $("#option1_text").html(google_json[q_no].option1);
          $("#option2_text").html(google_json[q_no].option2);

          if(google_json[q_no].option3!="")
          {
            $("#option3").show();
            $("#option_header3").show();
            $("#option3_text").html(google_json[q_no].option3);
          }
          else
          {
            $("#option3").hide();
            $("#option_header3").hide();
          }
          //startcountdown(60);
        }
        else if (q_no==google_json.length)
        {
          alert("Over");
        }
      }
    });
  } catch (e) {}
}
