import React, { Component } from 'react';
import { IconButton } from '@material-ui/core';
import IconEmojiPicker from '@material-ui/icons/TagFaces';
import EmojiPopupWindow from './EmojiPopupWindow';
import EmojiPicker from './EmojiPicker';


class EmojiButton extends Component {

    state = {
        emojiPickerIsOpen: false,
        emojiFilter: ''
    }

    componentDidMount() {
        this.emojiPickerButton = document.querySelector('#input-emoji-picker-button');
    }

    toggleEmojiPicker = (e) => {
        e.preventDefault();
        if (!this.state.emojiPickerIsOpen) {
            this.setState({ emojiPickerIsOpen: true });
        }
    }

    closeEmojiPicker = (e) => {
        if (this.emojiPickerButton.contains(e.target)) {
            e.stopPropagation();
            e.preventDefault();
        }
        this.setState({ emojiPickerIsOpen: false });
    }

    handleEmojiFilterChange = (e) => {
        const emojiFilter = e.target.value;
        this.setState({ emojiFilter });
    }

    handleEmojiPicked = (emoji) => {
        this.setState({ emojiPickerIsOpen: false });
        if (this.props.inputHasText) {
            this.props.InputRef.innerHTML += emoji;
        } else {
            // this.props.onSubmit({
            //     author: 'me',
            //     type: 'emoji',
            //     data: { emoji }
            // });
        }
    }

    render() {
        const { emojiPickerIsOpen, emojiFilter } = this.state;

        return (
            <div className="input-emoji-picker-wrapper">

                <EmojiPopupWindow
                    isOpen={emojiPickerIsOpen}
                    onClickedOutside={this.closeEmojiPicker}
                    onInputChange={this.handleEmojiFilterChange}
                >
                    <EmojiPicker
                        onEmojiPicked={this.handleEmojiPicked}
                        filter={emojiFilter}
                    />
                </EmojiPopupWindow>

                <IconButton
                    onClick={this.toggleEmojiPicker}
                    id="input-emoji-picker-button"
                >
                    <IconEmojiPicker />
                </IconButton>
            </div>
        );
    }
}

export default EmojiButton;

