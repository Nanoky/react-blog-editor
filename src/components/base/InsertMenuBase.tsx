/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */

import { Editor, FloatingMenu } from '@tiptap/react';
import React, { useRef, useState } from 'react';
import MenuButton, { MenuButtonProps } from './MenuButton';
import { UnsplashPhoto } from 'services/unsplashService';
import UnsplashImageSelector from './ImageSelector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { faUnsplash } from '@fortawesome/free-brands-svg-icons';
import { useUnsplashEnabled } from 'hooks/useUnsplash';

interface ButtonProps extends MenuButtonProps {
    icon: IconProp;
}

const InsertButton = ({ icon, ...props }: ButtonProps) => {
    return (
        <MenuButton
            {...props}
            iconComponent={() => (
                <FontAwesomeIcon icon={icon} /* size={iconProps.size} */ />
            )}
        />
    );
};

interface MenuProps {
    editor: Editor;
}

const InsertMenuBase = ({ editor }: MenuProps) => {
    const unsplashEnabled = useUnsplashEnabled();
    const [openModal, setOpenModal] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleUnsplashImageClick = () => {
        setOpenModal(true);
    };

    const handleLocalImageClick = () => {
        inputRef.current?.click();
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleAddLocalImage = (file: File | undefined) => {
        if (file) {
            const image = URL.createObjectURL(file);
            editor.chain().focus().setImage({
                src: image
            });
        }
    };

    const handleAddUnsplashImage = (image: UnsplashPhoto) => {
        editor
            .chain()
            .focus()
            .setImage({
                src: image.link,
                alt: image.description,
                title: `${image.description} by <a href='${image.authorLink}'>${image.author}</a>`
            });
    };

    return (
        <FloatingMenu editor={editor}>
            <input
                ref={inputRef}
                type='file'
                hidden
                onChange={(e) => handleAddLocalImage(e.target.files?.[0])}
            />
            <InsertButton
                title='Image from computer'
                icon={faImage}
                onClick={handleLocalImageClick}
            />
            {unsplashEnabled && (
                <InsertButton
                    title='Image from unsplash'
                    icon={faUnsplash}
                    onClick={handleUnsplashImageClick}
                />
            )}
            <UnsplashImageSelector
                open={openModal}
                onClose={handleCloseModal}
                onSelect={handleAddUnsplashImage}
            />
        </FloatingMenu>
    );
};

export default InsertMenuBase;
