export type Task = {
    idTask: string,
    title: string,
    actions: {
        date: Date,
        title: string,
    }[],
    date: {
        post: Date,
        expired: Date
    },
    priority: string,
    detail: string
};

export type CreateTable = {
    idRoom: string,
    title: string,
};

export type CreateTask = {
    idRoom: string
    idTable: string,
    title: string
}
export interface Table {
    idTable: string,
    title: string,
    tasks: Task[]
};

export type TitleRoom = {
    title: string,
    mainTask: string,
    idRoom: string,
    background: 'pink' | 'red' | 'yellow' | 'green'| 'none' | 'cyan' | 'orange'
}

export type ResponseDataType<T> = {
    data: T,
    message: string,
    status: number
}
export interface CreateRoom {
    idGroup: string,
    title: string,
    mainTask: string
    members: {
        idMember: string,
        role: string
    }[],
    background: string,
    priority: string
    
};

export interface TypeRoom {
    idRoom: string,
    title: string,
    mainTask: string,
    background: string
    menbers: {
        idMember: string,
        role: string,
    },
    tables: Table[]
};


export type EditTable = {
    idTable: string,
    idRoom: string,
    action: 'DELETE'
}

export type UpdateRoom = {
    idRoom: string,
    title?: string,
    mainTask?: string,
    background?: string
    menbers?: {
        idMember: string,
        role: string,
    },
    tables?: Table[]

}