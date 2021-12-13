module.exports = {
  type: "mysql",
  url: process.env.DATABASE_URL,
  logging: true,
  entities: ["./dist/entities/*.js"],
  migrations: ["./dist/migrations/*"],
};
