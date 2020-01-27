import React, { Component as C } from 'react';
import { RadialBarChart, RadialBar, Legend } from 'recharts';

import { COLORS } from '../../utils/Types';

const style = {
    top: 0,
    left: 350,
    lineHeight: '24px',
};

class RadialBarCharts extends C {
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
        for(var i=0; i<datas.length; i++) {
            if(i > 0)
                break;
            const keys = Object.keys(datas[i]);
            for(var o=0; o<keys.length; o++) {
                if(o === 0 || o > 1)
                    continue
                objs.push(<RadialBar key={ o } minAngle={ 15 } label={{ position: 'insideStart', fill: this._colors() }} background clockWise dataKey={ keys[o] } />);
            }
        }
        objs.push(<Legend key="legend" iconSize={ 10 } width={ 120 } height={140} layout="vertical" verticalAlign="middle" wrapperStyle={ style } />);
        return objs.map((o) => { return o; });
    }

    UNSAFE_componentWillReceiveProps(props) {
        console.log('RADIABARCHARTS componentWillReceiveProps');
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
        for(var i=0; i<this.state.data.length; i++) {
            this.state.data[i]['fill'] = this._colors();
        }

        return (
            <RadialBarChart
                layout={ layout }
                width={ this.state.options.width }
                height={ this.state.options.height }
                margin={ this.state.options.margin }
                cx={ 150 }
                cy={ 150 }
                innerRadius={ 20 }
                outerRadius={ 140 }
                barSize={ 10 }
                data={ this.state.data }>
                { this._renders() }
            </RadialBarChart>
        );
    };
};

export default RadialBarCharts;
