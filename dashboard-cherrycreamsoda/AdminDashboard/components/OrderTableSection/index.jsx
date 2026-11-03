import AppliedFiltersSection from '../Header/OrderFiltering/AppliedFiltersSection';
import ReceiptSection from '../ReceiptSection';
import OrderTableBody from './OrderTableBody';
import OrderTableHeader from './OrderTableHeader';

export default function OrderTableSection({
  visibleOrders,
  sort,
  onSort,
  onStatusChange,
  onReceiptSelect,
  selectedReceipt,
  onReceiptClose,
  filters,
  tableScroll,
}) {
  return (
    <section className="adminOrdersPanel" aria-label="Orders table">
      <AppliedFiltersSection filtering={filters} />
      <div className="adminTableFrame">
        <div className="adminTableHeaderFrame">
          <div
            className="adminTableHeaderScroll"
            ref={tableScroll.headerScrollRef}
            aria-label="Sortable order columns"
          >
            <OrderTableHeader sort={sort} onSort={onSort} />
          </div>
        </div>
        <div className="adminTableBodyFrame">
          <div
            className="adminTableScroll"
            ref={tableScroll.bodyScrollRef}
            onScroll={tableScroll.handleScroll}
          >
            <OrderTableBody
              orders={visibleOrders}
              onStatusChange={onStatusChange}
              onReceiptSelect={onReceiptSelect}
            />
          </div>
        </div>
      </div>
      <ReceiptSection
        receipt={selectedReceipt}
        onClose={onReceiptClose}
        onStatusChange={onStatusChange}
      />
    </section>
  );
}
