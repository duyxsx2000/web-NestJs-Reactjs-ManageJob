import { IsNotEmpty, IsString } from "class-validator";

export class CreateJobDto {
  @IsNotEmpty()
  name: string;  
  title: string;
  date: {
    start: Date,
    expired: Date
  };
  status: string;
  deadline: string;
  detail: string;
  priority: string;
  idLeader: number;
  idStaff: number;
  recommend: number[];
}

