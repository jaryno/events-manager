# Events Manager

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## App Description
Run `npm start` or `npm build` to view events manager.
These commands will run HTTP server on background ([http://localhost:3030](http://localhost:3030)).

App will fetch data from server and renders list of recorded events.
It is possible to reorder, save and delete each event.

To download (edited) events, click on button "Save".

To view stats, click on button "Stats".

I tried to calc all stats with complexity O(n) at one loop, but it is needed to sort data before calc stats.
For this purpose I create Quick Sort function, but JS sort function seems to has better performance. 

I was thinking to move calculations on server (database) for better performance, but this depends on amount of data.
Since there are only thousands of events, it is possible to calc data on client.

It is also possible to calc stats in new thread with Web Workers.