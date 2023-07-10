$(document).ready(function(){
  $(".new-tweet textarea").keyup(function(){
    let remaining = 140 - $(this).val().length;
    $($(this).next().find('.counter')).text(remaining)
    if(remaining < 0){
      $($(this).next().find('.counter')).css('color', 'red')
    } else {
      $($(this).next().find('.counter')).css('color', '#2c2d31')
    }
  });
});