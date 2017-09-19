declare function moment(datum: number): any;

const numberToString = function (value) {
 if(typeof value !== 'number') return value;
 if(value > 1000000000) return Math.round(value/100000000)/10 + 'B';
 if(value > 10000000) return Math.round(value/1000000) + 'M';
 if(value > 1000000) return Math.round(value/100000)/10 + 'M';
 if(value > 10000) return Math.round(value/1000) + 'K';
 if(value > 1000) return Math.round(value/100)/10 + 'K';
 return Math.round(value * 100) / 100;
}

type AreaDataType = AreaDataItem[];

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
    width:  number;
    height:  number;
    border?:  string;
    strokeWidth?:  number;
    useDynamicYMin?:  boolean;
    strokeColor?:  string;
    pointsRadius?:  number;
    tipsWidth?: number;
    tipsHeight?: number;
    tipsPadding?:  number;
    tipStrokeWidth?:  number;
    tipStrokeColor?:  string;
    tipsFill?:  string;
    gridColor?:  string;
    labelFontSize?:  number;
    labelTextShadow?:  string;
    labelColor?:  string;
    fillColor?:  string;
    maxOverflow?:  number;
    yLabelsOutside?:  boolean;
    yLabelsPosition?:  string;
    yPadding?:  number;
    data: AreaDataItem[];
}

interface AreaState {
   
}

class Area extends React.Component<AreaProps, AreaState>{
  tipsData = {}
  xAxisLabels = []

  static defaultProps : Partial<AreaProps> = {
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
  }

  describeLine(data:AreaDataType, xMin: number, yMin: number, xSpread: number, ySpread: number, xScale: number, yScale: number){
    let isZero = ySpread === 0 && yMin === 0
    return data.map((point, index) => `${Math.max(0,(point.time - xMin) * xScale - this.props.strokeWidth)},${isZero ? yScale : (ySpread - (point.value - yMin)) * yScale}`).join(' ')
  }

  centerElement(el, center: number, width: number, setWidth=false){
    if(setWidth) el.setAttribute('width', width)
    let xPos = center - width / 2
    el.setAttribute('x', xPos)
  }

  showPointTip(point, event){
    //let scope = this.refs[point.ref],
    //    background = scope.getElementsByClassName('tip-background')[0],
    //    textDate = scope.getElementsByClassName('tip-text-date')[0],
    //    textValue = scope.getElementsByClassName('tip-text-value')[0]

    //this.centerElement(textDate, this.tipsData[point.ref].xBase, textDate.getBBox().width)
    //this.centerElement(textValue, this.tipsData[point.ref].xBase, textValue.getBBox().width)
    //this.centerElement(background, this.tipsData[point.ref].xBase, Math.max(textDate.getBBox().width, textValue.getBBox().width) + this.props.tipsPadding * 2, true)
    //scope.style.display = 'block'
  }

  hidePointTip(point, event){
    //this.refs[point.ref].style.display = 'none'
  }

  renderTipText(text: string, data:AreaTipData ){
      return text
      .replace('{{date}}', moment(data.date).format(data.dateFormat || 'YYYY-MM-DD'))
      .replace('{{date1}}', moment(data.date1).format(data.dateFormat || 'YYYY-MM-DD'))
      .replace('{{date2}}', moment(data.date2).format(data.dateFormat || 'YYYY-MM-DD'))
      .replace('{{value}}', numberToString(data.value))
  }

