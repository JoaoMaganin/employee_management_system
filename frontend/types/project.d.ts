declare namespace Project {

    type User = {
        id?: number | null;
        name: string;
        login: string;
        password: string;
        email: string;
    };

    type Resource = {
        id?: number;
        name: string;
        key: string;
    };

    type Profile = {
        id?: number;
        description: string;
    };

    type ProfileUser = {
        id?: number;
        profile: Profile,
        user: User;
    };

    type ProfileResource = {
        id?: number;
        profile: Profile;
        resource: Resource;
    }
}