import { RoleListResponse } from '~/@types/role.type'
import http from '~/utils/http'

const roleApi = {
    getAll: () => {
        return http.get<RoleListResponse>('/roles')
    }
}
export default roleApi
