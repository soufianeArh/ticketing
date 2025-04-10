import React from 'react';
import axios from "axios";
export default ({url, method, body, onSuccess})=>{
      const [errors, setErrors] = React.useState(null);
      const doRequest = async (doRequestprops = {})=>{
            try{
                  const response = await axios[method](url, {...body, ...doRequestprops})
                  setErrors(null)
                  onSuccess(response.data)
                  return response.data;
            }catch(err){
                  console.log(err)
                  if(!err.response){
                       console.log('Network err ')
                  }else{
                        console.log("Api Error")
                        setErrors(
                              <div className="alert alert-danger">
                                    Oops...
                                    <ul className="my-0">
                                          {err.response.data.errors.map(error=>
                                          <li key={error.message}>{error.message}</li>)}
                                    </ul>
                              </div>
                        );
                  }
            }
      };

      return {doRequest, errors}
}