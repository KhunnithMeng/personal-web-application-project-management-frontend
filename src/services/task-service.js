import http from '@/plugins/axios';
import {getDateOnly} from "@/utils/date";

export const taskService = {
    getTasks(params) {
        return http.get('/task', { params })
    },

    getTaskByProjectId(projectId, params) {
        return http.get(`/project/${projectId}/task`, { params })
    },

    createTask(projectId, data) {
        return http.post('/project/'+ projectId +'/task', {
            ...data,
            deadline: getDateOnly(data.deadline)
        })
    },

    getTaskById(projectId, taskId) {
        return http.get(`/project/${projectId}/task/${taskId}`)
    },

    updateTaskById(projectId, taskId, data) {
        return http.put(`/project/${projectId}/task/${taskId}`, {
            ...data,
            deadline: getDateOnly(data.deadline)
        })
    },

    deleteTaskById(projectId, taskId) {
        return http.delete(`/project/${projectId}/task/${taskId}`)
    }
}