  renderTips(data: AreaDataType, xMin: number, yMin: number, xSpread: number, ySpread: number, xScale: number, yScale: number){
      let intervalLength: number;
      let dateFormat: string;
      let tipText: string;
      let followingTime: number;
      let label = '{{value}} views',
          day = 86400000,
          isZero = ySpread === 0 && yMin === 0;

    if(data.length === 0) return
    else if(data.length === 1) intervalLength = 0
    else intervalLength = data[1].time - data[0].time

    if(intervalLength > day * 27 && intervalLength < day * 32){ //roughly one month
      dateFormat = 'MMMM'
      tipText = '{{date}}'
    }
    else if(intervalLength > day){ //more than 1d
      dateFormat = 'MMM Do'
      tipText = '{{date1}} through {{date2}}'
    }
    else{
      dateFormat = 'MMM Do'
      tipText = '{{date}}'
    }

    return data.map((point, index) => {
        if(index === 0 || index === data.length - 1) return
        if(data[index+1]) followingTime = data[index+1].time
        else followingTime = point.time + intervalLength
        if(!point.label) point.label = label

        let xBase = (point.time - xMin) * xScale,
            key = 'point_' + index + '_tooltip',
            pointTimeFormat = dateFormat,
            tipHeight = 38,
            tipOffset = 25,
            yBase = (isZero ? yScale : (ySpread - (point.value - yMin)) * yScale) - this.props.tipsPadding / 2,
            triangleWidth = 25,
            triagleHeight = 10,
            trianglePath = [
              (xBase - this.props.tipStrokeWidth - triangleWidth / 2) + ',' + (yBase - tipOffset + 9),
              (xBase - this.props.tipStrokeWidth + triangleWidth / 2) + ',' + (yBase - tipOffset + 9),
              xBase - this.props.tipStrokeWidth  + ',' + (yBase - tipOffset + triagleHeight + 9),
            ].join(' '),
            triangleBorderPath = [
              (xBase - this.props.tipStrokeWidth - triangleWidth / 2) + ',' + (yBase - tipOffset + 10),
              (xBase - this.props.tipStrokeWidth + triangleWidth / 2) + ',' + (yBase - tipOffset + 10),
              xBase - this.props.tipStrokeWidth  + ',' + (yBase - tipOffset + triagleHeight + 10),
            ].join(' ')

        this.tipsData[key] = {xBase: xBase}

        if((new Date(point.time)).getFullYear() !== (new Date()).getFullYear()){
          pointTimeFormat += ' YYYY'
        }

        return (
          <g key={`point-${index}`} ref={key} style={{display: 'none'}}>
            <rect
              className="tip-background"
              x={(point.time - xMin) * xScale - this.props.strokeWidth - this.props.tipsWidth / 2}
              y={yBase - tipHeight - tipOffset}
              width={this.props.tipsWidth + this.props.tipsPadding}
              height={tipHeight + this.props.tipsPadding}
              style={{stroke: this.props.tipStrokeColor, strokeWidth: this.props.tipStrokeWidth, fill: this.props.tipsFill}}
            />
            <polygon
              points={triangleBorderPath}
              style={{stroke: this.props.tipStrokeColor, opacity: 0.5, strokeWidth: this.props.tipStrokeWidth}}
            />
            <polygon
              points={trianglePath}
              style={{fill: this.props.tipsFill}}
            />
            <text
              className="tip-text-date"
              x={xBase - this.props.tipsWidth / 2 + 2}
              y={yBase - this.props.strokeWidth - tipHeight - tipOffset + this.props.tipsPadding + 10}
              style={{fontSize: 14, fontWeight: 'lighter'}}
              dangerouslySetInnerHTML={{__html: this.renderTipText(tipText, {dateFormat: pointTimeFormat, date: point.time, date1: point.time, date2: followingTime, value: point.value})}}
            />
            <text
              className="tip-text-value"
              x={xBase - this.props.tipsWidth / 2 + 2}
              y={yBase - this.props.strokeWidth - tipHeight - tipOffset + this.props.tipsPadding + 30}
              style={{fontSize: 16, fontWeight: 'bold'}}
              dangerouslySetInnerHTML={{__html: this.renderTipText(point.label, {dateFormat: pointTimeFormat, date: point.time, date1: point.time, date2: followingTime, value: point.value})}}//dateFormat: value: point.value
            />
          </g>
        )
      }
    )
  }

  renderPoints(data: AreaDataType, xMin: number, yMin: number, xSpread: number, ySpread: number, xScale: number, yScale: number){
    let isZero = ySpread === 0 && yMin === 0
    return data.map((point, index) =>{
      if(index === 0 || index === data.length - 1) return
      return <circle
        key={`point-${index}`}
        cx={(point.time - xMin) * xScale - this.props.strokeWidth / 2}
        cy={isZero ? yScale : (ySpread - (point.value - yMin)) * yScale}
        r={this.props.pointsRadius}
        onMouseOver={this.showPointTip.bind(this, {ref: `point_${index}_tooltip`})}
        onMouseLeave={this.hidePointTip.bind(this, {ref: `point_${index}_tooltip`})}
        style={{stroke: this.props.strokeColor, strokeWidth: this.props.strokeWidth, fill: 'white', cursor: 'default'}}
      />
    })
  }

  renderLabel(label, index: number, activeWidth: number){
    if(!label.x){
      if(this.props.yLabelsPosition === 'right')
          label.x = activeWidth + (this.props.yLabelsOutside ? 5 : -1 * (20 + (5 * (label.txt.length || 1))))
      else
        label.x = 20
    }
    if(!label.ref) label.ref = Math.random() + '.' + Math.random()
    return (
      <text
        key={`graph.xAxis.label.${index||Math.random()}`}
        x={label.x}
        y={label.y}
        ref={label.ref}
        fill={this.props.labelColor}
        style={{fontSize: this.props.labelFontSize, textShadow: this.props.labelTextShadow}}
      >
        {label.txt}
      </text>
    )
  }

  renderYGridLine(label, index: number, activeWidth: number) {
    return (
      <line
        key={`graph.ygridLine.${index}`}
        x1="0"
        y1={label.y}
        x2={activeWidth - this.props.strokeWidth}
        y2={label.y}
        fill={this.props.labelColor}
        style={{stroke: this.props.gridColor, strokeWidth: 1}}
      />
    )
  }

