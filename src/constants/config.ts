import { TableHeadItem } from '~/components/TableHead/TableHead'
export const HEADER = {
    H_MOBILE: 64,
    H_DESKTOP: 80,
    H_DESKTOP_OFFSET: 80 - 16
}

export const NAV = {
    WIDTH: 280
}

export const configTableUser: TableHeadItem[] = [
    {
        id: 'no',
        numeric: false,
        disablePadding: true,
        label: 'No',
        width: '10%'
    },
    {
        id: 'fullName',
        numeric: false,
        disablePadding: false,
        label: 'FullName',
        width: '30%'
    },
    {
        id: 'email',
        numeric: false,
        disablePadding: false,
        label: 'Email',
        width: '30%'
    },

    {
        id: 'action',
        numeric: false,
        disablePadding: false,
        label: 'Action',
        width: '30%'
    }
]

export const configTablePost: TableHeadItem[] = [
    {
        id: 'no',
        numeric: false,
        disablePadding: true,
        label: 'No',
        width: '10%'
    },
    {
        id: 'title',
        numeric: false,
        disablePadding: false,
        label: 'Title',
        width: '35%'
    },
    {
        id: 'author',
        numeric: false,
        disablePadding: false,
        label: 'Author',
        width: '15%'
    },

    {
        id: 'status',
        numeric: false,
        disablePadding: false,
        label: 'Status',
        width: '15%'
    },
    {
        id: 'action',
        numeric: false,
        disablePadding: false,
        label: 'Action'
    }
]

export const configTableMyPost: TableHeadItem[] = [
    {
        id: 'no',
        numeric: false,
        disablePadding: true,
        label: 'No',
        width: '10%'
    },
    {
        id: 'title',
        numeric: false,
        disablePadding: false,
        label: 'Title',
        width: '35%'
    },

    {
        id: 'status',
        numeric: false,
        disablePadding: false,
        label: 'Status',
        width: '15%'
    },
    {
        id: 'action',
        numeric: false,
        disablePadding: false,
        label: 'Action'
    }
]

export const configTableCategory: TableHeadItem[] = [
    {
        id: 'no',
        numeric: false,
        disablePadding: true,
        label: 'No',
        width: '10%'
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Name',
        width: '50%'
    },
    {
        id: 'action',
        numeric: false,
        disablePadding: false,
        label: 'Action',
        width: '40%'
    }
]

export enum PostStatus {
    UNAPPROVED = 'UNAPPROVED',
    APPROVED = 'APPROVED',
    LOCKED = 'LOCKED'
}

export interface PostStatusOption {
    id: string
    name: PostStatus
}

export const postStatusOptions: PostStatusOption[] = [
    { id: 'unapproved', name: PostStatus.UNAPPROVED },
    { id: 'approved', name: PostStatus.APPROVED },
    { id: 'locked', name: PostStatus.LOCKED }
]
