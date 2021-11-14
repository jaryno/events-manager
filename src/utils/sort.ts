import {EventRecord} from "../types/EventRecord";

function swap(items: EventRecord[], leftIndex: number, rightIndex: number) {
    const temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
}

function partition(items: EventRecord[], left: number, right: number) {
    const pivot = items[Math.floor((right + left) / 2)].time; //middle element
    let i = left;
    let j = right;

    while (i <= j) {
        while (items[i].time < pivot) {
            i++;
        }
        while (items[j].time > pivot) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j);
            i++;
            j--;
        }
    }
    return i;
}

export function quickSort(items: EventRecord[], left: number, right: number) {
    let index;
    if (items.length > 1) {
        index = partition(items, left, right);
        if (left < index - 1) {
            quickSort(items, left, index - 1);
        }
        if (index < right) {
            quickSort(items, index, right);
        }
    }
    return items;
}

export const sortRecords = (records: EventRecord[]) => {
    // return quickSort(records); quick sort is slower in this example

    return records.sort(function(record1, record2) {
        if (record1.time < record2.time) {
            return -1;
        }
        if (record1.time > record2.time) {
            return 1;
        }
        return 0;
    });
}