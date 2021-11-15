import {EventRecord} from "../types/EventRecord";
import EventStats from "../types/EventStats";
import {sortRecords} from "./sort";
import {msToTime} from "./helpers";

// Stats will be calculated in one loop due to performance
export const calcStats = (records: EventRecord[]): EventStats => {

    const startTime = performance.now();

    const stats: EventStats = {
        minTime: -1,
        maxTime: -1,
        avgTime: 0,
        totalTime: 0,
        eventsCount: 0,
        longestSequenceName: "",
        longestSequenceCount: 0
    }

    const len = records.length;

    if(len < 1) {
        return stats
    }

    records = sortRecords(records)

    const eventsChunks: Record<string, number> = {};

    let minDelay = Number.MAX_VALUE;
    let maxDelay = -1;
    let timeDelaySum = 0;
    let totalTime = 0;

    let lastEventCount = 0;
    let lastEvent = records[0].event.type;
    let lastTime = records[0].time;

    for (let i = 0; i < len; i++) {
        const eventType = records[i].event.type;

        // calc counts of different event types
        if(eventsChunks[eventType] === undefined) {
            eventsChunks[eventType] = 0;
        }

        // calc min/max time delay between events
        if(records[i + 1] != null) {
            let value = records[i + 1].time - records[i].time;

            if(value < minDelay) {
                minDelay = value;
            }

            if(value > maxDelay) {
                maxDelay = value;
            }
        }

        // calc mean time delay between events
        timeDelaySum += records[i].time - lastTime;
        lastTime = records[i].time;

        // calc length of the longest sequence of following input events
        if(eventType === "focus") { continue; }
        if(eventType === lastEvent) {
            lastEventCount++
        } else {

            if(eventsChunks[lastEvent] < lastEventCount) {
                eventsChunks[lastEvent] = lastEventCount;
            }
            lastEventCount = 1;
        }

        if(i === len - 1) {
            if(eventsChunks[eventType] < lastEventCount) {
                eventsChunks[eventType] = lastEventCount;
            }
        }

        lastEvent = eventType;
    }

    let longestSeqName = "";
    let longestSeqMax = 0;
    for(let key in eventsChunks) {
        if(eventsChunks[key] > longestSeqMax) {
            longestSeqMax = eventsChunks[key];
            longestSeqName = key;
        }
    }

    // calc total time of the events
    totalTime += records[records.length - 1].time - records[0].time;

    const endTime = performance.now();
    console.log(`Calc stats took ${msToTime(endTime - startTime)}`);

    return {
        minTime: minDelay === Number.MAX_VALUE ? -1 : minDelay,
        maxTime: maxDelay,
        avgTime: len > 1 ? (timeDelaySum / len - 1) : 0,
        totalTime: totalTime,
        eventsCount: Object.keys(eventsChunks).length,
        longestSequenceCount: longestSeqMax,
        longestSequenceName: longestSeqName
    }
}