import { PartialType } from "@nestjs/mapped-types";
import { CreateTable } from "./create-table.dto";
import { Table } from "./table-dto";
import { TableUpdate } from "./tableUpdate.dto";

export class UpdateTableNew extends PartialType(TableUpdate) {}