module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define('comments', {
        id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
        author: { type: Sequelize.STRING, allowNull: false },
        text: { type: Sequelize.TEXT, allowNull: false },
        articleId: { type: Sequelize.INTEGER, allowNull: false}, //айди статьи, к которой был оставлен коммент
        answeringId: { type: Sequelize.INTEGER, allowNull: true }, //важно! это айди(первый пункт), коммента на который прилетел ответ, если коммент к статье, но тут NULL
        raiting: { type: Sequelize.INTEGER, allowNull: true } //лукасы на
    });

    return Comment;
};
