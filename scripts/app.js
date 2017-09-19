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
var numberToString = function (value) {
    if (typeof value !== 'number')
        return value;
    if (value > 1000000000)
        return Math.round(value / 100000000) / 10 + 'B';
    if (value > 10000000)
        return Math.round(value / 1000000) + 'M';
    if (value > 1000000)
        return Math.round(value / 100000) / 10 + 'M';
    if (value > 10000)
        return Math.round(value / 1000) + 'K';
    if (value > 1000)
        return Math.round(value / 100) / 10 + 'K';
    return Math.round(value * 100) / 100;
};
var Area = (function (_super) {
    __extends(Area, _super);
    function Area() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tipsData = {};
        _this.xAxisLabels = [];
        return _this;
    }
    Area.prototype.describeLine = function (data, xMin, yMin, xSpread, ySpread, xScale, yScale) {
        var _this = this;
        var isZero = ySpread === 0 && yMin === 0;
        return data.map(function (point, index) { return Math.max(0, (point.time - xMin) * xScale - _this.props.strokeWidth) + "," + (isZero ? yScale : (ySpread - (point.value - yMin)) * yScale); }).join(' ');
    };
    Area.prototype.centerElement = function (el, center, width, setWidth) {
        if (setWidth === void 0) { setWidth = false; }
        if (setWidth)
            el.setAttribute('width', width);
        var xPos = center - width / 2;
        el.setAttribute('x', xPos);
    };
    Area.prototype.showPointTip = function (point, event) {
        //let scope = this.refs[point.ref],
        //    background = scope.getElementsByClassName('tip-background')[0],
        //    textDate = scope.getElementsByClassName('tip-text-date')[0],
        //    textValue = scope.getElementsByClassName('tip-text-value')[0]
        //this.centerElement(textDate, this.tipsData[point.ref].xBase, textDate.getBBox().width)
        //this.centerElement(textValue, this.tipsData[point.ref].xBase, textValue.getBBox().width)
        //this.centerElement(background, this.tipsData[point.ref].xBase, Math.max(textDate.getBBox().width, textValue.getBBox().width) + this.props.tipsPadding * 2, true)
        //scope.style.display = 'block'
    };
    Area.prototype.hidePointTip = function (point, event) {
        //this.refs[point.ref].style.display = 'none'
    };
    Area.prototype.renderTipText = function (text, data) {
        return text
            .replace('{{date}}', moment(data.date).format(data.dateFormat || 'YYYY-MM-DD'))
            .replace('{{date1}}', moment(data.date1).format(data.dateFormat || 'YYYY-MM-DD'))
            .replace('{{date2}}', moment(data.date2).format(data.dateFormat || 'YYYY-MM-DD'))
            .replace('{{value}}', numberToString(data.value));
    };
    Area.prototype.renderTips = function (data, xMin, yMin, xSpread, ySpread, xScale, yScale) {
        var _this = this;
        var intervalLength;
        var dateFormat;
        var tipText;
        var followingTime;
        var label = '{{value}} views', day = 86400000, isZero = ySpread === 0 && yMin === 0;
        if (data.length === 0)
            return;
        else if (data.length === 1)
            intervalLength = 0;
        else
            intervalLength = data[1].time - data[0].time;
        if (intervalLength > day * 27 && intervalLength < day * 32) {
            dateFormat = 'MMMM';
            tipText = '{{date}}';
        }
        else if (intervalLength > day) {
            dateFormat = 'MMM Do';
            tipText = '{{date1}} through {{date2}}';
        }
        else {
            dateFormat = 'MMM Do';
            tipText = '{{date}}';
        }
        return data.map(function (point, index) {
            if (index === 0 || index === data.length - 1)
                return;
            if (data[index + 1])
                followingTime = data[index + 1].time;
            else
                followingTime = point.time + intervalLength;
            if (!point.label)
                point.label = label;
            var xBase = (point.time - xMin) * xScale, key = 'point_' + index + '_tooltip', pointTimeFormat = dateFormat, tipHeight = 38, tipOffset = 25, yBase = (isZero ? yScale : (ySpread - (point.value - yMin)) * yScale) - _this.props.tipsPadding / 2, triangleWidth = 25, triagleHeight = 10, trianglePath = [
                (xBase - _this.props.tipStrokeWidth - triangleWidth / 2) + ',' + (yBase - tipOffset + 9),
                (xBase - _this.props.tipStrokeWidth + triangleWidth / 2) + ',' + (yBase - tipOffset + 9),
                xBase - _this.props.tipStrokeWidth + ',' + (yBase - tipOffset + triagleHeight + 9),
            ].join(' '), triangleBorderPath = [
                (xBase - _this.props.tipStrokeWidth - triangleWidth / 2) + ',' + (yBase - tipOffset + 10),
                (xBase - _this.props.tipStrokeWidth + triangleWidth / 2) + ',' + (yBase - tipOffset + 10),
                xBase - _this.props.tipStrokeWidth + ',' + (yBase - tipOffset + triagleHeight + 10),
            ].join(' ');
            _this.tipsData[key] = { xBase: xBase };
            if ((new Date(point.time)).getFullYear() !== (new Date()).getFullYear()) {
                pointTimeFormat += ' YYYY';
            }
            return (React.createElement("g", { key: "point-" + index, ref: key, style: { display: 'none' } },
                React.createElement("rect", { className: "tip-background", x: (point.time - xMin) * xScale - _this.props.strokeWidth - _this.props.tipsWidth / 2, y: yBase - tipHeight - tipOffset, width: _this.props.tipsWidth + _this.props.tipsPadding, height: tipHeight + _this.props.tipsPadding, style: { stroke: _this.props.tipStrokeColor, strokeWidth: _this.props.tipStrokeWidth, fill: _this.props.tipsFill } }),
                React.createElement("polygon", { points: triangleBorderPath, style: { stroke: _this.props.tipStrokeColor, opacity: 0.5, strokeWidth: _this.props.tipStrokeWidth } }),
                React.createElement("polygon", { points: trianglePath, style: { fill: _this.props.tipsFill } }),
                React.createElement("text", { className: "tip-text-date", x: xBase - _this.props.tipsWidth / 2 + 2, y: yBase - _this.props.strokeWidth - tipHeight - tipOffset + _this.props.tipsPadding + 10, style: { fontSize: 14, fontWeight: 'lighter' }, dangerouslySetInnerHTML: { __html: _this.renderTipText(tipText, { dateFormat: pointTimeFormat, date: point.time, date1: point.time, date2: followingTime, value: point.value }) } }),
                React.createElement("text", { className: "tip-text-value", x: xBase - _this.props.tipsWidth / 2 + 2, y: yBase - _this.props.strokeWidth - tipHeight - tipOffset + _this.props.tipsPadding + 30, style: { fontSize: 16, fontWeight: 'bold' }, dangerouslySetInnerHTML: { __html: _this.renderTipText(point.label, { dateFormat: pointTimeFormat, date: point.time, date1: point.time, date2: followingTime, value: point.value }) } })));
        });
    };
    Area.prototype.renderPoints = function (data, xMin, yMin, xSpread, ySpread, xScale, yScale) {
        var _this = this;
        var isZero = ySpread === 0 && yMin === 0;
        return data.map(function (point, index) {
            if (index === 0 || index === data.length - 1)
                return;
            return React.createElement("circle", { key: "point-" + index, cx: (point.time - xMin) * xScale - _this.props.strokeWidth / 2, cy: isZero ? yScale : (ySpread - (point.value - yMin)) * yScale, r: _this.props.pointsRadius, onMouseOver: _this.showPointTip.bind(_this, { ref: "point_" + index + "_tooltip" }), onMouseLeave: _this.hidePointTip.bind(_this, { ref: "point_" + index + "_tooltip" }), style: { stroke: _this.props.strokeColor, strokeWidth: _this.props.strokeWidth, fill: 'white', cursor: 'default' } });
        });
    };
    Area.prototype.renderLabel = function (label, index, activeWidth) {
        if (!label.x) {
            if (this.props.yLabelsPosition === 'right')
                label.x = activeWidth + (this.props.yLabelsOutside ? 5 : -1 * (20 + (5 * (label.txt.length || 1))));
            else
                label.x = 20;
        }
        if (!label.ref)
            label.ref = Math.random() + '.' + Math.random();
        return (React.createElement("text", { key: "graph.xAxis.label." + (index || Math.random()), x: label.x, y: label.y, ref: label.ref, fill: this.props.labelColor, style: { fontSize: this.props.labelFontSize, textShadow: this.props.labelTextShadow } }, label.txt));
    };
    Area.prototype.renderYGridLine = function (label, index, activeWidth) {
        return (React.createElement("line", { key: "graph.ygridLine." + index, x1: "0", y1: label.y, x2: activeWidth - this.props.strokeWidth, y2: label.y, fill: this.props.labelColor, style: { stroke: this.props.gridColor, strokeWidth: 1 } }));
    };
    Area.prototype.describeYAxis = function (yMin, ySpread, yScale, yPadding) {
        function ruler(value, m) {
            if (!m)
                m = 100;
            if (value > m)
                ruler(value, m * 5);
            return Math.ceil(value / m) * m / 10;
        }
        var rule = ruler(ySpread, ySpread / 10), lines = [1, 2, 3, 4, 5, 6, 7, 8, 9], labels = [0, 1, 2, 3, 4], isZero = ySpread === 0 && yMin === 0;
        return {
            gridLines: lines.map(function (k) { return { y: isZero ? yScale : (ySpread - k * rule) * yScale }; }),
            labels: labels.map(function (k) {
                var v = k * rule * 2;
                return {
                    y: isZero
                        ? yScale
                        : (ySpread - k * rule * 2) * yScale,
                    txt: numberToString(v + yMin)
                };
            })
        };
    };
    Area.prototype.describeXAxis = function (xMin, xSpread, xScale, data, height) {
        var keys = [1, 2, 3, 4, 5, 6, 7, 8, 9], keyInterval = data.length / keys.length, dateFormat = 'ddd', labels = [], day = 86400000;
        if (xMin < 10000)
            return { labels: [] }; // No timestamps given
        if (keys.length > data.length) {
            keys = data.map(function (p, i) { return i + 1; });
            keyInterval = 1;
        }
        if (xSpread > day * 365 * 7)
            dateFormat = 'YYYY'; // > 7 years
        else if (xSpread > day * 30 * 9)
            dateFormat = 'MMM'; // > 9 Months
        else if (xSpread > day * 7)
            dateFormat = 'MMM Do'; // > a week
        keys.forEach(function (k, i) {
            var time = xMin + (k * (xSpread / keys.length));
            // Skip last item
            if (i < keys.length - 1)
                labels.push({
                    txt: moment(time).format(dateFormat),
                    time: time,
                    x: (time - xMin) * xScale,
                    y: height + 30,
                    ref: 'xLabel.' + i
                });
        });
        this.xAxisLabels = labels;
        return {
            labels: labels
        };
    };
    Area.prototype.centerXAxisLabelMarkers = function () {
        //this.xAxisLabels.forEach(label=>{
        //  let domLabel = this.refs[label.ref]
        //  this.centerElement(domLabel, label.x, domLabel.getBBox().width)
        //})
    };
    Area.prototype.componentDidMount = function () {
        this.centerXAxisLabelMarkers();
    };
    Area.prototype.componentDidUpdate = function () {
        this.centerXAxisLabelMarkers();
    };
    Area.prototype.render = function () {
        var _this = this;
        var data = this.props.data;
        var activeWidth = this.props.width;
        var activeHeight = this.props.height - 50; // add 50 px in the bottom for the labels
        // Let's ensure all data has a timeStamp
        //data.forEach((point,index)=>{
        //  if(!point.time){
        //    data[index].time = index
        //  }
        //  data[index].time = parseFloat(data[index].time)
        //})
        // let xMax = this.props.data.length - 1
        var xMax = Math.max.apply(Math, data.map(function (point, index) { return point.time; }).concat([data.length])), //either a timestamp or number of items
        yMax = Math.max.apply(Math, data.map(function (point) { return point.value; })) * (1 + 1 / this.props.yPadding), 
        // xMin = 0,
        xMin = Math.min.apply(Math, data.map(function (point, index) { return point.time; })), //either smallest timestamp or 0
        yMin = this.props.useDynamicYMin ? Math.min.apply(Math, data.map(function (point) { return point.value; })) - yMax / 5 : 0, xSpread = (xMax - xMin), ySpread = (yMax - yMin), xScale = activeWidth / (xSpread || 1), yScale = activeHeight / (ySpread || 1), yPadding = yMax / this.props.yPadding, line = this.describeLine(data, xMin, yMin, xSpread, ySpread, xScale, yScale), yAxis = this.describeYAxis(yMin, ySpread, yScale, yPadding), xAxis = this.describeXAxis(xMin, xSpread, xScale, data, activeHeight), isZero = ySpread === 0 && yMin === 0;
        return (React.createElement(Chart, { width: this.props.width, height: this.props.height, type: "area" },
            yAxis.gridLines.map(function (label, index) { return _this.renderYGridLine(label, index, activeWidth); }),
            React.createElement("polygon", { points: "0," + ((isZero ? yScale : ySpread * yScale) - this.props.strokeWidth) + " " + line + " " + ((xMax - xMin) * xScale - this.props.strokeWidth) + "," + ((isZero ? yScale : ySpread * yScale) - this.props.strokeWidth), style: { fill: this.props.fillColor, strokeWidth: 0 } }),
            React.createElement("polyline", { points: line, style: { stroke: this.props.strokeColor, strokeWidth: this.props.strokeWidth, fill: 'none' } }),
            yAxis.labels.map(this.renderLabel.bind(this)),
            xAxis.labels.map(function (label, index) { return React.createElement("line", { key: "graph.xAxis.label." + index, ref: label.ref + '.marker', x1: label.x, x2: label.x, y1: activeHeight, y2: activeHeight + 10, stroke: _this.props.gridColor, strokeWidth: 1 }); }),
            xAxis.labels.map(this.renderLabel.bind(this)),
            this.renderPoints(data, xMin, yMin, xSpread, ySpread, xScale, yScale),
            this.renderTips(data, xMin, yMin, xSpread, ySpread, xScale, yScale)));
    };
    Area.defaultProps = {
        width: 640,
        height: 320,
        border: 'none',
        strokeWidth: 2,
        useDynamicYMin: false,
        strokeColor: '#408AE5',
        pointsRadius: 5,
        tipsWidth: 240,
        tipsHeight: 22,
        tipsPadding: 10,
        tipStrokeWidth: 1,
        tipStrokeColor: '#BBBBBB',
        tipsFill: 'white',
        gridColor: 'rgba(230,230,230,.5)',
        labelFontSize: 12,
        labelTextShadow: '1px 1px #fff',
        labelColor: '#555',
        fillColor: 'rgba(191, 216, 246, 0.3)',
        maxOverflow: 20,
        yLabelsOutside: false,
        yLabelsPosition: 'left',
        yPadding: 10,
        data: [],
    };
    return Area;
}(React.Component));
var BarMetric = (function (_super) {
    __extends(BarMetric, _super);
    function BarMetric() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BarMetric.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("div", { style: { fontSize: 13, textTransform: 'uppercase' } }, this.props.label),
            React.createElement("div", { className: "bar-row" },
                React.createElement("div", { style: {
                        backgroundColor: this.props.barRailColor,
                        width: this.props.barWidth + '%',
                        height: this.props.barHeight,
                        marginTop: 4,
                        display: 'inline-block',
                        position: 'relative'
                    } },
                    React.createElement("div", { style: {
                            width: this.props.percent + '%',
                            height: this.props.barHeight,
                            position: 'absolute',
                            backgroundColor: this.props.barColor,
                            top: 0,
                            left: 0,
                            bottom: 0,
                            transition: 'all .5s'
                        } })),
                React.createElement("div", { style: {
                        width: 100 - this.props.barWidth + '%',
                        paddingLeft: this.props.metricPadding,
                        fontSize: 13,
                        display: 'inline-block',
                        color: this.props.metricColor,
                        textAlign: 'right'
                    } }, (this.props.value ? this.props.value + " " : "") + this.props.metricName)),
            React.createElement("br", { style: { display: 'table', clear: 'both' } })));
    };
    BarMetric.defaultProps = {
        metricName: 'points',
        value: 0,
        percent: 100,
        metricPadding: 15,
        metricColor: '#777',
        barWidth: 70,
        barHeight: 7,
        barRailColor: '#ddd',
        barColor: '#408AE5',
        label: 'N/A'
    };
    return BarMetric;
}(React.Component));
var CirclePie = (function (_super) {
    __extends(CirclePie, _super);
    function CirclePie() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CirclePie.prototype.polarToCartesian = function (centerX, centerY, radius, angleInDegrees) {
        var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    };
    ;
    CirclePie.prototype.describeArc = function (x, y, radius, startAngle, endAngle) {
        if (!x || !y)
            console.error('x or y missing to describeArc');
        var start = this.polarToCartesian(x, y, radius, endAngle), end = this.polarToCartesian(x, y, radius, startAngle), arcSweep = endAngle - startAngle <= 180 ? "0" : "1";
        return [
            "M", start.x, start.y,
            "A", radius, radius, 0, arcSweep, 0, end.x, end.y
        ].join(" ");
    };
    ;
    CirclePie.prototype.render = function () {
        var radius = this.props.width / 2 - this.props.strokeWidth / 2 - this.props.padding, center = radius + this.props.strokeWidth / 2 + this.props.padding, startAngle = 0, endAngle = 3.6 * this.props.percent, arc = this.describeArc(center, center, radius, startAngle, endAngle);
        return (React.createElement(Chart, { width: this.props.width, height: this.props.height, border: this.props.border },
            React.createElement("circle", { cx: center, cy: center, r: radius, fill: this.props.fillColor, stroke: this.props.railColor, strokeWidth: this.props.strokeWidth }),
            React.createElement("path", { fill: this.props.fillColor, stroke: this.props.strokeColor, strokeWidth: this.props.strokeWidth, d: arc }),
            React.createElement("text", { x: center, y: center, dx: "-.5em", dy: ".4em", fill: this.props.labelColor, fontSize: this.props.labelFontSize }, this.props.percent + "%")));
    };
    CirclePie.defaultProps = {
        width: 150,
        height: 150,
        border: 'none',
        strokeWidth: 10,
        labelColor: '#111111',
        labelFontSize: '18px',
        strokeColor: '#408AE5',
        railColor: '#f5f5f5',
        fillColor: 'none',
        percent: 70,
        padding: 0
    };
    return CirclePie;
}(React.Component));
/// <reference path="../scripts/react.d.ts" />
/// <reference path="../scripts/react-dom.d.ts" />
var Chart = (function (_super) {
    __extends(Chart, _super);
    function Chart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Chart.prototype.render = function () {
        return (React.createElement("svg", { className: "react-chart " + this.props.type, width: this.props.width, style: { overflow: 'visible', border: this.props.border }, height: this.props.height }, this.props.children));
    };
    Chart.defaultProps = {
        border: 'none',
        height: 400,
        width: 600,
    };
    return Chart;
}(React.Component));
var Graphs = (function (_super) {
    __extends(Graphs, _super);
    function Graphs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Graphs.prototype.render = function () {
        var dataArea = [
            { time: 1422766800000, value: 0, label: "{{value}} active users" },
            { time: 1422853200000, value: 10, label: "{{value}} active users" },
            { time: 1422939600000, value: 5, label: "{{value}} active users" }
        ];
        return React.createElement("div", null,
            React.createElement(Area, { width: 900, height: 300, data: dataArea }),
            React.createElement(BarMetric, { label: "Share of IE", percent: 12, metricName: "Nearing Zero" }),
            React.createElement(CirclePie, { percent: 34, width: 200, strokeWidth: 50, strokeColor: '#aaaaff' }));
    };
    return Graphs;
}(React.Component));
function RenderTomovo() {
    ReactDOM.render(React.createElement(Graphs, null), document.getElementById('here'));
}
//# sourceMappingURL=app.js.map