export interface Todo {
    id: number
    position: number
    done?: boolean
    hour?: string // HH:mm
    task?: string
    detail?: string
}