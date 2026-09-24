import http from '@/plugins/axios';
import {getDateOnly} from "@/utils/date";

export function getProjects(filter = null) {
    return http.get('/project',  { params: filter || '' });
}

export const projectService = {
    getProjects(filter = null) {
        return http.get('/project', { params: filter || '' })
    },

    createProject(payload) {
        payload = {
            ...payload,
            startDate: payload.startDate && getDateOnly(payload.startDate),
            endDate: payload.endDate && getDateOnly(payload.endDate)
        }

        return http.post('/project', payload);
    },

    updateProjectById(id, payload) {
        payload = {
            ...payload,
            startDate: payload.startDate && getDateOnly(payload.startDate),
            endDate: payload.endDate && getDateOnly(payload.endDate)
        }

        return http.put(`/project/${id}`, payload);
    },

    getProjectById(id) {
        return http.get(`/project/${id}`);
    },

    deleteProjectById(id) {
        return http.delete(`/project/${id}`);
    }
}
