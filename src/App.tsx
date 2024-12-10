import { Route, Routes } from 'react-router-dom'
import { Login } from './screens/Login'
import { Signup } from './screens/Signup'
import { CompanySignUp } from './screens/CompanySignUp'
import { CreateCourse } from './screens/CreateCourse'

function App() {

  return (
    <Routes>
      <Route path='/'>
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path='company_sign_up' element={<CompanySignUp />} />
        <Route path='create_course' element = {<CreateCourse />} />
      </Route>
    </Routes>
  )
}

export default App
