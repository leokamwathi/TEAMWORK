

module.exports = (Sequelize) => {
  class User extends Sequelize.Model { }
  User.init({
    // attributes
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    gender: {
      type: Sequelize.STRING
    },
    jobRole: {
      type: Sequelize.STRING
    },
    department: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
  }, {
    Sequelize,
    timestamps: true,
    modelName: 'user'
    // options
  });
  return User;
};





