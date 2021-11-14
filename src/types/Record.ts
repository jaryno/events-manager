export interface Record {
    event?: {
        type?: string
    },
    setup?: {
        nodeName?: string
    },
    time?: number
}

export interface RecordToEdit {
    index: number,
    record: Record
}