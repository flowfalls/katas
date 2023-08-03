#!/usr/bin/env node --unhandled-rejections=strict
import { program } from "commander";
import { Todo } from "./entity/Todo";
import { createConnection, getConnectionOptions } from "typeorm";
import Debug = require("debug");

const debug = Debug("app");

program.version("0.0.1");
program.description(`Todo cli - typeorm skel project`);
program.option("--debug", "Show connection options");
program.command("create <desc>").description("Create a todo").action(addTodo);
program.command("ls").description("Show todos").option("--completed").action(lsTodo);

program.parseAsync();

async function addTodo(desc) {
  debug("ConnectionOptions: %j", await getConnectionOptions());
  const c = await createConnection();
  const todo = new Todo();
  todo.desc = desc;
  await todo.save();
  c.close();
}

async function lsTodo() {
  debug("ConnectionOptions: %j", await getConnectionOptions());
  const c = await createConnection();
  const todos = await Todo.find();
  console.dir(todos);
  c.close();
}
