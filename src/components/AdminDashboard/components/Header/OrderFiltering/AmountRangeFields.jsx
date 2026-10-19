import { ArrowRight } from 'lucide-react';

export default function AmountRangeFields({ filtering }) {
  return (
    <div className="adminAmountFilter adminFilterEnter">
      <label className="adminAmountEntry">
        <span className="adminVisuallyHidden">Enter starting amount</span>
        <span aria-hidden="true">$</span>
        <input
          type="number"
          min="0"
          step="any"
          placeholder="Starting amount"
          value={filtering.amountStart}
          onChange={(event) => filtering.setAmountStart(event.target.value)}
          aria-label="Enter starting amount"
        />
      </label>
      <ArrowRight className="adminAmountRangeArrow" size={18} aria-label="to" />
      <label className="adminAmountEntry adminAmountEnd">
        <span className="adminVisuallyHidden">Enter ending amount</span>
        <span aria-hidden="true">$</span>
        <input
          type="number"
          min="0"
          step="any"
          placeholder="Ending amount"
          value={filtering.amountEnd}
          onChange={(event) => filtering.setAmountEnd(event.target.value)}
          aria-label="Enter ending amount"
        />
      </label>
    </div>
  );
}
