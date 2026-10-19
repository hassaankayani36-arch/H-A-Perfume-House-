import { useRef, useState } from 'react';
import { formatDateTag, getTodayDate, parseDateInput } from '../utils';

export default function useFilterDraft() {
  const [filterValue, setFilterValue] = useState('');
  const [filterField, setFilterField] = useState('');
  const [selectedFilterValues, setSelectedFilterValues] = useState([]);
  const [dateStart, setDateStart] = useState('');
  const [dateStartInput, setDateStartInput] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [dateEndInput, setDateEndInput] = useState('');
  const [dateRangeMode, setDateRangeMode] = useState('');
  const [amountStart, setAmountStart] = useState('');
  const [amountEnd, setAmountEnd] = useState('');
  const filterInputRef = useRef(null);
  const dateStartPickerRef = useRef(null);
  const dateEndPickerRef = useRef(null);

  function selectFilterField(key) {
    setFilterField(key);
    setFilterValue('');
    setSelectedFilterValues([]);
    setDateStart('');
    setDateStartInput('');
    setDateEnd('');
    setDateEndInput('');
    setDateRangeMode('');
    setAmountStart('');
    setAmountEnd('');
  }

  function updateStartDate(value) {
    const parsedDate = parseDateInput(value);
    setDateStartInput(value);
    setDateStart(parsedDate);
    if (dateEnd && dateEnd < parsedDate) {
      setDateEnd('');
      setDateEndInput('');
    }
  }

  function updateEndDate(value) {
    setDateEndInput(value);
    setDateEnd(parseDateInput(value));
    setDateRangeMode('end');
  }

  function chooseStartDate(value) {
    setDateStart(value);
    setDateStartInput(value ? formatDateTag(value) : '');
    if (dateEnd && dateEnd < value) {
      setDateEnd('');
      setDateEndInput('');
    }
  }

  function chooseEndDate(value) {
    setDateEnd(value);
    setDateEndInput(value ? formatDateTag(value) : '');
    setDateRangeMode('end');
  }

  function setEndDateToToday() {
    setDateEnd(getTodayDate());
    setDateEndInput('Today');
    setDateRangeMode('today');
  }

  function formatDateInputOnBlur(value, setInputValue) {
    const parsedDate = parseDateInput(value);
    if (parsedDate) setInputValue(formatDateTag(parsedDate));
  }

  function openDatePicker(inputRef) {
    const datePicker = inputRef.current;
    if (!datePicker) return;
    if (typeof datePicker.showPicker === 'function') datePicker.showPicker();
    else datePicker.focus();
  }

  function addSelectedValue(value) {
    setSelectedFilterValues((current) => current.includes(value) ? current : [...current, value]);
    setFilterValue('');
    filterInputRef.current?.focus();
  }

  function removeSelectedValue(value) {
    setSelectedFilterValues((current) => current.filter((item) => item !== value));
  }

  return {
    filterValue,
    setFilterValue,
    filterField,
    selectedFilterValues,
    dateStart,
    dateStartInput,
    setDateStartInput,
    dateEnd,
    dateEndInput,
    setDateEndInput,
    dateRangeMode,
    setDateRangeMode,
    amountStart,
    setAmountStart,
    amountEnd,
    setAmountEnd,
    filterInputRef,
    dateStartPickerRef,
    dateEndPickerRef,
    selectFilterField,
    updateStartDate,
    updateEndDate,
    chooseStartDate,
    chooseEndDate,
    setEndDateToToday,
    formatDateInputOnBlur,
    openDatePicker,
    addSelectedValue,
    removeSelectedValue,
  };
}
