
export type ArxivSortBy = 'relevance' | 'lastUpdatedDate' | 'submittedDate';
export type ArxivSortOrder = 'ascending' | 'descending';

export interface ArxivQueryInput {
  search_query?: string;
  id_list?: string[]; 
  start?: number;     
  max_results?: number; 
  sortBy?: ArxivSortBy;
  sortOrder?: ArxivSortOrder;
}

export interface ArxivOut {
  id: string;              
  title: string;
  summary: string;
  authors: string[];
  published: string;       
  updated: string;         
  pdfUrl?: string;
  primaryCategory?: string;
  categories?: string[];   
  doiUrl?: string;         
  journalRef?: string;     
  comment?: string;        
}

export interface ArxivSuccess {
  Response: true;
  entries: ArxivOut[];
}

export interface ArxivError {
  Response: false;
  Error: string;
}





export type ResultadoConsultaArXiv = ArxivSuccess | ArxivError;