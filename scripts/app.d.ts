/// <reference path="react.d.ts" />
/// <reference path="react-dom.d.ts" />
declare function moment(datum: number): any;
declare const numberToString: (value: any) => any;
declare type AreaDataType = AreaDataItem[];
declare class AreaDataItem {
    time: number;
    value: number;
    label: string;
}
declare class AreaTipData {
    dateFormat: string;
    date: number;
    date1: number;
    date2: number;
    value: number;
}
interface AreaProps {
    width: number;
    height: number;
    border?: string;
    strokeWidth?: number;
    useDynamicYMin?: boolean;
    strokeColor?: string;
    pointsRadius?: number;
    tipsWidth?: number;
    tipsHeight?: number;
    tipsPadding?: number;
    tipStrokeWidth?: number;
    tipStrokeColor?: string;
    tipsFill?: string;
    gridColor?: string;
    labelFontSize?: number;
    labelTextShadow?: string;
    labelColor?: string;
    fillColor?: string;
    maxOverflow?: number;
    yLabelsOutside?: boolean;
    yLabelsPosition?: string;
    yPadding?: number;
    data: AreaDataItem[];
}
interface AreaState {
}
declare class Area extends React.Component<AreaProps, AreaState> {
    tipsData: {};
    xAxisLabels: any[];
    static defaultProps: Partial<AreaProps>;
    describeLine(data: AreaDataType, xMin: number, yMin: number, xSpread: number, ySpread: number, xScale: number, yScale: number): string;
    centerElement(el: any, center: number, width: number, setWidth?: boolean): void;
    showPointTip(point: any, event: any): void;
    hidePointTip(point: any, event: any): void;
    renderTipText(text: string, data: AreaTipData): string;
    renderTips(data: AreaDataType, xMin: number, yMin: number, xSpread: number, ySpread: number, xScale: number, yScale: number): JSX.Element[];
    renderPoints(data: AreaDataType, xMin: number, yMin: number, xSpread: number, ySpread: number, xScale: number, yScale: number): JSX.Element[];
    renderLabel(label: any, index: number, activeWidth: number): JSX.Element;
    renderYGridLine(label: any, index: number, activeWidth: number): JSX.Element;
    describeYAxis(yMin: number, ySpread: number, yScale: number, yPadding: number): {
        gridLines: {
            y: number;
        }[];
        labels: {
            y: number;
            txt: any;
        }[];
    };
    describeXAxis(xMin: number, xSpread: number, xScale: number, data: AreaDataType, height: number): {
        labels: any[];
    };
    centerXAxisLabelMarkers(): void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): JSX.Element;
}
interface BarProps {
    metricName: string;
    value?: number;
    percent: number;
    barWidth?: number;
    barHeight?: number;
    metricPadding?: number;
    label: string;
    metricColor?: string;
    barColor?: string;
    barRailColor?: string;
}
declare class BarMetric extends React.Component<BarProps, {}> {
    static defaultProps: {
        metricName: string;
        value: number;
        percent: number;
        metricPadding: number;
        metricColor: string;
        barWidth: number;
        barHeight: number;
        barRailColor: string;
        barColor: string;
        label: string;
    };
    render(): JSX.Element;
}
interface CirclePieProps {
    width?: number;
    height?: number;
    strokeWidth?: number;
    strokeColor?: string;
    fillColor?: string;
    startAngle?: number;
    endAngle?: number;
    radius?: number;
    percent: number;
    padding?: number;
    railColor?: string;
    labelColor?: string;
    labelFontSize?: string;
    border?: string;
}
declare class CirclePie extends React.Component<CirclePieProps, {}> {
    static defaultProps: {
        width: number;
        height: number;
        border: string;
        strokeWidth: number;
        labelColor: string;
        labelFontSize: string;
        strokeColor: string;
        railColor: string;
        fillColor: string;
        percent: number;
        padding: number;
    };
    polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number): {
        x: number;
        y: number;
    };
    describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number): string;
    render(): JSX.Element;
}
interface ChartProps {
    height: number;
    width: number;
    type?: any;
    border?: string;
    children?: any;
}
declare class Chart extends React.Component<ChartProps, {}> {
    static defaultProps: {
        border: string;
        height: number;
        width: number;
    };
    render(): JSX.Element;
}
interface GraphsProps {
}
declare class Graphs extends React.Component<GraphsProps, {}> {
    render(): JSX.Element;
}
declare function RenderTomovo(): void;
