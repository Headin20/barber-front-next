import HttpService from "./HttpConstructor";
import axios from "axios";

const pause = (time) => {
    return (x) => new Promise((resolve) => setTimeout(() => resolve(x), time));
};

class FileService extends HttpService {
    constructor() {
        super();
        this.BASE_URL = '/File';
    }

    getLink({name = ''}) {
        const extension = name.split('.').slice(-1);
        return this.post(this.BASE_URL, {extension: `.${extension}`})
    }

    uploadToS3(url, file) {
        return axios.put(url, file, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        })
    }

    async uploadFile(file) {
        const {path} = await this.getLink(file).then(res => res.data);
        const {request} = await this.uploadToS3(path, file);

        return pause(1000)(request);
    }
}

export default new FileService();