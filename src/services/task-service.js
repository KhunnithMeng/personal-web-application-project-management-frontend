import http from '@/plugins/axios';

export function getTasks(params) {
    return http.get('/task', { params: params || null})
}

export function getTasksByProjectId(projectId, params) {
    return http.get(`/project/${projectId}/task`, { params: params || null })
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
