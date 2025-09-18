function createLocalData() {
    const localData = localStorage.getItem('tms_mock_db');
    if (!localData) {
        const initialData = {
            users: [
                { id: 'admin1', name: 'Robin Rawat', email: 'admin@tms.com', password: 'admin@123', role: 'admin' },
                { id: 'user1', name: 'Jatin Bamania', email: 'user@tms.com',  password: 'user@123', role: 'user' },
            ],
            tasks: [
                { id: 't1', title: 'Performance optimization', description: 'Improve efficiency of the app', assigneeId: 'admin1', status: 'open' },
                { id: 't2', title: 'Version update', description: 'update react to lastest version', assigneeId: null, status: 'open' },
                { id: 't3', title: 'Feature 1', description: 'Implement New Feature 1', assigneeId: null, status: 'open' },
                { id: 't4', title: 'Bug!!', description: 'Fix Bug', assigneeId: null, status: 'open' },
                { id: 't5', title: 'Test Case', description: 'Increase test case %', assigneeId: null, status: 'open' },
                { id: 't6', title: 'Feature 2', description: 'Implement New Feature 2', assigneeId: null, status: 'open' },
            ],
        };
        dbWrite(initialData);
    }
}
function dbRead() {
    createLocalData();
    return JSON.parse(localStorage.getItem('tms_mock_db'));
}
function dbWrite(data) {
    localStorage.setItem('tms_mock_db', JSON.stringify(data));
}

function generateToken(user) {
    const header = btoa(JSON.stringify({ alg: 'none' }));
    const payload = btoa(JSON.stringify({ id: user.id, email: user.email, role: user.role, name: user.name }));
    const signature = btoa('signature');
    return `${header}.${payload}.${signature}`;
}

export const Api = {
    login: async (email, password) => {
        const db = dbRead();
        const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (!user) throw new Error('User not found');
        if (user.password !== password) throw new Error('Invalid password');
        return generateToken(user);
    },

    getProfile: async (token) => {
        try {
            if (!token) return null;
            const parts = token.split('.');
            if (parts.length < 2) return null;
            const payload = JSON.parse(atob(parts[1]));
            return payload;
        } catch (e) {
            return null;
        }
    },

    listUsers: async () => {
        const db = dbRead();
        return db.users.slice();
    },
    createUser: async ({ name, email, role = 'user' }) => {
        const db = dbRead();
        const id = 'u_' + Date.now();
        const user = { id, name, email, role };
        db.users.push(user);
        dbWrite(db);
        return user;
    },

    listTasks: async ({ page = 1, pageSize = 5 } = {}) => {
        const db = dbRead();
        const start = (page - 1) * pageSize;
        const items = db.tasks.slice().sort((a, b) => a.id.localeCompare(b.id));
        const pageItems = items.slice(start, start + pageSize);
        return { items: pageItems, total: items.length };
    },
    createTask: async ({ title, description, assigneeId = null }) => {
        const db = dbRead();
        const id = 't_' + Date.now();
        const task = { id, title, description, assigneeId, status: 'open' };
        db.tasks.push(task);
        dbWrite(db);
        return task;
    },
    updateTask: async (id, patch) => {
        const db = dbRead();
        const idx = db.tasks.findIndex(t => t.id === id);
        if (idx === -1) throw new Error('Task not found');
        db.tasks[idx] = { ...db.tasks[idx], ...patch };
        dbWrite(db);
        return db.tasks[idx];
    },
    deleteTask: async (id) => {
        const db = dbRead();
        db.tasks = db.tasks.filter(t => t.id !== id);
        dbWrite(db);
        return true;
    }
};