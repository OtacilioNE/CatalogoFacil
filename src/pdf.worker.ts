// src/pdf.worker.ts
import { GlobalWorkerOptions } from 'pdfjs-dist';

// Define o caminho para o worker
GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString();
