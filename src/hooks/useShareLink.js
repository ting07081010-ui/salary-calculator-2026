import { useState, useCallback } from 'react';
import { encodeSharePayload } from '../utils/shareLink';

/**
 * 分享連結功能 Hook
 * 使用現代 Clipboard API
 */
export const useShareLink = ({ teacherType, classes, ptBasicHours }) => {
    const [copySuccess, setCopySuccess] = useState(false);

    const copyShareLink = useCallback(async () => {
        const encoded = encodeSharePayload({ teacherType, classes, ptBasicHours });
        const url = new URL(window.location.href);
        url.searchParams.set('s', encoded);

        try {
            // 使用現代 Clipboard API
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(url.toString());
            } else {
                // 降級處理：舊版瀏覽器
                const dummy = document.createElement('input');
                document.body.appendChild(dummy);
                dummy.value = url.toString();
                dummy.select();
                document.execCommand('copy');
                document.body.removeChild(dummy);
            }

            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    }, [teacherType, classes, ptBasicHours]);

    return { copyShareLink, copySuccess };
};
