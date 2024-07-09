import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

export const getReminders = () => api.get('/reminders');
export const createReminder = (data) => api.post('/reminders', data);
export const deleteReminder = (id) => api.delete(`/reminders/${id}`);
