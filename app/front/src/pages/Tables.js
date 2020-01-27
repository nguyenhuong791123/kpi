import React, { Component as C } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';

class Tables extends C {
    constructor(props) {
        super(props);

        this.state = {
            table: this.props.table
            ,data: this.props.data
        }
    };

    UNSAFE_componentWillReceiveProps(props) {
        console.log('TABLES componentWillReceiveProps');
        this.state.table = props.table;
        this.state.data = props.data;
    }

    render() {
        const table = this.state.table;
        var headers = (table === null)?null:table.headers;
        var title = '#';
        var objs = Object.keys(this.state.data[0]);
        if(headers === null || headers.length <= 0) {
            headers = objs;
        } else {
            title = headers[0];
            headers[0] = 'name';
        }
        console.log(headers);
        const datas = this.state.data;
        return (
            <Table striped bordered hover>
                {(() => {
                    var ths = headers.map((o, idx) => {
                        if (idx === 0) {
                            if(title === null || title.length <= 0 || title === 'name')
                                title = '#';
                            return (<th key={idx}>{ title }</th>);
                        } else {
                            return (<th key={idx}>{ o }</th>);
                        }
                    })
                    return(<thead><tr>{ ths }</tr></thead>);
                })()}

                {(() => {
                    var trs = datas.map((o, idx) => {
                        var tds = headers.map((k, i) => {
                            return (<td key={ i }>{ o[k] }</td>);
                        });
                        return (<tr key={ 'tr_' + idx }>{ tds }</tr>);
                    });
                    return(<tbody>{ trs }</tbody>);
                })()}
            </Table>
        )
    };
};

export default connect()(withRouter(Tables));
