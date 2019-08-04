import React, { Component } from 'react';
import { EditorState, getDefaultKeyBinding, ContentState, convertToRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import { Typography, IconButton } from '@material-ui/core';
import IconEmojiPicker from '@material-ui/icons/TagFaces';
import IconAttachFile from '@material-ui/icons/AttachFile';
import IconSend from '@material-ui/icons/SendOutlined';

export default class Composer extends Component {

    constructor(props) {
        super(props);
        this.mentionPlugin = createMentionPlugin({
            positionSuggestions: this.mentionPosition
        });
        this.emojiPlugin = createEmojiPlugin({
            selectButtonContent: <IconEmojiPicker />,
        });
        this.state = {
            editorState: EditorState.createEmpty(),
            suggestions: mentions,
        }
    }

    mentionPosition = (settings) => ({
        left: settings.decoratorRect.left + 'px',
        top: settings.decoratorRect.top - 15 + 'px',
        display: 'block',
        transform: 'scale(1) translateY(-100%)',
    })

    onChange = (editorState) => {
        this.setState({ editorState });
    }

    onSearchChange = ({ value }) => {
        this.setState({ suggestions: defaultSuggestionsFilter(value, mentions) });
    }

    focus = () => {
        this.editor.focus();
    }

    keyBindingFn = (e) => {
        if (!e.shiftKey && e.keyCode === 13) {
            return 'send-message';
        }
        return getDefaultKeyBinding(e);
    }

    clearInput = () => {
        const editorState = EditorState.push(this.state.editorState, ContentState.createFromText(''));
        this.setState({ editorState });
    }

    sendMessage = () => {
        const { editorState } = this.state;
        const content = editorState.getCurrentContent();
        const raw = convertToRaw(content);
        console.log(raw);
        const message = JSON.stringify(raw);
        this.clearInput();
    }

    handleKeyCommand = (command) => {
        if (command === 'send-message') {
            this.sendMessage();
        }
    }

    render() {
        const { editorState } = this.state;
        const { EmojiSelect } = this.emojiPlugin;
        const { MentionSuggestions } = this.mentionPlugin;
        const plugins = [this.mentionPlugin, this.emojiPlugin];
        const hasText = editorState.getCurrentContent().hasText();
        return (
            <Typography component='div' className='input-container'>
                <div className='input-wrapper'>
                    <div className='input' onClick={this.focus}>
                        <MentionSuggestions
                            onSearchChange={this.onSearchChange}
                            suggestions={this.state.suggestions}
                        />
                        <Editor
                            editorState={editorState}
                            onChange={this.onChange}
                            plugins={plugins}
                            ref={(element) => { this.editor = element; }}
                            keyBindingFn={this.keyBindingFn}
                            handleKeyCommand={this.handleKeyCommand}
                            spellCheck={true}
                            placeholder='Type a message...'
                        />
                    </div>
                    <div className='input-actions'>
                        <EmojiSelect />
                        <IconButton>
                            <IconAttachFile />
                        </IconButton>
                        <IconButton disabled={!hasText} onClick={this.sendMessage}>
                            <IconSend />
                        </IconButton>
                    </div>
                </div>
            </Typography>
        );
    }
}

const mentions = [
    {
        name: 'Matthew Russell',
        link: 'https://twitter.com/mrussell247',
        avatar: 'https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg',
    },
    {
        name: 'Julian Krispel-Samsel',
        link: 'https://twitter.com/juliandoesstuff',
        avatar: 'https://avatars2.githubusercontent.com/u/1188186?v=3&s=400',
    },
    {
        name: 'Jyoti Puri',
        link: 'https://twitter.com/jyopur',
        avatar: 'https://avatars0.githubusercontent.com/u/2182307?v=3&s=400',
    },
    {
        name: 'Max Stoiber',
        link: 'https://twitter.com/mxstbr',
        avatar: 'https://pbs.twimg.com/profile_images/763033229993574400/6frGyDyA_400x400.jpg',
    },
    {
        name: 'Nik Graf',
        link: 'https://twitter.com/nikgraf',
        avatar: 'https://avatars0.githubusercontent.com/u/223045?v=3&s=400',
    },
    {
        name: 'Pascal Brandt',
        link: 'https://twitter.com/psbrandt',
        avatar: 'https://pbs.twimg.com/profile_images/688487813025640448/E6O6I011_400x400.png',
    },
];