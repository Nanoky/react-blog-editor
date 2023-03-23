/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */

import {
    Box,
    Button,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    Modal,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import { useSearch } from 'hooks/useUnsplash';
import React, { useEffect, useState } from 'react';
import { UnsplashPhoto } from 'services/unsplashService';

interface SelectorProps {
    onSelect: (image: UnsplashPhoto) => void;
    open: boolean;
    onClose: () => void;
}

const UnsplashImageSelector = ({ open, onSelect, onClose }: SelectorProps) => {
    const [text, setText] = useState('');
    const [page, setPage] = useState(1);
    const query = useSearch();

    useEffect(() => {
        if (page) {
            query.search(text, page);
        }
    }, [page]);

    const handleNextPage = () => {
        setPage((prev) => (prev < query.response.totalPage ? prev + 1 : prev));
    };

    const handlePreviewPage = () => {
        setPage((prev) => (prev > 1 ? prev - 1 : prev));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            query.search(text, page);
        }
    };

    const handleSelect = (image: UnsplashPhoto) => {
        onSelect(image);
        onClose();
    };

    const handleTextChange = ({
        target
    }: React.ChangeEvent<HTMLInputElement>) => {
        setText(target.value);
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Stack>
                <Box>
                    <TextField
                        onChange={handleTextChange}
                        onKeyDown={handleKeyDown}
                        placeholder='Type keywords to serch Unsplash, and press Enter'
                        variant='standard'
                        fullWidth
                    />
                </Box>
                {query.response.total > 0 && (
                    <React.Fragment>
                        <Stack>
                            <Button onClick={handlePreviewPage}>
                                Previous
                            </Button>
                            <Typography>{`${query.response.total} results`}</Typography>
                            <Button onClick={handleNextPage}>Next</Button>
                        </Stack>
                        <Box>
                            <ImageList>
                                {query.response.data.map((image) => (
                                    <ImageListItem
                                        key={image.id}
                                        onClick={() => handleSelect(image)}
                                    >
                                        <img
                                            src={image.link}
                                            alt={image.description}
                                        />
                                        <ImageListItemBar
                                            title={image.author}
                                            subtitle={image.description}
                                        />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        </Box>
                    </React.Fragment>
                )}
            </Stack>
        </Modal>
    );
};

export default UnsplashImageSelector;
