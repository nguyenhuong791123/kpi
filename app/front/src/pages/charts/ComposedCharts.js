import React, { Component as C } from 'react';
import { ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import { COLORS } from '../../utils/Types';

class ComposedCharts extends C {
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
        objs.push(<CartesianGrid key="cartesianGrid" troke={ this._colors() } />);
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
        objs.push(<Tooltip key="tooltip" />);
        objs.push(<Legend key="legend" />);
        for(var i=0; i<datas.length; i++) {
            if(i > 0)
                break;
            const keys = Object.keys(datas[i]);
            for(var o=0; o<keys.length; o++) {
                if(o === 0)
                    continue
                if((o%2) !== 0) {
                    objs.push(<Bar key={ o } dataKey={ keys[o] } barSize={ 5 } fill={ this._colors() } />);
                } else if((o%3) !== 0 && this.state.type !== "SameDataComposedChart") {
                    objs.push(<Line key={ o } type="monotone" dataKey={ keys[o] } stroke={ this._colors() } />);            
                } else {
                    objs.push(<Area key={ o } type="monotone" dataKey={ keys[o] } fill={ this._colors() } stroke={ this._colors() } />);
                }
            }
        }
        return objs.map((o) => { return o; });
    }

    UNSAFE_componentWillReceiveProps(props) {
        console.log('COMPOSEDCHARTS componentWillReceiveProps');
        this.state.type = props.type;
        this.state.options = props.options;
        this.state.data = props.data;
    }

    render() {
        var layout = "horizontal";
        // if(this.state.type === "VerticalComposedChart") {
        //     layout = "vertical";
        // } else {
        //     layout = "horizontal";
        // }
        return (
            <ComposedChart
                layout={ layout }
                width={ this.state.options.width }
                height={ this.state.options.height }
                margin={ this.state.options.margin }
                data={ this.state.data }>
                { this._renders() }
            </ComposedChart>
        );
    };
};

export default ComposedCharts;
