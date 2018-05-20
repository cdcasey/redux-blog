import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
    renderField(field) {
        const { meta: { touched, error } } = field;
        const divClass = `form-group ${touched && error ? "has-danger" : ""}`;
        return (
            <div className={divClass}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    <em>{touched ? error : ''}</em>
                </div>
            </div>
        )
    }

    renderBody(field) {
        const { meta: { touched, error } } = field;
        const divClass = `form-group ${touched && error ? "has-danger" : ""}`;
        return (
            <div className={divClass}>
                <label>{field.label}</label>
                <textarea
                    className="form-control"
                    {...field.input}
                />
                <div className="text-help">
                    <em>{touched ? error : ''}</em>
                </div>
            </div>
        )
    }

    onSubmit(values) {
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }

    render() {

        const { handleSubmit } = this.props;

        return (
            <div>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field
                        label="Title"
                        name="title"
                        component={this.renderField}
                    />
                    <Field
                        label="Categories"
                        name="categories"
                        component={this.renderField}
                    />
                    <Field
                        label="Content for Post"
                        name="content"
                        component={this.renderBody}
                    />
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to="/" className="btn btn-danger">Cancel</Link>
                </form>
            </div>
        );
    }
}

function validate(values) {
    // console.log(values);

    const errors = {};
    if (!values.title) {
        errors.title = "Please enter a title"
    }
    if (!values.categories) {
        errors.categories = "Please enter at least one category"
    }
    if (!values.content) {
        errors.content = "Please enter a post body"
    }
    return errors;
}

export default reduxForm({
    validate,
    form: 'PostsNewForm'
})(
    connect(null, { createPost })(PostsNew)
);