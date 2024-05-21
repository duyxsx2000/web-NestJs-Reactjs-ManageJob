import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateJobDto {
  @IsNotEmpty()
  @IsString()
  name: string; 
  
  @IsString()
  title: string;
  date: {
    start: Date,
    expired: Date
  };

  @IsString()
  status: string;

  @IsString()
  deadline: string;

  @IsString()
  detail: string;

  @IsString()
  priority: string;

  @IsNumber()
  idLeader: number;
  idStaff: number;
  recommend: number[];
}

