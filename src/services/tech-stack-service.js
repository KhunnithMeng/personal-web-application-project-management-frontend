import http from '@/plugins/axios';

export function getTechStacks(params) {
    return http.get('/tech-stack', { params: params || null })
}

export function createTechStack(payload) {
    return http.post('/tech-stack', payload);
}
