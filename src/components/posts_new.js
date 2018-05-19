import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class PostsNew extends Component {
    renderField(field) {
        console.log(field);

        return (
            <div className="form-group">
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                {field.meta.touched ? field.meta.error : ''}
            </div>
        )
    }

    renderBody(field) {
        return (
            <div className="form-group">
                <label>{field.label}</label>
                <textarea
                    className="form-control"
                    {...field.input}
                />
                {field.meta.touched ? field.meta.error : ''}
            </div>
        )
    }

    onSubmit(values) {
        console.log(values);
        console.log(this.props);

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
})(PostsNew);