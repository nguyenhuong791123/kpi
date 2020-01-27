import React, { Component as C } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import { COLORS } from '../../utils/Types';

class LineCharts extends C {
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
        if(this.state.type !== "TinyLineChart") {
            objs.push(<CartesianGrid key="cartesianGrid" strokeDasharray="3 3" />);
            if(this.state.type === "VerticalLineChart") {
                objs.push(<XAxis key="xAxis" type="number" />);
                objs.push(<YAxis key="yAxis" dataKey="name" type="category" />);
            } else if(this.state.type === "BiaxialLineChart") {
                objs.push(<XAxis key="xAxis" />);
                objs.push(<YAxis key="yAxis_00" yAxisId="left" />);
                objs.push(<YAxis key="yAxis_01" yAxisId="right" orientation="right" />);
            } else if(this.state.type === "VerticalLineChartWithSpecifiedDomain") {
                objs.push(<XAxis key="xAxis" domain={ [0, 'dataMax + 1000'] } />);
                objs.push(<YAxis key="yAxis" dataKey="name" type="category" />);
            } else if(this.state.type === "LineChartWithXAxisPading") {
                objs.push(<XAxis key="xAxis" dataKey="name" padding={{ left: 30, right: 30 }} />);
                objs.push(<YAxis key="yAxis" />);
            } else {
                objs.push(<XAxis key="xAxis" dataKey="name" />);
                objs.push(<YAxis key="yAxis" />);
            }
            objs.push(<Tooltip key="tooltip" />);
            objs.push(<Legend key="legend" />);
        }
        for(var i=0; i<datas.length; i++) {
            if(i > 0)
                break;
            const keys = Object.keys(datas[i]);
            for(var o=0; o<keys.length; o++) {
                if(o === 0)
                    continue
                if(this.state.type === "DashedLineChart") {
                    objs.push(<Line key={ o } type="monotone" dataKey={ keys[o] } stroke={ this._colors() } strokeDasharray={ "3 4 5 2" } />);
                } else if(this.state.type === "BiaxialLineChart") {
                    if((o%2) !== 0) {
                        objs.push(<Line key={ o } type="monotone" yAxisId="left" dataKey={ keys[o] } stroke={ this._colors() } activeDot={{ r: 8 }} />);
                    } else {
                        objs.push(<Line key={ o } type="monotone" yAxisId="right" dataKey={ keys[o] } stroke={ this._colors() } />);
                    }
                } else if(this.state.type === "LineChartConnectNulls") {
                    objs.push(<Line key={ o } connectNulls type="monotone" dataKey={ keys[o] } stroke={ this._colors() } fill={ this._colors() } />);
                } else {
                    objs.push(<Line key={ o } type="monotone" dataKey={ keys[o] } stroke={ this._colors() } />);
                }
            }
        }
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
        if(this.state.type === "VerticalLineChart"
            || this.state.type === "VerticalLineChartWithSpecifiedDomain") {
            layout = "vertical";
        } else {
            layout = "horizontal";
        }
        return (
            <LineChart
                layout={ layout }
                width={ this.state.options.width }
                height={ this.state.options.height }
                margin={ this.state.options.margin }
                data={ this.state.data }>
                { this._renders() }
            </LineChart>
        );
    };
};

export default LineCharts;
