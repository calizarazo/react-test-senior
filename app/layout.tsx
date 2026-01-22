import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import ThemeRegistry from '@/components/ThemeRegistry';

/**
 * Configuración de la fuente Inter de Google Fonts.
 *
 * @internal
 */
const inter = Inter({ subsets: ['latin'] });

/**
 * Metadatos de la aplicación para SEO y configuración del documento.
 *
 * @public
 */
export const metadata: Metadata = {
  title: 'Recetas del Mundo',
  description: 'Aplicación de recetas con Next.js y Material UI',
};

/**
 * Layout raíz de la aplicación Next.js.
 * Envuelve toda la aplicación con el tema de Material-UI y aplica estilos globales.
 *
 * @param props - Propiedades del componente
 * @param props.children - Componentes hijos de la aplicación
 * @returns El layout raíz con tema y estilos aplicados
 *
 * @remarks
 * Este componente:
 * - Define el idioma del documento HTML como español
 * - Aplica la fuente Inter a todo el body
 * - Proporciona el tema de Material-UI a través de ThemeRegistry
 * - Incluye los estilos globales CSS
 *
 * @example
 * ```tsx
 * // Este layout se aplica automáticamente a todas las páginas
 * ```
 *
 * @public
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}

