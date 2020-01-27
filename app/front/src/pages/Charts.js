import React, { Component as C } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import LineCharts from './charts/LineCharts';
import AreaCharts from './charts/AreaCharts';
import BarCharts from './charts/BarCharts';
import ComposedCharts from './charts/ComposedCharts';
// import ScatterCharts from './charts/ScatterCharts';
import PieCharts from './charts/PieCharts';
import RadarCharts from './charts/RadarCharts';
import RadialBarCharts from './charts/RadialBarCharts';
import { CHART_TYPE } from '../utils/Types';

class Charts extends C {
    constructor(props) {
        super(props);

        this.state = {
            type: this.props.type
            ,isCharts: this._isChart(this.props.type)
            ,options: this.props.options
            ,data: this.props.data
        }
    };

    _isChart(type) {
        const keys = Object.keys(CHART_TYPE);
        var types = [];
        for(var i=0; i<type.length; i++) {
            for(var o=0; o<keys.length; o++) {
                if(Array.from(CHART_TYPE[keys[o]]).indexOf(type[i]) > -1)
                    types.push(keys[o]);
            }
        }
        return types;
    }

    _isConvertData() {
        if(this.state.options.notCol <= 0) return;
        for(var i=0; i<this.state.data.length; i++) {
            const dt = this.state.data[i];
            const keys = Object.keys(dt);
            for(var o=0; o<this.state.options.notCol; o++) {
                delete dt[keys[keys.length - (o + 1)]];
            }
        }
    }

    UNSAFE_componentWillReceiveProps(props) {
        console.log('CHARTS componentWillReceiveProps');
        this.state.type = props.type;
        this.state.isCharts = this._isChart(props.type);
        this.state.options = props.options;
        this.state.data = props.data;
    }

    render() {
        this._isConvertData();
        var isCharts = this.state.isCharts;
        // console.log(this.state.data);
        return (
            <div className={ "recharts-box" }>
                {(() => {
                    return isCharts.map((c, idx) => {
                        // console.log(c);
                        if (c === "LINE") {
                            return (
                                <LineCharts
                                    key={ idx }
                                    type={ this.state.type[idx] }
                                    options={ this.state.options }
                                    data={ this.state.data }/>        
                            );
                        } else if (c === "AREA") {
                            return (
                                <AreaCharts
                                    key={ idx }
                                    type={ this.state.type[idx] }
                                    options={ this.state.options }
                                    data={ this.state.data }/>        
                            );
                        } else if (c === "BAR") {
                            return (
                                <BarCharts
                                    key={ idx }
                                    type={ this.state.type[idx] }
                                    options={ this.state.options }
                                    data={ this.state.data }/>        
                            );
                        } else if (c === "COMPOSED") {
                            return (
                                <ComposedCharts
                                    key={ idx }
                                    type={ this.state.type[idx] }
                                    options={ this.state.options }
                                    data={ this.state.data }/>        
                            );
                        // } else if (c === "SCATTER") {
                        //     return (
                        //         <ScatterCharts
                        //             key={ idx }
                        //             type={ this.state.type[idx] }
                        //             options={ this.state.options }
                        //             data={ this.state.data }/>        
                        //     );
                        } else if (c === "PIE") {
                            return (
                                <PieCharts
                                    key={ idx }
                                    type={ this.state.type[idx] }
                                    options={ this.state.options }
                                    data={ this.state.data }/>        
                            );
                        } else if (c === "RADAR") {
                            return (
                                <RadarCharts
                                    key={ idx }
                                    type={ this.state.type[idx] }
                                    options={ this.state.options }
                                    data={ this.state.data }/>        
                            );
                        } else if (c === "RADIA") {
                            return (
                                <RadialBarCharts
                                    key={ idx }
                                    type={ this.state.type[idx] }
                                    options={ this.state.options }
                                    data={ this.state.data }/>        
                            );
                        } else {
                            return (
                                <div key={ idx }>Not Support Chart Is This Types[{ c }]!!!</div>
                            );
                        }
                    });
                })()}
            </div>
        );
    };
};

export default connect()(withRouter(Charts));
