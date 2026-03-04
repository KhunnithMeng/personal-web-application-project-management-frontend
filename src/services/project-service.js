import http from '@/plugins/axios';

export function getProjects(filter = null) {
    return http.get('/project',  { params: filter || '' });
}

export function createProject(data) {
    return http.post('/project', data);
}

export function getProjectById(id) {
    return http.get('/project/' + id);
}

export function updateProjectById(id, data) {
    return http.put('/project/' + id, data);
}

export function deleteProjectId(id) {
    return http.delete('/project/' + id);
}
