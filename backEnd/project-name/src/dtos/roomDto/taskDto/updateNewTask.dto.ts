import { PartialType } from "@nestjs/mapped-types";
import { CreateNewTask } from "./createNewTask.dto";
import { Task } from "./task.dto";

export class UpdateNewTask extends PartialType(CreateNewTask) {}
