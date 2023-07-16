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
  const $tweet = $(`
  <article class="tweet">
    <header>
      <h4>  <i class="fa-solid fa-face-smile-wink"></i>${tweet.user.name}</h4>
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
  $('#tweets-container').empty();
  for (let tweet of tweets) {// loop tweets 
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
  }
};

$('.form').on('submit', function (event) {
  event.preventDefault(); 
  let data = $(this).serialize();
  let dataHTML = $('#tweet-text').val();
  if(!dataHTML){// checks if trimmedData falsy
    alert("Your tweet is empty!")
  } else if(dataHTML.length > 140) {// check if the tweet not over 140 cha
    $('#errormess1').show();
  } else {
    $.post("/tweets", data)
      .then(() => {
        $('#errormess1').hide();
        $('#tweet-text').val("")
        $($('.new-tweet textarea').next().find('.counter')).text(140)
        loadTweets()
      });
  }
});

function loadTweets(){
  $.ajax('/tweets', { method: 'GET' })
  .then(function (data) {
      renderTweets(data);
  });
}


loadTweets();


