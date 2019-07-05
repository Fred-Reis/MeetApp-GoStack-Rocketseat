module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'meetApp',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
