import Button from '../Button/Button'
import PropTypes from 'prop-types'
import React from 'react'
import TextInput from '../TextInput/TextInput'
import { trim } from 'lodash/fp'

const AddTodoForm = ({ onSubmit }) => {
  const [newTodo, updateNewTodo] = React.useState('')

  return (
    <form
      className="u-flex-row u-width-100%"
      onSubmit={e => {
        e.preventDefault()
        const trimmedTodo = trim(newTodo)
        if (trimmedTodo) onSubmit(trimmedTodo)
        updateNewTodo('')
      }}
    >
      <TextInput
        autoComplete="off"
        id="todo-entry"
        name="todo-entry"
        className="u-flex-grow-1 u-margin-right-20"
        label="Enter a task..."
        placeholder="Enter a task..."
        aria-invalid={newTodo.length === 0}
        onChange={e => updateNewTodo(e.target.value)}
        value={newTodo}
        required
      />
      <Button>Add</Button>
    </form>
  )
}

AddTodoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default AddTodoForm
