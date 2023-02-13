export interface ClientsResponse {
    data: {
        id: number;
        client_name: string;
        phone_number: string;
        verified: string;
        selfie_image: string;
        albums_owned: string;
    }[];
    success: boolean;
}

export interface ClientResponse {
    id: number;
    client_name: string;
    phone_number: string;
    verified: string;
    selfie_image: string;
    albums_owned: string;
}
