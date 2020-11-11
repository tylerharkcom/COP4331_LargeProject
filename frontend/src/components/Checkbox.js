import React from 'react';

const Checkbox = (props) => 
{

    return (
        <div>
            <input 
                type="checkbox" 
                className="checkBox" 
                onClick={props.checked}
            />
        </div>
    );

};

export default Checkbox;