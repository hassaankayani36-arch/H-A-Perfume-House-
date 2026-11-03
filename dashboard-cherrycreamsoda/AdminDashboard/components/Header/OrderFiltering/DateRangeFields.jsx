import { ArrowRight, CalendarDays } from 'lucide-react';

export default function DateRangeFields({ filtering }) {
  return (
    <div className="adminDateFilter adminFilterEnter">
      <label className="adminDateEntry">
        <span className="adminVisuallyHidden">Give a start date</span>
        <input
          type="text"
          inputMode="numeric"
          placeholder="Give a date"
          value={filtering.dateStartInput}
          onChange={(event) => filtering.updateStartDate(event.target.value)}
          onBlur={(event) => filtering.formatDateInputOnBlur(event.target.value, filtering.setDateStartInput)}
          aria-label="Give a start date"
        />
        <button
          className="adminCalendarButton"
          type="button"
          aria-label="Choose start date from calendar"
          onClick={() => filtering.openDatePicker(filtering.dateStartPickerRef)}
        >
          <CalendarDays size={17} aria-hidden="true" />
        </button>
        <input
          ref={filtering.dateStartPickerRef}
          className="adminDatePickerNative"
          type="date"
          value={filtering.dateStart}
          onChange={(event) => filtering.chooseStartDate(event.target.value)}
          tabIndex={-1}
          aria-hidden="true"
        />
      </label>
      <button
        className="adminDateRangeToggle"
        type="button"
        disabled={!filtering.dateStart}
        aria-label={filtering.dateRangeMode ? 'Remove end date' : 'Add end date'}
        aria-expanded={Boolean(filtering.dateRangeMode)}
        onClick={() => {
          if (filtering.dateRangeMode) {
            filtering.setDateRangeMode('');
            filtering.setDateEnd('');
            filtering.setDateEndInput('');
          } else {
            filtering.setDateRangeMode('end');
          }
        }}
      >
        <ArrowRight size={17} aria-hidden="true" />
      </button>
      {filtering.dateRangeMode && (
        <label className="adminDateEntry adminDateEnd adminFilterEnter">
          <span className="adminVisuallyHidden">Give an end date</span>
          <input
            type="text"
            inputMode="numeric"
            placeholder="To date"
            value={filtering.dateEndInput}
            onChange={(event) => filtering.updateEndDate(event.target.value)}
            onBlur={(event) => filtering.formatDateInputOnBlur(event.target.value, filtering.setDateEndInput)}
            aria-label="Give an end date"
          />
          <button
            className="adminCalendarButton"
            type="button"
            aria-label="Choose end date from calendar"
            onClick={() => filtering.openDatePicker(filtering.dateEndPickerRef)}
          >
            <CalendarDays size={17} aria-hidden="true" />
          </button>
          <input
            ref={filtering.dateEndPickerRef}
            className="adminDatePickerNative"
            type="date"
            value={filtering.dateEnd}
            min={filtering.dateStart || undefined}
            onChange={(event) => filtering.chooseEndDate(event.target.value)}
            tabIndex={-1}
            aria-hidden="true"
          />
          <button
            className="adminDateTodayButton"
            type="button"
            onClick={filtering.setEndDateToToday}
          >
            Today
          </button>
        </label>
      )}
    </div>
  );
}
