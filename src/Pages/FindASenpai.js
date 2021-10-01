import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

export default function FindASenpai({match, location}) {
    const [senpaiList, setSenpaiList] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('/users')
            setSenpaiList(response.data)
            console.log(response.data)
        }
        fetchData()
    }, [])

    return (
        <div>
            <button onClick={(e) => console.log(senpaiList)}>Test</button>
            {senpaiList ? senpaiList.map((senpai) => (
                <Link to={`/senpais/${senpai._id}`} key={senpai.id}>
                    {senpai.name}
                </Link> 
                )) 
                : null}
        </div>
    )
}
