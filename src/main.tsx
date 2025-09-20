import 'modern-normalize';
import { OverlayProvider } from 'overlay-kit';
import { createRoot } from 'react-dom/client';
import ModalFormPage from './ModalFormPage';

createRoot(document.getElementById('root')!).render(
  <OverlayProvider>
    <ModalFormPage />
  </OverlayProvider>,
);
