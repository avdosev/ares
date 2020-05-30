import {initialUser, IPrivateUser, IPublicUser} from "./IPrivateUser";

interface IComments {
    id: number,
    commentAuthorId: number,
    text: string,
    articleId: string,
    answeringId: number | null,
    raiting: number | null,
    createdAt: Date,
    updatedAt: Date,
    user: IPublicUser,
    child: Array<IComments> | null
}

const initialComment: IComments = {
    id: 0,
    commentAuthorId: 0,
    text: "",
    articleId: "",
    answeringId: null,
    raiting: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    user: initialUser,
    child: null
}

export type {IComments}

export {initialComment}
