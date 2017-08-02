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
var SinglePageAppCompo = (function (_super) {
    __extends(SinglePageAppCompo, _super);
    function SinglePageAppCompo(p) {
        var _this = _super.call(this, p) || this;
        console.log("SinglePageAppCompo constructor", p);
        _this.state = { Mood: "good" };
        return _this;
    }
    SinglePageAppCompo.prototype.clickMood = function () {
        console.log("SinglePageAppCompo clickMood", this.state);
        if (this.state.Mood == "good")
            this.setState({ Mood: "bad" });
        else
            this.setState({ Mood: "good" });
    };
    SinglePageAppCompo.prototype.render = function () {
        var icon = this.state.Mood == "good" ? (React.createElement("span", { className: "glyphicon glyphicon-thumbs-up" })) : (React.createElement("span", { className: "glyphicon glyphicon-thumbs-down" }));
        return (React.createElement("div", { className: "jumbotron" },
            React.createElement("h1", null,
                "Hello ",
                this.props.Who),
            React.createElement("button", { type: "button", className: "btn btn-primary btn-lg", onClick: this.clickMood.bind(this) }, icon)));
    };
    return SinglePageAppCompo;
}(React.Component));
function RenderSinglePageApp(elemId) {
    ReactDOM.render(React.createElement(SinglePageAppCompo, { Who: "Charles" }), document.getElementById(elemId));
}
//# sourceMappingURL=SinglePageApp.js.map