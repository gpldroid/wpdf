// WPDF shared application state and runtime configuration.
export const APP = {
  lang: localStorage.getItem('wpdf-lang') || 'ar',
  theme: localStorage.getItem('wpdf-theme') || 'dark',
  files: [],
  currentTool: null,
  pdfjsReady: false
};

export const PDFJS_WORKER = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

export async function getFileBuffer(file) {
  if (typeof file.arrayBuffer === 'function') return file.arrayBuffer();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
  });
}
