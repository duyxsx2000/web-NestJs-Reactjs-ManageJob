import { PartialType } from "@nestjs/mapped-types";
import { CreateTask } from "./create-task.dto";
import { Task } from "./task.dto";

export class UpdateTask extends PartialType(Task) {}