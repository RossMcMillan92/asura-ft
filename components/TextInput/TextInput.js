import './text-input.scss'

import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'

const TextInput = ({ className, id, label, name, onChange, ...otherProps }) => (
  <input
    {...otherProps}
    aria-label={label}
    className={classnames('text-input', className)}
    id={id}
    type="text"
    name={name}
    onChange={onChange}
  />
)

TextInput.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func
}

export default TextInput
