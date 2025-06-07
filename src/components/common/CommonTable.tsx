interface CommonTableProps<T> {
  columns: string[];
  data: T[];
  renderRow: (item: T, index: number) => React.ReactNode;
  emptyMessage?: string;
  selectable?: boolean;
  onRowSelect?: (item: T) => void;
}

function CommonTable<T>({
  columns,
  data,
  renderRow,
  emptyMessage = "데이터가 없습니다.",
  selectable = false,
  onRowSelect,
}: CommonTableProps<T>) {
  const handleRowClick = (item: T) => {
    if (selectable && onRowSelect) {
      onRowSelect(item);
    }
  };
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="px-6 py-3">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, idx) => (
              <tr
                key={idx}
                onClick={() => handleRowClick(item)}
                className={`${selectable ? "cursor-pointer hover:bg-gray-100" : ""} even:bg-gray-50 dark:even:bg-gray-800`}
              >
                {renderRow(item, idx)}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-6 py-4 text-center">
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CommonTable;
