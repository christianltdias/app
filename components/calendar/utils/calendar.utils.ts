import { Month } from "../../../types/dates";
import { getEnumByIndex } from "../../../utils/enum.utils";
import { CurrentTab } from "../calendar";

export const getMinutes = (initialDate: Date, finalDate: Date): number => {
  const initialDateMiliseconds = initialDate.getTime();
  const finalDateMiliseconds = finalDate.getTime();
  return (finalDateMiliseconds - initialDateMiliseconds) / (1000 * 60);
}

export const getHeight = (initialDate: Date, finalDate: Date, height: number, factor: number, margin: number): number => {
  const minutes = getMinutes(initialDate, finalDate);
  var eventSize = (height * factor) * (minutes / 60) - 2 * margin;
  return eventSize
};

export const getTop = (initialDate: Date, height: number, factor: number, margin: number): number => {
  const minutes = getMinutes(new Date(initialDate.getFullYear(), initialDate.getMonth(), initialDate.getDate()), initialDate);
  return (height * factor) * (minutes / 60) + margin;
};

export const getDayName = (currentTab: CurrentTab) => {
  var date = new Date(currentTab.year, currentTab.month, currentTab.day)
  return `${date.getDate()} ${Month[getEnumByIndex<string>(Month, currentTab.month)]} ${currentTab.year}`
}