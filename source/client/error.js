import React from 'react';


const Error = (props) => {
  return (
    <div className="Error">
      {props && props.error && props.error.message}
    </div>
  )
};

export default Error;





