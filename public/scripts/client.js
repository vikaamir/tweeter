/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Test / driver code (temporary). Eventually will get this from the server.
function createTweetElement(tweet) {
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // using string literals to add data
  const $tweet = $(`
  <article class="tweet">
    <header>
    <img src='${tweet.user.avatars}'>
      <h4>${tweet.user.name}</h4>
      <h4 class="ID">${tweet.user.handle}</h4>
    </header>
    <p>${escape(tweet.content.text)}</p>
    <footer>
      <p1>${timeago.format(tweet.created_at)}</p1>
      <div class="icons">
        <i class="fa-solid fa-heart"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-sharp fa-solid fa-flag"></i>
      </div>
    </footer>
  </article>
  `);
  return $tweet
};

const renderTweets = function (tweets) {
  //empty the contaneir befor add new tweet
  $('#tweets-container').empty();
  for (let tweet of tweets) {// loop tweets 
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
  }
};

$('.form').on('submit', function (event) {
  event.preventDefault();
//add conditiond for submit can not submit id empty or over 140 char & display message for each condtion 
  const tweetLength = $('#tweet-text').val().length;
  if (tweetLength === 0) {
    return $('.errormess1').text("Cannot submit empty tweet")
  }
  if (tweetLength > 140) {
    return $('.errormess1').text("Cannot submit tweet too long ")
  }
  $('.errormess1').text("")
  const data = $(this).serialize();
  $.post("/tweets", data)
    .then(() => {
      $('#tweet-text').val("");
      $($('.new-tweet textarea').next().find('.counter')).text(140)
      loadTweets()
    });

});

function loadTweets() {
  $.ajax('/tweets', { method: 'GET' })//ajax refresh the page auto
    .then(function (data) {
      renderTweets(data);
    });
}


loadTweets();


