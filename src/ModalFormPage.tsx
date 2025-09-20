import { useState } from 'react';
import type { ContactFormData } from './components/feedback/FormModal';
import { openFormModal } from './utils/openFormModal';

const ModalFormPage = () => {
  const [submittedData, setSubmittedData] = useState<ContactFormData | null>(
    null,
  );

  const handleOpenModal = async () => {
    const result = await openFormModal();

    if (result) {
      setSubmittedData(result);
      console.log('제출된 데이터:', result);
    } else {
      console.log('모달이 취소되었습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          접근성 친화적인 모달 폼
        </h1>

        <button
          type="button"
          onClick={handleOpenModal}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          신청 폼 작성하기
        </button>

        {submittedData && (
          <div className="mt-8 p-6 bg-white rounded-lg shadow-md text-left">
            <h2 className="text-xl font-semibold mb-4">제출된 데이터:</h2>
            <dl className="space-y-2">
              <div>
                <dt className="font-medium text-gray-600">이름:</dt>
                <dd className="text-gray-900">{submittedData.name}</dd>
              </div>
              <div>
                <dt className="font-medium text-gray-600">이메일:</dt>
                <dd className="text-gray-900">{submittedData.email}</dd>
              </div>
              <div>
                <dt className="font-medium text-gray-600">경력:</dt>
                <dd className="text-gray-900">
                  {submittedData.experience === '0-3' && '0 ~ 3년'}
                  {submittedData.experience === '4-7' && '4 ~ 7년'}
                  {submittedData.experience === '8+' && '8년차 이상'}
                </dd>
              </div>
              {submittedData.gitHubLink && (
                <div>
                  <dt className="font-medium text-gray-600">GitHub:</dt>
                  <dd className="text-gray-900">{submittedData.gitHubLink}</dd>
                </div>
              )}
            </dl>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalFormPage;
