/* eslint-disable no-unused-vars */
import {
    IconButton,
    InputAdornment,
    SvgIconTypeMap,
    TextField
} from '@mui/material';
import { BubbleMenu, Editor } from '@tiptap/react';
import React, { KeyboardEvent, useCallback, useEffect, useState } from 'react';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import CancelIcon from '@mui/icons-material/Cancel';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { Level } from '@tiptap/extension-heading';
import MenuButton, { MenuButtonProps } from './MenuButton';

interface ButtonProps extends MenuButtonProps {
    Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & { muiName: string };
}

const FormatButton = ({ Icon, ...props }: ButtonProps) => {
    return (
        <MenuButton
            {...props}
            iconComponent={() => <Icon fontSize='inherit' />}
        />
    );
};

interface MenuProps {
    editor: Editor;
    linkPlaceholder?: string;
    headingLevels?: Array<Level>;
    disableBold?: boolean;
    disableItalic?: boolean;
    disableLink?: boolean;
    disableHeading?: boolean;
}

const FormatMenuBase = ({
    editor,
    linkPlaceholder = 'Past or type a link ...',
    headingLevels,
    disableBold = false,
    disableHeading = false,
    disableItalic = false,
    disableLink = false
}: MenuProps) => {
    const [showMenu, setShowMenu] = useState(true);
    const [linkValue, setLinkValue] = useState('');
    const [levels, setLevels] = useState<Array<Level>>([1, 2]);

    useEffect(() => {
        if (headingLevels) {
            setLevels(headingLevels);
        }
    }, [headingLevels]);

    const handleBoldClick = useCallback(() => {
        editor.chain().focus().toggleBold().run();
    }, [editor]);

    const handleItalicClick = useCallback(() => {
        editor.chain().focus().toggleItalic().run();
    }, [editor]);

    const handleLinkClick = useCallback(() => {
        setShowMenu((prev) => !prev);
    }, [showMenu]);

    const handleHeadingClick = useCallback(
        (level: Level) => {
            editor.chain().focus().toggleHeading({ level: level }).run();
        },
        [editor]
    );

    const handleSubmitLink = (event: KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Enter') {
            setShowMenu((prev) => !prev);

            editor
                .chain()
                .focus()
                .extendMarkRange('link')
                .toggleLink({ href: linkValue, target: '_blank' })
                .run();
        }
    };

    const handleLinkChange = ({
        target
    }: React.ChangeEvent<HTMLInputElement>) => {
        setLinkValue(target.value);
    };

    const handleClearField = useCallback(() => {
        setLinkValue('');
    }, [linkValue]);

    return (
        <BubbleMenu editor={editor}>
            {showMenu ? (
                <React.Fragment>
                    <FormatButton
                        title='Bold'
                        Icon={FormatBoldIcon}
                        onClick={handleBoldClick}
                        active={editor.isActive('bold')}
                        disabled={disableBold || editor.isActive('heading')}
                    />
                    <FormatButton
                        title='Italic'
                        Icon={FormatItalicIcon}
                        onClick={handleItalicClick}
                        active={editor.isActive('italic')}
                        disabled={disableItalic || editor.isActive('heading')}
                    />
                    <FormatButton
                        title='Link'
                        Icon={InsertLinkIcon}
                        onClick={handleLinkClick}
                        active={editor.isActive('link')}
                        disabled={disableLink}
                    />
                    <FormatButton
                        title='H1'
                        Icon={FormatSizeIcon}
                        onClick={() => handleHeadingClick(levels[0])}
                        active={editor.isActive('heading', {
                            level: levels[0]
                        })}
                        disabled={disableHeading}
                    />
                    <FormatButton
                        title='H2'
                        Icon={FormatSizeIcon}
                        size='small'
                        onClick={() => handleHeadingClick(levels[1])}
                        active={editor.isActive('heading', {
                            level: levels[1]
                        })}
                        disabled={disableHeading}
                    />
                </React.Fragment>
            ) : (
                <TextField
                    placeholder={linkPlaceholder}
                    onKeyDown={handleSubmitLink}
                    onChange={handleLinkChange}
                    autoFocus
                    sx={{
                        backgroundColor: 'Background'
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton onClick={handleClearField}>
                                    <CancelIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
            )}
        </BubbleMenu>
    );
};

export default FormatMenuBase;
