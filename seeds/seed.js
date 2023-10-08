const sequelize = require('../config/connection');
const { User, Comments, BlogPosts } = require('../models');
const userData = require('./userData.json');



const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Comments.bulkCreate();
    
  await BlogPosts.bulkCreate();  

  process.exit(0);
}

seedDatabase();