/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const convertUnix = function(current, previous) {
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;
  
    let elapsed = current - previous;
  
    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + ' seconds ago';
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + ' minutes ago';
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + ' hours ago';
    } else if (elapsed < msPerMonth) {
      return Math.round(elapsed / msPerDay) + ' days ago';
    } else if (elapsed < msPerYear) {
      return Math.round(elapsed / msPerMonth) + ' months ago';
    } else {
      return Math.round(elapsed / msPerYear) + ' years ago';
    }
  };
  
  const escape =  function(str) {
    let span = document.createElement('span');
    span.appendChild(document.createTextNode(str));
    return span.innerHTML;
  };

  const createTweetElement = function(tweet) {
    const currentTimeStamp = Date.now();
    const convertedTimestamp = convertUnix(currentTimeStamp, tweet.created_at);
    const $tweet = $(`
      <article>
      <header class="tweet-header">
        <div>
          <span class="material-icons"> pets </span>
          <span class="username">${escape(tweet.user.name)}</span>
        </div>
        <span class="tweeter-handle">${escape(tweet.user.handle)}</span>
      </header>
      <p class="tweeter-content">${escape(tweet.content.text)}</p>
      <footer class="tweet-footer">
      <span>${escape(convertedTimestamp)}</span>
      <div class="icons">
          <span class="material-icons"> flag </span>
          <span class="material-icons"> repeat </span>
          <span class="material-icons"> favorite </span>
        </div>
      </footer>
      </article>
    `);
    return $tweet;
  };

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweet-container').prepend($tweet);
    }
  };
  
  const loadTweets = function() {
    $.getJSON('/tweets', function(data) {
      renderTweets(data);
    });
  };

  loadTweets();

  $('#submit-tweet').submit(function(event) {
    console.log('Button clicked, performing ajax call...');

    event.preventDefault();
    const queryString = $("#tweet-text").serialize();
    
    if ($('#tweet-text').val() === '') {
      $('#error-message').slideDown('slow');
      $('#error-message').show().text('ERROR: cannot submit empty tweet!');

    } else if ($('#tweet-text').val() === null) {
      $('#error-message').slideDown('slow');
      $('#error-message').show().text('ERROR: tweet is invalid!');

    } else if ($('#tweet-text').val().length > 140)  {
      $('#error-message').slideDown('slow');
      $('#error-message').show().text('ERROR: tweet exceeds permitted character count!');

    } else {
      $('#error-message').hide();
      $.ajax({
        type: 'POST',
        url: '/tweets',
        data: queryString,
        success: 'ok',
      })

      .then(() => {
        $('#tweet-text').val('');
        $('.counter').val('140');
        loadTweets();
      });
    }
  });
});

