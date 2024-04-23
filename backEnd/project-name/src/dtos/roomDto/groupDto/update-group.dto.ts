import { PartialType } from "@nestjs/mapped-types";
import { CreateGroup } from "./create-group.dto";

export class UpdateGroup extends PartialType(CreateGroup){}