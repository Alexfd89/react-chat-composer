import React, { Component } from 'react';
import { IconButton, Typography } from '@material-ui/core'
import IconAttachFile from '@material-ui/icons/AttachFile';
import IconSend from '@material-ui/icons/SendOutlined';
import EmojiButton from './emoji/EmojiButton';


class Input extends Component {

    state = {
        inputHasText: false,
        isContactsSelectorOpen: false,
        contactsSelectorFilter: '',
        contactsSelectorInputIndex: ''
    }

    toggleContactsSelector = (contactsSelectorInputIndex) => {
        if (!this.state.isContactsSelectorOpen) {
            this.setState({
                isContactsSelectorOpen: true,
                contactsSelectorInputIndex
            });
        }
    }

    closeContactsSelector = () => {
        if (this.state.isContactsSelectorOpen) {
            this.setState({
                isContactsSelectorOpen: false,
                contactsSelectorFilter: '',
                contactsSelectorInputIndex: ''
            });
        }
    }

    updateContactsSelectopFilter = () => {
        const { isContactsSelectorOpen, contactsSelectorInputIndex } = this.state
        if (isContactsSelectorOpen && contactsSelectorInputIndex) {
            const text = this.InputRef.innerText;
            
            console.warn(text.substring(contactsSelectorInputIndex + 1))
        }
    }

    handleKeyUp = (e) => {
        const inputHasText = e.target.innerHTML.length !== 0 && e.target.innerText !== '\n';
        if (inputHasText) {
            if (this.state.isContactsSelectorOpen) {
                const isValid = (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 97 && e.keyCode <= 122) || (e.keyCode >= 48 && e.keyCode <= 57);
                if (!isValid && false) {
                    this.closeContactsSelector();
                } else {
                    this.updateContactsSelectopFilter();
                }
            }
            if (e.shiftKey && e.keyCode === 50) {
                const text = e.target.innerText;
                const cursorIndex = this.getCursorPositionIndex();
                const prevChar = text[cursorIndex - 1];
                const nextChar = text[cursorIndex + 1];
                if ((!prevChar || prevChar === ' ') && (!nextChar || nextChar === ' ')) {
                    console.warn("Open popup")
                    const contactsSelectorInputIndex = cursorIndex;
                    this.toggleContactsSelector(contactsSelectorInputIndex);
                }
            }
        }
        this.setState({ inputHasText });
    }

    handleBlur = () => {
        if (this.state.isContactsSelectorOpen) {
            this.closeContactsSelector();
        }
    }

    handleKeyDown = (e) => {
        if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
            // Send Message
        }
    }

    getCursorPositionIndex = () => {
        let caretPos = 0, sel, range;
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.rangeCount) {
                range = sel.getRangeAt(0);
                if (range.commonAncestorContainer.parentNode === this.InputRef) {
                    caretPos = range.endOffset - 1;
                }
            }
        }
        return caretPos;
    }

    render() {
        const { inputHasText } = this.state;
        return (
            <div className='input-container'>
                <Typography
                    className='input'
                    role="button"
                    tabIndex="0"
                    component='div'
                    placeholder="Type a message..."
                    contentEditable={true}
                    ref={node => this.InputRef = node}
                    onKeyUp={this.handleKeyUp}
                    onKeyDown={this.handleKeyDown}
                    onBlur={this.handleBlur}
                />
                <EmojiButton
                    InputRef={this.InputRef}
                    inputHasText={inputHasText}
                />
                <IconButton>
                    <IconAttachFile className='input-attach-file-icon' />
                </IconButton>
                <IconButton disabled={!inputHasText}>
                    <IconSend />
                </IconButton>
            </div>
        )
    }
}

export default Input
