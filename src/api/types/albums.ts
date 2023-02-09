export type albumsResponse = {
    data: {
        id: number;
        album_name: string;
        album_location: string;
        date: string;
        person_id: string;
        album_logo: string;
    }[];
    success: boolean;
};
