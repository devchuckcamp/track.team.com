export class Ticket {
	id: number;
    project_id: string;
    title: string;
    description: string;
    status_id: number;
    assigned_to: number;
    created_by: string;
    created: number;
    modified: number;
    last_modified_by: number;
    tag_users:Array<any>;
}