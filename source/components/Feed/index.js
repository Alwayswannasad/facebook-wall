import React, { Component } from 'react';
import Composer from "../../components/Composer/";
import Post from "../../components/Post/";
import Styles from './styles.m.css';
import StatusBar from "../StatusBar";
import Spinner from "../Spinner";

export default class Feed extends Component {
    state = {
        posts: [
            { id: '123', comment: 'Hello! I am here!', created: 1526825076849 },
            { id: '456', comment: 'Its me Mario!', created: 1526825076855 }
        ],
        isSpinning: true,
    };

    render () {
        const { posts, isSpinning } = this.state;
        const postsJSX = posts.map((post) => {
            return <Post key = { post.id } { ...post } />;
        });

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning = { isSpinning } />
                <StatusBar />
                <Composer />
                { postsJSX }
            </section>
        );
    }
}
