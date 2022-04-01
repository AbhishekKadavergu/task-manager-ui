export class User {

    token!: string;
    user!: {
        _id: string;
        name: string;
        age: number;
        email: string;
        createdAt?: any;
        updatedAt?: any;
        __v?: number;
    };
}
