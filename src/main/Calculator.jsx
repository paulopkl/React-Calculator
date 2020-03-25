import React, { Component } from 'react';
import './Calculator.css';

import Button from '../componentes/Button';
import Display from '../componentes/Display';

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component {

    state = { ...initialState }

    constructor(props) {
        super(props);
        this.clearMemory = this.clearMemory.bind(this);
        this.setOperation = this.setOperation.bind(this);
        this.addDigito = this.addDigito.bind(this);
    }

    clearMemory() {
        this.setState({ ...initialState });
    }

    setOperation(operation) {
        if(this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true });
        } else {
            const igual = operation === '=';
            const currentOperation = this.state.operation;
            const values = [...this.state.values];

            try {
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`);
            } catch(erro) {
                // console.error(erro);
                values[0] = this.state.values[0];
            }
            
            values[1] = 0;
            
            this.setState({
                displayValue: values[0],
                operation: igual ? null : operation,
                current: igual ? 0 : 1,
                clearDisplay: !igual,
                values: values
            })
        }
    }

    addDigito(n) {
        if(n === '.' && this.state.displayValue.includes('.')) {
            return // Impede que exista dois valor . no mesmo array
        }

        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay;

        const currentValue = clearDisplay ? '' : this.state.displayValue;
        const displayvalor = currentValue + n;
        this.setState({ displayValue: displayvalor, clearDisplay: false });

        if(n !== '.') {
            const i = this.state.current;
            const newValue = parseFloat(displayvalor);
            const values = [...this.state.values];
            values[i] = newValue;
            this.setState({ values });
            console.log(values);
        }
    }

    render(){
        return (
            <div className="calculator">
                <Display value={this.state.displayValue}></Display>
                <Button label="AC" click={this.clearMemory} triple />
                <Button label="/" click={this.setOperation} operation />
                <Button label="7" click={this.addDigito} />
                <Button label="8" click={this.addDigito} />
                <Button label="9" click={this.addDigito} />
                <Button label="*" click={this.setOperation} operation />
                <Button label="4" click={this.addDigito} />
                <Button label="5" click={this.addDigito} />
                <Button label="6" click={this.addDigito} />
                <Button label="-" click={this.setOperation} operation />
                <Button label="1" click={this.addDigito} />
                <Button label="2" click={this.addDigito} />
                <Button label="3" click={this.addDigito} />
                <Button label="+" click={this.setOperation} operation />
                <Button label="0" click={this.addDigito} double />
                <Button label="." click={this.addDigito} />
                <Button label="=" click={this.setOperation} operation />
            </div>
        )
    }
}