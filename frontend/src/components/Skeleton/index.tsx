import React, { useMemo } from "react";

const SkeletonRow: React.FC = () => {
  const cellCount = 5;

  const cells = useMemo(
    () =>
      Array.from({ length: cellCount }).map((_, index) => (
        <td key={index} className="py-4 px-3">
          <div className="animate-pulse bg-gray-200 rounded h-4"></div>
        </td>
      )),
    [cellCount]
  );

  return <tr>{cells}</tr>;
};

const TableSkeleton: React.FC = () => {
  const skeletonRowsCount = 12;

  const skeletonRows = useMemo(
    () =>
      Array.from({ length: skeletonRowsCount }).map((_, index) => (
        <SkeletonRow key={index} />
      )),
    [skeletonRowsCount]
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center"></div>
      <div className="mt-8 flow-root">
        <div className="align-middle inline-block min-w-full">
          <div className="shadow overflow-hidden sm:rounded-lg ring-1 ring-black ring-opacity-5">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr></tr>
              </thead>
              <tbody className="bg-white">{skeletonRows}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableSkeleton;
