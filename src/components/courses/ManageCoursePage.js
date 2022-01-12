import React, { useEffect, useState } from "react";
import { connect, useSelector, useDispatch } from 'react-redux'
import {loadCourses, saveCourse} from '../../redux/actions/courseActions'
import {loadAuthors} from '../../redux/actions/authorActions'
import PropTypes from 'prop-types'
import CourseForm from "./CourseForm";
import Spinner from "../common/Spinner";
import { newCourse } from "../../../tools/mockData";
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from "react-toastify";

const getCourseBySlug = (slug,courses) => {
    let course=newCourse
    courses?.map((element)=>{
        if(element.slug===slug) course=element
    })

    return   course
}    


export function ManageCoursePage({ 
    ...props 
    }) {
    const location = useLocation()
    const slug = location.pathname.substring(8)
    
    let {courses, authors} = useSelector((state)=>state)

    let currentCourse = getCourseBySlug(slug, courses)

    const [course, setCourse] = useState(currentCourse);
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);
    
    
    let navigate = useNavigate()
    useEffect(()=>{
        if(courses?.length === 0 ){
            props.loadCourses().catch(error => {
                alert("Loading courses failed" + error);
            });
        }
        
        if(authors?.length === 0 ){
            props.loadAuthors().catch(error => {
                alert("Loading authors failed" + error);
            });
        }   
        
    }, [])

    
    useEffect(()=>{
        setCourse(currentCourse)
    },[currentCourse])
    

    function handleChange(event){
        const { name, value } = event.target;
        setCourse( prevCourse => ({
            ...prevCourse,
            [name]: name ==="authorId" ? parseInt(value, 10) : value
        }))
    }

    function handleSave(event){
        event.preventDefault();
        if(!formIsValid()) return;
        setSaving(true)
        props.saveCourse(course).then(()=>{
            toast.success('Course saved.');
            navigate('../courses')
        }).catch(error =>{
            setSaving(false)
            setErrors({onSave: error.message});
        })
    }

    const formIsValid = () => {
        const { title, authorId, category } = course;
        const errors = {}

        if(!title) errors.title = "Title is required";
        if(!authorId) errors.author = 'Author is required';
        if(!category) errors.category = 'Category is required' 

        setErrors(errors);

        return Object.keys(errors).length === 0;
    }

    return (
        (authors?.length === 0 || courses?.length === 0) ? (
            <Spinner/>
        ) :
           (<CourseForm 
                course={course} 
                errors={errors} 
                authors={authors ? authors : []} 
                onChange={handleChange} 
                onSave={handleSave}
                saving={saving}
                />)
    
    )
}

const mapDispatchToProps={
        loadCourses,
        loadAuthors,
        saveCourse,
}

export default connect(null, mapDispatchToProps)(ManageCoursePage);
