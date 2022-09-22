export const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const endpoints = {
    post: {
        list: `${BASE_URL}/posts`,
        create: `${BASE_URL}/posts`,
        update: `${BASE_URL}/posts`,
        show: `${BASE_URL}/posts`,
        delete: `${BASE_URL}/posts`,
        comments: `${BASE_URL}/comments`,
        userPost: `${BASE_URL}/users`,
    }
}