import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

class PostsNew extends React.Component {
    // field arg passes event handlers from Field component
    // Spread syntax saves us from things line onChange={field.input.onChange}
    renderField(field) {
        const {
            meta: { touched, error }
        } = field;

        const className = `form-control ${
            touched && error ? 'is-invalid' : ''
        }`;

        const formField =
            field.input.name === 'content' ? (
                <textarea rows="4" className={className} {...field.input} />
            ) : (
                <input className={className} type="text" {...field.input} />
            );

        return (
            <div className="form-group">
                <label>{field.label}</label>
                {formField}
                <div className="text-danger">
                    <em>{touched ? error : ''}</em>
                </div>
            </div>
        );
    }

    onSubmit(values) {
        console.log(values);
    }

    // Field's component prop tells Field what to look like
    render() {
        // handleSubmit gets added to the props by ReduxForm
        const { handleSubmit } = this.props;

        return (
            // ReduxForm does a check before letting our callback run
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
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
                <Link to="/" className="btn btn-danger">
                    Cancel
                </Link>
            </form>
        );
    }
}

// Properties should be the same name as the name property of the field they're validating
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
