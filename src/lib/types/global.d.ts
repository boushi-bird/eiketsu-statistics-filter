export {};

interface GeneralData {
  useNum: number;
  color: string;
}

interface Dom {
  contents: HTMLElement;
}

type EmptyObject = { [key: string]: never };

declare global {
  var BASE_DATA: GeneralData[] | EmptyObject | undefined;
  var FILTER_DATA: GeneralData[] | EmptyObject | undefined;
  var sortFunc: (val: string) => void;
  var DOM: Dom;
}
