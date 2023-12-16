import { IsNotEmpty, IsString } from "class-validator";

export class CreateJobDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsString()
    status: string;

    @IsString()
    describe: string;

    // date: {
    //     post: Date,
    //     start: Date,
    //     expriced: Date
    // }

    @IsString()
    request: string;

    image: string | null;


}

