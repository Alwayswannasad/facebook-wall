// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.m.css';
import PropTypes from 'prop-types';
import { Consumer } from "../HOC/withProfile";

export default class Composer extends Component {
    static propTypes = {
        _createPost: PropTypes.func.isRequired,
    };

    constructor () {
        super();

        this._handleFormSubmit = this._handleFormSubmit.bind(this);
        this._submitComment = this._submitComment.bind(this);
        this._updateComment = this._updateComment.bind(this);
        this._submitOnEnter = this._submitOnEnter.bind(this);
    }

    state = {
        comment: '',
    };

    _handleFormSubmit (event) {
        event.preventDefault();
        this._submitComment();
    }

    _updateComment (event) {
        this.setState({
            comment: event.target.value,
        });
    }

    _submitComment = () => {
        const { comment } = this.state;

        if (!comment) {
            return null;
        }

        this.props._createPost(comment);

        this.setState({
            comment: '',
        });

    };

    _submitOnEnter (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            this._submitComment();
        }
    }

    render () {
        const { comment } = this.state;

        return (
            <Consumer>
                {(context) => (
                    <section className = { Styles.composer }>
                        <img src = { context.avatar } />
                        <form onSubmit = { this._handleFormSubmit }>
                            <textarea
                                placeholder = { `What's on your mind, ${context.currentUserFirstName}?` }
                                value = { comment }
                                onChange = { this._updateComment }
                                onKeyPress = { this._submitOnEnter }
                            />
                            <input type = 'submit' value = 'Post' />
                        </form>
                    </section>
                )}
            </Consumer>
        );
    }
}
