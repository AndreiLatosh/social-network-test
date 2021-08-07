import * as axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '6a5f01d7-4ad7-477c-a951-ca28ae6cf5b0',
    }
})

export const userAPI = {
    getUsers(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
    },
    follow(userID) {
        return instance.post(`follow/${userID}`);
    },
    unfollow(userID) {
        return instance.delete(`follow/${userID}`);
    },
    getProfile(userID) {
        console.warn('Obsolete method. Use profileAPI object.')
        return profileAPI.getProfile(userID);
    }
}

export const profileAPI = {
    getProfile(userID) {
        return instance.get(`profile/${userID}`);
    },
    getStatus(userID) {
        return instance.get(`profile/status/${userID}`)
    },
    updateStatus(status) {
        return instance.put(`profile/status`, { status: status })
    },
    savePhoto(photoFile) {
        const formData = new FormData();
        formData.append('image', photoFile)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    saveProfile(profile) {
        return instance.put(`profile`, profile )
    },
}

export const authAPI = {
    me() {
        return instance.get(`auth/me`);
    },
    login(email, password, rememberMe = false) {
        return instance.post(`auth/login`, { email, password, rememberMe });
    },
    logout() {
        return instance.delete(`auth/login`);
    }
}

