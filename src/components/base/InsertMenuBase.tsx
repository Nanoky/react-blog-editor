/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */

import { IonIcon } from '@ionic/react';
import { Editor, FloatingMenu } from '@tiptap/react';
import React, { useRef, useState } from 'react';
import MenuButton, { MenuButtonProps } from './MenuButton';
import { useUnsplashEnabled } from 'components/providers/Unsplash';
import { UnsplashPhoto } from 'services/unsplashService';
import UnsplashImageSelector from './ImageSelector';

interface ButtonProps extends MenuButtonProps {
    icon: string;
}

const InsertButton = ({ icon, ...props }: ButtonProps) => {
    return (
        <MenuButton
            {...props}
            iconComponent={(iconProps) => (
                <IonIcon name={icon} size={iconProps.size} />
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
                icon='camera-outlined'
                onClick={handleLocalImageClick}
            />
            {unsplashEnabled && (
                <InsertButton
                    title='Image from unsplash'
                    icon='image-outlined'
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
