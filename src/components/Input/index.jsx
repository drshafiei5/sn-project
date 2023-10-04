/* eslint-disable react/display-name */
import PropTypes from 'prop-types';
import './index.scss';
import { forwardRef } from 'react';
import { omit } from 'lodash';

const Input = forwardRef((props, ref) => {
    return (
        <div className="form-row">
            {
                props.labelText && (
                    <label htmlFor={props.name} className="form-label">
                        {props.labelText}
                    </label>
                )
            }
             <input
                ref={ref}
                onChange={props.handleChange}
                className={`form-input ${props.className}`}
                autoComplete="false"
                {...omit(props, 'handleChange', 'className', 'labelText')}
            />
        </div>
    );
});

Input.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.string,
    labelText: PropTypes.string,
    value: PropTypes.any,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    handleChange: PropTypes.func,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    style: PropTypes.object
};

export default Input;
