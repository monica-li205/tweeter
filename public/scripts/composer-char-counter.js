$(document).ready(function() {
  $('#tweet-text').keydown(function() {
    const value = $(this).val();
    const remainingChar = 140 - value.length;
    const counter = $(this).siblings().find('.counter');
    
    if (remainingChar < 0) {
      counter.text(remainingChar).css('color', 'red');
    } else {
      counter.text(remainingChar);
    }
  })
});