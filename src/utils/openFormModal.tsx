import { overlay } from 'overlay-kit';
import type { ContactFormData } from '../components/feedback/FormModal';
import FormModal from '../components/feedback/FormModal';

export const openFormModal = (): Promise<ContactFormData | null> => {
  return new Promise((resolve) => {
    overlay.open(({ isOpen, close }) => (
      <FormModal
        isOpen={isOpen}
        onSubmit={(data) => {
          resolve(data);
          close();
        }}
        onClose={() => {
          resolve(null);
          close();
        }}
      />
    ));
  });
};
