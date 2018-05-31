import React, { Component } from 'react';
import Composer from "../../components/Composer/";
import Post from "../../components/Post/";
import Styles from './styles.m.css';
import StatusBar from "../StatusBar";
import Spinner from "../Spinner";
import { getUniqueID, delay } from "../../instruments";
import moment from 'moment';

export default class Feed extends Component {
    constructor () {
        super();

        this._createPost = this._createPost.bind(this);
        this._setPostsFetchingState = this._setPostsFetchingState.bind(this);
        this._likePost = this._likePost.bind(this);
        this._removePost = this._removePost.bind(this);
    }

    state = {
        posts: [
            { id: '123', comment: 'Hello! I am here!', created: 1526825076849, likes: []},
            { id: '456', comment: 'Its me Mario!', created: 1526825076855, likes: []}
        ],
        isSpinning: false,
    };

    _setPostsFetchingState (state) {
        this.setState({
            isSpinning: state,
        });
    }

    async _createPost (comment) {
        this._setPostsFetchingState(true);

        const post = {
            id:      getUniqueID(),
            created: moment().utc(),
            comment,
            likes:   [],
        };

        await delay(1200);

        this.setState(({ posts }) => ({
            posts:      [post, ...posts],
            isSpinning: false,
        }));
    }

    async _likePost (id) {
        const { currentUserFirstName, currentUserLastName } = this.props;

        this._setPostsFetchingState(true);

        await delay(1200);

        const newPosts = this.state.posts.map((post) => {
            if (post.id === id) {
                return {
                    ...post,
                    likes: [
                        {
                            id:        getUniqueID(),
                            firstName: currentUserFirstName,
                            lastName:  currentUserLastName,
                        }
                    ],
                };
            }

            return post;
        });

        this.setState({
            posts:      newPosts,
            isSpinning: false,
        });
    }

    async _removePost (event) {
        const newArray = [...this.state.posts];

        const index = newArray.indexOf(event.target.value);


        this._setPostsFetchingState(true);

        await delay(1200);

        newArray.splice(index, 1);

        this.setState({
            posts:      newArray,
            isSpinning: false,
        });
    }

    render () {
        const { posts, isSpinning } = this.state;
        const postsJSX = posts.map((post) => {
            return (<Post
                key = { post.id }
                { ...post }
                _likePost = { this._likePost }
                _removePost = { this._removePost }
            />);
        });

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning = { isSpinning } />
                <StatusBar />
                <Composer _createPost = { this._createPost } />
                { postsJSX }
            </section>
        );
    }
}
