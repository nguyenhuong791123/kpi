import React, { Component as C } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

import { COLORS } from '../../utils/Types';

class ScatterCharts extends C {
    constructor(props) {
        super(props);

        this.state = {
            type: this.props.type
            ,options: this.props.options
            ,data: this.props.data
        }
    };

    _colors() {
        return COLORS[ Math.floor( Math.random() * COLORS.length ) ];
    }

    _renders() {
        var objs = []
        var datas = this.state.data;
        objs.push(<CartesianGrid key="cartesianGrid" />);
        if(this.state.type === "VerticalComposedChart") {
            objs.push(<XAxis key="xAxis" type="number" />);
            objs.push(<YAxis key="yAxis" dataKey="name" type="category" />);
        } else if(this.state.type === "ComposedChartWithAxisLabels") {
                objs.push(<XAxis key="xAxis" dataKey="name" label={{ value: 'フェーズ', position: 'insideBottomRight', offset: 0 }} />);
                objs.push(<YAxis key="yAxis" label={{ value: 'Index', angle: -90, position: 'insideLeft' }} />);
        } else {
            objs.push(<XAxis key="xAxis" dataKey="name" />);
            objs.push(<YAxis key="yAxis" />);
        }
        for(var i=0; i<datas.length; i++) {
            if(i > 0)
                break;
            const keys = Object.keys(datas[i]);
            for(var o=0; o<keys.length; o++) {
                if(o === 0)
                    continue
                if((o%2) !== 0) {
                    objs.push(<XAxis key={ "xAxis_" + o } type="number" dataKey={ keys[o] } name="stature" unit="cm" />);
                // } else if((o%3) !== 0 && this.state.type !== "SameDataComposedChart") {
                //     objs.push(<Line type="monotone" dataKey={ keys[o] } stroke={ this._colors() } />);            
                } else {
                    objs.push(<YAxis key={ "yAxis_" + o } type="number" dataKey={ keys[o] } name="weight" unit="kg" />);
                }
            }
        }
        objs.push(<Tooltip key="tooltip" cursor={{ strokeDasharray: '3 3' }} />);
        objs.push(<Scatter key="scatter" name="A school" data={datas} fill={ this._colors() } />);
        return objs.map((o) => { return o; });
    }

    UNSAFE_componentWillReceiveProps(props) {
        console.log('LINECHARTS componentWillReceiveProps');
        this.state.type = props.type;
        this.state.options = props.options;
        this.state.data = props.data;
    }

    render() {
        var layout = "horizontal";
        if(this.state.type === "VerticalComposedChart") {
            layout = "vertical";
        } else {
            layout = "horizontal";
        }
        return (
            <ScatterChart
                layout={ layout }
                width={ this.state.options.width }
                height={ this.state.options.height }
                margin={ this.state.options.margin }
                data={ this.state.data }>
                { this._renders() }
            </ScatterChart>
        );
    };
};

export default ScatterCharts;
