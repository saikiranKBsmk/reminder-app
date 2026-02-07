
import { ToastContainer } from 'react-toastify'
import './App.css'
import ReminderForm from './components/ReminderForm'

function App() {

  return (
    <> 
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar
        theme="colored"
        closeOnClick
        pauseOnHover
      />
      <ReminderForm/>
    </>
  ) 
}

export default App
