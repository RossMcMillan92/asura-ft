import { mount, shallow } from 'enzyme'

import React from 'react'
import TodoList from './TodoList'
import { act } from 'react-dom/test-utils'
import { setTodosCookie } from '../../utils/cookies'

jest.mock('../../utils/cookies', () => ({
  setTodosCookie: jest.fn()
}))

const props = {
  storedTodos: [
    { description: 'Task 1', checked: false },
    { description: 'Task 2', checked: true }
  ]
}
const getWrapper = additionalProps =>
  mount(<TodoList {...props} {...additionalProps} />)
const getShallowWrapper = additionalProps =>
  shallow(<TodoList {...props} {...additionalProps} />)

describe('TodoList', () => {
  it('matches the snapshot', () => {
    const wrapper = getShallowWrapper()
    expect(wrapper).toMatchSnapshot()
  })

  describe('when there are stored todos', () => {
    it('lists the todos in a list element', () => {
      const wrapper = getWrapper()
      const list = wrapper.find('ul')
      const listItems = wrapper.find('ul li')

      expect(list.exists()).toBe(true)
      expect(listItems.length).toBe(props.storedTodos.length)
      expect(listItems.at(0).text()).toContain(props.storedTodos[0].description)
      expect(
        listItems
          .at(0)
          .find('[type="checkbox"]')
          .hostNodes()
          .prop('checked')
      ).toBe(props.storedTodos[0].checked)
      expect(listItems.at(1).text()).toContain(props.storedTodos[1].description)
      expect(
        listItems
          .at(1)
          .find('[type="checkbox"]')
          .hostNodes()
          .prop('checked')
      ).toBe(props.storedTodos[1].checked)
    })
  })

  describe('when the rendered Add Todo form is submitted', () => {
    const wrapper = getWrapper()
    const newTodoValue = 'To do task...'

    beforeAll(() => {
      act(() => {
        wrapper
          .find('#todo-entry')
          .hostNodes()
          .simulate('change', { target: { value: newTodoValue } })
      })
      wrapper.update()

      act(() => {
        wrapper.find('form').simulate('submit')
      })
      wrapper.update()
    })

    it('renders a new unchecked todo item in the list', () => {
      const listItems = wrapper.find('ul li')

      expect(listItems.length).toBe(props.storedTodos.length + 1)
      expect(listItems.at(0).text()).toContain(props.storedTodos[0].description)
      expect(listItems.at(1).text()).toContain(props.storedTodos[1].description)
      expect(listItems.at(2).text()).toContain(newTodoValue)
      expect(
        listItems
          .at(2)
          .find('[type="checkbox"]')
          .hostNodes()
          .prop('checked')
      ).toBe(false)
    })

    it('stores the todos in the cookies', () => {
      expect(setTodosCookie).toBeCalledWith([
        ...props.storedTodos,
        { description: newTodoValue, checked: false }
      ])
    })

    describe('when the same todo is added twice', () => {
      beforeAll(() => {
        act(() => {
          wrapper
            .find('#todo-entry')
            .hostNodes()
            .simulate('change', { target: { value: newTodoValue } })
        })
        wrapper.update()

        act(() => {
          wrapper.find('form').simulate('submit')
        })
        wrapper.update()
      })

      it('does not render the second one', () => {
        const listItems = wrapper.find('ul li')
        expect(listItems.length).toBe(props.storedTodos.length + 1)
      })
    })
  })

  describe("when a todo's delete button is clicked", () => {
    const wrapper = getWrapper()
    const todoItemToBeDeleted = wrapper.find('ul li').at(0)

    beforeAll(() => {
      expect(wrapper.find('ul li').hostNodes().length).toBe(
        props.storedTodos.length
      )

      act(() => {
        todoItemToBeDeleted
          .find('[data-testid="delete-button"]')
          .hostNodes()
          .simulate('click')
      })
      wrapper.update()
    })

    it('removes the todo item from the list', () => {
      expect(wrapper.find('ul li').hostNodes().length).toBe(
        props.storedTodos.length - 1
      )
      expect(wrapper.find('ul li').text()).not.toContain(
        props.storedTodos[0].description
      )
    })

    it('stores the new todo list in the cookies', () => {
      expect(setTodosCookie).toBeCalledWith(
        props.storedTodos.slice(1, props.storedTodos.length)
      )
    })
  })
})
