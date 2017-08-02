/// <reference path="../scripts/react-global.d.ts" />

interface SinglePageAppView {
    Who: string;
}

interface SinglePageAppState {
    Mood: "good" | "bad";
}

class SinglePageAppCompo extends React.Component<SinglePageAppView, SinglePageAppState>{


    constructor(p: SinglePageAppView) {
        super(p);
        console.log("SinglePageAppCompo constructor", p);
        this.state = { Mood: "good" };
    }

    clickMood() {
        console.log("SinglePageAppCompo clickMood", this.state);
        if(this.state.Mood == "good") this.setState({ Mood: "bad" });
        else this.setState({ Mood: "good" });
    }

    render() {

        const icon = this.state.Mood == "good" ? (<span className="glyphicon glyphicon-thumbs-up" />) : (<span className="glyphicon glyphicon-thumbs-down" />);

        return (
            <div className="jumbotron">
                <h1>Hello {this.props.Who}</h1>
                <button type="button" className="btn btn-primary btn-lg" onClick={this.clickMood.bind(this)}>{icon}</button>
            </div>
        );
    }

}



function RenderSinglePageApp(elemId: string) {

    ReactDOM.render(<SinglePageAppCompo Who="Charles" />, document.getElementById(elemId));

}

