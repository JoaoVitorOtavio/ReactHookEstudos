import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// SIMULANDO UMA ACTION CREATOR
function addCourseAction(title) {
    return { type: 'ADD_COURSE', title }
}

export default function CourseList() {
    // como se fosse o mapStateToProps, recebe como parametro todo o estado da aplicação.
    const courses = useSelector(state => state.data)

    // como se fosse o mapDispatchToProps
    const dispatch = useDispatch();

    function addCourse() {
        dispatch(addCourseAction('graphQL'))
    }
    const [numeroCursos, setNumeroCursos] = useState(courses.length)

    //SEMPRE QUE COURSES TIVER UMA MUDANÇA VAI EXECUTAR ESSE useEffect, independente da mudança, seja remover algo ou alterar algo, mudou qualquer coisa do courses o useEffect é executado.
    useEffect(() => { 
        setNumeroCursos(courses.length) 
    }, [courses])

    return (
        <>
            <div style={{ border: '1px solid red', padding: '5px' }}>
                <h1>Numero de cursos: {numeroCursos}</h1>
            </div>
            <ul>
                {courses.map(course => <li key={course}>{course}</li>)}
            </ul>
            <button type='button' onClick={addCourse}>
                Adicionar curso
            </button>
        </>
    )
}

