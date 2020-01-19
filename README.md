# Train-Scheduler

This is a train scheduler application that uses Firebase to host arrival and departure data. The app uses Moment.js to manipulate the data and provide up-to-date arrival times, and how many minutes remain until the next train arrives. 

The user can input data, such as the train's name, destination, the first train time, and its frequency, in minutes. This data then gets appended to the existing table. The app auto updates "minutes to arrival" and "next train time" every minute.
