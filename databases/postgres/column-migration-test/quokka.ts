import { createConnection } from "typeorm";
import { SQL } from "sql-template-strings";

(async function () {
  const conn = await createConnection();
  const runner = conn.createQueryRunner();
  const s = await runner.stream(`select 3;`);
  s.on("error", (e) => console.error(e));
  for await (const i of s) {
    console.dir(i);
  }
  await conn.close();
})();

let id = 1;
const sql = SQL`select * from todo where id = ${id}`; //?

sql.text; //?
sql.values; //?
