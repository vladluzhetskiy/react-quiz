import axios from "../../axios/axios-quiz";
import {FETCH_QUIZES_ERROR, FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS} from "./actionTypes";

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START
  };
}

export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes
  };
}

export function fetchQuizesError(e) {
  return {
    type: FETCH_QUIZES_ERROR,
    error: e
  };
}

export function fetchQuizes() {
  return async dispacth => {
    dispacth(fetchQuizesStart());
    try {
      const response = await axios.get('/quizes.json');

      const quizes = [];

      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Тест №${index + 1}`
        })
      });

      dispacth(fetchQuizesSuccess(quizes))
    } catch (e) {
      dispacth(fetchQuizesError(e));
    }
  }
}