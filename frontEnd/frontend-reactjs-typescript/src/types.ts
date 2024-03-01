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
        start: Date | string,
        expired: Date
    },
    deadline: string,
    detail: string,
    priority: string,
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
    idStaff: number,
    recommend: number[] 
}

export type CountJob = {
    status: string,
    count: number
};

export type CountJobs = {
    countJobOfDay?: CountJob[]  | null
    countJobOfMonth?: CountJob[]| null,
    countJobOfYear?: CountJob[]| null,
};
export type TaskList = {
    id: number,
    name: string
}
export interface DataTask  {
    id: number,
    name: string,
    taskList: TaskList[]
}
