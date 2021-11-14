import {Record} from "../types/Record";

export const saveRecords = (records: Record[]) => {

    const text = JSON.stringify(records);
    const name = "sample.json";
    const type = "text/plain";

    const a = document.createElement("a");
    const file = new Blob([text], { type: type });
    a.href = URL.createObjectURL(file);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
}