import "./date-filter.css"; 
import { useState, useEffect } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { format, addMonths, subMonths, setYear, getYear } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { Button } from "@/components/ui/button";
import { DayPicker } from "react-day-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface DateFilterProps {
  onDateRangeChange: (from: Date | undefined, to: Date | undefined) => void;
  initialFromDate?: Date;
  initialToDate?: Date;
}

const DateFilter = ({
  onDateRangeChange,
  initialFromDate = new Date(2020, 0, 1),
  initialToDate = new Date()
}: DateFilterProps) => {
  const [month, setMonth] = useState<Date>(initialFromDate);
  const [selectedFrom, setSelectedFrom] = useState<Date | undefined>(initialFromDate);
  const [selectedTo, setSelectedTo] = useState<Date | undefined>(initialToDate);
  const [isOpen, setIsOpen] = useState(false);
  const [selectionMode, setSelectionMode] = useState<'from' | 'to'>('from');

  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2019 }, (_, i) => 2020 + i);

  const handlePreviousMonth = () => {
    setMonth(prevMonth => subMonths(prevMonth, 1));
  };

  const handleNextMonth = () => {
    setMonth(prevMonth => addMonths(prevMonth, 1));
  };

  const handleYearChange = (year: string) => {
    const newYear = parseInt(year, 10);
    setMonth(prevMonth => setYear(prevMonth, newYear));
  };

  const handleDayClick = (day: Date) => {
    if (selectionMode === 'from') {
      setSelectedFrom(day);
      setSelectionMode('to');

      // If the newly selected "from" date is after current "to" date,
      // reset the "to" date
      if (selectedTo && day > selectedTo) {
        setSelectedTo(undefined);
      }
    } else {
      // If selecting "to" date before "from" date, switch them
      if (selectedFrom && day < selectedFrom) {
        setSelectedTo(selectedFrom);
        setSelectedFrom(day);
      } else {
        setSelectedTo(day);
      }
      setSelectionMode('from');
    }
  };

  const handleApplyFilter = () => {
    onDateRangeChange(selectedFrom, selectedTo);
    setIsOpen(false);
  };

  const handleClearFilter = () => {
    setSelectedFrom(undefined);
    setSelectedTo(undefined);
    onDateRangeChange(undefined, undefined);
    setIsOpen(false);
  };

  const formatDateRange = () => {
    if (selectedFrom && selectedTo) {
      return `${format(selectedFrom, "MMM d, yyyy")} - ${format(selectedTo, "MMM d, yyyy")}`;
    }
    if (selectedFrom) {
      return `From: ${format(selectedFrom, "MMM d, yyyy")}`;
    }
    if (selectedTo) {
      return `To: ${format(selectedTo, "MMM d, yyyy")}`;
    }
    return "Select dates";
  };

  useEffect(() => {
    if (initialFromDate && initialToDate) {
      setSelectedFrom(initialFromDate);
      setSelectedTo(initialToDate);
      onDateRangeChange(initialFromDate, initialToDate);
    }
  }, []);

  return (
    <div className="bg-white p-0 mr-9 rounded-md shadow-md z-[1000] w-64">
      <Popover  open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal bg-white hover:bg-gray-100 h-10"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span className="truncate">{formatDateRange()}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent  className="w-auto p-0 z-[1100]" 
        align="start"
        style={{ zIndex: 1001 }}>
          <div className="w-full p-2 flex items-center justify-between border-b">
            <Button 
              size="sm" 
              variant="ghost"
              onClick={handlePreviousMonth}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center space-x-1">
              <span>{format(month, "MMMM")}</span>
              <Select
                value={getYear(month).toString()}
                onValueChange={handleYearChange}
              >
                <SelectTrigger className="w-[4.5rem] h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              size="sm" 
              variant="ghost"
              onClick={handleNextMonth}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="lg:p-4 z-[800] ">
            <DayPicker
              mode="single"
              selected={selectionMode === 'from' ? selectedFrom : selectedTo}
              month={month}
              onMonthChange={setMonth}
              onDayClick={handleDayClick}
              showOutsideDays
              className="rdp-custom"
              modifiersClassNames={{
                selected: "bg-blue-600 text-white",
                today: "border border-blue-500"
              }}
              classNames={{
                months: "",
                month: "",
                caption: "hidden", // Hide default caption as we have custom header
                table: "w-full",
                head_row: "rdp-weekdays",
                head_cell: "text-muted-foreground text-[0.8rem] font-normal text-center",
                row: "rdp-week",
                cell: "",
                day: "h-8 w-8 p-0",
                day_selected: "",
                day_today: "",
                day_outside: "text-muted-foreground opacity-50",
                day_disabled: "text-muted-foreground opacity-50",
                
                
              }}
              footer={
                <div className="p-2 border-t flex justify-between mt-2">
                  {selectedFrom && (
                    <div className="text-xs">
                      <div>{selectionMode === 'to' ? 'Select end date' : 'Select start date'}</div>
                      <div>Selected: {formatDateRange()}</div>
                    </div>
                  )}
                </div>
              }
            />
          </div>
          
          <div className="flex justify-between p-2 border-t">
            <Button 
              size="sm" 
              variant="outline"
              onClick={handleClearFilter}
            >
              Clear
            </Button>
            <Button 
              size="sm" 
              className="bg-blue-600 hover:bg-blue-700 text-white" 
              onClick={handleApplyFilter}
            >
              Apply Filter
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export { DateFilter };