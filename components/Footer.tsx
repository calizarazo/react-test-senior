'use client';

import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { footerSx } from '@/styles/footerStyles';

/**
 * Componente de pie de página de la aplicación.
 * Muestra información del desarrollador y el año actual.
 *
 * @returns El componente de pie de página
 *
 * @remarks
 * El footer se adapta automáticamente al tema (claro/oscuro) y
 * muestra el año actual dinámicamente.
 *
 * @example
 * ```tsx
 * <Footer />
 * ```
 *
 * @public
 */
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box component="footer" sx={footerSx}>
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          Desarrollado por camilazo - {currentYear}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
