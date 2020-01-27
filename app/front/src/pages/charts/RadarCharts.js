import React, { Component as C } from 'react';
import {  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

import { COLORS } from '../../utils/Types';

class RadarCharts extends C {
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
        objs.push(<PolarGrid key="polarGrid" />);
        objs.push(<PolarAngleAxis key="polarAngleAxis" dataKey="name" />);
        if(this.state.type === "SimpleRadarChart") {
            objs.push(<PolarRadiusAxis key="polarRadiusAxis" />);
        } else {
            objs.push(<PolarRadiusAxis key="polarRadiusAxis" angle={ 30 } domain={[ 0, 150 ]} />);
        }
        for(var i=0; i<datas.length; i++) {
            if(i > 0)
                break;
            const keys = Object.keys(datas[i]);
            for(var o=0; o<keys.length; o++) {
                if(o === 0)
                    continue
                objs.push(<Radar key={ o } name="" dataKey={ keys[o] } stroke={ this._colors() } fill={ this._colors() } fillOpacity={ 0.6 } />);
            }
        }
        return objs.map((o) => { return o; });
    }

    UNSAFE_componentWillReceiveProps(props) {
        console.log('RADARCHARTS componentWillReceiveProps');
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
            <RadarChart
                layout={ layout }
                width={ this.state.options.width }
                height={ this.state.options.height }
                margin={ this.state.options.margin }
                data={ this.state.data }>
                { this._renders() }
            </RadarChart>
        );
    };
};

export default RadarCharts;
