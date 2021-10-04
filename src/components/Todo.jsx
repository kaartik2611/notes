import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios';

export const Todo = () => {
  const token = localStorage.getItem("token")
  const [todos, setTodos] = useState([])
  const text = useRef()
  const formSubmit = e => {
    e.preventDefault()
    if (text.current.value === '') {
      return;
    }
    else {
      const newTodo = [...todos, {
        key: Math.random(),
        todo: text.current.value,
        isCompleted: false,
      }];
      setTodos(newTodo)
      postTodo(newTodo)
      text.current.value = ''
      // localStorage.setItem("todos", JSON.stringify(newTodo))
    }
  }

  const postTodo = (todos) => {
    axios.post("http://localhost:4000/api/todos", todos, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    axios.get("http://localhost:4000/api/todos", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    })
      .then(res => {
        console.log(res);
        setTodos(res.data.todos)
      })
      .catch(err => {
        console.log(err);
      })
  }, [token])

  const deleteTodo = e => {
    const del = e.currentTarget.id;
    const newTodos = todos.filter((todo) => todo.key !== parseFloat(del))
    setTodos(newTodos);
    postTodo(newTodos)
  }
  const completeTodo = e => {
    const complete = e.currentTarget.id;
    const newTodos = todos.map((todo) => {
      if (todo.key === parseFloat(complete)) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }
      return todo;
    })
    setTodos(
      newTodos
    );
    postTodo(newTodos)
  }

  const textHandler = (e) =>
    e.isCompleted === false ? "no-underline" : "line-through";
  const iconHandler = (e) =>
    e.isCompleted === true ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABmJLR0QA/wD/AP+gvaeTAAACJUlEQVRYhe3YyY9MURTH8U9rGmFhaBFp/wBiiLSN2NqJnaSxMfwDRGLYaBvDhh0bko5xISFIRFiRkIhIRIJY2BhiCCFW3Y3WFq9K3/e6qvpV1xtI6pe85NV555z7rfOq7j330lZb/4d6cQ9nMbvFXD24gVtY3GKuv7qL0co10EKeTjwIcp2aKGBKysRvgvtt2NA0WqQ9WBt8fj3JPOPUg6/Gvvl7zG8yxxIMBjleYmZWgESVGw2uS03ETsWjIHYE67KEq+qKOOSmlHH9ibijecDBAnwKBvqMhRPErMJwEPMcM/IChD7xalxv4NuFp4HvT9GUlbsui0NureN3JOHXXwQcdONDMPA34yfd1fgR+DzBtKIAYaN4de6go/JsOp4Fz4awvEi4qs6LQ+6s2E8k7PvLgIO5eBeAfBf9HkcC20PRElea1uO3eMWq1yCWloc2ptNqA+4qEyrULLwSh7svg1ebtpuZSJ2i9TZURy3HsnRG7Ve8u0yoqhr9SYawrDw05uCt+DTTh1+B7bGCV5BQF8QrtqNiP56wHygDLrnU3VZ/qRvGiiLhuvExAEjbLHQVBZhst7bU8Tuc8DtUBNzmxKDXGvjWaljX5Am3CF+CAdO0/CvFW/4Xcmz5r4pXL+2m6WAi7lgecNsTg1xsIjb3bWetjfu8JnPkunE/J169yR597E3k2ZcJnehkq5o0y8Ojk62jReoVnXANyO747Wblvq22/mn9AV0M3sUUE8eMAAAAAElFTkSuQmCC" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABmJLR0QA/wD/AP+gvaeTAAAAx0lEQVRYhe3UQQrCMBBA0Q9u3DV4Bk+gK2/oocS1VvQuniAumiCtHdoEmcliHnRRCuF3mhScc861YCs92GhWCDrgCuyBi3HLjw64AzFdZ9ucsQA8+MbFdC9+bk3TyUXgBewsozKPq+VxtTyulkrcgeGHWioAPeO4vnIt0Ql4U/7Wc5N7Fq6x6JjiSt9eZXIwTOFG2f5RmVxtpHpcSaRZ3JpI87hM2vwqB2KtuUmaT25KimwiLptGNhWX5cgm47KA4YFwzrk/+QC6cYWW+ktj4gAAAABJRU5ErkJggg==";

  return (
    <div>
      <p className="text-center text-5xl mt-10 mb-10">Todo List</p>
      <form className="space-x-4 flex justify-center my-6" onSubmit={formSubmit}>
        <input type="text" placeholder="Enter Todo" className="p-2 text-black border-2" name="todo" ref={text} />
        <button type="submit" className="border-2 p-2">Submit</button>
      </form>
      <div>
        <div>
          {todos.map((todo, i) => (
            <div
              className="flex flex-row border my-2 text-2xl"
              key={todo.key}>
              <p>{i + 1}</p>
              <p className={"text-center flex-grow " + textHandler(todo)}>{todo.todo}</p>
              <div id={todo.key} onClick={deleteTodo}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 m-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div id={todo.key} onClick={completeTodo}>
                <img alt="complete" src={iconHandler(todo)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
