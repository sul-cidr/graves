
$(window).on('load',function(){
  $('#tutorial-modal').modal('show');

  $('button.close-modal').on('click', function(){
    console.log('hello');
    $('#tutorial-modal').modal('hide');
    $('#tutorial-modal').removeAttr('style');
    $('#tutorial-modal').css('display', 'hidden');
  });
});
