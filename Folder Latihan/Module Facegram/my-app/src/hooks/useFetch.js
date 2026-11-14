import { useState, useEffect } from 'react';

export function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        setLoading(true);
        fetch(url, {
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) throw new Error('Gagal memuat data');
            return res.json();
        })
        .then(result => {
            setData(result);
            setLoading(false);
        })
        .catch(err => {
            setError(err.message);
            setLoading(false);
        });
    }, [url]);

    return { data, loading, error };
}