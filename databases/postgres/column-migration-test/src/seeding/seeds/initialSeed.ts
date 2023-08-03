import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";

import { Todo } from "../../entity/Todo";

export default class TodoSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    console.log('running TODO seed');
    await factory(Todo)().createMany(100);
  }
}
