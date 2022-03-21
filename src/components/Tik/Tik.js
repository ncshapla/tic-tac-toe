import React, { useState } from 'react';
import './Tik.css';


const Tik = () => {
    const [turn, setTurn] = useState('X');
    const [call, setCall] = useState(Array(9).fill(''));

    const [winner, setWinner] = useState('');

    const checkforWinner = (square) => {
        let combos = {
            across :[
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
            ],
            down: [
                [0, 3,6],
                [1, 4, 7],
                [2, 5, 8],
            ],
            diagnol: [
                [0, 4, 8],
                [2, 4, 6],
            ], 
        }

        for (let combo in combos){
            combos[combo].forEach((pattern) => {
               if(
                   square[pattern[0]] === '' || square[pattern[1]] === ''|| square[pattern[2]] === ''
               ){
                //    do nothing
               }
               else if(square[pattern[0]]=== square[pattern[1]] &&
               square[pattern[1]] === square[pattern[2]]){
                   setWinner(square[pattern[0]]);
               }
            });

            
        }
    }



    const handleClick = (num) => {
        if(call[num] !== ''){
            alert('already clicked')
            return;
        }

       let square = [...call];

        if(turn === 'X'){
             square[num]  = 'X';
            setTurn('O');
        }
        else{
             square[num] = 'O';
            setTurn('X');
        }
        checkforWinner(square);
        setCall(square);
        console.log(square);
    }
    const handleRest = () => {
        setWinner(null);
        setCall(Array(9).fill(''));
    }

    const Cell =({num})=>{
     return <td style={(turn === 'O')? {color: "green"} : {color: "red"}}  onClick={() => handleClick(num)}>{call[num]}</td>;
    }
    return ( 
        <div className="container">
            <table> 
                Turn: {turn}
                <tbody>
                    <tr>
                       <Cell num={0}/>
                       <Cell num={1}/>
                       <Cell num={2}/>

                    </tr>
                    <tr>
                       <Cell num={3}/>
                       <Cell num={4}/>
                       <Cell num={5}/>  
                    </tr>
                    <tr>
                       <Cell num={6}/>
                       <Cell num={7}/>
                       <Cell num={8}/> 
                    </tr>
                </tbody>
            </table>
            {winner && (
                <>
                <p>{winner} is the winner!</p>
                <button onClick={() => handleRest()}>Play Again</button>
                </>
            )}
        </div>
    );
};

export default Tik;