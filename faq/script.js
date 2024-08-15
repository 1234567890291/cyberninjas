$(".question").click(function () {
    let questionId = $(this).attr("id"); 
    let answerId = "#" + questionId + "-answer";
    $(answerId).fadeToggle(200);
  });