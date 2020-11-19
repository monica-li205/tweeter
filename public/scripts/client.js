/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const createTweetElement = function (tweet) {
    const $tweet = $(`
      <article>
      <header class="tweet-header">
        <div>
          <span class="material-icons"> pets </span>
          <span class="username">${tweet.user.name}</span>
        </div>
        <span class="tweeter-handle">${tweet.user.handle}</span>
      </header>
      <p class="tweeter-content">${tweet.content.text}</p>
      <footer class="tweet-footer">
        <span>${tweet.created_at}</span>
        <div class="icons">
          <span class="material-icons"> flag </span>
          <span class="material-icons"> repeat </span>
          <span class="material-icons"> favorite </span>
        </div>
      </footer>
      </article>
    `)
    return $tweet;
  }

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweet-container').prepend($tweet);
    }
  }
  
  const loadTweets = function() {
    $.getJSON('/tweets', function(data) {
      renderTweets(data);
    })
  }

  loadTweets();

  $('#submit-tweet').submit(function (event) {

    console.log('Button clicked, performing ajax call...');
    event.preventDefault();
    const queryString = $("#tweet-text").serialize();
    console.log(queryString);
    
    if ($('#tweet-text').val() === '') {
      return window.alert('cannot submit empty tweet');

    } else if ($('#tweet-text').val() === null) {
      return window.alert('tweet is invalid');

    } else if ($('#tweet-text').val().length > 140)  {
      return window.alert('tweet exceeds permitted character count');

    } else {
      // $.post('/tweets', queryString)
      $.ajax({
        type: 'POST',
        url: '/tweets',
        data: queryString,
        success: 'ok',
      })

      .then(() => {
        $('#tweet-text').val('')
        $('.counter').val('140')
        loadTweets()
      })
    }
  })
});

