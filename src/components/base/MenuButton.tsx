/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */

import { IconButton, Tooltip } from '@mui/material';
import { IconSizeType } from 'components/common/Types';
import React from 'react';

interface IconProps {
    size?: IconSizeType;
    active?: boolean;
}

interface ButtonProps {
    iconComponent?: (props: IconProps) => React.ReactNode;
    title?: string;
    onClick?: () => void;
    size?: IconSizeType;
    active?: boolean;
    disabled?: boolean;
}

export interface MenuButtonProps {
    title?: string;
    onClick?: () => void;
    size?: IconSizeType;
    active?: boolean;
    disabled?: boolean;
}

const MenuButton = ({
    title,
    iconComponent,
    size = 'medium',
    onClick,
    active = false,
    disabled = false
}: ButtonProps) => {
    return (
        <Tooltip title={title}>
            <IconButton
                onClick={onClick}
                size={size}
                color={active ? 'primary' : 'default'}
                disabled={disabled}
            >
                {iconComponent?.({
                    size,
                    active
                })}
            </IconButton>
        </Tooltip>
    );
};

export default MenuButton;
