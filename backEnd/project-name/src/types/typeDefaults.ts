export type Table = {
    title: string,
    idTable: string,
    task: any[]
}

export type Ids3 = {
    idRoom: string,
    idTable: string,
    idTask: string,
    idUser: string
}
export type ChangeMember = {
    idTask: string,
    idRoom: string,
    idMember: string,
    name: string
}