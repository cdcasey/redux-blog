import React from 'react';
import { Field, reduxForm } from 'redux-form';

class PostsNew extends React.Component {
    // field arg passes event handlers from Field component
    // Spread syntax saves us from things line onChange={field.input.onChange}
    renderField(field) {
        const formField =
            field.input.name === 'content' ? (
                <textarea rows="4" className="form-control" {...field.input} />
            ) : (
                <input className="form-control" type="text" {...field.input} />
            );
        return (
            <div className="form-group">
                <label>{field.label}</label>
                {formField}
            </div>
        );
    }

    // Field's component prop tells Field what to look like
    render() {
        return (
            <form>
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
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                />
            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.title) {
        errors.title = 'Enter a title!';
    }
    if (!values.categories) {
        errors.categories = 'Enter at least one category.';
    }
    if (!values.content) {
        errors.content = 'Content can not be empty!';
    }
    // If errors is empty, the form should submit
    return errors;
}

// Connect component to reduxForm and by extension the form reducer
// form property is name of the form and should be unique in case
// that there are multiple forms on screen at the same time (so this
// form won't share state with other forms)
export default reduxForm({
    validate,
    form: 'PostsNewForm'
})(PostsNew);
