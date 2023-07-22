/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  
  return div.innerHTML;
};

// Test / driver code (temporary). Eventually will get this from the server.
function createTweetElement(tweet) {
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

function loadTweets() {
  $.ajax({
    url: '/tweets',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      renderTweets(data)
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log('Error:', textStatus, errorThrown);
    }
  });
}

$('.form').on('submit', function (event) {
  event.preventDefault();
//add conditiond for submit can not submit id empty or over 140 char & display message for each condtion
  const tweetLength = $('#tweet-text').val().trim().length;

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




loadTweets();


