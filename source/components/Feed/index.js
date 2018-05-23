import React, { Component } from 'react';
import Composer from "../../components/Composer/";
import Post from "../../components/Post/";
import Styles from './styles.m.css';
import StatusBar from "../StatusBar";

export default class Feed extends Component {
    render () {
        return (
            <section className = { Styles.feed }>
                <StatusBar />
                <Composer />
                <Post />
            </section>
        );
    }
}
