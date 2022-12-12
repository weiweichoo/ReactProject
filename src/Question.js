

function Question(props) {
    return (
      <div>
        <strong>{props.question}</strong>
        <div>
            { props.question !== null ? <div><button onClick={() => props.selectAnswer('True') }>True</button> <button onClick={() => props.selectAnswer('False')}>False</button></div> : null}
        {/* <button onClick={() => props.selectAnswer('True') }>True</button>
        <button onClick={() => props.selectAnswer('False')}>False</button> */}
      </div>
      </div>
    );
  }

export default Question;