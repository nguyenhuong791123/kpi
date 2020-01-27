import React, { Component as C } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { curveCardinal } from 'd3-shape';

import { COLORS } from '../../utils/Types';

const toPercent = (decimal, fixed = 0) => `${(decimal * 100).toFixed(fixed)}%`;
const getPercent = (value, total) => {
    const ratio = total > 0 ? value / total : 0;
    return toPercent(ratio, 2);
};

const renderTooltipContent = (o) => {
    const { payload, label } = o;
    const total = payload.reduce((result, entry) => (result + entry.value), 0);
  
    return (
        <div className="customized-tooltip-content">
            <p className="total">{`${ label } (Total: ${ total })`}</p>
            <ul className="list">
                {
                    payload.map((entry, index) => (
                        <li key={`item-${ index }`} style={{ color: entry.color }}>
                            {`${ entry.name }: ${ entry.value }(${ getPercent(entry.value, total) })`}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

class AreaCharts extends C {
    constructor(props) {
        super(props);

        this.state = {
            type: this.props.type
            ,options: this.props.options
            ,data: this.props.data
            ,cardinal: curveCardinal.tension(0.2)
        }
    };

    _colors() {
        return COLORS[ Math.floor( Math.random() * COLORS.length ) ];
    }

    _gradientOffset(arr) {
        console.log(this.state.data);
        // const dataMax = Math.max(data.map(i => i.uv));
        // const dataMin = Math.min(data.map(i => i.uv));
        // if (dataMax <= 0) { return 0; }
        // if (dataMin >= 0) { return 1; }
        // console.log(dataMax);
        // console.log(dataMin);
        // console.log(dataMax / (dataMax - dataMin));
        // return dataMax / (dataMax - dataMin);
    };

    _renders() {
        var objs = []
        var datas = this.state.data;
        const keys = Object.keys(datas[0]);
        if(this.state.type !== "TinyAreaChart") {
            objs.push(<CartesianGrid key="cartesianGrid" strokeDasharray="3 3" />);
            objs.push(<XAxis key="xAxis" dataKey="name" />);
            if(this.state.type === "PercentAreaChart") {
                objs.push(<YAxis key="yAxis" tickFormatter={ toPercent } />);
                objs.push(<Tooltip key="tooltip" content={ renderTooltipContent }/>);
            } else if(this.state.type === "AreaChartFillByValue") {
                objs.push(<YAxis key="yAxis" />);
                objs.push(<Tooltip key="tooltip" />);

                for(var ls=0; ls<keys.length; ls++) {
                    if(ls === 0) continue;
                    var key = keys[ls];
                    var arr = [];
                    for(var d=0; d<datas.length; d++) {
                        arr.push(datas[d][key]);
                    }
                    var max = Math.max(...arr);
                    var min = Math.min(...arr);
                    var off = max / (max - min);
                    objs.push(<defs key={"defs" + [key]}>
                                <linearGradient key={ ls } id={ "splitColor_" + [key] } x1="0" y1="0" x2="0" y2="1">
                                    <stop key={ "stop_00" + [key] } offset={ off } stopColor={ this._colors() } stopOpacity={ 1 } />
                                    <stop key={ "stop_01" + [key] } offset={ off } stopColor={ this._colors() } stopOpacity={ 1 } />
                                </linearGradient>
                            </defs>);
                }
            } else {
                objs.push(<YAxis key="yAxis" />);
                objs.push(<Tooltip key="tooltip" />);  
            }
        }

        for(var o=0; o<keys.length; o++) {
            if(o === 0) continue
            if(this.state.type === "StackedAreaChart"
                || this.state.type === "PercentAreaChart") {
                objs.push(<Area key={ o } type="monotone" dataKey={ keys[o] } stroke={ this._colors() } fill={ this._colors() } stackId="1" />);
            } else if(this.state.type === "CardinalAreaChart") {
                // objs.push(<Area key={ o } type="monotone" dataKey={ keys[o] } stroke={ this._colors() } fill={ this._colors() } fillOpacity={ 0.3 } />);
                objs.push(<Area key={ o } type={ this.state.cardinal.toString() } dataKey={ keys[o] } stroke={ this._colors() } fill={ this._colors() } fillOpacity={ 0.3 } />);
            } else if(this.state.type === "AreaChartConnectNulls") {
                objs.push(<Area key={ o } connectNulls type="monotone" dataKey={ keys[o] } stroke={ this._colors() } fill={ this._colors() } />);
            } else if(this.state.type === "AreaChartFillByValue") {
                const keys = Object.keys(datas[0]);
                for(var lss=0; lss<keys.length; lss++) {
                    if(lss === 0) continue
                    objs.push(<Area key={ lss } type="monotone" dataKey={ keys[lss] } stroke={ "#000" } fill={ "url(#splitColor_" + keys[lss] + ")" } />);
                }
            } else {
                objs.push(<Area key={ o } type="monotone" dataKey={ keys[o] } stroke={ this._colors() } fill={ this._colors() } />);
            }
        }
        return objs.map((o) => { return o; });
    }

    UNSAFE_componentWillReceiveProps(props) {
        console.log('AREACHARTS componentWillReceiveProps');
        this.state.type = props.type;
        this.state.options = props.options;
        this.state.data = props.data;
    }

    render() {
        var layout = "horizontal";
        var stackOffset = "";
        if(this.state.type === "PercentAreaChart") {
            stackOffset = "expand";
        } else {
            stackOffset = "";
        }
        return (
            <AreaChart
                layout={ layout }
                stackOffset={ stackOffset }
                width={ this.state.options.width }
                height={ this.state.options.height }
                margin={ this.state.options.margin }
                data={ this.state.data }>
                { this._renders() }
            </AreaChart>
        );
    };
};

export default AreaCharts;
