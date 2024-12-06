import React from 'react';
import axios from "axios";
export default ({url, method, body})=>{
      const [errors, setErrors] = React.useState(null);
      const doRequest = async ()=>{
            try{
                  const response = await axios[method](url, body)
                  setErrors(null)
                  return response.data;
            }catch(err){
                  console.log(err)
                  setErrors(
                        <div className="alert alert-danger">
                              Oops...
                              <ul className="my-0">
                                    {err.response.data.errors.map(error=>
                                    <li key={error.message}>{error.message}</li>)}
                              </ul>
                        </div>
                  )
            }
      };

      return {doRequest, errors}
}