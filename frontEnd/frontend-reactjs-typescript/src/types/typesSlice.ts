export type Task = {
    idTask: string,
    title: string,
    actions: {
        date: Date,
        title: string,
        name: string
    }[],
    members:{
        role: string,
        id: string,
        name: string,
        notify: boolean
    }[],
    date: {
        post: Date,
        expired: Date
    },
    priority: string,
    detail: string
};
export type IDs3 = {idRoom: string, idTable: string, idTask: string}
export type UpdateTask = {
    task: Task,
    idRoom: string,
    idTable: string
}

export type CreateTable = {
    idRoom: string,
    title: string,
};

export type CreateAccount = {
    idGroup: string,
    name: string,
    email: string,
    password:string,
    role: string
}

export type CreateTask = {
    idTable: string,
    title: string,
    idRoom: string
}
export type Table = {
    idTable: string,
    title: string,
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
export type TypeMember = {

        idMember: string,
        role: string,
        status: string,
        name:string,
        email: string

}

export type AcceptMember = {
    idRoom: string,
    member: TypeMember
}
export interface CreateRoom {
    idGroup: string,
    title: string,
    mainTask: string
    members: {
        idMember: string,
        role: string,
        status: string,
        name:string,
        email: string
    }[],
    background: string,
    priority: string,

    
};
export interface TypeTable {
    title: string,
    idTable: string,
    tasks:{
        title:string,
        idTask: string
    }[]
}

export interface TypeTask {
    title: string,
}

export interface TypeRoom {
    idRoom: string,
    title: string,
    mainTask: string,
    background: 'pink' | 'red' | 'yellow' | 'green'| 'none' | 'cyan' | 'orange'
    members: {
        idMember: string,
        role:string,
        status:string,
        name: string,
        email: string
    }[],
    actions: {
        idMember: string,
        title: string,
        date: Date,
        nameMember: string
    }[]

    tables: Table[] | []
};
type MemberGroup = {
    idMember: string,
    role: string,
    email: string,
    name: string,
    date: Date
}
export interface Group {
    idGroup: string,
    members: MemberGroup[],
    rooms: TypeRoom[] | []
}


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

};

export type UpdateTable = {
    idRoom:string
    tables: {
        idTable: string,
        title: string,
        tasks?: {
            idTask: string,
            title: string
        }[]
    }[]

}