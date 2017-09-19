interface GraphsProps { }

class Graphs extends React.Component<GraphsProps, {}> {

    render() {

        let dataArea = [
            { time: 1422766800000, value: 0, label: "{{value}} active users" },
            { time: 1422853200000, value: 10, label: "{{value}} active users" },
            { time: 1422939600000, value: 5, label: "{{value}} active users" }
        ];

        return <div>
            <Area width={900} height={300} data={dataArea} />
            <BarMetric label="Share of IE" percent={12} metricName="Nearing Zero" />
            <CirclePie percent={34} width={200} strokeWidth={50} strokeColor={'#aaaaff'} />
        </div>
    }
}

function RenderTomovo() {
    ReactDOM.render(
        <Graphs />,
        document.getElementById('here')
    );
}