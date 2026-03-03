import http from '@/plugins/axios';

export function getTechStacks() {
    return http.get('/tech-stack')
}