export type photos = {
    data: {
        id: number;
        photo_logo: string;
        client_name: string;
        photo_url: string;
        album_id: string;
        marked_url: string;
        marked_logo: string;
    }[];
    success: boolean;
};
export type photo = {
    id: number;
    photo_logo: string;
    client_name: string;
    photo_url: string;
    album_id: string;
    marked_url: string;
    marked_logo: string;
};

export type album = {
    data: {
        id: number;
        album_name: string;
        album_location: string;
        person_id: string;
        album_logo: string | null;
        date: string;
    }[];
    success: boolean;
};

export type albumB = {
    data: [
        {
            id: number;
            album_name: string;
            album_location: string;
            date: string;
            person_id: string;
            album_logo: string;
        }
    ];
    success: true;
};

export type albumOne = {
    id: number;
    album_name: string;
    album_location: string;
    date: string;
    person_id: string;
    album_logo: string;
};
