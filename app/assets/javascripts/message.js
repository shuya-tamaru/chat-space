$(function(){

  var reloadMessages = function() {
    last_message_id = $('.chat-main__message-list__box:last').data("message-id");
    $.ajax({
      url: 'api/messages',
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat-main__message-list').append(insertHTML);
        $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  };

  function buildHTML(message){
    var message_detail =
      `<div class="chat-main__message-list__box__name">` +
        `<div class="member-name">` +
          message.user_name +
        `</div>` +
        `<div class="post-date">` +
          message.created_at +
        `</div>` +
      `</div>` 

    if (message.image) {
      var html = 
       `<div class="chat-main__message-list__box" data-message-id=` + message.id + `>` +
            message_detail +
          `<div class="chat-main__message-list__box__comment">` +
            message.body +
            `<img src="` + message.image + `" >` +
          `</div>` +
        `</div>`
    } else {
      var html = 
        `<div class="chat-main__message-list__box" data-message-id=` +  message.id + `>` +
            message_detail +
          `<div class="chat-main__message-list__box__comment">` +
            message.body +
          `</div>` +
        `</div>`
    }
    return html
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this)
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__message-list').append(html);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('.new_message')[0].reset();
      $('.post-form__box__post-btn').prop("disabled", false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.post-form__box__post-btn').prop("disabled", false);
     });
  })
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
})