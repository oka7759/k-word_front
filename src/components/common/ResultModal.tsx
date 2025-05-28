function ResultModal({ title, content, callbackFn }: ResultModal) {
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-screen text-center bg-black bg-opacity-70">
      <div className="w-10/12 bg-white rounded md:w-1/3">
        <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
          <div className="bg-white px-16 py-3 rounded-md text-center">
            <h1 className="text-lg mb-8  ">{content}</h1>
            <button
              className="bg-blue-600 px-7 py-2 ml-2 rounded-md text-md text-white"
              onClick={() => {
                if (callbackFn) {
                  callbackFn();
                }
              }}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultModal;
