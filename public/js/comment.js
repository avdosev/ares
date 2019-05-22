const comment1 = { 
    commentError: "Коммент уж слишком маленький. Прям как ...",
    commentEventError: "Коммент не удовлетворяет требованиям",
    commentRegExp: new RegExp("^.{6,}")
}


document.addEventListener('DOMContentLoaded', () => {
    const post = document.querySelector('.post_text');
    const id = post.id;
    const commentError = document.querySelector('.commentError');
    const comment = document.querySelector('#comment') //я не могу с жить с ошибкой
    const sendCommentBtn = document.querySelector("#enter")
    fetch(`/post/${id}/comments`)
        .then(value => {
            console.log(value);
            return value.json();
        })
        .then(json => {
            console.log(json);
            const insertElem = document.querySelector('.comments_lenta');
            insertsComments(json, insertElem);
        })
        .catch(error => {
            console.error(error);
        });

    sendCommentBtn.addEventListener("click", (event) => {
        if ( !comment.value.match(comment1.commentRegExp)  )  {
            commentError.innerHTML = comment1.commentEventError;
            commentError.className = 'commentError error active';
             //не пускаем его дальше
        }
        else {
            
        }
    })

    comment.addEventListener('input', () => {
            // не понимаю почему не работает способ из sign_In //наверно, потому что тут не форма
            if (comment.value.match(comment1.commentRegExp)) { 
                commentError.innerHTML = '';
                commentError.className = 'commentError error';
            } else {
                commentError.innerHTML = comment1.commentError;
                commentError.className = 'commentError error active';
            }
        },
        false //объясни потом, что значит этот бул
    );


});

function refreshPage() {
    window.location.reload();
}

function returnToArticle() { //в общем, вызвать это дерьмо, когда он начинает переводить на джсон
    document.location.href = window.location.href.replace(new RegExp("/pushComment.*"), "")
}

function getAnsweringId() {
    
}

function responseComment(commentText, answeringId = null) {
    const options = {
        method:"post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "comment": commentText,
            answeringId
        })
    }
    fetch(`/post/${id}/pushComment`, options)
    .then(() => {
        refreshPage()
    }).catch(err => {
        // TODO: обработка ошибки
    }) 
}


function insertsComments(objCommentArray, insertedElem) {
    for (let i = 0; i < objCommentArray.length; i++) {
        const objComment = objCommentArray[i];

        if (objComment.answeringId === null) {
            insertComment(objComment, insertedElem);
        } else {
            const childCommentElem = document.querySelector(
                `#child_comment_${objComment.answeringId}`
            );
            insertComment(objComment, childCommentElem);
        }
    }
}

function insertComment(objComment, insertedElem) {
    //const AuthorUrl = ``
    const Author = objComment.author;
    const Text = objComment.text;
    const Id = objComment.id;
    const date = new Date(objComment.createdAt);
    const DateStr = DateToStr(date);
    // впринципе можно менять
    const htmlPost = `
    <div class = "comment" id = "comment_${Id}" data-id = "${Id}">
        <div class = "author_comment_block">
            <a href = "/author/${Author}" class = "author_login">${Author}</a>
            <time class = "created_commit">${DateStr}</time>
        </div>
        <button class = "updateComment GreyButton">Редактировать</button>
        <button class = "removeComment GreyButton">Удалить</button>

        <div class = "comment_text">${Text}</div>
        <div class = "control_block">
            <button class = "reply comment_control" data-type="create" style = "display: inline" onclick="createClick(${Id})"></button>
            <button class = "reply comment_control" data-type="cancel" style = "display: none" onclick="cancelClick(${Id})"></button>
        </div> 
        <div class = "comment_childer" id = "child_comment_${Id}"></div>
    </div>`;
    insertedElem.insertAdjacentHTML('beforeend', htmlPost);
}
 
// можно по другому но пока так
function createClick(id) {
    const control_block = document.querySelector(`#comment_${id} .control_block`)
    control_block.querySelector('button[data-type=create]').style.cssText = 'display: none';
    control_block.querySelector('button[data-type=cancel]').style.cssText = 'display: inline';
    
    const reply_block = `
    <div class = "comment reply_comment">
        <textarea class = "comment_area" name="comment" cols="30" rows="10" required='required' pattern='.{10,}'></textarea>
        <div class = "button">
            <button class = "EnterButton">
                Отправить
            </button>
        </div>
        <span class="commentError" aria-live="polite"></span>
    </div>
    `
    control_block.insertAdjacentHTML('afterend', reply_block)
}

function cancelClick(id) {
    const reply_block = document.querySelector('.reply_comment')
    if (reply_block) reply_block.parentNode.removeChild(reply_block);

    document.querySelector(`#comment_${id} button[data-type=create]`).style.cssText = 'display: inline';
    document.querySelector(`#comment_${id} button[data-type=cancel]`).style.cssText = 'display: none';
} 

function DateToStr(date) {
    const now = new Date();
    let str;
    const nearlyDay =
        date.getYear() == now.getYear() && date.getMonth() == now.getMonth();
    const subDay = now.getDate() - date.getDate();

    if (nearlyDay && subDay == 1) {
        // вчера
        str = 'вчера ';
    } else if (nearlyDay && subDay == 0) {
        // сегодня
        str = 'сегодня ';
    } else {
        const month = [
            'Января',
            'Февраля',
            'Марта',
            'Апреля',
            'Мая',
            'Июня',
            'Июля',
            'Августа',
            'Сентября',
            'Октября',
            'Ноября',
            'Декабря'
        ];
        str = `${date.getDate()} ${
            month[date.getMonth() - 1]
        } ${date.getFullYear()}`;
    }

    str += ' в ' + date.toLocaleTimeString();
    return str;
}
