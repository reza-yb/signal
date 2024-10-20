import React from 'react';
import { StyledAvatar } from './StyledComponents';

interface NameAvatarProps {
  name: string;
}

const NameAvatar: React.FC<NameAvatarProps> = ({ name }) => (
  <StyledAvatar>{name[0].toUpperCase()}</StyledAvatar>
);

export default NameAvatar;
