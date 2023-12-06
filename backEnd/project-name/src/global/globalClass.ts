export class ResponseData<D> {
    
    data: D | D[] | null;
    statusCode: number;
    message: string;
    
    constructor(data: D | D[], statusCode: number, mesage: string) {
        this.data = data;
        this.statusCode = statusCode;
        this.message = mesage
    }
}