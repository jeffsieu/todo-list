import { Box, Typography } from '@mui/material';

export function TaskIdChip({ id }: { id: string }) {
  return (
    <Box
      className="py-0.5"
      sx={{
        borderColor: (theme) => theme.palette.divider,
      }}
    >
      <Typography
        variant="caption"
        sx={{
          fontFamily: 'monospace',
          color: (theme) => theme.palette.divider,
        }}
        gutterBottom={false}
      >
        {id}
      </Typography>
    </Box>
  );
}
