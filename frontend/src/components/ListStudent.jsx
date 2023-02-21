import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ReactPaginate from "react-paginate"

const ListStudent = () => {
    const [students, setStudents] = useState([])
    const [page, setPage] = useState(0)
    const [limit, setlimit] = useState(2)
    const [pages, setPages] = useState(0)
    const [rows, setRows] = useState(0)
    const [keyword, setKeyword] = useState("")
    const [query, setQuery] = useState("")
    const [msg, setMsg] = useState("")

    useEffect(() => {
        getStudents()
    }, [page, keyword])

    const getStudents = async () => {
        const response = await axios.get(`http://localhost:5000/students?search_query=${keyword}&page=${page}&limit=${limit}`)
        setStudents(response.data.result)
        setPage(response.data.page)
        setPages(response.data.totalPage)
        setRows(response.data.totalRows)
    }

    const deleteStudent = async (id) => {
        await axios.delete(`http://localhost:5000/students/${id}`)
        getStudents()
    }

    const changePage =({selected}) => {
        setPage(selected)
        if(selected === 9){
            setMsg("Jika tidak menemukan data yang anda cari, silahkan cari data dengan kata kunci yang lebih spesifik!")
        }else{
            setMsg("")
        }
    }

    const searchData = (e) => {
        e.preventDefault()
        setPage(0)
        setKeyword(query)
    }

  return (
    <div>
        <h1 className='title'>Students</h1>
        <h2 className='subtitle'>List of Students</h2>
        <Link to="/students/add" className='button is-primary mb-3'>
            Add New
        </Link>
        <form onSubmit={searchData}>
            <div className='field has-addons'>
                <div className='control is-expanded'>
                    <input 
                        type="text" 
                        className='input' 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder='Find Something in Here' 
                    />
                </div>
                <div className='control'>
                    <button type='submit' className='button is-info'>Search</button>
                </div>
            </div>
        </form>
        <table className='table is-striped is-fullwidth mt-3'>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Country</th>
                    <th>Horoscope</th>
                    <th>Hobby</th>
                    <th>Gender</th>
                    <th>Image</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {students.map((student) => (
                    <tr key={student.id}>
                        <td>{student.id}</td>
                        <td>{student.name}</td>
                        <td>{student.email}</td>
                        <td>{student.age}</td>
                        <td>{student.Country.name}</td>
                        <td>{student.Horoscope.name}</td>
                        <td>{student.Hobby.name}</td>
                        <td>{student.gender}</td>
                        <td>
                            <img 
                                className='image is-128x128'
                                src={student.url} 
                                alt="Image"
                            />
                        </td>
                        <td>
                            <Link to={`/students/edit/${student.id}`} className="button is-small is-info">
                                Edit
                            </Link>
                            <button onClick={()=> deleteStudent(student.id)} className="button is-small is-danger">
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <p>
            Total Rows: {rows} Page: {rows ? page + 1 : 0} of {pages}
        </p>
        <p className='has-text-centered has-text-danger'>{msg}</p>
        <nav 
            className="pagination is-centered"
            key={rows}
            role="navigation" 
            aria-label='pagination'
        >
            <ReactPaginate
                previousLabel={"< Prev"}
                nextLabel={"Next >"}
                pageCount={Math.min(10, pages)}
                onPageChange={changePage}
                containerClassName={"pagination-list"}
                pageLinkClassName={"pagination-link"}
                previousLinkClassName={"pagination-previous"}
                nextLinkClassName={"pagination-next"}
                activeLinkClassName={"pagination-link is-current"}
                disabledLinkClassName={"pagination-link is-disabled"}
            />
        </nav>
    </div>
  )
}

export default ListStudent