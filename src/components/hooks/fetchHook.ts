/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useCallback } from 'react';

export const fetchHook = <T>(previousData = false) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean | null>(false);
    const [error, setError] = useState<string | null>(null);

    const baseUrl = import.meta.env.VITE_BASE_URL;

    const apiRequest = useCallback(
        async (method: string, slug: string, body?: BodyInit, headers?: HeadersInit) => {
            setLoading(true);
            setError(null);
            if (!previousData) setData(null);

            try {
                if (body) {
                    headers = {
                        ...headers,
                        'Content-Type': 'application/json',
                    };
                }
                const reqParams = {
                    method,
                    body,
                    headers,
                };

                const response = await fetch(`${baseUrl}/${slug}`, reqParams);

                const data = await response.json();

                if (!data.success) {
                    setLoading(false);
                    throw new Error('No data!');
                }

                if (data.success) {
                    setData(data);
                }
            } catch (err) {
                setLoading(false);
                if (err instanceof Error) {
                    setError(err.message);
                }
            }
        },
        [previousData]
    );

    return { loading, error, data, apiRequest };
};
