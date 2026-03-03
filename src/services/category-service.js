import http from '@/plugins/axios';

export function getCategories() {
    return http.get('/category');
}