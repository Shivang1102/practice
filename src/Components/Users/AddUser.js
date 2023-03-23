import React, { useState } from "react";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";

const AddUser = (props) => {
  const [enteredUsername, setEnteredUsername] = useState("");
   const [enteredAge, setEnteredAge] = useState("");
    const[error, setError]= useState();

  function addUserHandler(event) {
    event.preventDefault();

    if(enteredUsername.trim().length===0 || enteredAge.trim().length===0){
        setError(
            {
                title:'Invalid Input',
                message:'Please enter valid iunput name and age(non empty value)'
            }
        )
        return;
    }
    if(+enteredAge<1){
        setError(
            {
                title:'Invalid age',
                message:'Please enter valid  age(age>0)'
            }
        )
        return;
    }


    props.onAddUser(enteredUsername,enteredAge);
    setEnteredAge("");
    setEnteredUsername("");
  }

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  const errorHandler=()=>{
     setError(null);
  }

  return (
    <Wrapper>
      { error && <ErrorModal  title={error.title} message={error.message} onConfirm={errorHandler}/>}
    <Card className={classes.input}>
      <form onSubmit={addUserHandler}>
        <label htmlFor="username">UserName</label>
        <input
          id="username"
          type="text"
          value={enteredUsername}
          onChange={usernameChangeHandler}
        ></input>
        <label htmlFor="age">Add age</label>
        <input
          id="age"
          type="number"
          value={enteredAge}
          onChange={ageChangeHandler}
        ></input>
        <Button type="submit">Add user</Button>
      </form>
    </Card>
    </Wrapper>
  );
};

export default AddUser;



