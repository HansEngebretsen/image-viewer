$(document).ready(function(){
  $('body').addClass('loaded');
  $('.image-anchor').click(function(){
    $(this).addClass('visited');
  });
  var bod = $('body');

  $('.zoom-out').click(function(){
    if (bod.hasClass('zoomed-in')){
      bod.removeClass('zoomed-in');
    }else {
      bod.toggleClass('zoomed-out');
    }
  });
  $('.zoom-in').click(function(){
    if (bod.hasClass('zoomed-out')){
      bod.removeClass('zoomed-out');
    }else {
      bod.toggleClass('zoomed-in');
    }
  });
});