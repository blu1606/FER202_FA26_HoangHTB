import { useState, useEffect } from 'react';
import axios from 'axios'

const AxiosDemo = () => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        axios.get(
            'https://jsonplaceholder.typicode.com/posts/',
            {
                params: {
                    userId: 1,
                    _limit: 5
                }
            }
        ).then(
            response => {
                setData(response.data)
            }
        ).catch(
            error => {
                setError(error.message)
            }
        )
    }, [])

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div>
            <h1>Axios Demo</h1>
            <h2>2.1 List 5 post of user 1</h2>
            {!data ? (
                <div>Loading...</div>
            ) : (
                <div>
                    {data.map(post => (
                        <li key={post.id}>

                            <div key={post.id}>
                                <h4>{post.title}</h4>
                                <p>{post.body}</p>
                            </div>
                        </li>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AxiosDemo;
