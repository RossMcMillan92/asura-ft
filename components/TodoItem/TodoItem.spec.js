import { mount, shallow } from 'enzyme'

import React from 'react'
import TodoItem from './TodoItem'
import { act } from 'react-dom/test-utils'

const props = {
  checked: false,
  id: 'checkbox-id',
  name: 'checkbox-name',
  onChange: jest.fn(),
  onDelete: jest.fn(),
  value: 'value',
  label: 'Todo item label'
}
const getWrapper = additionalProps =>
  mount(<TodoItem {...props} {...additionalProps} />)
const getShallowWrapper = additionalProps =>
  shallow(<TodoItem {...props} {...additionalProps} />)

describe('TodoItem', () => {
  it('matches the snapshot', () => {
    const wrapper = getShallowWrapper()
    expect(wrapper).toMatchSnapshot()
  })

  describe('when the rendered checkbox is changed', () => {
    it('calls the passed onChange prop', () => {
      const wrapper = getWrapper()
      act(() => {
        wrapper.find('input').simulate('change')
      })
      expect(props.onChange).toBeCalled()
    })
  })

  describe('when the delete button is clicked', () => {
    it('calls the passed onDelete prop', () => {
      const wrapper = getWrapper()
      act(() => {
        wrapper
          .find('#checkbox-id-delete-button')
          .hostNodes()
          .simulate('click')
      })
      expect(props.onDelete).toBeCalled()
    })
  })

  describe('when the prop checked is passed as true', () => {
    const checked = true
    const wrapper = getWrapper({ checked })

    it('sets the input to checked', () => {
      expect(wrapper.find('input').prop('checked')).toBe(checked)
    })

    it('appends the class to the className', () => {
      expect(wrapper.find('.todo-item').prop('className')).toContain(
        'todo-item is-checked'
      )
    })
  })
})
