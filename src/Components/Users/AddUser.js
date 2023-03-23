import React, { useState, useRef } from "react";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";

const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();
  const collegeInputref = useRef();

  const [error, setError] = useState();

  function addUserHandler(event) {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;
    const enteredCollegeName= collegeInputref.current.value;

    if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
      setError({
        title: "Invalid Input",
        message: "Please enter valid iunput name and age(non empty value)",
      });
      return;
    }
    if (+enteredUserAge < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter valid  age(age>0)",
      });
      return;
    }

    props.onAddUser(enteredName, enteredUserAge,enteredCollegeName);
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
    collegeInputref.current.value='';
  }

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">UserName</label>
          <input id="username" type="text" ref={nameInputRef}></input>
          <label htmlFor="age">Add age</label>
          <input id="age" type="number" ref={ageInputRef}></input>
          <label htmlFor="college">College name</label>
          <input id="college" type="text" ref={collegeInputref}></input>
          <Button type="submit">Add user</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
