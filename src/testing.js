import axios from "https://cdn.skypack.dev/axios@0.21.1";
import { useState, useEffect } from "react";
function testing(props) {
    //const { useState, useEffect } = React;

// Main component -------------------------------
const Main = (props) => {
  // new Quiz questions generation 
  const getQuiz = () => {
    axios.get(`https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=boolean&encode=url3986`)
    .then(response => {
      console.clear();
      console.log(response.data.results);
      setQuestions(response.data.results);
    });
  }
  
  const [questions, setQuestions] = useState([]);
  const [count, setCount] = useState(0);
  const [points, setPoints] = useState(0)
  useEffect(() => {
    getQuiz();
  }, []);
  
  
  const handleAns = (userAns) => {
    const correctAns = questions[count].correct_answer;
    if(userAns === correctAns){
      setPoints(points + 1);
    }
    
    setCount(count + 1);
  }
  
  const handleReset = () => {
    console.log('click');
    
    setCount(0);
    setPoints(0);
    getQuiz();
  }

  return (
    <div className='main' data-percent={count}>
      <div className='main-inner'>
        <h1>Film Quiz</h1>
        <div className='head'>
          <span>Question: {count + 1}</span>
          <span>Points: {points}</span>
        </div>
      
      <Question {...questions[count]} sendAns={handleAns} />
      
      {count === 10 && <Popup score={points} reset={handleReset} />}
      </div>
    </div>
  )
}


// Question component -------------------------------
const Question = props => {
  
  return (
    <div className='question'>
      <p>{decodeURIComponent(props.question  || 'Loading...')}</p>
      <div className='btns'>
        <button className='btn green' onClick={() => props.sendAns('True')}>True</button>
        <button className='btn red' onClick={() => props.sendAns('False')}>False</button>
      </div>
    </div>
  )
}

// Popup component -------------------------------
const Popup = props => {
  let url = '';
  
  if(props.score == 10){
    url = 'https://media0.giphy.com/media/62PP2yEIAZF6g/giphy.gif?cid=ecf05e47ar8yjtn6jr3xaz5l75eru3ihs3fnc4m5ew8r0yqo&rid=giphy.gif';
  }else if(props.score == 0){
    url = 'https://media0.giphy.com/media/62PP2yEIAZF6g/giphy.gif?cid=ecf05e47ar8yjtn6jr3xaz5l75eru3ihs3fnc4m5ew8r0yqo&rid=giphy.gif';
  }else if(props.score < 5){
    url = 'https://media0.giphy.com/media/1gqDQUaLe3mCc/giphy.gif?cid=ecf05e47f341pmrg5729x3oldfpekfomium1n2hgbf96pe2w&rid=giphy.gif';
  }else if(props.score < 10){
    url = 'https://media0.giphy.com/media/xT0xezQGU5xCDJuCPe/giphy.gif?cid=ecf05e476hajpzr90ydffj54p5eewod1wa6shgiugt7qdzve&rid=giphy.gif';
  }else{
    url = 'https://media0.giphy.com/media/xT0xezQGU5xCDJuCPe/giphy.gif?cid=ecf05e476hajpzr90ydffj54p5eewod1wa6shgiugt7qdzve&rid=giphy.gif';
  }
  
  return (
    <div className='popup'>
      <div className='popup-inner'>
        <h4>Congrats!</h4>
        <span className='score'>{props.score}0% Score</span>
        <img src={url} alt='congrats gif'  />
        <p>Quiz completed successfully.</p>
        <button className='btn green' onClick={() => props.reset()}>Try again ?</button>
      </div>
    </div>
  )
}
}


export default testing;
//ReactDOM.render(<Main />, document.getElementById('app'));