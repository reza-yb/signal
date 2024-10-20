import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { TipsListProps } from '../types/shared';

const TipsList: React.FC<TipsListProps> = ({ tips }) => (
  <List dense disablePadding>
    {tips.map((tip, index) => (
      <ListItem key={index} alignItems="flex-start" sx={{ py: 0.5 }}>
        <ListItemIcon sx={{ minWidth: 36 }}>
          <LightbulbIcon color="secondary" fontSize="small" />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography variant="body2" color="text.primary" fontWeight="medium">
              Tip {index + 1}
            </Typography>
          }
          secondary={
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
              {tip}
            </Typography>
          }
        />
      </ListItem>
    ))}
  </List>
);

export default TipsList;
