const getTimePeriod = (date) => {
    const hours = date.getHours();
    if (hours >= 0 && hours < 9) {
        return 0;
    }
    if (hours >= 9 && hours < 12) {
        return 1;
    }
    if (hours >= 12 && hours < 16) {
        return 2;
    }
    if (hours >= 16 && hours < 22) {
        return 3;
    }
    if (hours >= 22 && hours < 24) {
        return 4;
    }
}

const getTripTimes = (actualData) => {
    const trips = {};
    
    // Creating an hashmap - keys are trip_id and the values are the relevant data
    // { TRIP_ID: [{ stop_id, time }] }
    actualData.forEach(({ trip_id, stop_id, time }) => {
        if (trips[trip_id]) {
            trips[trip_id].push({ stop_id, time })
        }
        else {
            trips[trip_id] = [{ stop_id, time }];
        }
    })
    
    // Sorting the trips arrays by their time
    for (let tripId in trips) {
        trips[tripId].sort((tripA, tripB) => new Date(tripA.time) - new Date(tripB.time));
    }
    
    // Create tripTimes object
    // { STOP_ID-STOP_ID: [ { time: TRIP_TIME, timePeriod: 0/1/2/3/4 } ]}
    const tripTimes = {};
    for (let tripId in trips) {
        const trip = trips[tripId];
        const timePeriod = getTimePeriod(new Date(trip[0].time));
        for (let i = 0; i < trip.length - 1; i++) {
            const newItem = { time: (new Date(trip[i+1].time) - new Date(trip[i].time))/(1000*60), timePeriod };
            const partTripName = `${trip[i].stop_id}-${trip[i+1].stop_id}`;
            if (!tripTimes[partTripName]) {
                tripTimes[partTripName] = [newItem];
            }
            else {
                tripTimes[partTripName].push(newItem)
            }
        }
    }
    return tripTimes;
}

const countErrors = ({ expectedData, tripTimes, selectedTrip }) => {
    const errorCount = [0, 0, 0, 0, 0];
    if (selectedTrip && tripTimes[selectedTrip]) {
        let timesArray = tripTimes[selectedTrip];
        timesArray.forEach(timeItem => {
            const expectedTime = parseInt(expectedData[timeItem.timePeriod][selectedTrip], 0);
            if (timeItem.time < expectedTime - 1 || timeItem.time > expectedTime + 1) {
                errorCount[timeItem.timePeriod]++;
            }
        })
    }
    return errorCount;
}

export { getTimePeriod, getTripTimes, countErrors };