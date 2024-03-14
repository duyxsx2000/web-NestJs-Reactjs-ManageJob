import { PartialType } from "@nestjs/mapped-types";
import { CreateTable } from "./create-table.dto";

export class UpdateTable extends PartialType(CreateTable) {}