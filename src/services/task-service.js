import http from '@/plugins/axios';

export function getTasks() {
    return http.get('/task')
}
