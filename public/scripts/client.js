/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// const data = [
//   {
//   "user": {
//     "name": "Newton",
//     "avatars": "https://i.imgur.com/73hZDYK.png",
//     "handle": "@SirIsaac"
//   },
//   "content": {
//     "text": "If I have seen further it is by standing on the shoulders of giants"
//   },
//   "created_at": 1461116232227
//   }, 
//   {
//     "user": {
//       "name": "Meow",
//       "avatars": "https://i.imgur.com/73hZDYK.png",
//       "handle": "@MeowCity"
//     },
//     "content": {
//       "text": "mememememowwmeowmoewmoewmoewmeow!!"
//     },
//     "created_at": 1461113959088
//     }
// ]

$(document).ready(function() {
  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweet-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
    }
  }

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
    `);
    return $tweet;
  }

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
      $.ajax({
        type: 'POST',
        url: '/tweets',
        data: queryString,
        success: 'ok',
        dataType: 'json',
      });
    }
    
  })
  
  const loadTweets = function() {
    $.getJSON('/tweets', function(data) {
      renderTweets(data);
    })
  }
  loadTweets();
});

