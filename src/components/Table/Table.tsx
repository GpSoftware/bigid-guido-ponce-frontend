import './table.css';

import { FC, ReactNode } from 'react';

interface TableProps {
  headers: string[];
  children: ReactNode;
}

const Table: FC<TableProps> = ({ headers, children }) => {
  return (
    <table className='table'>
      <thead>
      <tr>
        {
          headers.map((item, idx) => <th key={idx}>{item}</th>)
        }
      </tr>
      </thead>
      {children}
    </table>
  );
}

export default Table;