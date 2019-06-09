import './todo-list.scss'

import { pipe, remove, set, tap } from 'lodash/fp'

import AddTodoForm from '../AddTodoForm/AddTodoForm'
import PropTypes from 'prop-types'
import React from 'react'
import TodoItem from '../TodoItem/TodoItem'
import { setTodosCookie } from '../../utils/cookies'

const TodoList = ({ storedTodos }) => {
  const [todos, setTodos] = React.useState(storedTodos)
  const [announcerMessage, setAnnouncerMessage] = React.useState('')
  const headerRef = React.useRef()
  const headingId = 'todo-list-heading'

  const setAndPersistTodos = pipe(
    tap(setTodos),
    tap(setTodosCookie)
  )

  const onTodoCheckboxClick = (todo, index) => {
    setAndPersistTodos(set([index, 'checked'], !todo.checked, todos))
  }

  const onAddTodo = newTodo => {
    const todoAlreadyExists = todos.some(todo => todo.description === newTodo)
    if (todoAlreadyExists) return
    setAndPersistTodos(todos.concat({ description: newTodo, checked: false }))
    setAnnouncerMessage(`${newTodo} added.`)
  }

  const onRemoveTodo = index => {
    setAndPersistTodos(remove(todo => todo === todos[index], todos))
    setAnnouncerMessage(`${todos[index].description} removed.`)
    headerRef.current.focus()
  }

  return (
    <section aria-labelledby={headingId} className="todo-list">
      <h1
        id={headingId}
        className="todo-list__title"
        tabIndex="-1"
        ref={headerRef}
      >
        To Do
      </h1>
      {todos.length !== 0 && (
        <ul className="todo-list__list">
          {todos.map((todo, index) => (
            <TodoItem
              key={todo.description}
              id={`todo-${index}`}
              name="todo[]"
              label={todo.description}
              value={todo.description}
              checked={todo.checked}
              onChange={() => onTodoCheckboxClick(todo, index)}
              onDelete={() => onRemoveTodo(index)}
            />
          ))}
        </ul>
      )}
      {todos.length === 0 && (
        <div className="todo-list__empty-message">
          <p className="todo-list__empty-message-text">You&apos;re all done!</p>
        </div>
      )}
      <div className="todo-list__entry-section">
        <AddTodoForm onSubmit={onAddTodo} />
      </div>
      <div
        role="status"
        aria-live="polite"
        className="todo-list__announcer u-visually-hidden"
      >
        {announcerMessage}
      </div>
    </section>
  )
}

TodoList.propTypes = {
  storedTodos: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired,
      checked: PropTypes.bool.isRequired
    })
  ).isRequired
}

export default TodoList
