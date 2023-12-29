import request from "@/axios/axiosInstance";

export default {
    upload: (file) => {
        return request({
            url: `/upload`,
            method: 'POST',
            data: file
        })
    },
    openMonitor: () => {//打开监视器的请求
        return request({
            url: `/openMonitor`,
            method: 'POST',
        })
    },
    closeMonitor: () => {
        return request({
            url: `/closeMonitor`,
            method: 'POST',
        })
    }
}
