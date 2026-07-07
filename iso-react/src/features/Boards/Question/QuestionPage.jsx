import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import QuestionList from "./QuestionAdminList";
import UserQuestionList from "./QuestionUserList";
const QuestionPage = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <>
      {user != null && user.role === "[ROLE_ADMIN]" ? (
        <QuestionList />
      ) : (
        <UserQuestionList />
      )}
    </>
  );
};

export default QuestionPage;
