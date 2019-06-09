import './checkbox-input.scss'

import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'

const CheckboxInput = ({ checked, className, id, name, onChange, value }) => (
  <div
    className={classnames(
      'checkbox-input',
      { 'is-checked': checked },
      className
    )}
  >
    <input
      className={'checkbox-input__input'}
      id={id}
      type="checkbox"
      name={name}
      value={value}
      checked={!!checked}
      onChange={onChange}
    />
    <div className={'checkbox-input__facade'}>
      <CheckboxTickIcon />
    </div>
  </div>
)

const CheckboxTickIcon = () => (
  <svg
    className="checkbox-input__tick"
    viewBox="0 0 1024 1024"
    width="1024"
    height="1024"
  >
    <path
      className="path0"
      mi-d="M864 128l-480 480-224-224-160 160 384 384 640-640z"
      fill="#fff"
      d="M864 128l-480 480-224-224-160 160 384 384 640-640z"
    ></path>
  </svg>
)

CheckboxInput.propTypes = {
  checked: PropTypes.bool.isRequired,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
}

export default CheckboxInput
