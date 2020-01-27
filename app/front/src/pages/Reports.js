import React, { Component as C } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import Select from 'react-select';
import cloneDeep from 'lodash/cloneDeep';
// import Form from 'react-bootstrap/Form';

import { CHART_TYPE } from '../utils/Types';
import Tables from './Tables';
import Charts from './Charts';

class Reports extends C {
    constructor(props) {
        super(props);

        this._onChanged = this._onChanged.bind(this);

        this.state = {
            isUser: this.props.isUser
            ,options: this._chartOptions()
            ,defaultValue: null //{ label: CHART_TYPE.LINE[0], value: CHART_TYPE.LINE[0] }
            ,selected: [ ] //CHART_TYPE.LINE[0]
            ,items: { table: null, options: null, data: null, estdata: null }
        }
    };

    _loadDatas() {
        this.state.items.table = {
            headers: null
            //[ 'フェーズ', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月', '合計', '入社決定率' ]
            // ,goal: 10
            // ,sum: true
            // ,total: true
            // ,per: true
            // ,prediction: { per: 10, rowIdx: 2 }    
        }
        this.state.items.options = {
            width: 700
            ,height: 450
            ,margin: { top: 30, right: 50, left: 30, bottom: 20 }
            ,notCol: 2
        };
        this.state.items.data = [
            { name: 'エントリー', '1月': 30, '2月': 0, '3月': 0, '4月': 0, '5月': 0, '6月': 0, '7月': 0, '8月': 0, '9月': 0, '10月': 0, '11月': 0, '12月': 0, '合計': 30, '入社決定率': '10.0%' }
            ,{ name: 'JOB打診', '1月': 30, '2月': 0, '3月': 0, '4月': 0, '5月': 0, '6月': 0, '7月': 0, '8月': 0, '9月': 0, '10月': 0, '11月': 0, '12月': 0, '合計': 30, '入社決定率': '10.0%' }
            ,{ name: '書類推薦', '1月': 30, '2月': 0, '3月': 0, '4月': 0, '5月': 0, '6月': 0, '7月': 0, '8月': 0, '9月': 0, '10月': 0, '11月': 0, '12月': 0, '合計': 30, '入社決定率': '10.0%' }
            ,{ name: '一次面接', '1月': 10, '2月': 0, '3月': 0, '4月': 0, '5月': 0, '6月': 0, '7月': 0, '8月': 0, '9月': 0, '10月': 0, '11月': 0, '12月': 0, '合計': 10, '入社決定率': '10.0%' }
            ,{ name: 'N次面接', '1月': 5, '2月': 0, '3月': 0, '4月': 0, '5月': 0, '6月': 0, '7月': 0, '8月': 0, '9月': 0, '10月': 0, '11月': 0, '12月': 0, '合計': 5, '入社決定率': '30.0%' }
            ,{ name: '入社決定', '1月': 3, '2月': 0, '3月': 0, '4月': 0, '5月': 0, '6月': 0, '7月': 0, '8月': 0, '9月': 0, '10月': 0, '11月': 0, '12月': 0, '合計': 3, '入社決定率': '60.0%' }
            // { name: '1月', 'エントリー': 30, 'JOB打診': 30, '書類推薦': 30, '一次面接': 10, 'N次面接': 6, '入社決定': 0 }
            // ,{ name: '2月', 'エントリー': 20, 'JOB打診': 15, '書類推薦': 15, '一次面接': 5, 'N次面接': 2, '入社決定': 0 }
            // ,{ name: '3月', 'エントリー': 20, 'JOB打診': 15, '書類推薦': 15, '一次面接': 5, 'N次面接': 4, '入社決定': 4 }
            // ,{ name: '4月', 'エントリー': 20, 'JOB打診': 20, '書類推薦': 15, '一次面接': 3, 'N次面接': 3, '入社決定': 3 }
            // ,{ name: '5月', 'エントリー': 10, 'JOB打診': 20, '書類推薦': 10, '一次面接': 7, 'N次面接': 3, '入社決定': 3 }
            // ,{ name: '6月', 'エントリー': 0, 'JOB打診': 0, '書類推薦': 0, '一次面接': 0, 'N次面接': 0, '入社決定': 0 }
            // ,{ name: '7月', 'エントリー': 0, 'JOB打診': 0, '書類推薦': 0, '一次面接': 0, 'N次面接': 0, '入社決定': 0 }
            // ,{ name: '8月', 'エントリー': 0, 'JOB打診': 0, '書類推薦': 0, '一次面接': 0, 'N次面接': 0, '入社決定': 0 }
            // ,{ name: '9月', 'エントリー': 0, 'JOB打診': 0, '書類推薦': 0, '一次面接': 0, 'N次面接': 0, '入社決定': 0 }
            // ,{ name: '10月', 'エントリー': 0, 'JOB打診': 0, '書類推薦': 0, '一次面接': 0, 'N次面接': 0, '入社決定': 0 }
            // ,{ name: '11月', 'エントリー': 0, 'JOB打診': 0, '書類推薦': 0, '一次面接': 0, 'N次面接': 0, '入社決定': 0 }
            // ,{ name: '12月', 'エントリー': 0, 'JOB打診': 0, '書類推薦': 0, '一次面接': 0, 'N次面接': 0, '入社決定': 0 }
            // { name: '2000-01', uv: 4000, pv: 2400, amt: 2400, },
            // { name: '2000-02', uv: -3000, pv: 1398, amt: 2210, },
            // { name: '2000-03', uv: 2000, pv: 9800, amt: 2290, },
            // { name: '2000-04', uv: -2780, pv: 3908, amt: 2000, },
            // { name: '2000-05', uv: 1890, pv: 4800, amt: 2181, },
            // { name: '2000-06', uv: 2390, pv: 3800, amt: 2500, },
            // { name: '2000-07', uv: -3490, pv: 4300, amt: 2100, },
            // { name: '2000-08', uv: 4000, pv: 2400, amt: 2400, },
            // { name: '2000-09', uv: 3000, pv: 1398, amt: 2210, },
            // { name: '2000-10', uv: 2000, pv: 9800, amt: 2290, },
            // { name: '2000-11', uv: 2780, pv: 3908, amt: 2000, },
            // { name: '2000-12', uv: 1890, pv: 4800, amt: 2181, },
        ];

        this.state.items.estdata = [
            { name: 'エントリー', '1月': 60, '2月': 24, '3月': 24, '4月': 80, '5月': 16, '6月': 48, '7月': 68, '8月': 40, '9月': 225, '10月': 24, '11月': 10, '12月': 30, '合計': 649, '入社決定率': '39.4%', '予測増人数' : 0, '予測決定率': '0.4%', '予測合計': '' }
            ,{ name: 'JOB打診', '1月': 60, '2月': 18, '3月': 18, '4月': 80, '5月': 16, '6月': 36, '7月': 68, '8月': 40, '9月': 225, '10月': 18, '11月': 10, '12月': 30, '合計': 619, '入社決定率': '41.4%' , '予測増人数' : '', '予測決定率': '', '予測合計': '' }
            ,{ name: '書類推薦', '1月': 60, '2月': 18, '3月': 18, '4月':80, '5月': 16, '6月': 36, '7月': 68, '8月': 40, '9月': 225, '10月': 18, '11月': 10, '12月': 30, '合計': 619, '入社決定率': '41.4%' , '予測増人数' : 6, '予測決定率': '0.4%', '予測合計': 625 }
            ,{ name: '一次面接', '1月': 20, '2月': 6, '3月': 6, '4月': 60, '5月': 11, '6月': 24, '7月': 51, '8月': 30, '9月': 180, '10月': 6, '11月': 7, '12月': 10, '合計': 411, '入社決定率': '62.3%' , '予測増人数' : 4, '予測決定率': '0.6%', '予測合計': 415 }
            ,{ name: 'N次面接', '1月': 10, '2月': 2, '3月': 4, '4月': 20, '5月': 5, '6月': 24, '7月': 51, '8月': 30, '9月': 180, '10月': 4, '11月': 3, '12月': 5, '合計': 338, '入社決定率': '75.7%' , '予測増人数' : 3, '予測決定率': '0.8%', '予測合計': 341 }
            ,{ name: '入社決定', '1月': 10, '2月': 1, '3月': 2, '4月': 20, '5月': 5, '6月': 17, '7月': 41, '8月': 0, '9月': 158, '10月': 2, '11月': 0, '12月': 0, '合計': 256, '入社決定率': '' , '予測増人数' : 3, '予測決定率': '10.0%', '予測合計': 259 }
        ];
    }

