import { DateToStr } from "./dateRU.js";
// возможно потом понадобиться но я не уверен
import { showError, hideError, checkValidationWithRegExp } from "../input_error.js"
import {get} from "../../Router";

/**
 * из данных в хтмл/url получаем айдишник статьи
 */
export function getArticleId() {
    const url = window.location.href.split("/")
    return  url[url.length-1]
}

/**
 * загружаем заново комменты и тех что нет инсертим
 */
// export async function refreshComments(post_id) {
//     let comments = await loadComments(post_id)
//     comments = comments.filter((comment) => {
//         const hasComment = document.getElementById(`comment_${comment.id}`)
//         return !hasComment
//     })
//     insertsComments(comments, document.querySelector('.comments_lenta'));
// }

/**
 * загрузка комментов
 */
export async function loadComments(post_id) {
    const option = {
        method: "get",
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
    const request = await get(`/api/post/${post_id}/comments`)
    return request;
}

/**
 * отправка комментария
 */
// export function responseComment(post_id, commentText, answeringId = null) {
//     const options = {
//         method:"post",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             "comment": commentText,
//             answeringId
//         })
//     }
//     fetch(`/api/post/${post_id}/comments`,
//         options
//     ).then(() => {
//         refreshComments(post_id)
//     }).catch(err => {
//         // TODO: обработка ошибки
//         console.error(err)
//     })
// }

/**
 * вставка комментов
 * @param {Array <Object>} objCommentArray 
 * @param {*} insertedElem туда куда будет вставляться если ответныйайдишник нулл 
 */
// export function insertsComments(objCommentArray, insertedElem) {
//     for (let i = 0; i < objCommentArray.length; i++) {
//         const objComment = objCommentArray[i];
//
//         if (objComment.answeringId === null) {
//             insertComment(objComment, insertedElem);
//         } else {
//             const IdChildElem = `#child_comment_${objComment.answeringId}`
//             const childCommentElem = document.querySelector( IdChildElem );
//             insertComment(objComment, childCommentElem);
//         }
//     }
// }



// можно по другому но пока так
// export function createClick(id) {
//     // фича - убираем другие ответы
//     const replyes = document.querySelectorAll('.reply_comment')
//     for (const replyBlock in replyes) {
//         if (replyes.hasOwnProperty(replyBlock)) {
//             const element = replyes[replyBlock];
//             const data_id = element.attributes['data-id'].value
//             cancelClick(data_id)
//         }
//     }
//
//     const control_block = document.querySelector(`#comment_${id} .control_block`)
//     const insert_block = document.querySelector(`#child_comment_${id}`)
//
//     control_block.querySelector('button[data-type=create]').style.cssText = 'display: none';
//     control_block.querySelector('button[data-type=cancel]').style.cssText = 'display: inline';
//
//     const reply_block = `
//     <div class = "comment reply_comment" id="reply_comment_${id}" data-id="${id}"}>
//         <textarea class = "comment_area" id="comment_area_${id}" name="comment" cols="30" rows="10" required='required' pattern='.{10,}'></textarea>
//         <div class = "button">
//             <button class = "EnterButton">
//                 Отправить
//             </button>
//         </div>
//         <span class="commentError" aria-live="polite"></span>
//     </div>
//     `
//     insert_block.insertAdjacentHTML('beforebegin', reply_block)
//
//     document.querySelector(`#reply_comment_${id} .EnterButton`).addEventListener('click', () => {
//         const post_id = getArticleId();
//         responseComment(post_id, document.querySelector(`#comment_area_${id}`).value, id)
//         cancelClick(id)
//     })
// }
//
// export function cancelClick(id) {
//     const reply_block = document.querySelector(`#reply_comment_${id}`)
//     if (reply_block) reply_block.parentNode.removeChild(reply_block);
//
//     document.querySelector(`#comment_${id} button[data-type=create]`).style.cssText = 'display: inline';
//     document.querySelector(`#comment_${id} button[data-type=cancel]`).style.cssText = 'display: none';
// }