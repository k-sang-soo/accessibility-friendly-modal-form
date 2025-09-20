import { useEffect, useId, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { RemoveScrollBar } from 'react-remove-scroll-bar';

export interface ContactFormData {
  name: string;
  email: string;
  experience: string;
  gitHubLink: string;
}

interface FormModalProps {
  isOpen: boolean;
  onSubmit: (data: ContactFormData) => void;
  onClose: () => void;
}

const FormModal = ({ isOpen, onSubmit, onClose }: FormModalProps) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const modalTitleId = useId();
  const nameId = useId();
  const nameErrorId = useId();
  const emailId = useId();
  const emailErrorId = useId();
  const experienceId = useId();
  const experienceErrorId = useId();
  const gitHubLinkId = useId();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  // 포커스 관리
  useEffect(() => {
    if (isOpen) {
      // 현재 포커스된 요소 저장
      previousFocusRef.current = document.activeElement as HTMLElement;
      // 모달 제목으로 포커스 이동
      setTimeout(() => titleRef.current?.focus(), 0);
    } else {
      // 모달 닫힐 때 이전 포커스로 복원
      previousFocusRef.current?.focus();
    }
  }, [isOpen]);

  // ESC 키 및 오버레이 클릭 처리
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // 모달 콘텐츠 영역 밖을 클릭했는지 확인
      if (isOpen && !target.closest('.modal-content')) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('keydown', handleEsc);
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleFormSubmit = (data: ContactFormData) => {
    onSubmit(data);
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <RemoveScrollBar />
      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        role="presentation"
      >
        <div
          className="modal-content bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto shadow-xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby={modalTitleId}
        >
          <div className="p-6">
            <h2
              ref={titleRef}
              id={modalTitleId}
              className="text-2xl font-bold mb-4"
              tabIndex={-1}
            >
              문의하기
            </h2>

            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor={nameId}
                  className="block text-sm font-medium mb-1"
                >
                  이름/닉네임 <span className="text-red-500">*</span>
                </label>
                <input
                  id={nameId}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? nameErrorId : undefined}
                  {...register('name', {
                    required: '이름을 입력해주세요.',
                  })}
                />
                {errors.name && (
                  <p
                    id={nameErrorId}
                    className="mt-1 text-sm text-red-600"
                    role="alert"
                  >
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor={emailId}
                  className="block text-sm font-medium mb-1"
                >
                  이메일 <span className="text-red-500">*</span>
                </label>
                <input
                  id={emailId}
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? emailErrorId : undefined}
                  {...register('email', {
                    required: '이메일을 입력해주세요.',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: '올바른 이메일 형식이 아닙니다.',
                    },
                  })}
                />
                {errors.email && (
                  <p
                    id={emailErrorId}
                    className="mt-1 text-sm text-red-600"
                    role="alert"
                  >
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor={experienceId}
                  className="block text-sm font-medium mb-1"
                >
                  RE 경력 연차 <span className="text-red-500">*</span>
                </label>
                <select
                  id={experienceId}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-invalid={!!errors.experience}
                  aria-describedby={
                    errors.experience ? experienceErrorId : undefined
                  }
                  {...register('experience', {
                    required: '경력 연차를 선택해주세요.',
                    validate: (value) =>
                      value !== '' || '경력 연차를 선택해주세요.',
                  })}
                >
                  <option value="">선택해주세요</option>
                  <option value="0-3">0 ~ 3년</option>
                  <option value="4-7">4 ~ 7년</option>
                  <option value="8+">8년차 이상</option>
                </select>
                {errors.experience && (
                  <p
                    id={experienceErrorId}
                    className="mt-1 text-sm text-red-600"
                    role="alert"
                  >
                    {errors.experience.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor={gitHubLinkId}
                  className="block text-sm font-medium mb-1"
                >
                  Github 링크 (선택)
                </label>
                <input
                  id={gitHubLinkId}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register('gitHubLink')}
                />
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  제출
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormModal;
