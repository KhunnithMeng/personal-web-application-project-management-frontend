import http from '@/plugins/axios';

export function getTasks() {
    return http.get('/task')
}

export function createTask(projectId, data) {
    return http.post('/project/'+ projectId +'/task', data)
}

export function getTaskById(projectId, taskId) {
    return http.get(`/project/${projectId}/task/${taskId}`);
}

export function editTaskById(projectId, taskId, data) {
    return http.put(`/project/${projectId}/task/${taskId}`, data)
}

export function deleteTaskById(projectId, taskId) {
    return http.delete(`/project/${projectId}/task/${taskId}`)
}
