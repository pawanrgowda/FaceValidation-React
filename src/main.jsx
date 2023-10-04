import React from 'react'
import ReactDOM from 'react-dom/client'
import Nav from './Nav.jsx'
import './index.css'
// import Example from './call.jsx'
import ImageUploadForm from './conn.jsx'
import { FilePicker } from '../components/file-picker.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Nav />
    <div className='maindiv'>
    <FilePicker uploadURL={"/uploads"} />
    </div>
    <ImageUploadForm/>
    {/* <Example/> */}
  </React.StrictMode>,
)
