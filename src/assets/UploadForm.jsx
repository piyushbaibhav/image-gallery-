import React, { useState } from 'react';

const UploadForm = ()=>{
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

    const changeHandler =(e)=>{
        // const [file, setFile] = useState(null);
        // const [error, setError] = useState(null);

        const types = ['image/png','image/jpeg','image/gif']
        
        let selected = e.target.files[0];
        // console.log(selected);
        if(selected && types.includes(selected.type)){
            setFile(selected);
        }else{
            setFile(null);
            setError('Error : Please select a valid file type to be uploaded (png, jpeg, gif)');
        }
    }

    return(
        <form>
            <input type='file' onChange={changeHandler} />
            <div className='output'>
                { error && <div className="error">{ error }</div>}

            </div>
        </form>
    )
}

export default UploadForm;