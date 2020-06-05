var time = new Date();
$("#post-area").val("");

setInterval(() => {
    $.get({
        url: "stream.json",
        dataType: "json",
        success: (data) => {
            data.forEach((d) => {
                var cTime = new Date(d.created_at.replace(" +0000", ""));
                var uTime = new Date(d.updated_at.replace(" +0000", ""));
                if(cTime > time){
                    time = cTime;
                    try{
                        msg = renderHTMLForStream(d);
                    }
                    catch(err){
                        alert(err)
                    }
                    $("#stream-section").prepend(msg.join(""));
                }
                if($(`#karma-${d.id}`).length > 0){
                    if(new Date($(`#karma-${d.id}`).attr("updatetime")) < uTime){
                        $(`#karma-${d.id}`).attr("updatetime", `${uTime}`);
                        if(Number($(`#karma-${d.id}`).text()) > d.karma){
                            $(`#karma-${d.id}`).text(`${d.karma}`).css("color","steelBlue");
                        } else if(Number($(`#karma-${d.id}`).text()) < d.karma){
                            $(`#karma-${d.id}`).text(`${d.karma}`).css("color","pink");
                        }
                    }
                }
            });
        }
    });
}, 500);

function renderHTMLForStream(data) {
    return [`<section class="render-post"><p class="user-name">${data.user.name}</p> |`, 
    `<p class="karma" id="karma-${data.id}" createtime="${new Date(data.created_at).toUTCString().replace("GMT","UTC")}" updatetime="${new Date(data.updated_at).toUTCString().replace("GMT","UTC")}"> ${data.karma}</p>`,
    `<p class="post-content">${data.content}</p>`,
    `<span class="like">`,
    `<form action="/like/message" accept-charset="UTF-8" data-remote="true" method="post">`,
    `<input name="utf8" type="hidden" value="&#x2713;" />`,
    `<input value="${data.id}" type="hidden" name="like[post_id]" id="like_post_id" />`,
    `<input type="submit" name="commit" value="like" data-disable-with="like" />`, 
    `</form>`,
    `</span>`,
    `<span class="dislike">`,
    `<form action="/dislike/message" accept-charset="UTF-8" data-remote="true" method="post">`,
    `<input name="utf8" type="hidden" value="&#x2713;" />`,
    `<input value="${data.id}" type="hidden" name="dislike[post_id]" id="dislike_post_id" />`,
    `<input type="submit" name="commit" value="dislike" data-disable-with="dislike" />`,  
    `</form>`,
    `</span>`,
    `<section/>`];
};