    _chartOptions() {
        const keys = Object.keys(CHART_TYPE);
        return keys.map((key) => {
            return {
                label: key
                ,options: CHART_TYPE[key].map((o) => {
                        return { label: o, value: o }
                    }) 
                }
        });
    }

    _onChanged(e) {
        if (e === null) {
            this.state.selected = [];
        } else {
            this.state.selected = e.map((s) => { return s.value });
        }
        this.forceUpdate();
    }

    componentDidMount() {
        this.props.isLoading(false);
        // console.log(GET_USERS);
        // const getAllUsers = useQuery(GET_USERS);
        // console.log(JSON.stringify(getAllUsers.data, null, 2));
    }

    render() {
        this._loadDatas();
        let data = cloneDeep(this.state.items.data);
        var items = cloneDeep(this.state.items);

        return (
            <div>
                <Select isMulti options={ this.state.options } onChange={ this._onChanged.bind(this) } defaultValue={ this.state.defaultValue } placeholder={ "Please Select Chart Types!!!" } />
                <table className={ 'tbl-charts' }>
                    <tbody>
                        <tr>
                            <td>
                                <Charts type={ this.state.selected } options={ this.state.items.options } data={ data } />
                            </td>
                            {(() => {
                                if (items.estdata !== null && items.estdata.length > 0) {
                                    var estchart = cloneDeep(this.state.items);
                                    estchart.options.notCol = 5;
                                    return (<td><Charts type={ this.state.selected } options={ estchart.options } data={ estchart.estdata } /></td>);
                                }
                            })()}
                        </tr>
                    </tbody>
                </table>
                <Tables table={ this.state.items.table } data={ this.state.items.data } />
                {(() => {
                    if (items.estdata !== null && items.estdata.length > 0) {
                        items.table.headers = Object.keys(items.estdata[0]);
                        // items.table.headers.push('予測増人数', '予測決定率', '予測合計');
                        return (<Tables table={ items.table } data={ items.estdata } />);
                    }
                })()}
            </div>
        )
    };
};

export default connect()(withRouter(Reports));