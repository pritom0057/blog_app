import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

// Define the attributes of the BlogPost
interface BlogPostAttributes {
    id: number;
    title: string;
    content: string;
    author: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// Define creation attributes excluding 'id' since it will be auto-incremented
interface BlogPostCreationAttributes extends Optional<BlogPostAttributes, 'id'> {}

// Extend the Sequelize Model class
class BlogPost extends Model<BlogPostAttributes, BlogPostCreationAttributes>
    implements BlogPostAttributes {
    public id!: number;
    public title!: string;
    public content!: string;
    public author!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // Any additional methods for BlogPost can go here
}

// Initialize the BlogPost model
BlogPost.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'BlogPosts',
        timestamps: true, // Make sure Sequelize manages the timestamps
    }
);

export default BlogPost;
