import { Slide, toast as ReactToastify, ToastContent, ToastOptions } from 'react-toastify';

export const toast = (content: ToastContent, options?: ToastOptions<{}>) =>
  ReactToastify(content, {
    theme: window.matchMedia('prefers-color-scheme: dark').matches ? 'dark' : 'light',
    position: 'top-center',
    hideProgressBar: true,
    closeOnClick: true,
    autoClose: 4000,
    pauseOnHover: true,
    pauseOnFocusLoss: true,
    draggable: true,
    delay: 0,
    transition: Slide,
    className: 'rounded-lg',
    ...options,
  });

export const remove = (tid?: string | number) => ReactToastify.dismiss(tid);
export const isDisplaying = (tid: string | number): boolean => ReactToastify.isActive(tid);
