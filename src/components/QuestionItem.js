import React from "react";

function QuestionItem({
  question,
  handleDeleteQuestion,
  handleUpdateQuestion,
}) {
  // console.log(question);
  const { id, prompt, answers, correctIndex } = question;
  let options;

  // only when answers has a value(s)
  if (answers) {
    options = answers.map((answer, index) => (
      <option key={index} value={index}>
        {answer}
      </option>
    ));
  }

  const deleteQuestion = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        handleDeleteQuestion(id);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const patchQuestion = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...question,
        correctIndex: correctIndex,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        handleUpdateQuestion(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select
          defaultValue={correctIndex}
          onChange={() => {
            patchQuestion(id);
          }}
        >
          {options}
        </select>
      </label>
      <button
        onClick={() => {
          deleteQuestion(id);
        }}
      >
        Delete Question
      </button>
    </li>
  );
}

export default QuestionItem;