  describeYAxis(yMin: number, ySpread: number, yScale: number, yPadding: number){
    function ruler(value, m){
      if(!m) m = 100
      if(value > m) ruler(value, m * 5)
      return Math.ceil(value / m) * m / 10
    }

    let rule = ruler(ySpread, ySpread / 10),
        lines = [1,2,3,4,5,6,7,8,9],
        labels = [0,1,2,3,4],
        isZero = ySpread === 0 && yMin === 0

    return {
      gridLines: lines.map(k => {return {y: isZero ? yScale : (ySpread - k * rule) * yScale}}),
      labels: labels.map(k => {
          var v = k * rule * 2;
          return {
              y:
                isZero
                  ? yScale
                  : (ySpread - k * rule * 2) * yScale,
              txt: numberToString(v + yMin)
          }
      })
    }
  }

  describeXAxis(xMin: number, xSpread: number, xScale: number, data: AreaDataType, height: number){
    let keys = [1,2,3,4,5,6,7,8,9],
        keyInterval = data.length / keys.length,
        dateFormat = 'ddd',
        labels = [],
        day = 86400000

    if(xMin < 10000) return {labels: []} // No timestamps given
    if(keys.length > data.length){
      keys = data.map((p,i) => i + 1)
      keyInterval = 1
    }
    if(xSpread > day * 365 * 7) dateFormat = 'YYYY' // > 7 years
    else if(xSpread > day * 30 * 9) dateFormat = 'MMM' // > 9 Months
    else if(xSpread > day * 7) dateFormat = 'MMM Do' // > a week

    keys.forEach((k,i)=>{
      let time = xMin + (k * (xSpread/keys.length))
      // Skip last item
      if(i<keys.length-1) labels.push({
        txt: moment(time).format(dateFormat),
        time: time,
        x: (time - xMin) * xScale,
        y: height + 30,
        ref: 'xLabel.' + i
      })
    })

    this.xAxisLabels = labels

    return {
      labels: labels
    }
  }

  centerXAxisLabelMarkers(){
    //this.xAxisLabels.forEach(label=>{
    //  let domLabel = this.refs[label.ref]
    //  this.centerElement(domLabel, label.x, domLabel.getBBox().width)
    //})
  }

  componentDidMount(){
    this.centerXAxisLabelMarkers()
  }

  componentDidUpdate(){
    this.centerXAxisLabelMarkers()
  }

  render(){
      let data = this.props.data;
    let activeWidth = this.props.width;
    let activeHeight = this.props.height - 50; // add 50 px in the bottom for the labels

    // Let's ensure all data has a timeStamp
    //data.forEach((point,index)=>{
    //  if(!point.time){
    //    data[index].time = index
    //  }
    //  data[index].time = parseFloat(data[index].time)
    //})

    // let xMax = this.props.data.length - 1
    let xMax = Math.max(...data.map((point, index) => point.time), data.length), //either a timestamp or number of items
        yMax = Math.max(...data.map(point => point.value)) * (1 + 1 / this.props.yPadding),

        // xMin = 0,
        xMin = Math.min(...data.map((point, index) => point.time)), //either smallest timestamp or 0
        yMin = this.props.useDynamicYMin ? Math.min(...data.map(point => point.value)) - yMax / 5 : 0,

        xSpread = (xMax - xMin),
        ySpread = (yMax - yMin),
        xScale = activeWidth / (xSpread || 1),
        yScale = activeHeight / (ySpread || 1),
        yPadding = yMax / this.props.yPadding,

        line = this.describeLine(data, xMin, yMin, xSpread, ySpread, xScale, yScale),
        yAxis = this.describeYAxis(yMin, ySpread, yScale, yPadding),
        xAxis = this.describeXAxis(xMin, xSpread, xScale, data, activeHeight),

        isZero = ySpread === 0 && yMin === 0

    return (
        <Chart width={this.props.width} height={this.props.height} type="area">
            {yAxis.gridLines.map((label, index) => this.renderYGridLine(label, index, activeWidth))}

        <polygon
          points={`0,${(isZero ? yScale : ySpread * yScale) - this.props.strokeWidth} ${line} ${(xMax - xMin) * xScale - this.props.strokeWidth},${(isZero ? yScale : ySpread * yScale) - this.props.strokeWidth}`}
          style={{fill: this.props.fillColor, strokeWidth: 0}}
        />

        <polyline
          points={line}
          style={{stroke: this.props.strokeColor, strokeWidth: this.props.strokeWidth, fill: 'none'}}
        />

        {yAxis.labels.map(this.renderLabel.bind(this))}
        {xAxis.labels.map((label,index) => <line
          key={`graph.xAxis.label.${index}`}
          ref={label.ref+'.marker'}
          x1={label.x}
          x2={label.x}
          y1={activeHeight}
          y2={activeHeight + 10}
          stroke={this.props.gridColor}
          strokeWidth={1}
        />)}
        {xAxis.labels.map(this.renderLabel.bind(this))}
        {this.renderPoints(data, xMin, yMin, xSpread, ySpread, xScale, yScale)}
        {this.renderTips(data, xMin, yMin, xSpread, ySpread, xScale, yScale)}
      </Chart>
    )
  }
}
