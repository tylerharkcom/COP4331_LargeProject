import React from 'react';

const Checkbox = (props) => 
{
    const handleChange = event =>
    {
        props.checked(event);
    }

    return (
        <div>
            <input 
                type="checkbox" 
                className="checkBox" 
                onChange={handleChange}
            />
        </div>
    );

};

export default Checkbox;