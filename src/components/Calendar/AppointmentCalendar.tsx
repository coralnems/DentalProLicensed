import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { formatDate } from '../../utils/date';

interface CalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  appointments: Array<{
    id: string;
    datetime: string;
    patient: { profiles: { first_name: string; last_name: string } };
  }>;
}

export default function AppointmentCalendar({ 
  selectedDate, 
  onDateSelect,
  appointments 
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date(selectedDate));

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const weeks = [];
  let week = Array(7).fill(null);

  days.forEach((day, index) => {
    const dayIndex = (index + firstDayOfMonth) % 7;
    const weekIndex = Math.floor((index + firstDayOfMonth) / 7);
    
    if (!weeks[weekIndex]) {
      weeks[weekIndex] = Array(7).fill(null);
    }
    
    weeks[weekIndex][dayIndex] = day;
  });

  const getAppointmentsForDay = (day: number) => {
    return appointments.filter(apt => {
      const aptDate = new Date(apt.datetime);
      return aptDate.getDate() === day &&
             aptDate.getMonth() === currentMonth.getMonth() &&
             aptDate.getFullYear() === currentMonth.getFullYear();
    });
  };

  const handleDateSelect = (day: number) => {
    const newDate = new Date(currentMonth);
    newDate.setDate(day);
    onDateSelect(newDate);
  };

  return (
    <Card>
      <div className="p-4 flex items-center justify-between border-b">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigateMonth('prev')}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-lg font-semibold">
          {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigateMonth('next')}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-7 gap-px">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
              {day}
            </div>
          ))}

          {weeks.map((week, weekIndex) => (
            <React.Fragment key={weekIndex}>
              {week.map((day, dayIndex) => {
                if (!day) return (
                  <div 
                    key={`empty-${dayIndex}`} 
                    className="h-24 bg-muted/5"
                  />
                );
                
                const dayAppointments = getAppointmentsForDay(day);
                const isToday = new Date().getDate() === day &&
                              new Date().getMonth() === currentMonth.getMonth() &&
                              new Date().getFullYear() === currentMonth.getFullYear();
                const isSelected = selectedDate.getDate() === day &&
                                 selectedDate.getMonth() === currentMonth.getMonth() &&
                                 selectedDate.getFullYear() === currentMonth.getFullYear();
                
                return (
                  <div
                    key={`day-${day}`}
                    className={cn(
                      "h-24 border border-border p-2 cursor-pointer transition-colors",
                      isToday ? "bg-accent" : 
                      isSelected ? "bg-primary/5" :
                      "hover:bg-muted/5"
                    )}
                    onClick={() => handleDateSelect(day)}
                  >
                    <div className={cn(
                      "font-medium text-sm",
                      isSelected && "text-primary"
                    )}>
                      {day}
                    </div>
                    <ScrollArea className="h-[calc(100%-24px)] mt-1">
                      {dayAppointments.slice(0, 3).map(apt => (
                        <Badge
                          key={apt.id}
                          variant="secondary"
                          className="mb-1 w-full justify-start text-xs truncate"
                        >
                          {new Date(apt.datetime).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })} - {apt.patient.profiles.first_name} {apt.patient.profiles.last_name}
                        </Badge>
                      ))}
                      {dayAppointments.length > 3 && (
                        <div className="text-xs text-muted-foreground mt-1">
                          +{dayAppointments.length - 3} more
                        </div>
                      )}
                    </ScrollArea>
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </Card>
  );
}