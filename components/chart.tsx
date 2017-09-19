/// <reference path="../scripts/react.d.ts" />
/// <reference path="../scripts/react-dom.d.ts" />

interface ChartProps {
    height: number;
    width: number;
    type?: any;
    border?: string;
    children?: any;
}
 
class Chart extends React.Component<ChartProps, {}>{
  static defaultProps = {
    border: 'none',
    height: 400,
    width: 600,
  }
     
  render(){
    return (
      <svg
        className={`react-chart ${this.props.type}`}
        width={this.props.width}
        style={{overflow: 'visible', border: this.props.border}}
        height={this.props.height}>
        {this.props.children}
      </svg>
    )
  }
}
