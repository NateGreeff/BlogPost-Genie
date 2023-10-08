const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class BlogPosts extends Model { }

BlogPosts.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        comments_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'comments',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'blog_posts',
    }
);

module.exports = BlogPosts;