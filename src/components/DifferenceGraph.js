import React from 'react';
import { countErrors } from '../utils';
import { XYPlot, VerticalBarSeries, LabelSeries, XAxis, YAxis } from 'react-vis';

const DifferenceGraph = ({ expectedData, tripTimes, selectedTrip }) => {
    if (!selectedTrip) return null;
    const errorCount = countErrors({ expectedData, tripTimes, selectedTrip });
    const data = [
        {x: '00:00-08:59', y: errorCount[0]},
        {x: '09:00-11:59', y: errorCount[1]},
        {x: '12:00-15:59', y: errorCount[2]},
        {x: '16:00-21:59', y: errorCount[3]},
        {x: '22:00-23:59', y: errorCount[4]}
        ];
    return (
        <div style={{margin: 'auto', width: 700}}>
            <h2>Time Difference Graph</h2>
            <h3>Trip {selectedTrip}</h3>
            <XYPlot
                xType="ordinal" 
                width={700}
                height={200}
                yDomain={[0, 100]}>
            <VerticalBarSeries
                data={data}/>
                <LabelSeries
                        data={data.map(obj => {
                            return { ...obj, label: obj.y.toString() }
                        })}
                        labelAnchorX="middle"
                        labelAnchorY="text-after-edge"
                    />
            <XAxis />
            <YAxis />
            </XYPlot>
        </div>
    )
}

export default DifferenceGraph;