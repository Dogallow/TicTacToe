import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

////////////////////////////////////////////////////////////////////////////////////

  class Board extends React.Component {


    
    
    //   Bringing in the Square component and bringing that into a declared function called "renderSquare and sideNote it is passing in an argument something to make note of."
    renderSquare(i) {
        // Passing the argument of the function down to the child component. This puts an interesting twist on things now because now everytime the function is called you can pass a unique property to the child component. Solves a individuality/unique render problem.
      return <Square 
      value={this.props.value[i]}
    //   understand the importance of putting an arrow function here when passing this function/method down to the child component
      onClick={()=>this.props.onClick(i)}
      
      />;
    }

    

            
        
    
  
    render() {

      
  
      return (
        <div>
        <div className="status"></div>
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



  ///////////////////////////////////////////////////////////////////////////
  class Game extends React.Component {
    constructor(props){
        super(props)


        // Mutating the structure of the state creates a whole new dynamic to the logic.
        // Check the handleClick function to see how the data has to be accessed.(Vague: bad comment)
        this.state = {
            history:[{
                value: [null,null,null,null,null,null,null,null,null],
            }
            ],
            xIsNext: true
        }
    }

    handleClick(i){
      // Top Level this is still an array. So it is index based. So you have to deal with it as such no matter how the data is structured
        const history = this.state.history
        // Because it is an array it is indexed based so have to use an array function, array method, to access or do whatever it is you want to do.
        // Here specifically we are accessing the last index of the array. So, whatever is in this index of the array we now have access to it. In this case we have access to an object with a key of "value" and the value to that key is an array
        const current = history[history.length-1]
                                    // Now that we have access to the object we have to use object logic, method and syntax to access whatever is in that object. In this case, it is an array.
        let winner = calculateWinner(current.value)
        if(current.value[i] === "x" || current.value[i] === "o" || winner) return
        if(this.state.xIsNext){
            // Creating a copy of the state array. This is due to the slice method
            const value = current.value.slice()
            // Then modifying the copied array at the specific index
            value[i] = "o"
            
            
            
                


                // Then setting state as the updated array and replacing the original array with the copied array
                this.setState({history:history.concat([{value}])})
                this.setState({xIsNext: !true})
                
                
                
                

        }else {
            
            
                // Creating a copy of the state array. This is due to the slice method
                const value = current.value.slice()
                // Then modifying the copied array at the specific index
                value[i] = "x"
            this.setState({history: history.concat(
                [{value}]
            )})
            this.setState({xIsNext:!false})
            
        
    }
}
        
      
      render() {
        let history = this.state.history
        let current = history[history.length-1]
        let winner = calculateWinner(current.value)

        let status
        if (winner){
            status = `Winner ${winner}`
        } else {
            status = `Next Player ${this.state.xIsNext? "o" : "x"}`
        }

        
          return (
        <div className="game">
          <div className="game-board">
            <Board value={current.value} onClick={(i)=>this.handleClick(i)}/>
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{this.state.history.map((move)=>{
                
                return <li>{move.value.toString()}</li>
            })}</ol>
          </div>
        </div>
      );
    }
  }
  
  
ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
  function calculateWinner(value) {
    //   Really need to understand this logic in this function
    const lines = [
        // This is a list of possible combinations that will win the game.
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    // Looping through the lines variable 
    for (let i = 0; i < lines.length; i++) {
        let rand = i
      const [a, b, c] = lines[i];
    //   console.log(value[a], value[b], value[c])
        // console.log(a)
      console.log(a,b,c)
      console.log(a)
      if (value[a] && value[a] === value[b] && value[a] === value[c]) {
        return value[a];
      }
    }
    return null;
  }






  // Pay attention to the syntax when setting state with class-based components
//   BEING ABLE TO COME UP WITH THE LOGIC IN THESE FUNCTIONS IS CRITICAL THEN UNDERSTANDING HOW TO APPLY THESE THINGS (STRUCTURE) IS AS CRUCIAL

// todo Can add scoreboard functionality this will be in calculate winner function or will this be its own function with the calculate winner function in that



        // Small Note pay attention to the value of null throughout this logic
        // const winner = calculateWinner(this.state.value)
        // let status
        // if (winner){
        //     status = `Winner ${winner}`
        // } else {
        //     status = `Next Player ${this.state.xIsNext? "o" : "x"}`
        // }



        // Unlike the array push() method you might be more familiar with, the concat() method doesn’t mutate the original array, so we prefer it.