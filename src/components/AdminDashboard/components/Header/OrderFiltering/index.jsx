import { filterOptions } from '../../../constants';
import AmountRangeFields from './AmountRangeFields';
import DateRangeFields from './DateRangeFields';
import FilterFieldSelect from './FilterFieldSelect';
import FilterValueInput from './FilterValueInput';
import PendingFilterTags from './PendingFilterTags';

export default function OrderFiltering({ filtering }) {
  const fieldLabel = filterOptions.find(({ key }) => key === filtering.filterField)?.label;

  return (
    <div className="adminDashboardFilterRow">
      <form className="adminFilterForm" onSubmit={filtering.addFilter}>
        <FilterFieldSelect
          options={filterOptions}
          value={filtering.filterField}
          onChange={filtering.selectFilterField}
        />
        {filtering.filterField === 'createdAt' && (
          <DateRangeFields filtering={filtering} />
        )}
        {filtering.filterField === 'amount' && (
          <AmountRangeFields filtering={filtering} />
        )}
        {filtering.filterField && !['createdAt', 'amount'].includes(filtering.filterField) && (
          <FilterValueInput filtering={filtering} fieldLabel={fieldLabel} />
        )}
        <button
          className="adminAddFilter"
          type="submit"
          disabled={filtering.canAddFilter}
        >
          Filter
        </button>
      </form>
      <PendingFilterTags filtering={filtering} fieldLabel={fieldLabel} />
    </div>
  );
}
