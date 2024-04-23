import { PartialType } from "@nestjs/mapped-types";
import { CreateTable } from "./create-table.dto";
import { Table } from "./table-dto";

export class UpdateTable extends PartialType(Table) {}