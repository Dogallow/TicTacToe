import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Notice in class based components you do not have to pass props down as an argument like functional based components
function Square(props) {
        // you need to always call super when defining the     constructor of a subclass

// constructor(props){
//     super(props);
//     this.state={
    //         value:null
//     }
// }
    
    
      return (
        <button
        className="square" 
        onClick={
            props.onClick
        }>
         {props.value}
        </button>
      );
    
  }

  class Board extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            value: [null,null,null,null,null,null,null,null,null],
            xIsNext: true
        }
    }
    
    
    //   Bringing in the Square component and bringing that into a declared function called "renderSquare and sideNote it is passing in an argument something to make note of."
    renderSquare(i) {
        // Passing the argument of the function down to the child component. This puts an interesting twist on things now because now everytime the function is called you can pass a unique property to the child component. Solves a individuality/unique render problem.
      return <Square 
      value={this.state.value[i]}
    //   understand the importance of putting an arrow function here when passing this function/method down to the child component
      onClick={()=>this.handleClick(i)}
      
      />;
    }

    handleClick(i){
            if(this.state.xIsNext){
                // Creating a copy of the state array. This is due to the slice method
                const value = this.state.value.slice()
                // Then modifying the copied array at the specific index
                    value[i] = "o"
                    // Then setting state as the updated array and replacing the original array with the copied array
                    this.setState({value:value})
                    this.setState({xIsNext: !true})

            }else {
                const value = this.state.value.slice()
                value[i] = "x"
                this.setState({value: value})
                this.setState({xIsNext:!false})
            }
    }
  
    render() {
      const status = `Next Player is ${this.state.xIsNext? "o":"x"}`;
  
      return (
        <div>
        <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row" >
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }


  class Game extends React.Component {
      render() {
          return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  
ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  


  // Pay attention to the syntax when setting state with class-based components