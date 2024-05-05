import { useRoutes } from 'react-router-dom'
import AminLayout from '~/layouts/AminLayout'
import ClientLayout from '~/layouts/ClientLayout'
import Login from '~/pages/Auth/Login'
import Register from '~/pages/Auth/Register'
import CreateCategory from '~/pages/Category/CreateCategory'
import ManageCategoryList from '~/pages/Category/ManageCategoryList'
import UpdateCategory from '~/pages/Category/UpdateCategory'
import NotFound from '~/pages/NotFound'
import PermissionDenied from '~/pages/PermissionDenied'
import CreatePost from '~/pages/Post/CreatePost'
import DetailPost from '~/pages/Post/DetailPost'
import ListPost from '~/pages/Post/ListPost'
import ManagePostList from '~/pages/Post/ManagePostList'
import MyPost from '~/pages/Post/MyPost'
import UpdateMyPost from '~/pages/Post/UpdateMyPost'
import UpdatePost from '~/pages/Post/UpdatePost'
import ManageUserList from '~/pages/User/ManageUserList'
import MyProfile from '~/pages/User/MyProfile'
import UpdateUser from '~/pages/User/UpdateUser'
import { AdminRouter, RejectedRouter, UserRouter } from './protected'

export default function useRoutesElement() {
    return useRoutes([
        {
            path: '/',
            element: (
                <ClientLayout>
                    <ListPost />
                </ClientLayout>
            )
        },
        {
            path: '*',
            element: <NotFound />
        },
        {
            path: '/permission',
            element: <PermissionDenied />
        },

        {
            path: '',
            element: <AdminRouter />,
            children: [
                {
                    path: '/admin/users',
                    element: (
                        <AminLayout>
                            <ManageUserList />
                        </AminLayout>
                    )
                },
                {
                    path: '/admin/users/update/:id',
                    element: (
                        <AminLayout>
                            <UpdateUser />
                        </AminLayout>
                    )
                },
                {
                    path: '/admin/posts',
                    element: (
                        <AminLayout>
                            <ManagePostList />
                        </AminLayout>
                    )
                },

                {
                    path: '/posts/create',
                    element: (
                        <ClientLayout>
                            <CreatePost />
                        </ClientLayout>
                    )
                },
                {
                    path: '/admin/posts/update/:id',
                    element: (
                        <AminLayout>
                            <UpdatePost />
                        </AminLayout>
                    )
                },
                {
                    path: '/admin/categories',
                    element: (
                        <AminLayout>
                            <ManageCategoryList />
                        </AminLayout>
                    )
                },
                {
                    path: '/admin/categories/create',
                    element: (
                        <AminLayout>
                            <CreateCategory />
                        </AminLayout>
                    )
                },
                {
                    path: '/admin/categories/update/:id',
                    element: (
                        <AminLayout>
                            <UpdateCategory />
                        </AminLayout>
                    )
                }
            ]
        },
        {
            path: '',
            element: <UserRouter />,
            children: [
                {
                    path: '/users/me/update',
                    element: (
                        <ClientLayout>
                            <UpdateUser />
                        </ClientLayout>
                    )
                },
                {
                    path: '/users/me',
                    element: (
                        <ClientLayout>
                            <MyProfile />
                        </ClientLayout>
                    )
                },
                {
                    path: '/posts/create',
                    element: (
                        <ClientLayout>
                            <CreatePost />
                        </ClientLayout>
                    )
                },
                {
                    path: '/posts/update/:id',
                    element: (
                        <ClientLayout>
                            <UpdateMyPost />
                        </ClientLayout>
                    )
                },
                {
                    path: '/posts/me',
                    element: (
                        <ClientLayout>
                            <MyPost />
                        </ClientLayout>
                    )
                },
                {
                    path: '/posts/:id',
                    element: (
                        <ClientLayout>
                            <DetailPost />
                        </ClientLayout>
                    )
                }
            ]
        },
        {
            path: '',
            element: <RejectedRouter />,
            children: [
                { path: '/login', element: <Login /> },
                { path: '/register', element: <Register /> }
            ]
        }
    ])
}
