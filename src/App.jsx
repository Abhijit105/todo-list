import { useEffect, useState } from 'react'
import Container from './common/Container'
import Heading from './common/Heading'
import InputContainer from './components/InputContainer'
import Modal from './components/Modal'
import Todos from './components/Todos'
import { useSession } from './store/store'
import Snackbar from './components/Snackbar'

function App() {
  const [showModal, setShowModal] = useState(true)
  const [showSnackbar, setShowSnackbar] = useState(false)

  const isLoggedIn = useSession(state => state.isLoggedIn)

  const closeModal = function() {
    setShowModal(false)
  }

  const closeSnackbar = function()  {
    setShowSnackbar(false)
  }

  useEffect(() => {
    if(!isLoggedIn)  return
    setShowModal(false)
    setShowSnackbar(true)
  }, [isLoggedIn])

  return (
    <Container cx={'main-container'}>
      <Heading title={'Just Do It! 🤠'} cx={'heading'} type={'h1'} />
      <InputContainer />
      <Todos />
      {showModal && <Modal onClose={closeModal} />}
      {showSnackbar && <Snackbar title={'Logged In'} onClose={closeSnackbar}/>}
    </Container>
  )
}

export default App
