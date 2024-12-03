import {CreateOptions} from 'html-pdf';
import pdf from 'html-pdf'
import { promisify } from 'util';
import { getPhantomJsPath } from '../os/env';


export async function convertHtmlToPdf(html: string): Promise<Buffer>  {
  const phantomPath = getPhantomJsPath() // Dynamically resolve PhantomJS path
  
  const options:CreateOptions = {
    format: 'A4',
    border: {
      top: '10mm',
      right: '10mm',
      bottom: '10mm',
      left: '10mm',
    },
  phantomPath: phantomPath,
  };
  try{
    // Generate the PDF buffer using the promisified method
    const pdfInstance =  pdf.create(html, options);
    const toBufferAsync = promisify(pdfInstance.toBuffer.bind(pdfInstance));
    return await toBufferAsync()
    }
  catch (err: any) {
    throw new Error(`Failed to generate PDF: ${err.message}`);
  }
}

 



