import { IsNotEmpty, IsString } from "class-validator";

export class CreateJobDto {
    
  title: string;
  date: {
    start: Date,
    expired: Date
  };
  deadline: string;
  detail: string;
  priority: string;
  idLeader: number
  recommend: number[];
}

