export class Pagination {
    count: number;
}

export class UserDTO {
    user_id: string;
    name: string;
    email: string;
    address: string;
    photos: string[];
    creditcard: {
        type: string;
        number: string;
        name: string;
        expired: string;
    };
}

export class UserListSearchParamDTO {
    q: string;
    ob: string;
    sb: string;
    of: number;
    lt: number;
}