import http from '@/plugins/axios';

export function getTechStacks(params) {
    return http.get('/tech-stack', { params: params || null })
}

export function createTechStack(payload) {
    return http.post('/tech-stack', payload);
}

export function updateTechStack(id, payload) {
    return http.put('/tech-stack/' + id, payload);
}

export function deleteTechStack(id) {
    return http.delete('/tech-stack/' + id);
}
