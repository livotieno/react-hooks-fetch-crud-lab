import axios from "axios";
import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  // !state
  const [questions, setQuestions] = useState([]);

  // !fetch API - all
  const fetchQuestions = () => {
    fetch("http://localhost:4000/questions")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setQuestions(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // !run useEffect on initial render/once
  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleDeleteQuestion = (id) => {
    const remainingItems = questions.filter((question) => {
      return question.id !== id;
    });
    setQuestions(remainingItems);
  };

  const handleUpdateQuestion = (updatedItem) => {
    const updatedItems = questions.map((question) => {
      if (question.id === updatedItem.id) {
        return updatedItem;
      } else {
        return question;
      }
    });
    setQuestions(updatedItems);
  };

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => {
          return (
            <QuestionItem
              key={question.id}
             question={question}
              handleDeleteQuestion={handleDeleteQuestion}
              handleUpdateQuestion={handleUpdateQuestion}
            />
          );
        })}
      </ul>
    </section>
  );
}

export default QuestionList;
