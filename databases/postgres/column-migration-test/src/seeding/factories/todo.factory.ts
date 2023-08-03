import * as Faker from '@faker-js/faker';
import { define } from "typeorm-seeding";

import { Todo } from "../../entity/ToDo";

define(Todo, () => {
  console.log('creating TODO');
  const todo = new Todo();
  todo.singleUUID = 'test';
  return todo;
});
