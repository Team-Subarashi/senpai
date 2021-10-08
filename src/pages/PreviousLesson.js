import React from "react";
import { useEffect, useState } from "react";
const PreviousLesson = ({ lessonProp }) => {
  const [lesson, setLesson] = useState("");

  useEffect(async () => {
    lessonProp.then((data) => setLesson(data));
  }, []);
  return <div>{lesson.avatar}</div>;
};

export default PreviousLesson;
