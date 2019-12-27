$(function(){

  function buildHTML(message){
    
    if (message.image) {
      var html = 
       `<div class="chat-main__message-list__box">
          <div class="chat-main__message-list__box__name">
            <div class="member-name">
              ${message.user_name}
            </div>
            <div class="post-date">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-main__message-list__box__comment">
            ${message.body}
            <img src=${message.image} >
          </div>
        </div>`
    } else {
      var html = 
        `<div class="chat-main__message-list__box">
          <div class="chat-main__message-list__box__name">
            <div class="member-name">
              ${message.user_name}
            </div>
            <div class="post-date">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-main__message-list__box__comment">
            ${message.body}
          </div>
        </div>`
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
})