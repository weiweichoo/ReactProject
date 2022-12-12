import { BrowserRouter, NavLink, Link, Route, Routes, Outlet, useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import "./AnimalQuiz.css"
import Button from '@mui/material/Button';

function HomePage() {
    const [allQuestions, setAllQuestions] = useState([])
    const [count, setCount] = useState(0);
    const [points, setPoints] = useState(0);
    const navigate = useNavigate()

    useEffect(() => {
        console.log('Use effect called')
        if (count === 5){
            navigate(`/resultpage/${points}`)
        }
      }, [count]); // Dependency List


  const loadQuestions = () => {
    console.log("loadQuestions")
    const url = `https://opentdb.com/api.php?amount=5&category=27&difficulty=easy&type=boolean`
    fetch(url).then(response => {
      response.json().then(data => {
        console.log(data.results)

        setAllQuestions(data.results)
      })
    })
  }

  const handleAnswer = (selectedAnswer) => {
    const correctAns = allQuestions[count].correct_answer;
    if(selectedAnswer === correctAns){
      setPoints(points + 1);
    }
    
    setCount(count + 1);

    console.log("count : " + count)
    console.log("points: " + points)
  }

  const Question = props => {
  
    return (
      <div>
        <h3 >{decodeURIComponent(props.question  || 'Click Start Now!')}</h3>
        <div>
          <Button variant="contained" size="small" color="success" onClick={() => props.selectAnswer('True')}>True</Button>
          <Button variant="contained" size="small" color="error" onClick={() => props.selectAnswer('False')}>False</Button>
        </div>
      </div>
    )
  }

  return <div>
        <Button variant="contained" size="small" color="primary" onClick={loadQuestions}>Start Now!</Button>
        <Question {...allQuestions[count]} selectAnswer={handleAnswer}/>
        <p>Points: {points}</p>
  </div>
}

function ResultPage(props) {
    const params = useParams()
    let marks = params.points * 20;
    let message = "Congratulations! 😀"

    if (marks < 60){
        message = "Oh Nooo! 😢"
    }

    return (
      <div>
        <div>
          <h4>{message}</h4>
          <span>{marks}% Score</span>
        </div>
      </div>
    )
    // return <div>
    //     hi
    // </div>
}

function AnimalQuiz() {
  return <div>
    <BrowserRouter>
      <h1>Animals Quiz</h1>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/resultpage/:points" element={<ResultPage />}></Route>
        <Route path="*" element={<p>Page not found</p>}/>
      </Routes>
    </BrowserRouter>
  </div>
}

export default AnimalQuiz