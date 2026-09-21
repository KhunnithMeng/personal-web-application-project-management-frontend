import http from '@/plugins/axios';

export function getTags() {
    return http.get('/tag')
}

export const tagService = {
    getTags() {
        return http.get('/tag');
    },

    createTag(payload) {
        return http.post('/tag', payload);
    },

    updateTagById(id, payload) {
        return http.put('/tag/' + id, payload)
    },

    deleteTagById(id) {
        return http.delete('/tag/' + id)
    }
}
