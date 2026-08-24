export type ToolParam = {
  name: string;
  required: boolean;
  description: string;
};

export type Tool = {
  name: string;
  group: string;
  module: string;
  description: string;
  readOnly: boolean;
  destructive: boolean;
  confirm: boolean;
  params: ToolParam[];
};
