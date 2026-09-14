import { getPDFLib, readBytes } from './core.js';

export async function deletePages(file, indices) {
    const { PDFDocument } = getPDFLib();
    const pdf = await PDFDocument.load(await readBytes(file));
    [...indices].sort((a, b) => b - a).forEach(index => {
        if (index >= 0 && index < pdf.getPageCount()) pdf.removePage(index);
    });
    return pdf.save();
}

export async function reorderPages(file, order) {
    const { PDFDocument } = getPDFLib();
    const source = await PDFDocument.load(await readBytes(file));
    const output = await PDFDocument.create();
    const valid = order.filter(index => Number.isInteger(index) && index >= 0 && index < source.getPageCount());
    const pages = await output.copyPages(source, valid);
    pages.forEach(page => output.addPage(page));
    return output.save();
}
