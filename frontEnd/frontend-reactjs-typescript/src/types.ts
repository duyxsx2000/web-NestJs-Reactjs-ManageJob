export type UserAuth = {
    email: string,
    name: string,
    role: string,
    id: number,
}

export type CreateJob = {
    title: string,
    name: string,
    date: {
        start: Date,
        expired: Date
    },
    deadline: string,
    detail: string,
    priority: string,
    idLeader: number
    recommend: number[],

}
export type CreateUser = {
    email: string,
    name: string,
    position: string,
    role: string,
    level: string,
    phone: number,
    password: string,
    image: string,
    [key: string]: string | number ;
};

export type User ={
    email: string,
    name: string,
    position: string,
    role: string,
    level: string,
    phone: number,
    password: string,
    id: number,
    idJobs: number[],
    wage: number
}

export type ResponseType = {
    data: {} | null;
    statusCode: number;
    message: string;
}

export type AcctionType = any

export type JobType = {
    idJob: number,
    date: {
      post: Date,
      start: Date,
      expired: Date
    },
    name:string
    title: string, 
    status: string,
    priority:string,
    deadline: string,
    detail: string,
    idLeader: number,
    recommend: Number[] 
}