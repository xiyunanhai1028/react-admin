import React, {Component} from "react"
import {Card, Button} from "antd"
import ReactEcharts from 'echarts-for-react'
export default class Bar extends Component {

    getOption = () => {
        return {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data: ['销量', '库存']
            },
            xAxis: {
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            },
                {
                    name: '库存',
                    type: 'bar',
                    data: [25, 24, 46, 20, 15, 26]
                }]
        }
    }

    render() {
        const title = (
            <Button type="primary">更新</Button>
        )
        return (
            <Card title={title}>
                <ReactEcharts
                    option={this.getOption()}/>
            </Card>

        )
    }
}