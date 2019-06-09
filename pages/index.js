import '../styles/main.scss'

import Head from 'next/head'
import PropTypes from 'prop-types'
import React from 'react'
import TodoList from '../components/TodoList/TodoList'
import { getTodosFromCookies } from '../utils/cookies'

const initialTodos = [
  { description: 'Get bread and milk', checked: false },
  { description: 'Task 2', checked: false },
  { description: 'Task 3', checked: false },
  { description: 'Hire Ross', checked: true },
  { description: 'Task 5', checked: false }
]

const HomePage = ({ storedTodos }) => (
  <>
    <Head>
      <title>Todo list</title>
    </Head>
    <main
      className={
        'u-flex-row u-flex-justify-content-center u-padding-20 u-pull-up-170'
      }
    >
      <TodoList storedTodos={storedTodos} />
    </main>
  </>
)

HomePage.getInitialProps = ctx => ({
  storedTodos: getTodosFromCookies(ctx) || initialTodos
})

HomePage.propTypes = {
  storedTodos: PropTypes.array.isRequired
}

export default HomePage
