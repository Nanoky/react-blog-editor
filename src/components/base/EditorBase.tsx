import { Box } from '@mui/material';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React from 'react';
import FormatMenuBase from './FormatMenuBase';
import InsertMenuBase from './InsertMenuBase';

interface Props {
    placeholder: string;
    initialContent?: string;
    onHTMLChange: (code: string) => void;
    editable?: boolean;
    formatMenu?: React.ReactNode;
    insertMenu?: React.ReactNode;
}

const EditorBase = ({
    placeholder,
    editable = true,
    formatMenu,
    insertMenu,
    initialContent,
    onHTMLChange
}: Props) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: placeholder
            }),
            Link,
            Image
        ],
        editable: editable,
        onUpdate: ({ editor }) => {
            onHTMLChange(editor.getHTML());
        },
        content: initialContent
    });

    return (
        <Box>
            {editor && (
                <React.Fragment>
                    {formatMenu ? (
                        formatMenu
                    ) : (
                        <FormatMenuBase editor={editor} />
                    )}
                    {insertMenu ? (
                        insertMenu
                    ) : (
                        <InsertMenuBase editor={editor} />
                    )}
                </React.Fragment>
            )}
            <EditorContent editor={editor} />
        </Box>
    );
};

export default EditorBase;
