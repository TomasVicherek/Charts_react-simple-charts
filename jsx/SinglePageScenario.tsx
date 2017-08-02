/// <reference path="../scripts/react-global.d.ts" />

var x = <div>ahoj</div>;

class ScenarioResultValueInfo {
    public ScenarioResultValueId: string;
    public DisplayName: string;
    public ResultText: string;
    public ResultNumber: number;
    public ResultTime: Date;

    public key: string;
}

class ScenarioResultInfo {
    public ScenarioResultId: string;
    public DisplayName: string;
    public TimeUtc: Date;
    public Activity: string;
    public ResultValues: ScenarioResultValueInfo[];
}

//class ControlCompo extends React.Component<ScenarioResultValueInfo, {}>{

//    render () {
//        return <div className="form-group">
//                <label>{this.props.DisplayName}</label>
//                <input type="text" id={"CI_" + this.props.ScenarioResultValueId} className="form-control" value={this.props.ResultText} />
//            </div>;
//    }
//}

var ControlCompo = (props: ScenarioResultValueInfo) =>
            <div className="form-group">
                <label>{props.DisplayName}</label>
                <input type="text" id={"CI_" + props.ScenarioResultValueId} className="form-control" value={props.ResultText} />
            </div>;


class ScenarioCompo extends React.Component<ScenarioResultInfo, {}>{

    send() {
        alert('ahoj');
    }

    render() {
        var controls = this.props.ResultValues.map(function (item) {
            console.log('item');
            item.key = "I_" + item.ScenarioResultValueId;
            return React.createElement(
                    ControlCompo,
                    item
                );

        });
        // return <div>{controls}</div>;
        return <div onClick={this.send.bind(this) }>KLIKNI</div>
    }
}

class TextBoxInfo {
    public DisplayText: string;
    public TextList: string[];
}

class TextBoxCompo extends React.Component<TextBoxInfo, TextBoxInfo>{

    constructor(prop: TextBoxInfo) {
        super(prop);
        console.log("TextBoxCompo prop", prop);
        console.log("TextBoxCompo this.state", this.state);
        this.state = { DisplayText: prop.DisplayText, TextList: prop.TextList };
    }

    handleChange(event) {
        console.log("TextBoxCompo handleChange", event);
        this.setState({
            DisplayText: event.target.value,
            TextList: this.state.TextList
        });
    }

    handleKeyDown(event: KeyboardEvent) {
        console.log("TextBoxCompohandleKeyDown", event);
        if (event.which === 13) {
            this.state.TextList.push(this.state.DisplayText);
            this.setState({
                DisplayText: "",
                TextList: this.state.TextList
            });
        }
    }


    render() {

        var controls = this.state.TextList.map(function (t: string, idx: number) {
            console.log("TextBoxCompo TextList.map", t);
            return (
                <span className="label label-default" key={idx}>{t}</span>
                );
        });

        return (
            <div>
                {controls}
                <input type="text" className="form-control" onChange={this.handleChange.bind(this) } value={this.state.DisplayText} onKeyDown={this.handleKeyDown.bind(this) } />
            </div>
        );
    }

}



function RenderPage(elemId: string, data: ScenarioResultInfo) {

    ReactDOM.render(<TextBoxCompo DisplayText="Ahoj" TextList={["Jednička"]} />, document.getElementById(elemId));

    // ReactDOM.render(<ScenarioCompo {...data} />, document.getElementById(elemId));
    //ReactDOM.render(
    //    React.createElement(ScenarioCompo, data),
    //    document.getElementById(elemId));
}

