import React from "react";
import { mount } from 'enzyme';
import { authors, newCourse, courses } from '../../../tools/mockData';
import {ManageCoursePage} from './ManageCoursePage';
import { BrowserRouter as Router } from 'react-router-dom'
import * as redux from 'react-redux'

function render(args) {
    const defaultProps = {
        authors,
        courses,
        saveCourse: jest.fn(),
        loadAuthors: jest.fn(),
        loadCourses: jest.fn(),
        course: newCourse,
        match: {}
    };

    const spy = jest.spyOn(redux, 'useSelector')
    spy.mockReturnValue({ username:'test' })

    const props = { ...defaultProps, ...args };

    return mount(<Router><ManageCoursePage {...props} /></Router>);
}

it('sets error when attempting to save an empty title field', () => {
    const wrapper = render();
    wrapper.find('form').simulate('submit');
    const error = wrapper.find('.alert').first();
    expect(error.text()).toBe('Title is required');
})