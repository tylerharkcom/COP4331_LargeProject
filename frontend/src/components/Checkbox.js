import React from 'react';

const Checkbox = (props) => 
{
    const handleChange = event =>
    {
        props.selected(event);
    }

    return (
        <div>
            <input 
                type="checkbox" 
                checked={props.checked}
                className="checkBox" 
                onChange={handleChange}
            />
        </div>
    );

};

export default Checkbox;