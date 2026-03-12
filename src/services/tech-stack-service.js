import http from '@/plugins/axios';

export function getTechStacks(params) {
    return http.get('/tech-stack', { params: params || null })
}
