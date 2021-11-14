export interface EventRecord {
    event: {
        type: string
    },
    setup?: {
        nodeName?: string
    },
    time: number
}

export interface EventRecordToEdit {
    index: number,
    record: EventRecord
}