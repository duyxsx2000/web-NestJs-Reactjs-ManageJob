

export class CreateJobDto {
    name: string;
    detail: string;
    date: {
        post: string,
        start: string,
        done: string,
        expired: string
    }
}

