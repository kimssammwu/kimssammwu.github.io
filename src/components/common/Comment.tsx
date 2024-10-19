import React, { ReactNode, useEffect, useRef, useState } from 'react';

type CommentStatus = 'pending' | 'success' | 'failed';


const Comment = ({ theme = 'github-light' }) => {
    const commentsEl = useRef<HTMLDivElement | null>(null);
    const [status, setStatus] = useState<CommentStatus>("pending");
    const [retry, setRetry] = useState<boolean>(false);

    const attributes = {
        "src": "https://utteranc.es/client.js",
        "repo": "kimssammwu/personal-blog-comment",
        "issue-term": "pathname",
        "label": "💬 blog comment",
        "theme": theme,
        "crossorigin": "anonymous",
    }

    const loadScript = () => {
        const utterancesElement = document.createElement('script');
        // utterances 이벤트 분기 처리
        utterancesElement.onload = () => setStatus("success");
        utterancesElement.onerror = () => {
            setStatus('failed');
            setRetry(true);
        };
        // utterances 속성 매핑 및 삽입
        Object.entries(attributes).forEach(([key, value]) => { utterancesElement.setAttribute(key, value); });
        utterancesElement.async = true;
        if (commentsEl.current != null) { commentsEl.current.appendChild(utterancesElement); }
    };

    useEffect(() => { loadScript(); }, []);

    const handleRetry = () => {
        setStatus('pending');
        setRetry(false);
        loadScript();
    };

    return (
        <div className="comments-wrapper mt-12">
            {status === 'failed' && (
                <div className="h-24 mt-8 p-6 border border-red-300 rounded-lg shadow-md bg-red-50 flex flex-col items-center justify-center">
                    <p className="text-lg font-semibold text-red-600 text-center">댓글을 불러오지 못했습니다</p>
                    {retry && (
                        <button className="px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition duration-200" onClick={handleRetry}>
                            재시도
                        </button>
                    )}
                </div>
            )}
            
            {status === 'pending' &&
                <div className="h-24 mt-8 p-6 border border-gray-300 rounded-lg shadow-md bg-gray-50">
                    <p className="text-xl font-semibold text-gray-700 text-center">댓글을 불러오는 중...</p>
                </div>
            }
            
            
            <div ref={commentsEl} />
        </div>
    );
};

export default Comment;