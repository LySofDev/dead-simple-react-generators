import { default as TemplateComponent, TemplateProps } from './template.component';

// Inject service dependencies here
export default (props: TemplateProps) => (
  <TemplateComponent {...props} />
);
