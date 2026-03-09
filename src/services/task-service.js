import http from '@/plugins/axios';

export function getTasks() {
    return http.get('/task')
}

export function createTask(projectId, data) {
    return http.post('/project/'+ projectId +'/task', data)
}
