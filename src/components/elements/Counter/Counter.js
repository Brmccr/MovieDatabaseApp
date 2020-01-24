import React, {Component} from 'react';

class Counter extends Component {
    render() {
        return(
            <Alpha />
        )
    }
}

export default Counter;

class Alpha extends Component {
    state = {
        alphaValue: 'Data from Alpha',
        counter: 1
    }


    clickButton = () => {
        console.log('click')
        console.log(this.state.counter);

        let copyCounter = this.state.counter;
        copyCounter += 1;

        this.setState({
            counter: copyCounter
        })
    }


render() {
    return (
        <div>
            <button onClick={this.clickButton}>Counter Button</button>
            <Beta fromAlpha={this.state.alphaValue}/>
        </div>
    )
}

}

class Beta extends Component {
    state = {
        alphaValue : this.props.fromAlpha,
        betaValue : 'Data from Beta'
    }

    render() {
        return (
            <div>
                <p>Beta showing prop sent from from Alpha : <b>{this.state.counter}</b></p>
                <p>Beta showing data from the state : <b>{this.state.betaValue}</b></p>
            </div>
        )
    }
}