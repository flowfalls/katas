console.log(__dirname + "/src/seeding/factories/todo.factory.ts");
module.exports = [
  {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "root",
    password: "password",
    database: "demo",
    synchronize: false,
    logging: true,
    name: "default", //connection name
    entities: [__dirname + "/src/entity/*.ts"],
    // migrations: [__dirname + "src/migration/*.{js,ts}"],
    // subscribers: ["src/subscriber/**/*.{js,ts}"],
    cli: {
      entitiesDir: __dirname + "/src/entity/*.ts",
      // migrationsDir: __dirname + "src/migration",
      // subscribersDir: "src/subscriber",
    },
    seeds: [__dirname + "/src/seeding/seeds/*.ts"],
    factories: [__dirname + "/src/seeding/factories/*.ts"]
  },
];
