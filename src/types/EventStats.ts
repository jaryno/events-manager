export default interface EventStats {
    minTime: number
    maxTime: number
    avgTime: number
    totalTime: number
    eventsCount: number
    longestSequenceName: string
    longestSequenceCount: number
}