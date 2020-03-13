export class User {
    id: number;
    username: string;
    email: string;
    name: string;
    role_id: number;
    user_details:Object;
    projects: Array<any>;
    user_crud_access: any;
    request_user_crud_access: any;
}