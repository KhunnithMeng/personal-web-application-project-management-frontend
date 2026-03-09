import http from '@/plugins/axios';

export function getTags() {
    return http.get('/tag')
}
