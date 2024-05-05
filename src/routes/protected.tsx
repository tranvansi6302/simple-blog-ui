import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AppContext } from '~/contexts/app.context'

export const RejectedRouter = () => {
    const { isAuthenticated } = useContext(AppContext)
    return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export const AdminRouter = () => {
    const { profile, isAuthenticated } = useContext(AppContext)
    return isAuthenticated && profile?.roles[0].name == 'ADMIN' ? <Outlet /> : <Navigate to='/permission' />
}
export const UserRouter = () => {
    const { profile, isAuthenticated } = useContext(AppContext)

    return isAuthenticated && profile?.roles[0].name == 'USER' ? <Outlet /> : <Navigate to='/permission' />
}
