import React, { Component as C } from 'react';
import PropTypes from 'prop-types';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, Brush, LabelList } from 'recharts';

import { COLORS } from '../../utils/Types';

const getPath = (x, y, width, height) => `M${x},${y + height}
          C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
          C${x + width / 2},${y + height / 3} ${x + 2 * width / 3},${y + height} ${x + width}, ${y + height}
          Z`;

const TriangleBar = (props) => {
    const { fill, x, y, width, height, } = props;
    return <path d={ getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

TriangleBar.propTypes = {
    fill: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
};

const renderCustomizedLabel = (props) => {
    const { x, y, width, value, color } = props;
    const radius = 10;
    return (
        <g>
            <circle cx={ x + width / 2 } cy={ y - radius } r={ radius } fill={ color } />
            <text x={ x + width / 2 } y={ y - radius } fill="#fff" textAnchor="middle" dominantBaseline="middle">
                {value.split(' ')[1]}
            </text>
        </g>
    );
};

const monthTickFormatter = (tick) => {
        const date = new Date(tick);
        return date.getMonth() + 1;
};
  
const renderQuarterTick = (tickProps) => {
    const { x, y, payload } = tickProps;
    const { value, offset } = payload;
    const date = new Date(value);
    const month = date.getMonth();
    const quarterNo = Math.floor(month / 3) + 1;
    // const isMidMonth = month % 3 === 1;

    if (month % 3 === 1) {
        return <text x={x + offset} y={y - 4} textAnchor="middle">{`Q${quarterNo}`}</text>;
    }

    const isLast = month === 11;
    if (month % 3 === 0 || isLast) {
        const pathX = Math.floor(isLast ? x + offset * 2 : x) + 0.5;
        return <path d={`M${pathX},${y - 4}v${-35}`} stroke="red" />;
    }
    return null;
};

class BarCharts extends C {
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
        const keys = Object.keys(datas[0]);
        if(this.state.type !== "TinyBarChart") {
            objs.push(<CartesianGrid key="cartesianGrid" strokeDasharray="3 3" />);
            if(this.state.type === "BarChartWithMultiXAxis") {
                objs.push(<XAxis key="xAxis_00" dataKey="name" tickFormatter={ monthTickFormatter } />);
                objs.push(<XAxis key="xAxis_01" dataKey="name" axisLine={ false } tickLine={ false } interval={ 0 } tick={ renderQuarterTick } height={ 1 } scale="band" xAxisId="quarter" />);
            } else {
                objs.push(<XAxis key="xAxis" dataKey="name" />);
            }
            if(this.state.type === "BiaxialBarChart") {
                objs.push(<YAxis key="yAxis" orientation="left" stroke={ this._colors() } />);
                objs.push(<YAxis key="yAxis" orientation="right" stroke={ this._colors() } />);
            } else {
                objs.push(<YAxis key="yAxis" />);
            }
            objs.push(<Tooltip key="tooltip" />);
            if(this.state.type === "BrushBarChart") {
                objs.push(<Legend key="legend" verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />);
                objs.push(<ReferenceLine key="referenceLine" y={0} stroke="#000" />);
                objs.push(<Brush key="brush" dataKey="name" height={ 20 } stroke={ this._colors() } />);
            } else {
                objs.push(<Legend key="legend" />);
            }

            if(this.state.type === "PositiveAndNegativeBarChart"
                || this.state.type === "BarChartStackedBySign") {
                objs.push(<ReferenceLine key="referenceLine" y={0} stroke="#000" />);
            }
        }

        for(var o=0; o<keys.length; o++) {
            if(o === 0)
                continue
            if(this.state.type === "StackedBarChart"
                || (this.state.type === "MixBarChart" && o < (keys.length - 1))) {
                objs.push(<Bar key={ o } type="monotone" dataKey={ keys[o] } fill={ this._colors() } stackId={ "a" } />);
            } else if(this.state.type === "CustomShapeBarChart") {
                objs.push(<Bar key={ o } type="monotone" dataKey={ keys[o] } fill={ this._colors() } shape={<TriangleBar />} label={{ position: 'top' }}>
                    {
                        keys.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={ this._colors() } />
                        ))
                    }
                </Bar>);
            } else if(this.state.type === "BarChartWithMinHeight") {
                objs.push(<Bar key={ o } type="monotone" dataKey={ keys[o] } fill={ this._colors() } minPointSize={ 5 }>
                            <LabelList dataKey="name" content={ renderCustomizedLabel } />
                        </Bar>);
            } else if(this.state.type === "BarChartStackedBySign") {
                objs.push(<Bar key={ o } type="monotone" dataKey={ keys[o] } fill={ this._colors() } stackId={ "stack" } />);
            } else if(this.state.type === "BiaxialBarChart") {
                const keys = Object.keys(datas[0]);
                for(var s=0; s<keys.length; s++) {
                    if(s === 0) continue
                    if((s%2) !== 0) {
                        objs.push(<Bar key={ s } type="monotone" yAxisId="left" dataKey={ keys[s] } fill={ this._colors() } />);
                    } else {
                        objs.push(<Bar key={ s } type="monotone" yAxisId="right" dataKey={ keys[s] } fill={ this._colors() } />);
                    }
                }
            } else if(this.state.type === "BarChartHasBackground") {
                objs.push(<Bar key={ o } type="monotone" dataKey={ keys[o] } fill={ this._colors() } background={{ fill: '#eee' }} />);
            } else {
                objs.push(<Bar key={ o } type="monotone" dataKey={ keys[o] } fill={ this._colors() } />);

            }        }
        return objs.map((o) => { return o; });
    }

    UNSAFE_componentWillReceiveProps(props) {
        console.log('BARCHARTS componentWillReceiveProps');
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
            <BarChart
                layout={ layout }
                width={ this.state.options.width }
                height={ this.state.options.height }
                margin={ this.state.options.margin }
                data={ this.state.data }>
                { this._renders() }
            </BarChart>
        );
    };
};

export default BarCharts;
