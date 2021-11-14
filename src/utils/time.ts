export const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toDateString() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ":" + date.getMilliseconds()
}

// export const formatTimestamp = (timestamp: number) => new Date(timestamp).toLocaleString()
