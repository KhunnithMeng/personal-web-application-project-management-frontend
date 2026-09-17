import http from '@/plugins/axios';

export function getCategories(payload) {
    return http.get('/category', { params: payload });
}

export function saveCategory(payload) {
    return http.post('/category', payload);
}

export function updateCategoryById(id, payload) {
    return http.put('/category/' + id, payload);
}

export function deleteCategoryById(id) {
    return http.delete('/category/' + id);
}