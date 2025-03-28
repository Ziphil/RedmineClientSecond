//

import {Dayjs} from "dayjs";
import {BaseSyntheticEvent, useMemo} from "react";
import {UseFormReturn, useForm} from "/renderer/hook/form";
import {invalidateResponses} from "/renderer/hook/request";
import {Issue, Project} from "/renderer/type";


const DEFAULT_VALUE = {
  timeString: "2"
} satisfies FormValue;
type FormValue = {
  work?: Project | Issue,
  timeString: string
};

export type AddActivitySpec = {
  form: UseFormReturn<FormValue>,
  handleSubmit: (event: BaseSyntheticEvent) => void
};

export function useAddActivity(date: Dayjs): AddActivitySpec {
  const form = useForm<FormValue>(DEFAULT_VALUE, {});
  const handleSubmit = useMemo(() => form.handleSubmit(async (value) => {
    if (value.work) {
      await window.api.addActivity({activity: {
        work: value.work,
        time: parseTime(value.timeString),
        date: date.format("YYYY-MM-DD")
      }});
      await Promise.all([
        invalidateResponses("fetchMonthlyActivities"),
        invalidateResponses("fetchDailyActivities")
      ]);
    }
  }), [form, date]);
  return {form, handleSubmit};
}

function parseTime(timeString: string): number {
  const match = timeString.match(/^(\d+):(\d+)$/);
  if (match) {
    const [, hour, minute] = match;
    const time = (parseInt(hour) * 60 + parseInt(minute)) * 60 * 1000;
    return time;
  } else {
    const hour = parseFloat(timeString);
    const time = hour * 60 * 60 * 1000;
    if (!isNaN(time)) {
      return time;
    } else {
      return 0;
    }
  }
}
