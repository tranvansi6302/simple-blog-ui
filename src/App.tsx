import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import useRoutesElement from './routes/router'

function App() {
    const elementRoutes = useRoutesElement()
    return (
        <main>
            {elementRoutes}
            <ToastContainer autoClose={600} position='bottom-right' />
        </main>
    )
}

export default App
