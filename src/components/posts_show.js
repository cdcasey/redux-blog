import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

// A user could bookmark the show page, so this component
// needs to fetch its own data
class PostsShow extends React.Component {
    componentDidMount() {
        // if forces use of existing state data if user comes from index page
        if (!this.props.post) {
            // Match is a prop provided by react-router
            const { id } = this.props.match.params;
            this.props.fetchPost(id).catch(console.error);
        }
    }

    onDeleteClick(event) {
        const { id } = this.props.match.params;
        // Could use this.props.post.id, but that would assume the post has been fetched
        this.props.deletePost(id, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const { post } = this.props;

        if (!post) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <Link to="/">Back to index</Link>
                <button
                    className="btn btn-danger float-right"
                    onClick={this.onDeleteClick.bind(this)}
                >
                    Delete Post
                </button>
                <h3>{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>{post.content}</p>
            </div>
        );
    }
}

// Gets just the posts from the application state object
// ownProps === this.props of PostsShow
function mapStateToProps({ posts }, ownProps) {
    // Could just be return { posts };
    // Uses the component's props to get the id from the URL
    // and get the corresponding post from the application state
    return { post: posts[ownProps.match.params.id] };
}

export default connect(
    mapStateToProps,
    { fetchPost, deletePost }
)(PostsShow);
