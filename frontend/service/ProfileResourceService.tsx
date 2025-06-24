import { BaseService } from "./BaseService";


export class ProfileResourceService extends BaseService {

    constructor() {
        super('/profile-resource');
    }
}