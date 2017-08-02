/// <reference path="../scripts/react-global.d.ts" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var x = React.createElement("div", null, "ahoj");
var ScenarioResultValueInfo = (function () {
    function ScenarioResultValueInfo() {
    }
    return ScenarioResultValueInfo;
}());
var ScenarioResultInfo = (function () {
    function ScenarioResultInfo() {
    }
    return ScenarioResultInfo;
}());
//class ControlCompo extends React.Component<ScenarioResultValueInfo, {}>{
//    render () {
//        return <div className="form-group">
//                <label>{this.props.DisplayName}</label>
//                <input type="text" id={"CI_" + this.props.ScenarioResultValueId} className="form-control" value={this.props.ResultText} />
//            </div>;
//    }
//}
var ControlCompo = function (props) {
    return React.createElement("div", { className: "form-group" },
        React.createElement("label", null, props.DisplayName),
        React.createElement("input", { type: "text", id: "CI_" + props.ScenarioResultValueId, className: "form-control", value: props.ResultText }));
};
var ScenarioCompo = (function (_super) {
    __extends(ScenarioCompo, _super);
    function ScenarioCompo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScenarioCompo.prototype.send = function () {
        alert('ahoj');
    };
    ScenarioCompo.prototype.render = function () {
        var controls = this.props.ResultValues.map(function (item) {
            console.log('item');
            item.key = "I_" + item.ScenarioResultValueId;
            return React.createElement(ControlCompo, item);
        });
        // return <div>{controls}</div>;
        return React.createElement("div", { onClick: this.send.bind(this) }, "KLIKNI");
    };
    return ScenarioCompo;
}(React.Component));
var TextBoxInfo = (function () {
    function TextBoxInfo() {
    }
    return TextBoxInfo;
}());
var TextBoxCompo = (function (_super) {
    __extends(TextBoxCompo, _super);
    function TextBoxCompo(prop) {
        var _this = _super.call(this, prop) || this;
        console.log("TextBoxCompo prop", prop);
        console.log("TextBoxCompo this.state", _this.state);
        _this.state = { DisplayText: prop.DisplayText, TextList: prop.TextList };
        return _this;
    }
    TextBoxCompo.prototype.handleChange = function (event) {
        console.log("TextBoxCompo handleChange", event);
        this.setState({
            DisplayText: event.target.value,
            TextList: this.state.TextList
        });
    };
    TextBoxCompo.prototype.handleKeyDown = function (event) {
        console.log("TextBoxCompohandleKeyDown", event);
        if (event.which === 13) {
            this.state.TextList.push(this.state.DisplayText);
            this.setState({
                DisplayText: "",
                TextList: this.state.TextList
            });
        }
    };
    TextBoxCompo.prototype.render = function () {
        var controls = this.state.TextList.map(function (t, idx) {
            console.log("TextBoxCompo TextList.map", t);
            return (React.createElement("span", { className: "label label-default", key: idx }, t));
        });
        return (React.createElement("div", null,
            controls,
            React.createElement("input", { type: "text", className: "form-control", onChange: this.handleChange.bind(this), value: this.state.DisplayText, onKeyDown: this.handleKeyDown.bind(this) })));
    };
    return TextBoxCompo;
}(React.Component));
function RenderPage(elemId, data) {
    ReactDOM.render(React.createElement(TextBoxCompo, { DisplayText: "Ahoj", TextList: ["Jednička"] }), document.getElementById(elemId));
    // ReactDOM.render(<ScenarioCompo {...data} />, document.getElementById(elemId));
    //ReactDOM.render(
    //    React.createElement(ScenarioCompo, data),
    //    document.getElementById(elemId));
}
//# sourceMappingURL=SinglePageScenario.js.map